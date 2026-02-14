# IM-Connected AI Agents: Async Notification Architecture Research

> Status: **v1.0**
> Date: 2026-02-14
> Context: NoxInfluencer API needs to notify agents about async events (creator replies, negotiation updates). Previous research focused on MCP notifications (limited). This research focuses on the dominant real-world pattern: **API Event -> IM Message -> Agent sees it in conversation context**.

---

## Executive Summary

Modern AI agents (OpenClaw, Dust.tt, Moveworks) are **already connected to IM platforms** (Slack, Discord, Telegram, WhatsApp). They don't need special "notification protocols" -- they receive notifications the same way humans do: **as messages in their conversation channels**. This means the most effective way for NoxInfluencer to notify agents about async events is to send structured messages to IM channels where agents are listening, using standard webhooks.

**Key insight**: The notification path is not `API -> Agent` (which requires MCP notifications, not yet mature). The path is `API -> IM Platform -> Agent reads the message`. The IM platform IS the notification bus.

---

## 1. OpenClaw: Architecture Deep Dive

### 1.1 What is OpenClaw

OpenClaw (formerly Clawdbot/Moltbot) is an open-source personal AI assistant that gained 100K+ GitHub stars within a week of launch in January 2026. It uses a **hub-and-spoke architecture** with a local Gateway as the control plane.

### 1.2 Channel Adapter Architecture

OpenClaw implements a **monitor pattern** where each IM platform gets a dedicated adapter:

| Platform | Library | Connection Type | Multi-Account |
|----------|---------|----------------|:---:|
| Slack | Bolt SDK | Socket Mode (WebSocket) or HTTP Events API | Yes |
| Discord | discord.js | WebSocket | Yes |
| Telegram | grammy | Bot API (polling/webhook) | Yes |
| WhatsApp | Baileys | WebSocket | Yes |
| Signal | signal-cli | JSON-RPC | No |
| iMessage | imsg | Native | No |
| MS Teams | Extension | HTTP | Yes |
| Matrix | Extension | Federation | Yes |

Each adapter:
1. Receives inbound messages from the platform API
2. Normalizes content into a standard `MessageEnvelope` format
3. Enforces access control policies (DM policy, channel allowlist, mention gating)
4. Routes messages to agent sessions via `resolveAgentRoute()`
5. Delivers responses back to the platform

### 1.3 Session Key System

Session keys encode routing information:
```
agent:{agentId}:{provider}:{scope}:{identifier}

Examples:
- agent:main:slack:channel:C01234567
- agent:main:slack:thread:C01234567:1234567890.123456
- agent:work:telegram:group:-1234567890
- agent:main:whatsapp:dm:+15555550123
```

Multi-agent routing is configured via bindings:
```json
{
  "bindings": [
    { "channels": ["slack"], "groups": ["marketing"], "agentId": "marketing-agent" },
    { "channels": ["telegram"], "allowFrom": ["@ceo"], "agentId": "executive" }
  ]
}
```

### 1.4 Webhook System (External Event Injection)

**This is the critical piece for NoxInfluencer.** OpenClaw's Gateway exposes HTTP webhook endpoints that allow external systems to inject events into agent sessions:

**POST /hooks/wake** -- Fire-and-forget triggers
```json
{
  "text": "Creator @beautybyjess replied to your outreach email. She's interested in the protein powder campaign.",
  "mode": "now"
}
```

**POST /hooks/agent** -- Isolated agent turns with routing
```json
{
  "message": "Creator @beautybyjess replied: 'I'd love to work with you! My rate for a 60s TikTok is $2,500.' Campaign: Summer Protein Launch. Budget range: $1,500-$3,000. Recommended action: proceed to negotiation.",
  "name": "NoxInfluencer",
  "agentId": "marketing",
  "sessionKey": "hook:nox:campaign-xyz",
  "wakeMode": "now",
  "deliver": true,
  "channel": "slack",
  "to": "C01234567"
}
```

**POST /hooks/<name>** -- Custom mapped endpoints (transform arbitrary payloads)

Key payload fields:
- `message` (required): The event description/instruction
- `agentId`: Routes to a specific agent
- `sessionKey`: Isolates to a specific session
- `wakeMode`: `now` (immediate) or `next-heartbeat` (queued)
- `deliver`: Whether to send the agent's response to an IM channel
- `channel` + `to`: Target IM platform and recipient

Authentication: `Authorization: Bearer <token>` header (dedicated hook token).

