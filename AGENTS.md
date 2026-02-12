# AGENTS.md

This file defines how coding agents should work in this repository.

## 1) Scope

- Repository type: documentation-first workspace (research, product docs, engineering docs).
- Primary objective: produce accurate, traceable, low-noise documentation changes.
- Out of scope by default: implementing business/product decisions inside AGENTS instructions.

## 2) Repository map

- `research/`: market / competitor / user research documents.
- `products/`: product-line docs (positioning, scenarios, PRDs).
- `engineering/`: engineering process and methodology docs.
- `_archive/`: historical materials (treat as read-only unless explicitly requested).

## 3) Startup protocol (before editing)

1. Identify target files and nearest directory `README.md`.
2. Read the nearest context docs before changing content.
3. Keep edits local to the requested scope; avoid opportunistic rewrites.
4. If facts are updated, include source links and explicit dates in the target doc.

## 4) Writing standards

- Match the language/style of the target file (Chinese or English).
- Use `YYYY-MM-DD` for dates.
- Put conclusions/status first, evidence/details after.
- Mark uncertain items explicitly (`待验证` / `占位`).
- Keep links repository-relative when linking internal docs.
- Preserve existing naming/numbering conventions in each directory.

## 5) Change boundaries

Do not do the following unless the user explicitly asks:

- Modify `_archive/` content.
- Bulk rename/move files or directories.
- Delete existing documents.
- Inject roadmap/strategy details into `AGENTS.md`.

## 6) Validation checklist

Before finishing, verify:

1. Changed files are directly related to the request.
2. Internal links and referenced file paths exist.
3. Dates/terms are consistent across touched docs.
4. If a key doc is newly added, update the relevant local `README.md` index.
5. Summary to user includes changed files + assumptions + remaining risks.

## 7) Practical commands (preferred)

- List markdown files: `rg --files -g '*.md'`
- Find instruction files: `rg --files | rg 'AGENTS\\.md$|AGENTS\\.override\\.md$'`
- Locate unresolved placeholders: `rg -n '待验证|占位|TODO|TBD'`
- Quick path existence check for links (manual spot-check): `rg -n '\\]\\([^)]*\\.md\\)'`

## 8) Nested instructions

- If this repository later needs subproject-specific behavior, add nested `AGENTS.md` in that subdirectory.
- The closest `AGENTS.md` to edited files should contain the most specific rules.

