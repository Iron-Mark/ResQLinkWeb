# Research Analyst Memory — ResQLink Workspace

## Project Structure Summary
- **ResQLink-App** (Flutter): Current branch `improvement/tablesdb`, ahead of `dev` by ~20+ commits
- **ResQLink-Server** (TypeScript/Fastify): Branch `master`, 6 major feature commits
- **ResQLink-Web** (React/Vite): Branch `main`, 10 commits total — still early-stage

## Key Findings (2026-03-23)
- Emergency chat fix plan (`piped-jingling-spindle.md`) is FULLY IMPLEMENTED (all 7 fixes verified in code)
- L10n Wave 3: `private_chat_page.dart` and `app_preferences_screen.dart` both already use `context.l10n` — likely complete
- L10n Batches 1-6 plus debug widgets: all complete
- LGU Phase 2 roadmap (4 modules): all marked complete
- Core feature remaining execution plan: nearly all items checked off
- Codebase audit: all 12 areas marked complete

## Open Work Items (from specs/execution plans)
- Manual QA (SOS, linking, ML, BLE drills) — all unchecked, require physical devices
- CI pipeline setup for automated test regression guard — not done
- BLE hardware validation (permission prompts, RF soak, multi-role drill) — not done
- Deferred mesh QoS expansion (mid-tier cross-layer change) — deliberately deferred
- Web dashboard: landing page + demo mode done, but no actual admin dashboard pages

## TODOs in Codebase
- Only 7 TODO/FIXME/HACK occurrences in Flutter lib/ — mostly in docs/guides, not production code
- 0 in Server src/, 0 in Web src/