### 1.5 Full Event Flow: API Event to Agent Action

```
NoxInfluencer API                  OpenClaw Gateway              Slack
(creator replies)                  (localhost:18789)              (brand's channel)
      |                                  |                           |
      |-- POST /hooks/agent ------------>|                           |
      |   {message, deliver:true,        |                           |
      |    channel:"slack",              |                           |
      |    to:"C01234567"}               |                           |
      |                                  |                           |
      |                                  |-- Resolve session ------->|
      |                                  |-- Load context           |
      |                                  |-- Run agent turn         |
      |                                  |   (LLM processes event)  |
      |                                  |                           |
      |                                  |-- Post response -------->|
      |                                  |   "Creator @beautybyjess |
      |                                  |    is interested! Her     |
      |                                  |    rate is $2,500. Shall  |
      |                                  |    I start negotiation?"  |
```

### 1.6 Reliability via Hookdeck Integration

For production reliability, OpenClaw recommends using Hookdeck as an Event Gateway:

```
NoxInfluencer -> Hookdeck Event Gateway -> OpenClaw Gateway
```

Hookdeck provides:
- **Persistent queue**: Events survive gateway restarts
- **Automatic retries**: Up to 50 attempts with configurable backoff
- **Deduplication**: Content-based, header-based, or composite-key
- **Dead letter queue**: Failed events surface as "Issues" for inspection
- **Payload transformation**: Add auth headers, verify signatures
- **Observability**: Dashboard with searchable logs

---

## 2. Dust.tt: Webhook Triggers for Agents

### 2.1 Architecture

Dust.tt is a platform for building custom AI agents for organizations. Its Slack integration is production-grade, with agents that live inside Slack channels and respond to mentions, DMs, and channel messages.

### 2.2 Trigger System

Dust introduced **Triggers** that transform agents from on-demand tools into autonomous workers:

**Webhook Triggers**: Event-driven activation from external systems
- Built-in providers: GitHub, Jira, Zendesk (OAuth-based, automatic webhook setup)
- Custom webhooks: Any platform, with optional signature verification (SHA1/SHA256/SHA512)
- AI-powered filtering: Describe filtering criteria in natural language (e.g., "Only when a PR is opened with more than 20 changed files")

**Execution flow:**
1. External system sends webhook to Dust
2. Dust generates a unique webhook URL and secret per source
3. Event payload is optionally filtered before agent processing
4. A new conversation starts for each event
5. Agent processes with full company context (Slack history, docs, etc.)
6. Agent writes results back to connected platforms (Slack channels, Jira, etc.)

### 2.3 Slack Integration Details

- **Agent invocation**: `@dust`, `~agentname`, or `+agentname` mentions in Slack
- **Channel-based routing**: Channels can be configured to auto-route to specific agents
- **Thread context**: Bot retrieves thread history and attaches it as context
- **Streaming responses**: Real-time streaming of agent responses with reconnection (up to 10 retries)
- **Agent switching**: Users can switch agents via ephemeral dropdown after a response

### 2.4 Key Pattern for NoxInfluencer

Dust demonstrates that **webhook -> agent -> Slack message** is a production pattern:

```
NoxInfluencer webhook -> Dust webhook trigger -> Agent processes event
                                                      |
                                                      v
                                              Agent posts to Slack:
                                              "Creator replied to your outreach"
```

---

## 3. Slack's Agent-Ready Infrastructure (2025-2026)

### 3.1 Agent-Ready APIs

Slack announced four capabilities specifically for AI agents:

| API | Status | Purpose |
|-----|--------|---------|
| **Real-Time Search (RTS) API** | Closed beta | Permission-respecting retrieval across threads for agents doing deep research |
| **MCP Server** | Closed beta (GA early 2026) | Universal bridge for LLMs to discover data and execute tasks within Slack |
| **Work Objects** | GA (Oct 2025) | Render third-party data inline in Slack conversations; enable direct actions |
| **Third-party Agent Marketplace** | Available | Distribution channel (Anthropic, Perplexity, Notion, etc.) |

### 3.2 Agentforce in Slack

Salesforce's Agentforce is embedded in Slack, allowing third-party AI agents to operate within Slack conversations. Third-party agents from Adobe, Anthropic, Cohere, Perplexity, and others are available on the Slack Marketplace.

### 3.3 Implication for NoxInfluencer

