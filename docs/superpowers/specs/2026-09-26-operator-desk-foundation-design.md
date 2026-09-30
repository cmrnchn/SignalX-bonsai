# Operator desk foundation

**Date:** 2026-09-26  
**Status:** Locked product contract (source of truth for IA + authority)  
**Origin:** Cursor canvases `signalx-desk` and `gorgias-vs-signalx` (interactive previews beside chat)  
**Related:** `docs/NEXT_STEPS.md`, `docs/HANDOFF.md`, `docs/superpowers/plans/2026-09-26-operator-desk-phases.md`

## Goal

SignalX is the shop, and Signal is how buyers reach it. The operator opens one local desk: today’s plan, one thread that holds the invoice and the buttons, people and groups in one directory, shop tabs for catalog/orders/sales, and an Intelligence surface for menu + rules + activity. Money never moves inside the app — the operator marks paid.

This doc locks the product model. Implementation is sequenced in the phases plan. Existing commerce/messenger code stays; the desk is a regroup + authority model, not a rewrite.

## Locked defaults

### Authority

1. **The thread holds the invoice and the buttons.** Send invoice, mark paid, offer Monero lesson, larger quote — these travel with the conversation (thread rail / in-thread chips), not a separate ticket system.
2. **A rule may send a filled invoice.** Rules may compose and, when the person is armed, send. They fill Pay-to lines from Settings → Pay.
3. **Only the operator marks paid.** Mark paid is never on a rule, never on the menu, never on the local model. Mark paid always asks which rail the operator saw (Cash / Cash App / Venmo; Monero later).
4. **Arming is per person, not a global send switch.** A reply stays a draft unless that person is armed for the relevant reply. Menu IVR allowlist and auto-reply allowlist remain separate concerns until a later phase consolidates “armed” language in the UI.
5. **Monero starts as a lesson, not a pay rail.** Buyers who ask (menu option) get a short lesson (what it is, official wallet, read address + amount on the invoice, send, share tx id). The operator still marks the order paid. Sales does not treat Monero as a rail until an explicit later decision.

### Information architecture

Rail destinations (top → bottom, Settings pinned):

| Rail | Role |
|------|------|
| **Dashboard** | Today’s plan: Prepare vs Already handled |
| **Messages** | Threads + chat + profile rail |
| **People** | People and groups, one directory, shared filters |
| **Shop** | Tabs: Catalog · Orders · Sales (today’s separate Catalog / Orders / Sales nav items) |
| **Intelligence** | Tabs: Insights · Rules · Menu · Activity |
| **Settings** | Tabs: Account · Pay · Sending · Backup |

Outbox and Audit are **not** first-class rail items in the desk model. Outbox stays reachable from thread/People failure paths and Settings/Sending diagnostics; Audit folds into Intelligence → Activity (see phases).

### Dashboard — Today’s plan

- Ready when the app opens.
- **Prepare** — only what a rule (or menu) was not allowed to finish: e.g. unpaid invoice → Mark paid; buyers say price is high → Set price.
- **Already handled** — short log of what the menu or a rule already sent (invoice text, who, outcome). Not a second inbox.

### Messages

- One Signal thread is the conversation (not a ticket).
- Profile preview on the thread; full profile opens in People.
- **Next time** card on the thread: a saved answer that may send later — draft until the operator sets it to run (maps to a rule, not a one-off macro forever).
- Rail actions stay allowlisted commerce actions; they never auto-send from AI chips (existing non-goal).

### People

- Chips/filters cover People, Groups, consumer-style tags, Needs attention — one list, not separate Contacts vs Groups destinations as the primary path.
- Profile shows open order standing, tags, and whether they are armed for a specific reply.
- Insight lines (e.g. ordering every 5 days) carry their action (Larger quote) with them.

### Shop

- **Catalog** is products and stock. The buyer menu may point at catalog steps; the menu tree is edited in Intelligence, not in Catalog.
- **Orders** is lifecycle. Mark paid prompts for rail; never automated.
- **Sales** is totals over marked-paid orders, broken down by rail. Monero omitted from rail breakdown until it is a rail.

### Intelligence

- **Menu** — the buyer path (`1` browse, `2` order, `4` check, `5` Monero lesson if offered). Today’s IVR composer moves here from Settings.
- **Rules** — what automation may do (confirm count, name Saturday, fill Pay-to, may send). Explicit denials: may not mark paid, change a price, or arm someone.
- **Insights** — operator-facing observations with attached actions.
- **Activity** — what already ran (menu/rule/outbox/auto-reply), replacing a standalone Audit panel as the primary surface.

### Settings

| Tab | Holds |
|-----|--------|
| Account | One live number; link this Mac; PIN-gated switch |
| Pay | Cash App / Venmo / Cash (and later Monero) filled into every invoice. App does not hold money. |
| Sending | Draft-unless-armed explanation; diagnostics for outbox / auto-reply |
| Backup | Export/import shop + threads + rules. Menu editing is not here. |

## Action map (insight → action → opens)

| Insight / trigger | Action | Opens |
|-------------------|--------|-------|
| Invoice unpaid | Mark paid (operator chooses rail) | Thread rail |
| Hold request | Send the filled invoice | Rule, if armed |
| Orders every N days | Larger quote | Thread rail |
| Price called high | Set the price | Catalog |
| Usual day for product | Stage stock | Catalog |
| Asks about Monero | Send the lesson | Menu, if they pick that step |

The button travels with the sentence. Mark paid is never on a rule.

## Non-goals (this contract)

- Concurrent live sessions / two receive loops
- Shared catalog across numbers
- Native Signal bot buttons as primary IVR
- Auto-send from AI suggestion chips
- Payment processor / in-app capture of funds
- Treating Monero as a settlement rail in v1 of this desk
- Rewriting the Rust commerce model from scratch

## Gap vs current build (read-only)

Current rail is roughly: Messages, People, Catalog, Orders, Sales, Outbox, Audit, Settings — with IVR under Settings → Buyer menu. The desk regroups Catalog/Orders/Sales → Shop; IVR/Audit → Intelligence; adds Dashboard; adds Pay + Rules as first-class concepts; keeps authority invariants that are already partly true (AI never auto-sends; mark paid is operator-driven) and makes them product law.

## Canvas references

- Product walkthrough: Cursor canvas `signalx-desk`
- Positioning vs Gorgias: Cursor canvas `gorgias-vs-signalx`

Canvases stay as interactive previews. This file is the durable contract; if canvas and contract disagree, **this file wins** until explicitly revised.
