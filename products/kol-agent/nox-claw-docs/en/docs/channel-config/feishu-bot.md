---
doc_id: noxclaw_feishu_bot
title: Feishu Bot
description: Configure the Feishu Bot channel for NoxClaw, including app creation, bot capability, event subscription, and App ID / App Secret registration.
locale: en
content_type: doc
nav_group: channel-config
order: 1
status: published
updated_at: 2026-06-23
keywords:
  - NoxClaw
  - Feishu Bot
  - channel configuration
  - WebSocket
  - App ID
  - App Secret
---

# Feishu Bot

This guide explains how to connect a Feishu bot to NoxClaw. After the channel is connected, Feishu users can send direct messages to the bot or mention the bot in a group chat. NoxClaw syncs those messages into the current seat's channel conversations and sends replies through the route confirmed by the backend.

The current NoxClaw Feishu channel uses **WebSocket persistent connection** mode. In NoxClaw, you only need to enter the Feishu app's **App ID** and **App Secret**. `Encrypt Key`, `Verification Token`, and URL callback settings are used by webhook mode and are not required in the current NoxClaw configuration dialog.

## Prerequisites

Before you start, make sure that:

- You can sign in to NoxClaw and have access to channel configuration.
- You can access Feishu Open Platform and have permission to create or manage an internal enterprise app.
- You have prepared a Feishu internal app for NoxClaw. We recommend binding one Feishu bot to one NoxClaw seat to avoid message ownership conflicts.
- You can enable bot capability, grant permissions, configure event subscription, and publish the app in Feishu Open Platform.

App Secret is sensitive. Use it only in the NoxClaw configuration dialog, and do not expose it in chats, screenshots, or public documents.

## 1. Create a Feishu App

1. Open Feishu Open Platform and go to the developer console.
2. Click **Create Internal App**.
3. Enter the app name, description, and icon. Use a recognizable name, such as `NoxClaw Assistant`.
4. After the app is created, open the app details page.

> Image placeholder: Create an internal enterprise app in Feishu Open Platform.

## 2. Enable Bot Capability

1. In the app details page, open **App Capabilities**.
2. Find and enable **Bot**.
3. Set the bot name, avatar, and description according to your company policy.
4. Save the changes and confirm that the bot capability is enabled.

> Image placeholder: Enable bot capability in the Feishu app.

## 3. Configure Permissions

NoxClaw needs the Feishu bot to receive messages, send replies, and identify message senders. In **Permission Management**, grant the following permission groups as prompted by Feishu Open Platform:

| Permission group | Purpose |
| --- | --- |
| Read basic user information | Identify message senders and map direct and group messages to the right channel conversation. |
| Receive direct messages | Receive messages sent directly to the bot. |
| Receive group messages | Receive group messages where the bot is mentioned. |
| Send messages | Allow NoxClaw to deliver replies back to Feishu. |
| Read basic group information | Identify the group source and group-message context. |

If your Feishu Open Platform supports importing permissions by JSON, import only the permissions related to message receiving, message sending, basic user information, and basic group information according to your internal approval policy. Do not grant unrelated calendar, task, or document-write permissions for the basic NoxClaw messaging flow unless your company explicitly needs those extended Feishu capabilities.

> Image placeholder: Permission management in Feishu Open Platform.

## 4. Get App Credentials

1. In the app details page, open **Credentials & Basic Info**.
2. Copy **App ID**.
3. Reveal and copy **App Secret**.
4. Do not paste App Key, Encrypt Key, or Verification Token into the NoxClaw Feishu configuration dialog.

> Image placeholder: Credentials & Basic Info in Feishu Open Platform.

## 5. Configure Feishu in NoxClaw

1. Open NoxClaw and go to **Channel Configuration**.
2. Find the **Feishu Bot** card and click **Configure**.
3. Confirm that the connection mode is **WebSocket persistent connection**.
4. Enter the **App ID** and **App Secret** copied from Feishu Open Platform.
5. Click **Register**.

