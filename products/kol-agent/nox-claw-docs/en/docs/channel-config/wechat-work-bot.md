---
doc_id: noxclaw_wechat_work_bot
title: WeCom Bot
description: Configure the WeCom Bot channel for NoxClaw, including API-mode bot creation, Bot ID / Secret collection, and WebSocket registration.
locale: en
content_type: doc
nav_group: channel-config
order: 2
status: published
updated_at: 2026-06-23
keywords:
  - NoxClaw
  - WeCom Bot
  - channel configuration
  - WebSocket
  - Bot ID
  - Secret
---

# WeCom Bot

This guide explains how to connect a WeCom bot to NoxClaw. After the channel is connected, WeCom members can send direct messages to the bot or mention the bot in a group chat. NoxClaw syncs those messages into the current seat's channel conversations and sends replies through the route confirmed by the backend.

The current NoxClaw WeCom channel uses **WebSocket persistent connection** mode. In NoxClaw, you only need to enter the WeCom bot's **Bot ID** and **Secret**. `URL`, `Token`, and `Encoding-AESKey` are used by URL callback mode and are not required in the current NoxClaw configuration dialog.

## Prerequisites

Before you start, make sure that:

- You can sign in to NoxClaw and have access to channel configuration.
- You can sign in to WeCom and have permission to create or manage smart bots.
- You have prepared a WeCom smart bot for NoxClaw. We recommend binding one WeCom bot to one NoxClaw seat to avoid message ownership conflicts.
- You can create an API-mode bot in the WeCom admin console or WeCom client and select persistent connection.

Secret is sensitive. Use it only in the NoxClaw configuration dialog, and do not expose it in chats, screenshots, or public documents.

## 1. Create a WeCom Bot

WeCom allows both administrators and regular members to create smart bots. In both cases, the final setup should use API mode and persistent connection.

### Administrator Flow

1. Open the WeCom admin console.
2. Sign in with an administrator account.
3. Open the smart bot entry under **Security & Management** or **Management Tools**.
4. Click **Create Bot**.
5. If the page starts with an AI-generated flow, choose **Create Manually**.
6. Select **API Mode** as the creation method.

> Image placeholder: Create a smart bot in the WeCom admin console.

### Member Flow

1. Open the WeCom client.
2. Go to **Workbench**.
3. Find **Smart Bot App** and click **Create Bot**.
4. If the page starts with an AI-generated flow, choose **Create Manually**.
5. Select **API Mode** as the creation method.

> Image placeholder: Create a smart bot in the WeCom client.

## 2. Fill in Basic Bot Information

After entering the API-mode creation page, fill in the basic information first:

| Field | Description |
| --- | --- |
| Bot name | Use a recognizable name, such as `NoxClaw Assistant`. |
| Bot avatar | Upload an avatar according to your company policy so members can identify the bot in conversations. |
| Visible scope / available members | Select the members, departments, or tags that can use the bot. |

The visible scope should include at least the members who need to use NoxClaw through WeCom. Save the basic information, then go to API configuration.

> Image placeholder: WeCom bot basic information and visible scope.

## 3. Select Persistent Connection and Get Credentials

In **API Configuration**, select **Use persistent connection**.

1. Confirm that the connection method is **Use persistent connection**.
2. Copy **Bot ID**.
3. Click the credential retrieval entry on the page and copy **Secret**.
4. Keep Bot ID and Secret available for the NoxClaw configuration step.

Persistent connection mode does not require URL, Token, or Encoding-AESKey. If the page also offers URL callback mode, do not switch to URL callback mode.

> Image placeholder: Select persistent connection and get Bot ID / Secret in WeCom API configuration.

## 4. Configure WeCom in NoxClaw

1. Open NoxClaw and go to **Channel Configuration**.
2. Find the **WeCom Bot** card and click **Configure**.
3. Confirm that the connection mode is **WebSocket persistent connection**.
4. Enter the **Bot ID** and **Secret** copied from WeCom.
5. Click **Register**.

After submission, NoxClaw syncs the WeCom bot configuration into the current seat's runtime. The channel shows **configuring** while the sync is in progress. After the sync succeeds, the channel becomes **connected**.

> Image placeholder: NoxClaw WeCom Bot configuration dialog.

## 5. Start Using the Bot

1. Find the bot you created in WeCom.
2. Click **Send Message** to open a direct chat, or add the bot to a group chat.
3. Send a test direct message to the bot, or mention the bot in a group chat.
4. Return to NoxClaw channel conversations and wait for the WeCom channel conversation to appear.
5. Reply in NoxClaw. For WeCom group messages, if NoxClaw can identify the sender, the in-product reply is delivered to that sender's direct message instead of being posted back to the group.

A successful bot binding only means that the channel account is ready. Before the first external message arrives, NoxClaw may show the channel as connected with no conversation yet. This is expected.

> Image placeholder: Find the WeCom bot and send a test message.

## 6. Rebind or Unbind

- If the WeCom channel enters an error state, click **Rebind**, enter the Bot ID and Secret again, and submit. NoxClaw cleans up the failed lifecycle and syncs the new configuration in the same rebind flow.
- If the WeCom channel is already connected or configuring, unbind it before configuring it again.
- After unbinding, NoxClaw removes the binding between the current seat and the WeCom bot. New messages from that bot will no longer enter this seat's WeCom channel conversations.

## 7. About URL Callback Mode

WeCom API mode also supports URL callback integration. That mode usually requires `URL`, `Token`, and `Encoding-AESKey`, and requires you to paste the generated webhook URL back into WeCom.

The current NoxClaw WeCom configuration dialog only supports WebSocket persistent connection mode. It does not show URL callback mode, and it does not require Token or Encoding-AESKey. Use the persistent connection flow in this guide.

## 8. FAQ

### 1. Do I need to enter Token or Encoding-AESKey in NoxClaw?

No. The current NoxClaw WeCom dialog only requires Bot ID and Secret, and it uses WebSocket persistent connection mode. Token and Encoding-AESKey are common URL-callback settings and are not configured in the current NoxClaw dialog.

### 2. What should I do if registration says Bot ID or Secret is invalid?

Go back to the API configuration area of the WeCom smart bot, confirm that **Use persistent connection** is selected, and copy Bot ID and Secret again. Make sure there are no extra spaces and that the Secret has not been regenerated or expired.

### 3. Why is the channel connected but no WeCom conversation appears in NoxClaw?

This is the normal initial state. After the WeCom configuration sync succeeds, the channel can become connected before any conversation exists. A channel conversation is created only after the bot receives a direct message or a group mention.

### 4. What should I check if the WeCom bot does not respond?

Check the following items in order:

1. The WeCom bot has been saved and enabled.
2. API configuration uses persistent connection.
3. The Bot ID and Secret entered in NoxClaw match the credentials in WeCom.
4. The bot visible scope includes the member you are testing with.
5. The NoxClaw channel card shows connected.
6. In group chats, the bot is mentioned. Group messages usually need to mention the bot before they enter the processing flow.

### 5. What should I do if Secret is leaked?

Regenerate or reset Secret immediately in the WeCom bot API configuration, then rebind the WeCom bot in NoxClaw. Do not continue using the leaked old secret.
