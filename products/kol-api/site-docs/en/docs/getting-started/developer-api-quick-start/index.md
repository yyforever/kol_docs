---
doc_id: developer_api_quick_start
title: Developer API Quick Start
description: Run the first low-side-effect HTTP API calls against the NoxInfluencer /api/v1 BFF with a Skill API key.
locale: en
content_type: doc
nav_group: getting-started
order: 4
status: published
updated_at: 2026-04-30
keywords:
  - developer api
  - quick start
  - curl
  - noxinfluencer api
source_of_truth:
  - ../../../../../06_对外API免费试用方案.md
  - "repo:kol_claw path:docs/developer-api-quick-start.md"
  - "repo:kol_claw path:server/tests/external/test_public_api_quick_start_real.py"
---

# Developer API Quick Start

Use this page when you want direct HTTP API calls with `curl` or your own backend client.

If you want to install the NoxInfluencer Skill for an agent environment first, start with [Quick Start](../quick-start/index.md) instead.

## What you need

- A NoxInfluencer brand account
- A valid Skill API key from the Skills dashboard
- A test creator id and brand monitor id, or permission to derive them from the search and brand monitor list calls below

Set these variables in your shell:

```bash
export BASE_URL="https://skill.noxinfluencer.com"
export NOX_API_KEY="<YOUR_SKILL_API_KEY>"
export CREATOR_ID="<CREATOR_ID_FROM_SEARCH_RESPONSE>"
export BRAND_ID="<BRAND_MONITOR_ID_FROM_LIST_RESPONSE>"
```

`BASE_URL` is the Python API origin used by the Skill CLI and backend HTTP clients. Use `https://www.noxinfluencer.com` for the SaaS website, sign-up, and dashboard pages.

All requests use the same auth header:

```bash
-H "Authorization: Bearer ${NOX_API_KEY}"
```

## 1. Check quota

This call is read-only and does not consume credits.

```bash
curl -X GET "${BASE_URL}/api/v1/quota" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 2. Search creators

Use the current public search body shape. Do not use older examples that send `category` or a nested `followers` object.

```bash
curl -X POST "${BASE_URL}/api/v1/creators/search" \
  -H "Authorization: Bearer ${NOX_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "youtube",
    "keywords": ["beauty", "skincare"],
    "country": ["US"],
    "follower_min": 50000,
    "follower_max": 200000,
    "page_size": 2,
    "page_num": 1
  }'
```

Save a creator id from the response as `CREATOR_ID`.

## 3. Get a creator profile

```bash
curl -X GET "${BASE_URL}/api/v1/creators/${CREATOR_ID}/profile" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 4. Get creator contacts

Contact access may require an enabled account scope or plan entitlement.

```bash
curl -X GET "${BASE_URL}/api/v1/creators/${CREATOR_ID}/contacts" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## 5. List and inspect brand monitors

List brand monitors first:

```bash
curl -X GET "${BASE_URL}/api/v1/brand-monitors?page_num=1&page_size=10" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

Save one monitor id from the response as `BRAND_ID`, then fetch it:

```bash
curl -X GET "${BASE_URL}/api/v1/brand-monitors/${BRAND_ID}" \
  -H "Authorization: Bearer ${NOX_API_KEY}"
```

## Credit usage

The default Quick Start cost model is:

| Call | Default cost |
| --- | ---: |
| `GET /api/v1/quota` | 0 credits |
| `POST /api/v1/creators/search` | 1 credit |
| `GET /api/v1/creators/{creator_id}/profile` | 1 credit |
| `GET /api/v1/creators/{creator_id}/contacts` | 1 credit |
| `GET /api/v1/brand-monitors` | 1 credit |
| `GET /api/v1/brand-monitors/{brand_id}` | 1 credit |

Account pricing and package configuration can override the default cost.

## Current response shape

The current BFF response envelope includes the business data plus usage metadata such as credits and request meta. Treat endpoint-specific pagination and detailed data fields as endpoint contracts, not as one global schema.

## Known limitations

- Quota is currently exposed as a Skill credit snapshot, not a final service-level quota model.
- The error envelope is still the current BFF shape, including fields such as `error_code` and `summary`.
- Pagination fields are not fully identical across every endpoint.
- Rate-limit headers are not yet a stable public contract.
- Contacts and brand monitor calls may require account entitlement or fixture data.