After submission, NoxClaw validates the App ID / App Secret and syncs the Feishu bot configuration into the current seat's runtime. The channel shows **configuring** while the sync is in progress. After the sync succeeds, the channel becomes **connected**.

> Image placeholder: NoxClaw Feishu Bot configuration dialog.

## 6. Configure Feishu Event Subscription

Return to Feishu Open Platform and open **Events & Callbacks** in the app details page.

1. In **Subscription Method**, select **Use persistent connection to receive events**.
2. Click **Verify**. After verification succeeds, the page should show that the persistent connection is connected or verified.
3. In **Event Configuration**, add message receiving events so the bot can receive direct and group messages.
4. If Feishu Open Platform asks you to add bot-related callback capabilities, add them as prompted. For the basic NoxClaw messaging flow, the key setup is message receiving events plus persistent connection.

NoxClaw currently does not use the **send events to developer server** URL callback mode, so you do not need to copy or paste a webhook URL.

> Image placeholder: Select persistent connection in Feishu Events & Callbacks.

## 7. Publish the App

The Feishu app must be published before members can use the bot.

1. Click **Create Version** at the top of the app details page.
2. Enter a version number and release note, such as `1.0.0` and `Connect NoxClaw Feishu Bot`.
3. Submit the release. If admin approval is required, contact your enterprise administrator.
4. After the release is approved, search for the bot name in the Feishu client and confirm that the bot can be found.

> Image placeholder: Create and publish a Feishu app version.

## 8. Start Using the Bot

1. In the Feishu client, search for and open the bot you created.
2. Send a test direct message to the bot, or add the bot to a group chat and mention it.
3. Return to NoxClaw channel conversations and wait for the Feishu channel conversation to appear.
4. Reply in NoxClaw. For Feishu group messages, if NoxClaw can identify the sender, the in-product reply is delivered to that sender's direct message instead of being posted back to the group.

A successful bot binding only means that the channel account is ready. Before the first external message arrives, NoxClaw may show the channel as connected with no conversation yet. This is expected.

> Image placeholder: Search for the bot in Feishu and send a test message.

## 9. Rebind or Unbind

- If the Feishu channel enters an error state, click **Rebind**, enter the App ID and App Secret again, and submit. NoxClaw cleans up the failed lifecycle and syncs the new configuration in the same rebind flow.
- If the Feishu channel is already connected or configuring, unbind it before configuring it again.
- After unbinding, NoxClaw removes the binding between the current seat and the Feishu bot. New messages from that bot will no longer enter this seat's Feishu channel conversations.

## 10. FAQ

### 1. Do I need to enter Encrypt Key or Verification Token in NoxClaw?

No. The current NoxClaw Feishu dialog only requires App ID and App Secret, and it uses WebSocket persistent connection mode. Encrypt Key and Verification Token are common webhook-mode settings and are not configured in the current NoxClaw dialog.

### 2. What should I do if registration says the App ID or App Secret is invalid?

Go back to **Credentials & Basic Info** in Feishu Open Platform and copy App ID and App Secret again. Make sure you did not copy App Key, did not include extra spaces, and did not use an App Secret that has already been reset.

### 3. Why is the channel connected but no Feishu conversation appears in NoxClaw?

This is the normal initial state. After the Feishu configuration sync succeeds, the channel can become connected before any conversation exists. A channel conversation is created only after the bot receives a direct message or a group mention.

### 4. What should I check if the Feishu bot does not respond?

Check the following items in order:

1. The Feishu app has been published and approved.
2. Bot capability is enabled.
3. Permission management includes message receiving, message sending, and basic user information permissions.
4. Event subscription uses persistent connection, and message receiving events have been added.
5. The NoxClaw channel card shows connected.
6. In group chats, the bot is mentioned. Group messages usually need to mention the bot before they enter the processing flow.

### 5. What should I do if App Secret is leaked?

Reset the App Secret immediately in Feishu Open Platform, then rebind the Feishu bot in NoxClaw. Do not continue using the leaked old secret.
