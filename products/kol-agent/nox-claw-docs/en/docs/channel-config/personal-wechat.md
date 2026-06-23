---
doc_id: noxclaw_personal_wechat
title: Personal WeChat
description: Configure the Personal WeChat channel for NoxClaw by scanning a QR code to bind ClawBot, activate the conversation, and exchange messages.
locale: en
content_type: doc
nav_group: channel-config
order: 3
status: published
updated_at: 2026-06-23
keywords:
  - NoxClaw
  - Personal WeChat
  - WeChat ClawBot
  - channel configuration
  - QR code
---

# Personal WeChat

This guide explains how to connect Personal WeChat to NoxClaw. After the channel is connected, you can send messages to NoxClaw from WeChat. NoxClaw syncs those messages into the current seat's WeChat channel conversation and sends in-product replies back to the corresponding WeChat conversation.

The current NoxClaw Personal WeChat channel uses **QR-code binding**. You do not need App ID, App Secret, Token, Encoding-AESKey, or a callback URL. Generate a QR code in NoxClaw and scan it with the WeChat mobile app to complete the binding.

## Prerequisites

Before you start, make sure that:

- You can sign in to NoxClaw and have access to channel configuration.
- WeChat is installed and signed in on your phone.
- Your network can access both NoxClaw and WeChat services.
- You know which WeChat account should be bound. We recommend binding one WeChat account to one NoxClaw seat to avoid message ownership conflicts.

Personal WeChat binding relies on QR-code confirmation. Scan the QR code before it expires. If the QR code expires, refresh it in NoxClaw and scan the new one.

## 1. Open WeChat ClawBot Configuration

1. Open NoxClaw and go to **Channel Configuration**.
2. Find the **WeChat ClawBot Integration** card.
3. Click **Configure**.
4. NoxClaw opens the WeChat configuration dialog and starts generating a binding QR code.

> Image placeholder: WeChat ClawBot Integration card on the NoxClaw Channel Configuration page.

## 2. Scan the QR Code to Bind

After the QR code is generated, open WeChat on your phone and scan the QR code in the dialog.

1. Scan with the WeChat account you want to bind.
2. Confirm the sign-in or authorization prompt in WeChat.
3. Return to NoxClaw and wait for the channel status to sync.

After the scan succeeds, NoxClaw records the binding between the current seat and this WeChat account. The channel may first enter a **scanned, waiting for activation** state. This is expected.

> Image placeholder: QR code in the NoxClaw WeChat configuration dialog.

## 3. Send the First Message to Activate the Conversation

After scanning, NoxClaw still needs the real WeChat conversation to become ready. Send any test message from WeChat to the bound NoxClaw entry, for example:

```text
Hello
```

After the first message arrives, NoxClaw automatically activates the WeChat channel conversation and shows it on the channel conversations page. You can then view WeChat messages and reply from NoxClaw.

If the page remains in **scanned, waiting for activation**, it usually means that NoxClaw has not received the first WeChat message yet. Send one message from WeChat to trigger conversation creation.

> Image placeholder: Send the first test message in WeChat and create the channel conversation in NoxClaw.

## 4. QR Code Expiration and Refresh

The WeChat binding QR code has an expiration time. After it expires, the NoxClaw dialog shows that the QR code has expired.

If the QR code expires or scanning fails:

1. Click **Refresh** in the dialog.
2. Wait for NoxClaw to generate a new QR code.
3. Scan the new QR code with WeChat.

Do not reuse an old QR code. Once a QR code expires, it can no longer complete the binding.

> Image placeholder: Refresh entry after the QR code expires.

## 5. Start Using Personal WeChat

After the binding is complete and the conversation is activated, you can exchange messages between WeChat and NoxClaw:

1. Send a message from WeChat to the bound NoxClaw entry.
2. Return to NoxClaw channel conversations and open the WeChat channel conversation.
3. Reply in NoxClaw.
4. NoxClaw delivers the reply back to the corresponding WeChat conversation.

A successful Personal WeChat binding only means that the WeChat account has been bound to the current seat. Before the first external message arrives, NoxClaw may show a scanned or connected channel with no conversation yet. This is expected.

## 6. Rebind or Unbind

- If you need to switch WeChat accounts, click **Unbind** first, then scan again with the new WeChat account.
- If the QR code expires before the binding is completed, refresh the QR code directly. You do not need to unbind first.
- If the WeChat channel enters an error state, click **Rebind** and scan again. NoxClaw updates the WeChat binding for the current seat during the rebind flow.
- After unbinding, NoxClaw removes the binding between the current seat and that WeChat account. New messages from that account will no longer enter this seat's WeChat channel conversations.

## 7. FAQ

### 1. Do I need App ID, App Secret, or a callback URL?

No. The current NoxClaw Personal WeChat channel uses QR-code binding. It does not require developer credentials, URL, Token, or Encoding-AESKey.

### 2. What should I do if the QR code expires?

Click **Refresh** in the configuration dialog, generate a new QR code, and scan again. QR codes expire and cannot be reused after expiration.

### 3. Why does the page still say waiting for activation after scanning?

A successful scan only confirms the WeChat account binding. NoxClaw still needs to receive the first WeChat message before it can create the real channel conversation. Send any test message from WeChat and wait for NoxClaw to activate the conversation automatically.

### 4. What should I check if WeChat messages do not get a response?

Check the following items in order:

1. The NoxClaw channel card is still bound, scanned, or connected.
2. You are sending messages from the same WeChat account that scanned the QR code.
3. The QR code did not expire before the binding flow completed.
4. You have sent the first message to activate the conversation.
5. If the issue persists, unbind and scan again.

### 5. Can multiple WeChat accounts bind to the same NoxClaw seat?

We recommend using one WeChat account for one NoxClaw seat. If you need to switch accounts, unbind the current account first, then scan with the new account.
