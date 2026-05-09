---
doc_id: developer_api_quick_start
title: Developer API Quick Start
description: Legacy Developer API draft; current online Rest API docs are hosted in Theneo.
locale: en
content_type: doc
nav_group: getting-started
order: 4
status: deprecated
updated_at: 2026-05-08
keywords:
  - developer api
  - quick start
  - curl
  - noxinfluencer api
source_of_truth:
  - ../../../../../06_对外API免费试用方案.md
---

# Developer API Quick Start (legacy draft)

> This page is a 2026-04 Developer API draft. It no longer represents the current online Rest API free-trial or self-service purchase plan.

Use the current online structure instead:

- China landing page: `https://cn.noxinfluencer.com/api-service`
- Overseas landing page: `https://www.noxinfluencer.com/api-service`
- China Theneo docs: `https://app.theneo.io/noxdeveloper/cn-api/nox-api`
- Overseas Theneo docs: `https://app.theneo.io/noxdeveloper/kr-api/noxinfluencer-api-guide`
- China API Runner: `https://app.theneo.io/api-runner/noxdeveloper/cn-api`

## Current valid position

- Rest API is a new product and commercial line, not a wrapper around the old Skill API.
- Rest API uses independent `Credit`, separated from Skill uses / Skill credit.
- Free trial and self-service purchase only include basic interfaces:
  - creator profile
  - video detail
  - email contact lookup
  - free helper ID API
- Search, video search, comments, NaverBlog, Hashtag monitoring, Brand monitor and similar endpoints remain large-volume / custom-interface APIs. They are not part of free trial or self-service purchase.
- Quick Start should be maintained in Theneo docs and API Runner, not on this page as the primary online document.

## Superseded assumptions

- Do not assume `API key = Skill key`.
- Do not assume `API quota = Skill quota`.
- Do not include search, brand monitor, or write operations in the Rest API free-trial Quick Start.
- Do not replace `/api-service` with `/developer-api` as the default new entry.

## Follow-up

If the site docs need to become public again, rewrite this page from `06_对外API免费试用方案.md` and keep it aligned with Theneo.
