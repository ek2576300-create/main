## UserModel.md

Users and authentication for AskHow, and what ViewerApp needs on top.
This area is easy to break and hard to test — guest checkout must fit the existing model, not invent a parallel one.

### Non-negotiables for ViewerApp
- **SEO prerender** — portal pages must be indexable; first paint from composed backend payload (see Plugin.md)
- **Payments from main backend** — Moneta / purchase / ownership stay on TutorBackend; ViewerApp is only the client UI
- **SMS verification from main backend** — reuse existing phone send/verify; do not build a second SMS stack on the portal

### Existing AskHow lifecycle

**Identifiers**
- `devID` — device GUID; not a login
- `userID` — account key in JWT `sub`; payments, ownership (reviews), favorites use this
- `viewerID` — real user when email/xid present; else `usr-nobody` for anonymous
- email / Telegram `xid` — registration identities
- phone — verified via SMS (Identifier + SMS-Target in TutorBackend)

**Tokens**
- short `sessionToken` (JWT, not revocable mid-life)
- long `refreshToken` (checked in DB on refresh)
- headers: `x-askhow-auth`, `x-askhow-devid`, `x-askhow-version`
- first call is usually `POST /auth/update` → anonymous session

**Flags**
- `registered` — has email or xid
- `authenticated` — logged in (weak after refresh)
- `strong` — fresh login
- `phoneVerified` — used in core for some publish/public rules; portal must respect the same auth state

**States (short)**
1. Anonymous device session
2. Register (email, password optional) → verify code
3. Login (password / email-code / Telegram)
4. Phone SMS verify via `/auth/sendCode` + `/auth/verifyCode` (existing)
5. Refresh, logout, password/email change as today

**Important today**
- Passwordless email accounts already exist (login via email code)
- SMS already implemented in core (`sms.nlg` / Identifier) — ViewerApp wires UI to existing auth APIs
- Login/register can migrate identity from an anonymous `userID` to the registered one
- `POST /payments/purchaseBegin` requires `authenticated` — anonymous cannot buy
- Course ownership = `review` for `(userID, courseID)`

### Needs for ViewerApp

**Goals**
- Public catalog/course/video/article pages SEO-ready via prerender
- Pay on the portal using **the same** TutorBackend payment pipeline (Moneta notify → review ownership)
- SMS verification available on the portal where product requires phone confirm (login/register/sensitive steps) — same backend as TutorApp
- Ad landing: email + pay with low friction; magic link / claim after pay where guest checkout is used
- Later: same `userID` can set a password and use full AskHow

**Portal sessions**
1. Always start with `/auth/update` (anonymous)
2. Public prerender works anonymously (visibility rules still apply)
3. Pay and entitled lessons need an authenticated buyer `userID`
4. Guest checkout still creates/reuses a real `userID` — only the TutorApp register UI is skipped
5. SMS: call existing `/auth/sendCode` and `/auth/verifyCode` from ViewerApp (CORS + OpenAPI), not a plugin reimplementation

**Payments (core → new frontend)**
- ViewerApp initiates pay through plugin wrapper and/or existing `/payments/*` after auth
- Moneta form fields come from backend; `mntnotify` stays on TutorBackend gateway
- Success return URLs point at ViewerApp pages
- Ownership is always core `review` records — portal never invents a second entitlement store

**Guest checkout (core + plugin)** — when buying without full register UI
- ensure-or-create user by email (reuse if exists; else lightweight passwordless user)
- existing purchase pipeline for that buyer
- claim token after successful `mntnotify` + email with ViewerApp link
- `POST /viewer/claim` → session + course payload
- rate-limit; do not leak email existence
- clarify with product whether SMS is required before guest pay or only for full account flows

**Flows**
- Browse/SEO: anon auth → `/viewer/prerender/page` (HTML/meta for crawlers + JSON for app)
- SMS verify: ViewerApp UI → `POST /auth/sendCode` / `POST /auth/verifyCode`
- Logged-in pay: current session → purchaseBegin (plugin or `/payments/purchaseBegin`) → Moneta → ownership
- Guest pay: email CTA → `/viewer/checkout/begin` → Moneta → notify → email claim → `/viewer/claim`
- TutorApp login/register/SMS paths unchanged

### Open questions
- Is SMS mandatory before guest checkout, or only for register / author-related rules?
- Reuse passwordless register vs new ensure-or-create helper?
- Elevate device session at checkout, or only on claim?
- Migrate anon favorites/progress into email account on claim?
- Claim token storage, TTL, single-use?
- Already owns course — idempotent success + claim anyway?
