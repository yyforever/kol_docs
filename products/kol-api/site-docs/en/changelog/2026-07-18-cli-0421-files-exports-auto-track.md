---
doc_id: changelog_2026_07_18_cli_0421_files_exports_auto_track
title: 2026-07-18 - CLI 0.4.21 exports, auto-track, and file workflows
description: Align public documentation with creator exports, future-content auto-track, spreadsheet workflows, and authorized files in CLI 0.4.21.
locale: en
content_type: changelog
nav_group: changelog
order: 13
status: published
updated_at: 2026-07-18
keywords:
  - cli 0.4.21
  - creator export
  - auto-track
  - spreadsheet import
  - file download
source_of_truth:
  - "repo:kol_claw path:cli/package.json"
  - "repo:kol_claw path:cli/README.md"
  - "repo:kol_claw path:cli/src/commands/creator.ts"
  - "repo:kol_claw path:cli/src/commands/monitor.ts"
  - "repo:kol_claw path:cli/src/commands/file.ts"
  - "https://github.com/NoxInfluencer/skills/blob/main/skills/noxinfluencer/SKILL.md"
---

# 2026-07-18 - CLI 0.4.21 exports, auto-track, and file workflows

This update aligns the public website and Skill guidance with the current CLI `0.4.21` command surface.

## What changed

- Creator discovery now documents selected search and lookalike exports, deep-export quota preview, contact-field quota, and shared async download steps
- Performance monitoring now distinguishes known published-video tasks from auto-track rules for newly published creator content
- Monitoring docs now cover SaaS templates, spreadsheet limits, failed-row reports, task history, and direct project/dashboard/task Excel reports
- Collection, CRM, email-recipient, and affiliation member workflows now document their current template and spreadsheet-import paths
- Email, message, message-template, and feedback pages now cover authorized attachment downloads
- Product, campaign, email, and message pages now distinguish public image URLs from private attachments
- Short-link and affiliation pages now cover direct Excel report downloads
- CLI diagnostics now use `0.4.21`, include the `file` command group, and check important nested file/export/import commands

## Export routing reminder

Creator, collection, CRM, and brand-monitor exports use shared async `export` tasks. Monitor, short-link, affiliation, and import-report Excel files download directly to `--output` and should not be polled through the shared export list.