Slack is actively positioning itself as **the integration layer for AI agents**. Work Objects are particularly relevant: they allow third-party data (like campaign status, creator profiles) to be rendered inline in Slack with actionable buttons ("Approve negotiation", "Skip creator"). This means NoxInfluencer notifications could be rich, interactive Slack objects rather than plain text.

---

## 4. Moveworks: Ambient Agent Pattern

### 4.1 What are Ambient Agents

Moveworks defines "ambient agents" as always-on, system-driven AI agents that operate in the background and spring into action when triggered by external events. They don't wait for user prompts.

### 4.2 Webhook Trigger Architecture

```
External System -> Webhook Listener -> Validate & Parse -> Plugin Execution -> Notification
                   (HTTP endpoint)     (auth, filter)       (LLM processing)   (Slack/Teams)
```

Three trigger types:
- **Webhooks**: React to real-time events (fastest)
- **Pollers**: Detect changes in systems without webhooks
- **Scheduled**: Time-based jobs

### 4.3 Notification Workflow

1. Webhook received from external system (e.g., NoxInfluencer)
2. LLM action interprets raw webhook payload into structured, readable message
3. User lookup (find the right person by email)
4. Send notification directly in chat (Slack/Teams)

**Key insight**: The LLM interprets the webhook payload and generates a human-readable notification. The agent doesn't just forward raw data -- it contextualizes it.

---

## 5. Discord-Connected Agents

### 5.1 Webhook Architecture

Discord provides two mechanisms:
- **Incoming Webhooks**: One-way, any HTTP-capable system can post messages to Discord channels
- **Bot API**: Full bidirectional communication via WebSocket (Gateway connection)

### 5.2 AI Bot Pattern

Discord AI bots (via discord.js, Pycord, etc.) maintain persistent WebSocket connections. External events reach them via:
1. **Direct webhook to Discord channel** (agent sees the message in its channel context)
2. **n8n/Zapier automation**: External event -> automation platform -> Discord message
3. **Custom bot endpoint**: External system calls bot's HTTP endpoint, bot posts to Discord

### 5.3 Coverage Bot Example (Influencer Marketing)

Coverage Bot (by IMPRESS) is a real-world example of the pattern:
- Monitors influencer content across Twitch, YouTube, TikTok
- Sends **Slack and Discord notifications** when a streamer goes live or publishes content
- Team never misses an influencer touchpoint

---

## 6. The Universal Architecture Pattern

