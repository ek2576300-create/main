## Deployment.md

YC resources for the Viewer plugin path, plus portal hosting.
Frontend: Reg.ru VPS. API / media / DB: existing AskHow on Yandex Cloud.

**Must work end-to-end from the new frontend**
- SEO prerender path (plugin page API → HTML/meta for crawlers)
- Payments against main TutorBackend (Moneta notify stays on YC gateway)
- SMS verification against main TutorBackend (`/auth/sendCode`, `/auth/verifyCode`, SMS-Target creds on TutorBE VM)

### DNS

**Existing**
- `app.askhow.ru` — TutorApp
- `admin317.ask-how.ru` — TutorAdmin
- API gateways (YC):
  - prod `https://d5dd0hikej8mrq4lvtq7.apigw.yandexcloud.net`
  - test `https://d5d6o1ckhd8obukdftt7.apigw.yandexcloud.net`
  - dev `https://d5dhrgakpe39e11lqefr.apigw.yandexcloud.net`

**Needed**
- portal prod: `askhow.ru` (www policy TBD)
- portal staging hostname TBD
- claim links on portal origin, e.g. `https://askhow.ru/claim?…`
- Moneta return URLs → ViewerApp pages; notify stays on TutorBackend `/payments/mntnotify`

**CORS**
- allow portal prod/staging + local Vite
- headers: `x-askhow-auth`, `x-askhow-devid`, `x-askhow-version`, `Content-Type`
- methods: `POST`, `OPTIONS` (stack is POST-centric)
- must not break TutorApp

### Object storage (S3)

**Existing (keep for TutorApp media)**
- `tutorplatform-ru` — videos, thumbs, images, content, attachments
- plugin still reads course/video media from here via existing signed URL flow
- do not duplicate the main video library into a second bucket

**New: dedicated Viewer / plugin bucket** (preferred)
- name TBD, e.g. `askhow-viewer-ru` (plus `-dev` / `-test` if we isolate envs)
- purpose: plugin-owned and portal-owned objects, separate lifecycle/IAM from TutorApp
- candidates to store there:
  - SEO/og assets generated or curated for the portal
  - prerender/sitemap artifacts (if we materialize files)
  - layout-tool exports / category cover overrides (if persisted server-side later)
  - any ViewerApp static assets we choose to serve from YC instead of Reg.ru
- access: plugin service account read/write; public or signed read only where needed for SEO
- CORS on this bucket only for portal origins if browser GETs hit it directly

**Frontend build**
- default still Reg.ru VPS (nginx); optional mirror of static build into the viewer bucket later

### YDB (same DB, existing tables)
Auth: `tutor_auth_dev`, `tutor_auth_user_1`  
Content: `tutor_users`, `tutor_videos`, `tutor_courses`, `tutor_reviews`, `tutor_stats`, `tutor_queries`, `tutor_exapi`, `tutor_credits`  
Payments: `tutor_payments_1` / `tutor_moneta` (or demo_* tables)

Possible small add: claim-token storage (auth rows or tiny table).  
No second ViewerApp database. No backend layout tables (order/covers stay on frontend).

### OpenSearch
- reuse existing managed cluster / indexes for `/viewer/search`
- no new cluster for MVP

### API Gateway
- existing `{proxy+}` should cover `/viewer/*` once plugin is registered
- check CORS, timeouts, body size for prerender payloads

### Docker / VM
- one TutorBE VM already runs `bepro-dev|test|prod`, gotenberg, fluentbit
- plugin ships inside TutorBackend container — no extra microservice for MVP
- staging preference: use `bepro-test` first; extra `bepro-viewer-*` only if restarts collide

### Checklist
Must configure: portal DNS, CORS (auth + payments + `/viewer`), API base URLs, claim base URLs, Moneta returns, **viewer S3 bucket** (+ IAM), SMS path verified from portal origin, enable plugin on test then prod.  
Optional later: custom `api.` domain, CDN in front of viewer bucket, claim table, extra container, Node HTML prerender on Reg.ru.  
Not needed for MVP: new YDB database, new OpenSearch cluster, separate Moneta merchant, second SMS provider, copy of full video library.

### Open questions
- exact prod/staging hostnames and DNS owner
- viewer bucket naming and whether one bucket per env (dev/test/prod)
- what lands in viewer bucket in v1 vs stays only on Reg.ru / in `tutorplatform-ru`
- prerender on Reg.ru (Node) vs SPA + meta from plugin
- OK to create guest users in shared test DB?
- how to ship plugin to prod without risk to TutorApp (flag / target)?
