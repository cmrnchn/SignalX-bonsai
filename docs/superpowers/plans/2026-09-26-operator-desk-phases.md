# Operator desk — phased plan

**Date:** 2026-09-26  
**Status:** Locked sequence (implementation plans per phase still TBD)  
**Contract:** `docs/superpowers/specs/2026-09-26-operator-desk-foundation-design.md`  
**For agents:** Do not start a phase until its dedicated implementation plan exists (or this file’s phase section is expanded to task level). Ship as separate commits/PRs.

## Principles for sequencing

1. Lock authority and copy first where behavior already exists — document invariants before moving chrome.
2. Regroup navigation before inventing new data models.
3. Dashboard and Rules depend on clear Activity signals; Menu move is mostly IA.
4. Keep messenger backlog items in `docs/CURSOR_TASKS.md` (shortcuts, inbound attachments, audit unification, backup encryption) — this plan does not replace them; phase notes say when they dovetail.

---

## Phase A — Authority & Pay (docs + Settings surface)

**Why first:** Makes the canvas law visible in-app without risky IA moves.

**Ship:**
- Settings → **Pay** tab: Cash App, Venmo, Cash fields; Monero labeled “Later — lessons on” (not a live rail).
- Invoice / order copy fills Pay-to from these fields (reuse existing invoice formatting; wire missing rails).
- Product copy: mark paid always prompts for rail; never offered as an automation action in AI chips or future rules UI.
- Short operator hints on Sending: draft unless armed; arming is per person.

**Non-goals:** Monero addresses as settlement; consolidating IVR + auto-reply allowlists into one “Armed” model.

**Depends on:** Nothing. Touches Settings UI + invoice formatter / order send paths.

**Done when:** Operator can set Pay rails; a new invoice includes them; mark paid still requires a human rail choice.

---

## Phase B — Shop shell (Catalog · Orders · Sales tabs)

**Why:** Matches the desk without changing commerce logic.

**Ship:**
- Single **Shop** rail item with internal tabs (Catalog / Orders / Sales).
- Deep links and shortcuts (`Cmd+3…`) land on Shop with the right tab.
- Remove Catalog / Orders / Sales as separate top-level rail items (keep route ids if needed for migration).

**Non-goals:** Redesigning list/detail layouts inside each tab.

**Depends on:** None strictly; pairs cleanly with A.

**Done when:** One Shop destination; existing screens render unchanged under tabs; shortcuts/help updated.

---

## Phase C — Intelligence shell (Menu · Activity first)

**Why:** Moves buyer menu out of Settings and gives Activity a home before Rules/Insights invent new backends.

**Ship:**
- **Intelligence** rail with tabs. v1 tabs: **Menu** (move IVR composer from Settings → Buyer menu) and **Activity** (surface existing IVR + commerce + outbox + auto-reply audit streams — dovetails `docs/CURSOR_TASKS.md` Task 3).
- Settings loses the Buyer menu tab (link/redirect to Intelligence → Menu).
- Placeholder tabs **Rules** and **Insights** may exist as “Coming next” only if empty states are honest — prefer omitting until Phase D/E.

**Non-goals:** New rule engine; new insight ML.

**Depends on:** Soft dependency on Task 3 (unified audit) — either land Activity as the unified panel here, or implement Task 3 then point Intelligence → Activity at it.

**Done when:** Menu edited only under Intelligence; Activity shows a single operator-readable stream; Settings backup/account/sending still work.

---

## Phase D — Dashboard (Today’s plan)

**Why:** Needs Activity + “needs human” signals to be trustworthy.

**Ship:**
- **Dashboard** as default (or first) rail destination.
- **Prepare** queue: unpaid invoices needing mark paid; price/stock tasks the operator must do (start with order-derived unpaid + low-stock or explicit “needs price” flags — no ML required).
- **Already handled:** recent menu/rule/auto-reply sends from Activity (last N).

**Non-goals:** Ticket SLA, multi-assignee queues, Gorgias-style views.

**Depends on:** Phase C Activity (or equivalent audit feed).

**Done when:** Opening the app shows Prepare + Already handled with real data; each Prepare row jumps to the right surface (thread rail / Catalog).

---

## Phase E — Rules (“Next time” → runnable)

**Why:** Canvas’s hold-cones rule and in-thread Next time card.

**Ship:**
- Rule model: trigger (keyword / menu step / insight handoff), template body, fill-ins from Pay + order fields, **may send** flag, hard denials (no mark paid / no price change / no arm).
- Thread **Next time** card: create/edit a rule draft from the conversation; operator sets it to run.
- Arming gate: send only if person is armed for that reply class (reuse allowlist semantics or introduce explicit per-thread arm — decide in the phase’s implementation plan).

**Non-goals:** Full workflow builder; scheduled campaigns (see NEXT_STEPS stretch).

**Depends on:** Phase A Pay fields; Phase C Menu location; arming semantics decision.

**Done when:** One demo rule (e.g. hold + Saturday + Pay-to) can send when armed and cannot mark paid.

---

## Phase F — People directory polish + Insights

**Why:** Canvas treats People/Groups as one directory; Insights attach actions.

**Ship:**
- Primary People surface with People / Groups / tag / Needs attention chips (align with `docs/SIGNALX_IA_NOTES.md` list-first fixes where still open).
- **Insights** tab: curated or heuristic lines (reorder cadence, open balance) with action buttons that open thread rail / Shop — not a second CRM.
- Monero lesson as Menu step only (content under Intelligence → Menu); “Offer Monero lesson” on thread rail queues/sends the lesson copy, does not mark paid.

**Depends on:** Phase C; soft on Phase E for “armed for hold reply only” copy.

**Done when:** Groups are rows in People; at least two insight→action paths work end-to-end; Monero lesson is requestable without becoming a Sales rail.

---

## Parallel track (do not block on desk phases)

From `docs/CURSOR_TASKS.md` / `docs/NEXT_STEPS.md`:

| Item | Relation to desk |
|------|------------------|
| Keyboard shortcuts | Update bindings when Shop / Intelligence / Dashboard land (Phases B–D) |
| Inbound attachments | Independent messenger completeness |
| Unified Audit | Prefer landing as Intelligence → Activity (Phase C) |
| Backup encryption | Independent; Backup tab stays under Settings |

---

## Still rejected (reaffirmed)

- Concurrent sessions / two live receive loops
- Shared catalog across numbers
- Native Signal bot buttons as primary IVR
- Auto-send from AI chips
- Mark paid from any automation
- Payment processor unless explicitly reopened

---

## Next writing step

Expand **one** phase at a time into a task-level implementation plan under `docs/superpowers/plans/` (file citations, acceptance, non-goals) before coding that phase. Recommended start: **Phase A** (smallest, locks money language) or **Phase B** (pure IA, high visual match to the canvas).