### 6.1 Pattern: External Event -> IM Message -> Agent Processes

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  NoxInfluencer Backend                                              │
│  ┌─────────────────────┐                                            │
│  │  Event Source        │                                            │
│  │  - Creator replied   │                                            │
│  │  - Email opened      │                                            │
│  │  - Negotiation update│                                            │
│  │  - Campaign milestone│                                            │
│  └─────────┬───────────┘                                            │
│            │                                                         │
│            v                                                         │
│  ┌─────────────────────┐                                            │
│  │  Notification Router │                                            │
│  │  (decides where to   │                                            │
│  │   send based on      │                                            │
│  │   brand's config)    │                                            │
│  └──┬──────┬──────┬────┘                                            │
│     │      │      │                                                  │
└─────┼──────┼──────┼──────────────────────────────────────────────────┘
      │      │      │
      v      v      v
  ┌──────┐ ┌──────┐ ┌──────────┐
  │Slack │ │Disc. │ │ OpenClaw │    <-- IM Platforms
  │Webhk │ │Webhk │ │ /hooks/  │
  └──┬───┘ └──┬───┘ └────┬─────┘
     │        │           │
     v        v           v
  ┌──────────────────────────┐
  │  Agent reads the message  │    <-- Agent's conversation context
  │  in its IM channel and    │
  │  decides what to do       │
  └──────────────────────────┘
```

### 6.2 Three Delivery Mechanisms

| Mechanism | Best For | How It Works | Agent Sees |
|-----------|----------|-------------|------------|
| **Slack Incoming Webhook** | Brands using Slack-connected agents (Dust, custom bots, Agentforce) | POST JSON to webhook URL -> message appears in channel | Message in Slack conversation context |
| **Discord Incoming Webhook** | Brands using Discord-connected agents | POST JSON to webhook URL -> message appears in channel | Message in Discord conversation context |
| **OpenClaw /hooks/agent** | Brands using OpenClaw (self-hosted) | POST JSON to OpenClaw gateway -> agent turn triggered | Direct injection into agent session with optional IM delivery |

### 6.3 Why This Pattern Works

1. **No new protocol needed**: Uses existing, battle-tested IM APIs
2. **Agent-agnostic**: Works with any agent connected to the IM platform
3. **Human-readable**: Brand team also sees the notifications
4. **Bidirectional**: Agent can respond in the same thread (e.g., "Start negotiation")
5. **Context-rich**: Agent has full conversation history for decision-making
6. **Reliable**: IM platforms handle delivery guarantees, retries, persistence

---

## 7. Notification Message Design for Agents

### 7.1 Design Principles

Messages sent to IM channels must be optimized for both human reading AND agent parsing:

1. **Structured yet natural**: Use Slack Block Kit / Discord embeds for visual clarity; include plain-text fallback for agent parsing
2. **Action-oriented**: Tell the agent what happened AND what it can do next
3. **Self-contained**: Include all context needed for the agent to act without additional API calls
4. **Idempotent identifiers**: Include unique event IDs to prevent duplicate processing

### 7.2 Recommended Notification Format (Slack Block Kit)

```json
{
  "text": "[NoxInfluencer] Creator @beautybyjess replied to outreach for campaign 'Summer Protein Launch'",
  "blocks": [
    {
      "type": "header",
      "text": { "type": "plain_text", "text": "Creator Reply Received" }
    },
    {
      "type": "section",
      "fields": [
        { "type": "mrkdwn", "text": "*Creator:* @beautybyjess (TikTok, 245K followers)" },
        { "type": "mrkdwn", "text": "*Campaign:* Summer Protein Launch" },
        { "type": "mrkdwn", "text": "*Status:* Interested - Pricing Discussion" },
        { "type": "mrkdwn", "text": "*Quoted Rate:* $2,500 / 60s TikTok" }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Creator's message:*\n> Hi! I'd love to work with you. My rate for a 60-second TikTok video is $2,500. I can also offer a package deal..."
      }
    },
    {
      "type": "context",
      "elements": [
        { "type": "mrkdwn", "text": "Budget range: $1,500-$3,000 | Event ID: evt_abc123 | <https://app.noxinfluencer.com/campaigns/xyz|View in Dashboard>" }
      ]
    }
  ]
}
```

### 7.3 Recommended Format for OpenClaw /hooks/agent

```json
{
  "message": "NOTIFICATION: Creator @beautybyjess (TikTok, 245K followers) replied to outreach email for campaign 'Summer Protein Launch' (campaign_id: cmp_xyz). Creator says: 'I'd love to work with you! My rate for a 60-second TikTok video is $2,500.' The campaign budget range is $1,500-$3,000, so this is within budget. Recommended next step: use negotiate tool with creator_id crt_abc123 and budget_max 3000 to start pricing negotiation.",
  "name": "NoxInfluencer Notification",
  "agentId": "marketing",
  "wakeMode": "now",
  "deliver": true,
  "channel": "slack",
  "to": "C01234567"
}
```

### 7.4 Key Fields for Agent-Parseable Notifications

Every notification should include:

| Field | Purpose | Example |
|-------|---------|---------|
| `event_type` | What happened | `creator_replied`, `email_opened`, `negotiation_update` |
| `event_id` | Idempotent key | `evt_abc123` |
| `campaign_id` | Context link | `cmp_xyz` |
| `creator_handle` | Who is involved | `@beautybyjess` |
| `creator_id` | Machine-readable ID | `crt_abc123` |
| `summary` | Human-readable description | "Creator replied with a rate of $2,500" |
| `recommended_action` | What the agent should do next | "Use negotiate tool with budget_max 3000" |
| `action_context` | Parameters for the recommended action | `{creator_id, budget_max, campaign_id}` |
| `dashboard_url` | Link for human review | `https://app.nox.../campaigns/xyz` |
| `timestamp` | When it happened | ISO 8601 |

---

## 8. Event Types for NoxInfluencer

Based on the PRD's async workflows, these are the events that need IM notifications:

### 8.1 Priority 1 (Day 1)

| Event | Trigger | Urgency | Recommended Action |
|-------|---------|---------|-------------------|
| `creator_replied` | Creator responds to outreach email | High | "Use negotiate tool to start pricing discussion" |
| `negotiation_round_complete` | A round of negotiation finished | High | "Review counter-offer and approve next round" |
| `negotiation_agreed` | Creator accepted terms | Critical | "Review and approve confirmation email draft" |
| `negotiation_rejected` | Creator rejected offer | Medium | "Consider alternative creators from shortlist" |
| `negotiation_stalled` | 5 rounds without agreement | Medium | "Adjust budget or try different creator" |
| `negotiation_over_budget` | Creator's price exceeds budget_max | Medium | "Creator's minimum is above your budget" |

### 8.2 Priority 2 (v1.1)

| Event | Trigger | Urgency |
|-------|---------|---------|
| `email_bounced` | Outreach email bounced | Medium |
| `email_opened` | Creator opened outreach email | Low |
| `followup_sent` | Auto follow-up sent (3 days no reply) | Low |
| `credits_low` | Credit balance < 20% | Medium |
| `credits_exhausted` | Credit balance = 0 | High |
| `campaign_milestone` | Campaign reaches key milestone | Low |

---

## 9. Implementation Recommendation for NoxInfluencer

### 9.1 Architecture: Notification Dispatch Service

```
┌──────────────────────────────────────────────────────┐
│ NoxInfluencer Backend                                 │
│                                                       │
│  EmailService (聚星)                                  │
│    └── Reply detected ──> EventBus.emit({             │
│                              type: "creator_replied", │
│                              creator_id, campaign_id, │
│                              reply_body, ...          │
│                           })                          │
│                                                       │
│  EventBus                                             │
│    └── NotificationDispatcher.handle(event)           │
│                                                       │
│  NotificationDispatcher                               │
│    ├── Look up brand's notification config            │
│    │   (which channels, which events)                 │
│    ├── Format message per channel type                │
│    │   ├── Slack: Block Kit JSON                      │
│    │   ├── Discord: Embed JSON                        │
│    │   ├── OpenClaw: /hooks/agent payload             │
│    │   └── Email: Fallback (already in PRD)           │
│    └── Deliver via channel adapter                    │
│        ├── SlackAdapter: POST to incoming webhook URL │
│        ├── DiscordAdapter: POST to webhook URL        │
│        ├── OpenClawAdapter: POST to /hooks/agent      │
│        └── EmailAdapter: Send via email service       │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### 9.2 Brand Notification Configuration (Dashboard Setting)

Brands configure where they want notifications via Dashboard:

```json
{
  "notification_channels": [
    {
      "type": "slack_webhook",
      "webhook_url": "https://hooks.slack.com/services/T.../B.../xxx",
      "events": ["creator_replied", "negotiation_agreed", "negotiation_rejected"],
      "enabled": true
    },
    {
      "type": "discord_webhook",
      "webhook_url": "https://discord.com/api/webhooks/123/abc",
      "events": ["creator_replied"],
      "enabled": true
    },
    {
      "type": "openclaw_webhook",
      "webhook_url": "http://localhost:18789/hooks/agent",
      "token": "hook_xxx",
      "agent_id": "marketing",
      "events": ["*"],
      "enabled": true
    },
    {
      "type": "email",
      "address": "brand@company.com",
      "events": ["negotiation_agreed", "credits_low"],
      "enabled": true
    }
  ]
}
```

### 9.3 Phased Rollout

**Day 1 (MVP)**:
- Email notification only (already in PRD: "达人回复时系统自动发通知邮件给品牌")
- Email content is agent-memory-friendly (includes event_type, creator_handle, campaign_id, recommended_action)
- This works because many agents can read email (OpenClaw has AgentMail integration, Gmail webhook mapping)

**v1.1 (Post-launch)**:
- Add Slack incoming webhook support
- Dashboard UI for brands to configure webhook URL
- Slack Block Kit formatted messages
- Recommended: start with Slack because it has the richest agent ecosystem (Dust, Agentforce, OpenClaw Slack channel, custom bots)

**v1.2 (Scale)**:
- Add Discord webhook support
- Add OpenClaw /hooks/agent direct support
- Add webhook signature verification (HMAC-SHA256)
- Add retry logic with exponential backoff
- Consider Hookdeck integration for production reliability

### 9.4 API Endpoint: Configure Notifications

```
POST /v1/notifications/channels
Authorization: Bearer <api_key>

{
  "type": "slack_webhook",
  "webhook_url": "https://hooks.slack.com/services/...",
  "events": ["creator_replied", "negotiation_agreed"],
  "secret": "optional_signing_secret"
}

Response:
{
  "channel_id": "nch_abc123",
  "type": "slack_webhook",
  "events": ["creator_replied", "negotiation_agreed"],
  "status": "active",
  "test_event_sent": true
}
```

### 9.5 Why Not MCP Notifications?

MCP (Model Context Protocol) does have a notification mechanism, but:
- It's limited to server-to-client signals within an active session
- MCP sessions are ephemeral; no persistent connection for async events
- No standard "push notification" from MCP server to agent when the agent isn't actively connected
- The IM channel approach is strictly superior for async events because:
  - IM connections are persistent (always on)
  - IM has built-in delivery guarantees
  - IM notifications wake agents even when idle
  - IM provides human-in-the-loop oversight (brand team sees everything)

---

## 10. Best Practices Summary

### For API Providers (NoxInfluencer)

1. **Start with email, graduate to IM webhooks**: Email is universal and works Day 1. IM webhooks are the growth path.

2. **Design notifications for dual readers**: Every notification must be clear to both humans AND AI agents. Include structured data (IDs, amounts, statuses) alongside natural language summaries.

3. **Include recommended next actions**: Don't just tell the agent what happened; tell it what to do next. Include the tool name and parameters needed.

4. **Use idempotent event IDs**: Prevent duplicate processing when webhooks are retried.

5. **Support webhook signature verification**: HMAC-SHA256 signing for security. OpenClaw, Dust, and Hookdeck all support signature verification.

6. **Send a test event on configuration**: When a brand sets up their webhook URL, immediately send a test event so they can verify the integration works.

7. **Provide event filtering**: Let brands choose which events trigger notifications (not everything is urgent).

8. **Format messages for the platform**: Use Slack Block Kit for Slack, Embeds for Discord, structured text for OpenClaw. Don't send the same plain text everywhere.

### For Agent Builders

1. **Connect your agent to an IM platform**: This is the simplest way to receive async notifications from any API.

2. **Use OpenClaw's /hooks/agent endpoint**: If self-hosting, this is the most direct path for API-to-agent communication.

3. **Use Dust.tt's webhook triggers**: If using Dust, configure webhook triggers for each API event type.

4. **Handle notifications in agent instructions**: Add instructions like "When you receive a NoxInfluencer notification about a creator reply, summarize the creator's response and ask me whether to start negotiation."

---

## Sources

- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Architecture Overview](https://ppaolo.substack.com/p/openclaw-system-architecture-overview)
- [OpenClaw Webhook Documentation](https://docs.openclaw.ai/automation/webhook)
- [OpenClaw Slack Channel Documentation](https://docs.openclaw.ai/channels/slack)
- [OpenClaw Channel System - DeepWiki](https://deepwiki.com/openclaw/openclaw/8-channels)
- [OpenClaw Three-Layer Architecture](https://eastondev.com/blog/en/posts/ai/20260205-openclaw-architecture-guide/)
- [Using Hookdeck with OpenClaw](https://hookdeck.com/webhooks/platforms/using-hookdeck-with-openclaw-reliable-webhooks-for-your-ai-agent)
- [Dust.tt Slack Integration](https://dust.tt/home/slack/slack-integration)
- [Dust.tt Webhook Triggers Documentation](https://docs.dust.tt/docs/webhooks)
- [Dust.tt Triggers Documentation](https://docs.dust.tt/docs/triggers)
- [Dust.tt Triggers Blog Post](https://dust.tt/blog/introducing-triggers-your-agents-working-while-you-sleep)
- [Dust.tt Slack Integration - DeepWiki](https://deepwiki.com/dust-tt/dust/5.4-slack-integration)
- [Slack Agent-Ready APIs](https://salesforcedevops.net/index.php/2025/10/01/slack-agent-ready-apis/)
- [Slack AI Agent Solutions](https://slack.com/ai-agents)
- [Slack AI in Apps Overview](https://docs.slack.dev/ai/)
- [Slackbot AI Agent - TechCrunch](https://techcrunch.com/2026/01/13/slackbot-is-an-ai-agent-now/)
- [Moveworks Ambient Agent Webhook Triggers](https://www.moveworks.com/us/en/resources/blog/webhooks-triggers-for-ambient-agents)
- [Moveworks Ambient Agents Overview](https://help.moveworks.com/docs/ambient-agents-overview)
- [Coverage Bot - Influencer Monitoring](https://impress.games/coverage-bot)
- [Vercel AI SDK Slackbot Guide](https://ai-sdk.dev/cookbook/guides/slackbot)
- [Slack Incoming Webhooks](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)
- [A2A Protocol Specification](https://a2a-protocol.org/latest/specification/)
- [Connect AI Agents with Webhooks](https://everworker.ai/blog/connect-ai-agents-with-webhooks)
