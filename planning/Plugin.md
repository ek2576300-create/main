## Plugin.md

ViewerApp API as a TutorBackend **plugin** under `/viewer/*` (RU/YC first), not edits to TutorApp routes.

### Product pillars (must not get lost)
1. **SEO prerender** — main reason for the plugin page API; crawlers and first paint get one composed response
2. **Payments from main backend** — portal UI only; Moneta, `purchaseBegin`, `mntnotify`, ownership stay in TutorBackend core
3. **SMS verification from main backend** — portal uses existing `/auth/sendCode` + `/auth/verifyCode`; plugin does not reimplement SMS

### Why plugin
- keep `/videos`, `/courses`, `/info` stable for TutorApp
- viewer DTOs + SEO aggregates without studio-shaped responses
- ship RU portal without forcing the same surface into international builds
- works with upcoming server modularization; does not wait on full context cache

### Plan
1. Skeleton plugin: mount + one hello endpoint
2. Andrew implements ViewerApp functionality inside it
3. Minimal core hooks (CORS, mount, guest-checkout helpers if needed)
4. Wire ViewerApp to existing `/auth/*` and payments; add `/viewer/*` for prerender and portal-specific checkout/claim
5. Until core cache exists: short in-process TTL (30–120s) in the plugin

### Runtime

```
ViewerApp (askhow.ru)
  SEO prerender / hydration
  pay UI + SMS UI
        |
        |  POST /viewer/prerender/page  …
        |  POST /viewer/checkout/begin, /viewer/claim
        |  POST /auth/*          (SMS, session — existing)
        |  POST /payments/*      (or via plugin wrapper — existing core)
        |
TutorBackend PLUGIN (/viewer)
  page composer + viewer DTOs + SEO meta
  checkout/claim orchestration
        |
TutorBackend CORE
  auth + SMS-Target, Moneta, reviews, dbman, S3, email
```

**Owns**
- Plugin: `/viewer/*`, prerender composition, SEO meta, viewer DTOs, guest checkout/claim HTTP
- Core: tokens, SMS, users, purchase/notify, ownership, visibility, signed URLs, mail
- ViewerApp: UI, storefront layout tool; calls core auth/pay + plugin prerender

### SEO prerender (technology intent)
- Goal: searchable portal — bots and social previews get real `title` / `description` / `ogImage` / canonical without waiting on a thin SPA shell alone
- Backend delivers **one composed JSON** per page via `POST /viewer/prerender/page` (and sitemap/resolveSlug)
- ViewerApp (or a small Node layer on Reg.ru) turns that payload into HTML for crawlers / first paint; same payload hydrates the React app
- Exact HTML host (SPA + bot path vs Node prerender on VPS) is an open deploy choice — the **API contract** is the plugin responsibility

### Skeleton should provide
- `register("/viewer", …)` (or equivalent)
- sample `POST /viewer/hello`
- access to `tuserv` / `dbman` / auth like other endpoints
- enable on yc-dev/yc-test first
- place for OpenAPI (`askhow-viewer.yaml`)
- call managers/db directly — no HTTP loopback to TutorApp routes

### Target endpoints

**Priority — SEO**
- `POST /viewer/prerender/page` — home|catalog|course|video|article  
  `{ pageType, meta, canonical, payload }`

**Support — portal data**
- `/viewer/catalog`, `/viewer/search`, `/viewer/resolveSlug`, `/viewer/sitemap`
- `/viewer/catalogContent` — flat cards for frontend layout tool

**Support — pay (portal-facing; core underneath)**
- `/viewer/checkout/begin`, `/viewer/claim` for guest/ad-landing path
- logged-in pay may call existing `/payments/purchaseBegin` directly if CORS/OpenAPI allow; plugin wrapper optional for consistent DTOs

**Reuse as-is (not plugin duplicates)**
- `/auth/update`, login/register/logout, …
- `/auth/sendCode`, `/auth/verifyCode` — **SMS**
- `/payments/mntnotify` (server-to-Moneta; not from browser)

**Out of slice**
- infinite feed, author pages, moderation drafts, layout persistence

### Prerender payload rules
- listings: thumbs + text; no `videoSrc` on every card
- video page (or sample lesson): signed URL + entitlement
- author = snippet on card, not an author section in v1
- meta: title, description, ogImage, canonical

### Core changes needed
- mount + CORS for portal (auth, payments, and `/viewer`)
- guest ensure-or-create + claim mail if guest checkout stays in scope (UserModel.md)
- confirm SMS credentials/limits OK for portal traffic volume

### Work order after skeleton
1. Mount + CORS + OpenAPI stub (include auth SMS + payments in Viewer contract)
2. `prerender/page` for home/catalog/course/video
3. resolveSlug, sitemap, search
4. Wire SMS UI to existing auth endpoints; verify E2E
5. Wire pay UI to core payments (+ guest begin/claim if needed)
6. articles / catalogContent when ready

### Open questions
- Where HTML for bots is produced (Reg.ru Node vs edge vs SPA special-case)
- folder/module convention after server refactor
- plugin toggle per build target
- SMS required before pay on portal or only for selected flows?
