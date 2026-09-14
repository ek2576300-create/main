globalThis.__nitro_main__ = import.meta.url;
import { a as defineLazyEventHandler, c as serve, i as defineHandler, n as HTTPError, o as toEventHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/svg+xml",
		"etag": "\"147-SNklhapr7zJbjrUqNJHMtMXdAWI\"",
		"mtime": "2026-08-31T04:35:25.309Z",
		"size": 327,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"47-Mc0wPaq0eAI3ok6ICgPMU+ZdUfQ\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 71,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"de0-fyDgGOuQD/mzUD6zIbMgD9FQiOg\"",
		"mtime": "2026-08-31T04:35:25.309Z",
		"size": 3552,
		"path": "../public/sitemap.xml"
	},
	"/assets/CourseMetrics-FB0lf9SG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70f-VC0i3NX0Ye8yAATIoyg92e2W/Xc\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 1807,
		"path": "../public/assets/CourseMetrics-FB0lf9SG.js"
	},
	"/site.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"1d1-t4FcCEjFT/r9WZWP20wQ5o1UOi8\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 465,
		"path": "../public/site.webmanifest"
	},
	"/assets/add-D4wSK13s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-hOc7FIzxoAR2ZN/gSnDwPVJz97Y\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 185,
		"path": "../public/assets/add-D4wSK13s.js"
	},
	"/assets/blogs-CZJPeKcl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e5-yljQsnEdLiYOM+XWLC+kfjWjg70\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 5349,
		"path": "../public/assets/blogs-CZJPeKcl.js"
	},
	"/assets/authors-CoaGZFhA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f88-W3zWMUWCjEp5Euhl4mX+hmxANpk\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 3976,
		"path": "../public/assets/authors-CoaGZFhA.js"
	},
	"/assets/blogs-nrL2Doxl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d32-Yp0MSpYzi2Qwl0V3oEfjQUN6qxM\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 3378,
		"path": "../public/assets/blogs-nrL2Doxl.js"
	},
	"/assets/blogs._blogId-FeKtYAcZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ed0-ovB7CvC2FI6lA3eVPrIQf7Q0/Lw\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 3792,
		"path": "../public/assets/blogs._blogId-FeKtYAcZ.js"
	},
	"/assets/about-oxBwzS06.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-A1X7sTJZ6/Bmhwvru5bVuqipklM\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 172,
		"path": "../public/assets/about-oxBwzS06.js"
	},
	"/assets/catalog-DJ7TaJJi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6f57-mOaCYBnxwKHK1Vhs29aUoqUKBpw\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 28503,
		"path": "../public/assets/catalog-DJ7TaJJi.js"
	},
	"/assets/catalog.index-DmqYzFwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81e-rmyA5kFAiG3Ts9Lxnzub2hfR9UU\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 2078,
		"path": "../public/assets/catalog.index-DmqYzFwe.js"
	},
	"/assets/catalog.course._courseId-J3N-Qc3h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f3-3gTyvy6k6EUv2IueLx4g4iYifx8\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 13043,
		"path": "../public/assets/catalog.course._courseId-J3N-Qc3h.js"
	},
	"/assets/clock-3-DcM7fNex.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-QFKSHx8eNr8zm8uPresD5b/1rxg\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 169,
		"path": "../public/assets/clock-3-DcM7fNex.js"
	},
	"/assets/catalog.author._authorId-CUWLkHzz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bda-Orux5zdaiPIrgdJlJf2L+tHRLfI\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 3034,
		"path": "../public/assets/catalog.author._authorId-CUWLkHzz.js"
	},
	"/assets/favorites-DGOGZ06S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-Kk3oOyIBiTjvqVpS9sEw8sYs4hY\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 167,
		"path": "../public/assets/favorites-DGOGZ06S.js"
	},
	"/assets/createLucideIcon-CX2Ezr3t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"590-6TPKhnQu/fsLZu1M0XJQDKzj5tw\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 1424,
		"path": "../public/assets/createLucideIcon-CX2Ezr3t.js"
	},
	"/assets/index-D0Er1W53.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d28b-uUeacrPSxE3Igtm7Y8dQTZmQjNU\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 53899,
		"path": "../public/assets/index-D0Er1W53.css"
	},
	"/assets/jsx-runtime-DGeXAQPT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ab-mgnSm9dUpwL2+z7tKxJ2MsN0fOM\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 939,
		"path": "../public/assets/jsx-runtime-DGeXAQPT.js"
	},
	"/assets/index-BJz62K4D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52477-cV4ZVvp2h6GJIkp3paIH20K67qM\"",
		"mtime": "2026-08-31T04:35:24.684Z",
		"size": 337015,
		"path": "../public/assets/index-BJz62K4D.js"
	},
	"/assets/profile-BX6lsKZq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-i/Cankp2PvgmQA+Ix3rqVW8eTsM\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 163,
		"path": "../public/assets/profile-BX6lsKZq.js"
	},
	"/assets/preload-helper-CzU_JfLK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"800f-0rgvurnBB7rPQnZ8EMzOX6JOUA8\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 32783,
		"path": "../public/assets/preload-helper-CzU_JfLK.js"
	},
	"/assets/CourseCatalogCard-DBordjEf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ec-zAl1e4KMN4+29NqZi7k30FDBydg\"",
		"mtime": "2026-08-31T04:35:24.687Z",
		"size": 1260,
		"path": "../public/assets/CourseCatalogCard-DBordjEf.js"
	},
	"/assets/content-BHwI1VCe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5657-bWetrLdcUyPGSZ3AWeeKsaQ4tAU\"",
		"mtime": "2026-08-31T04:35:24.688Z",
		"size": 22103,
		"path": "../public/assets/content-BHwI1VCe.js"
	},
	"/assets/purchases-KRzCUFBb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-GOE+kRuAeV0EReyzCHn5M/xckRo\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 163,
		"path": "../public/assets/purchases-KRzCUFBb.js"
	},
	"/assets/reels._reelId-sgzkif2d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f4e-gQHcYYdhmYteA/P/yYFTQdZjWlo\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 12110,
		"path": "../public/assets/reels._reelId-sgzkif2d.js"
	},
	"/assets/sales-Dmq9ReNX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-B5hRLyROrrWfjvJEQpOrg1IKh2U\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 184,
		"path": "../public/assets/sales-Dmq9ReNX.js"
	},
	"/assets/settings-DzBf_KBE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-AmGG/v+JzF5vtukqtdN+cJ5e/pQ\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 167,
		"path": "../public/assets/settings-DzBf_KBE.js"
	},
	"/assets/routes-C-ykJYPM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47d3-YUyt43oUV0UOZrGiw8VhI6DIYJA\"",
		"mtime": "2026-08-31T04:35:24.689Z",
		"size": 18387,
		"path": "../public/assets/routes-C-ykJYPM.js"
	},
	"/assets/site-DYqs1mhi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d-NYU4wsfcjfHQn0yovZNtTDfUGns\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 45,
		"path": "../public/assets/site-DYqs1mhi.js"
	},
	"/assets/star-D0F0wp5t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-ZadUxQMQf0an1x6wklO44fU/DFs\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 472,
		"path": "../public/assets/star-D0F0wp5t.js"
	},
	"/assets/thumbs-up-mn9AA8DY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e-TGeU35GmWZ7u8AaNsCxu6D2mykE\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 302,
		"path": "../public/assets/thumbs-up-mn9AA8DY.js"
	},
	"/assets/x-B69pA92G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-6QzeQjp/7hjpiX6Vir6qCCCQKIQ\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 291,
		"path": "../public/assets/x-B69pA92G.js"
	},
	"/images/author-alexandra.jpg": {
		"type": "image/jpeg",
		"etag": "\"67be-FxRSdsGsERiqONqtElcOvlli3zQ\"",
		"mtime": "2026-08-31T04:35:25.231Z",
		"size": 26558,
		"path": "../public/images/author-alexandra.jpg"
	},
	"/images/img-000.jpg": {
		"type": "image/jpeg",
		"etag": "\"431a-uHxO/6JvLTNoD6YWq1uDLdtnZ/g\"",
		"mtime": "2026-08-31T04:35:25.232Z",
		"size": 17178,
		"path": "../public/images/img-000.jpg"
	},
	"/assets/useNavigate-CE1FRbea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e30-tGK/z7YgDvCVXJp4dHDRuAI46q0\"",
		"mtime": "2026-08-31T04:35:24.690Z",
		"size": 7728,
		"path": "../public/assets/useNavigate-CE1FRbea.js"
	},
	"/images/img-001.png": {
		"type": "image/png",
		"etag": "\"23a-xgTknjfywDx2ZTjHVTtF9f0klr0\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 570,
		"path": "../public/images/img-001.png"
	},
	"/images/img-005.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 1243,
		"path": "../public/images/img-005.png"
	},
	"/images/img-003.png": {
		"type": "image/png",
		"etag": "\"21c7-LYZsm6u3tB4YYN3e9h7M+70Ekwc\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 8647,
		"path": "../public/images/img-003.png"
	},
	"/images/img-006.jpg": {
		"type": "image/jpeg",
		"etag": "\"fb0a-F2cVC7ascSJCvDLfXFQVPlpxmuA\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 64266,
		"path": "../public/images/img-006.jpg"
	},
	"/images/img-004.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f4c7-l9s+DYiDh9smqZhAgJiDlGcF/kA\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 128199,
		"path": "../public/images/img-004.jpg"
	},
	"/images/img-007.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 1243,
		"path": "../public/images/img-007.png"
	},
	"/images/img-008.jpg": {
		"type": "image/jpeg",
		"etag": "\"8df1-pb46iZQwKcL/nPblE6vXSpmDuPM\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 36337,
		"path": "../public/images/img-008.jpg"
	},
	"/images/img-009.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 1243,
		"path": "../public/images/img-009.png"
	},
	"/images/img-011.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 1243,
		"path": "../public/images/img-011.png"
	},
	"/images/img-010.jpg": {
		"type": "image/jpeg",
		"etag": "\"f4b5-NVfOw0rkWA03Dp7TaxkjmECVEwE\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 62645,
		"path": "../public/images/img-010.jpg"
	},
	"/images/img-013.png": {
		"type": "image/png",
		"etag": "\"4da-jFh35mlwXHTXvGF9DtPYpx6MFtI\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 1242,
		"path": "../public/images/img-013.png"
	},
	"/images/img-012.jpg": {
		"type": "image/jpeg",
		"etag": "\"ea88-EwdS9l0k2Q/9GD2ajpspZN5Ha04\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 60040,
		"path": "../public/images/img-012.jpg"
	},
	"/images/img-002.jpg": {
		"type": "image/jpeg",
		"etag": "\"1078de-4mWzzqT55WxTJFE9CIJZk3uWLFA\"",
		"mtime": "2026-08-31T04:35:25.233Z",
		"size": 1079518,
		"path": "../public/images/img-002.jpg"
	},
	"/images/img-014.jpg": {
		"type": "image/jpeg",
		"etag": "\"5942-FgT3kI7z6p1BtfmmRxEyFGvoDjA\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 22850,
		"path": "../public/images/img-014.jpg"
	},
	"/images/img-015.png": {
		"type": "image/png",
		"etag": "\"4c9-jCJLntBJdq1Uv6SK9Eq9ga+j6aI\"",
		"mtime": "2026-08-31T04:35:25.235Z",
		"size": 1225,
		"path": "../public/images/img-015.png"
	},
	"/images/img-016.jpg": {
		"type": "image/jpeg",
		"etag": "\"bccc-cK4upGt9LOpUV/q291D8g2pByyE\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 48332,
		"path": "../public/images/img-016.jpg"
	},
	"/images/img-019.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.236Z",
		"size": 1243,
		"path": "../public/images/img-019.png"
	},
	"/images/img-017.png": {
		"type": "image/png",
		"etag": "\"4db-CTN4pB6cAdj3S6L1yv1PGALwGaY\"",
		"mtime": "2026-08-31T04:35:25.235Z",
		"size": 1243,
		"path": "../public/images/img-017.png"
	},
	"/images/img-020.jpg": {
		"type": "image/jpeg",
		"etag": "\"46ed-iXfk/GkXzL1q8SzjbOKk4smmXrA\"",
		"mtime": "2026-08-31T04:35:25.236Z",
		"size": 18157,
		"path": "../public/images/img-020.jpg"
	},
	"/images/lesson-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"2df5-T1i7vU0J/guY4ETkrYRJ1QJVhNU\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 11765,
		"path": "../public/images/lesson-1.jpg"
	},
	"/images/img-018.jpg": {
		"type": "image/jpeg",
		"etag": "\"13398-2MyoKetoHclHKAt/4BK9xIdrL04\"",
		"mtime": "2026-08-31T04:35:25.234Z",
		"size": 78744,
		"path": "../public/images/img-018.jpg"
	},
	"/images/img-021.png": {
		"type": "image/png",
		"etag": "\"143c-1DjcCY6Pr96AWr3ki87ZZWto9X8\"",
		"mtime": "2026-08-31T04:35:25.236Z",
		"size": 5180,
		"path": "../public/images/img-021.png"
	},
	"/images/lesson-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a7c-/U+rqzl7cFn6tgBFyaWS7PDs6vU\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 10876,
		"path": "../public/images/lesson-2.jpg"
	},
	"/images/lesson-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d21-uWmjTB16u+SUJv/kbi+7W8wqx8M\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 7457,
		"path": "../public/images/lesson-3.jpg"
	},
	"/images/lesson-4.jpg": {
		"type": "image/jpeg",
		"etag": "\"2067-re6K/1j9aL6ZeJO+rfMvXS/xkx4\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 8295,
		"path": "../public/images/lesson-4.jpg"
	},
	"/images/lesson-6.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fa4-l4cCU9WJEDhiSfPBfaPw8jd+xts\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 8100,
		"path": "../public/images/lesson-6.jpg"
	},
	"/images/lesson-5.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ffe-IMdkguBmIOEN5BWAGP4dLXdSHVA\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 8190,
		"path": "../public/images/lesson-5.jpg"
	},
	"/images/lesson-7.jpg": {
		"type": "image/jpeg",
		"etag": "\"1db6-Q0zwhGiSNIZGNEfhttwj8ITbRoc\"",
		"mtime": "2026-08-31T04:35:25.238Z",
		"size": 7606,
		"path": "../public/images/lesson-7.jpg"
	},
	"/images/lesson-8.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e97-KF6+RKUXB0PF4p9VHR4WFyDUizU\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 7831,
		"path": "../public/images/lesson-8.jpg"
	},
	"/images/123/10.jfif": {
		"type": "image/pjpeg",
		"etag": "\"fcb8-uX85jOP3e0mzjZo5sxUBIJ6gSSs\"",
		"mtime": "2026-08-31T04:35:25.237Z",
		"size": 64696,
		"path": "../public/images/123/10.jfif"
	},
	"/images/123/12.jfif": {
		"type": "image/pjpeg",
		"etag": "\"14d83-KsV0AjZjltAuQ0QDnkKiHFOJwKc\"",
		"mtime": "2026-08-31T04:35:25.238Z",
		"size": 85379,
		"path": "../public/images/123/12.jfif"
	},
	"/images/123/11.jfif": {
		"type": "image/pjpeg",
		"etag": "\"12690-UQ6kdxPEKMumCwtswiXHCwhUn+Q\"",
		"mtime": "2026-08-31T04:35:25.239Z",
		"size": 75408,
		"path": "../public/images/123/11.jfif"
	},
	"/images/123/13.jfif": {
		"type": "image/pjpeg",
		"etag": "\"129dd-PctabReihAEiuegGr8Rhev/yJs8\"",
		"mtime": "2026-08-31T04:35:25.238Z",
		"size": 76253,
		"path": "../public/images/123/13.jfif"
	},
	"/images/123/3.jfif": {
		"type": "image/pjpeg",
		"etag": "\"cade-E8j3CHrD9nxLq0K7llvHkJaeeuM\"",
		"mtime": "2026-08-31T04:35:25.238Z",
		"size": 51934,
		"path": "../public/images/123/3.jfif"
	},
	"/images/123/1.png": {
		"type": "image/png",
		"etag": "\"aa426-LNxREjBSuWOy/J33Xsi7fuKpZLQ\"",
		"mtime": "2026-08-31T04:35:25.231Z",
		"size": 697382,
		"path": "../public/images/123/1.png"
	},
	"/images/123/2.jfif": {
		"type": "image/pjpeg",
		"etag": "\"18463-nySW5aYhPnDT777wXv826H4UXZQ\"",
		"mtime": "2026-08-31T04:35:25.238Z",
		"size": 99427,
		"path": "../public/images/123/2.jfif"
	},
	"/images/123/4.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e906-g+mgSYjSuZaLiyUx9ZaQvcyDvaA\"",
		"mtime": "2026-08-31T04:35:25.239Z",
		"size": 59654,
		"path": "../public/images/123/4.jfif"
	},
	"/images/123/424p2v6xzhlcxcr5kf4k.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a332-/JRwOnxPNm+qQevTXwnDZ0aApaM\"",
		"mtime": "2026-08-31T04:35:25.239Z",
		"size": 107314,
		"path": "../public/images/123/424p2v6xzhlcxcr5kf4k.jpg"
	},
	"/images/123/5.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e463-VptqLPePDqTZTqv8DUc4XulOtbY\"",
		"mtime": "2026-08-31T04:35:25.240Z",
		"size": 58467,
		"path": "../public/images/123/5.jfif"
	},
	"/images/123/7.jfif": {
		"type": "image/pjpeg",
		"etag": "\"c8de-iNTN1JFx3iUeD5SCIEC93C1jjQc\"",
		"mtime": "2026-08-31T04:35:25.239Z",
		"size": 51422,
		"path": "../public/images/123/7.jfif"
	},
	"/images/123/6.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e6d2-jENDS0xZ89Ykwg4WneaMNpl7CIc\"",
		"mtime": "2026-08-31T04:35:25.239Z",
		"size": 59090,
		"path": "../public/images/123/6.jfif"
	},
	"/images/123/8.jfif": {
		"type": "image/pjpeg",
		"etag": "\"da71-MYvgdaQvEnx75CtAFBcJeCW8P0k\"",
		"mtime": "2026-08-31T04:35:25.240Z",
		"size": 55921,
		"path": "../public/images/123/8.jfif"
	},
	"/images/home/avatar-igor-malinin.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ab6-pKf/Wtl2c8stTvVmCRxl+DJJc78\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 6838,
		"path": "../public/images/home/avatar-igor-malinin.jpg"
	},
	"/images/home/avatar-alexey-markov.jpg": {
		"type": "image/jpeg",
		"etag": "\"2085-LW1KsT89MyTkEeFi9LUa9QX16Eg\"",
		"mtime": "2026-08-31T04:35:25.231Z",
		"size": 8325,
		"path": "../public/images/home/avatar-alexey-markov.jpg"
	},
	"/images/home/avatar-igor-veretennikov.jpg": {
		"type": "image/jpeg",
		"etag": "\"14a8-mMz4FX6XDr2dqV9mmeEspwmzVZI\"",
		"mtime": "2026-08-31T04:35:25.240Z",
		"size": 5288,
		"path": "../public/images/home/avatar-igor-veretennikov.jpg"
	},
	"/images/123/9.jfif": {
		"type": "image/pjpeg",
		"etag": "\"ce1a-QHEZn9qxJ95lRDh1GweHK3sNot0\"",
		"mtime": "2026-08-31T04:35:25.240Z",
		"size": 52762,
		"path": "../public/images/123/9.jfif"
	},
	"/images/home/avatar-mystery.jpg": {
		"type": "image/jpeg",
		"etag": "\"4284-88lEEfQJstHHBy8cIM9GqBd57AQ\"",
		"mtime": "2026-08-31T04:35:25.240Z",
		"size": 17028,
		"path": "../public/images/home/avatar-mystery.jpg"
	},
	"/images/home/course-alexey-markov.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b75-mvwzmY+qSfT/zsfPWTpNBgtbuqU\"",
		"mtime": "2026-08-31T04:35:25.242Z",
		"size": 35701,
		"path": "../public/images/home/course-alexey-markov.jpg"
	},
	"/images/home/blog-style.jpg": {
		"type": "image/jpeg",
		"etag": "\"ea88-EwdS9l0k2Q/9GD2ajpspZN5Ha04\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 60040,
		"path": "../public/images/home/blog-style.jpg"
	},
	"/images/home/course-igor-malinin.jpg": {
		"type": "image/jpeg",
		"etag": "\"aef2-0SSWjHH84iZFHp10Z16Anvz7T6s\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 44786,
		"path": "../public/images/home/course-igor-malinin.jpg"
	},
	"/images/home/course-mystery.jpg": {
		"type": "image/jpeg",
		"etag": "\"3447-UoC31j2htitNKniNW8IDNni0slo\"",
		"mtime": "2026-08-31T04:35:25.242Z",
		"size": 13383,
		"path": "../public/images/home/course-mystery.jpg"
	},
	"/images/home/course-igor-veretennikov.jpg": {
		"type": "image/jpeg",
		"etag": "\"f4ce-fbYaZtblr6auTtIA5Udd5wkZK60\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 62670,
		"path": "../public/images/home/course-igor-veretennikov.jpg"
	},
	"/images/subscriptions/115fz-unblock-account.webp": {
		"type": "image/webp",
		"etag": "\"677a-jGsptdIaO+dttIc31bWa3yrou88\"",
		"mtime": "2026-08-31T04:35:25.242Z",
		"size": 26490,
		"path": "../public/images/subscriptions/115fz-unblock-account.webp"
	},
	"/images/subscriptions/dismissal-absenteeism.webp": {
		"type": "image/webp",
		"etag": "\"c52a-F3H3HlG3g8qqa0s2Khg/vTZGRnY\"",
		"mtime": "2026-08-31T04:35:25.242Z",
		"size": 50474,
		"path": "../public/images/subscriptions/dismissal-absenteeism.webp"
	},
	"/images/subscriptions/git-inspection-prep.webp": {
		"type": "image/webp",
		"etag": "\"792c-HmBevGRa05iitZebUa8dEJaVaKA\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 31020,
		"path": "../public/images/subscriptions/git-inspection-prep.webp"
	},
	"/images/home/hero-paradise.jpg": {
		"type": "image/jpeg",
		"etag": "\"1078de-4mWzzqT55WxTJFE9CIJZk3uWLFA\"",
		"mtime": "2026-08-31T04:35:25.242Z",
		"size": 1079518,
		"path": "../public/images/home/hero-paradise.jpg"
	},
	"/images/home/business-magnifier.png": {
		"type": "image/png",
		"etag": "\"164e21-55956oToaCFZHzdSpZ/pC0zuMRg\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 1461793,
		"path": "../public/images/home/business-magnifier.png"
	},
	"/images/123/124.png": {
		"type": "image/png",
		"etag": "\"284177-E7X8XvMEZXGAxvYxxqcFZyDce48\"",
		"mtime": "2026-08-31T04:35:25.241Z",
		"size": 2638199,
		"path": "../public/images/123/124.png"
	},
	"/images/subscriptions/ip-open-2026.webp": {
		"type": "image/webp",
		"etag": "\"9af2-gYT9AOBS8sbXhdwqdBmFHaCkxkw\"",
		"mtime": "2026-08-31T04:35:25.243Z",
		"size": 39666,
		"path": "../public/images/subscriptions/ip-open-2026.webp"
	},
	"/images/subscriptions/marketing-audit-10-minutes.webp": {
		"type": "image/webp",
		"etag": "\"f884-g5wvXYl1p3h3MSgL13dMD8AWUPI\"",
		"mtime": "2026-08-31T04:35:25.243Z",
		"size": 63620,
		"path": "../public/images/subscriptions/marketing-audit-10-minutes.webp"
	},
	"/images/subscriptions/online-kassa.webp": {
		"type": "image/webp",
		"etag": "\"4d5e-7toOjvIsfFnV5IW3OWpn0DIhuJM\"",
		"mtime": "2026-08-31T04:35:25.244Z",
		"size": 19806,
		"path": "../public/images/subscriptions/online-kassa.webp"
	},
	"/images/subscriptions/safe-gph-contract.webp": {
		"type": "image/webp",
		"etag": "\"68c2-7v1njveXiNJaWZMmkNTS15yy1kc\"",
		"mtime": "2026-08-31T04:35:25.244Z",
		"size": 26818,
		"path": "../public/images/subscriptions/safe-gph-contract.webp"
	},
	"/images/subscriptions/usn-nds-2026.webp": {
		"type": "image/webp",
		"etag": "\"d606-4XTUMvKUa+yTKhj3DEVKVppgjLY\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 54790,
		"path": "../public/images/subscriptions/usn-nds-2026.webp"
	},
	"/images/subscriptions/trademark-registration.webp": {
		"type": "image/webp",
		"etag": "\"163dc-rwp77QRbwH0+el65F2e3s1QS5gg\"",
		"mtime": "2026-08-31T04:35:25.246Z",
		"size": 91100,
		"path": "../public/images/subscriptions/trademark-registration.webp"
	},
	"/images/subscriptions/yandex-direct-min-budget.webp": {
		"type": "image/webp",
		"etag": "\"7bee-eoBQDOivqzCuKpqgVn6dRZgjlNI\"",
		"mtime": "2026-08-31T04:35:25.246Z",
		"size": 31726,
		"path": "../public/images/subscriptions/yandex-direct-min-budget.webp"
	},
	"/images/authors/alexandra-nikitina/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"cade-E8j3CHrD9nxLq0K7llvHkJaeeuM\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 51934,
		"path": "../public/images/authors/alexandra-nikitina/author.jpg"
	},
	"/images/authors/alexandra-nikitina/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"340-Hs4PlwY48KXTx3ep9WbwEtwdGh8\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 832,
		"path": "../public/images/authors/alexandra-nikitina/author.svg"
	},
	"/images/authors/alexandra-nikitina/author.png": {
		"type": "image/png",
		"etag": "\"14403-7r9QjMjZ3pequ27ame5qsfDtpDA\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 82947,
		"path": "../public/images/authors/alexandra-nikitina/author.png"
	},
	"/images/subscriptions/115fz-unblock-account.png": {
		"type": "image/png",
		"etag": "\"1c2f74-TpanWQYyMhoBvTONtsdT11U7erw\"",
		"mtime": "2026-08-31T04:35:25.231Z",
		"size": 1847156,
		"path": "../public/images/subscriptions/115fz-unblock-account.png"
	},
	"/images/authors/alexandra-nikitina/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"154f3-+b0w1nlWNDmm8+rlwpQcA9jxBaQ\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 87283,
		"path": "../public/images/authors/alexandra-nikitina/cover.jpg"
	},
	"/images/authors/alexandra-nikitina/cover.png": {
		"type": "image/png",
		"etag": "\"2b657-oxTXtsJeSxClkyc1FTKyj2F5BiQ\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 177751,
		"path": "../public/images/authors/alexandra-nikitina/cover.png"
	},
	"/images/subscriptions/dismissal-absenteeism.png": {
		"type": "image/png",
		"etag": "\"1c3dbb-ojQIPQ+i4+Ue60teddVfouq01o0\"",
		"mtime": "2026-08-31T04:35:25.243Z",
		"size": 1850811,
		"path": "../public/images/subscriptions/dismissal-absenteeism.png"
	},
	"/images/subscriptions/git-inspection-prep.png": {
		"type": "image/png",
		"etag": "\"1ddec5-hRfZtSMxdYQK6AJftjNDA2+iQ/0\"",
		"mtime": "2026-08-31T04:35:25.247Z",
		"size": 1957573,
		"path": "../public/images/subscriptions/git-inspection-prep.png"
	},
	"/images/authors/alexandra-nikitina/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5f8-PhI23EzBiSaxHvMTA8439EBO5nA\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 1528,
		"path": "../public/images/authors/alexandra-nikitina/cover.svg"
	},
	"/images/authors/alexandra-nikitina/selling-resume.jpg": {
		"type": "image/jpeg",
		"etag": "\"154f3-+b0w1nlWNDmm8+rlwpQcA9jxBaQ\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 87283,
		"path": "../public/images/authors/alexandra-nikitina/selling-resume.jpg"
	},
	"/images/subscriptions/ip-open-2026.png": {
		"type": "image/png",
		"etag": "\"1b2572-VjG8aW/Jay771tmnWb4fIwv8BCk\"",
		"mtime": "2026-08-31T04:35:25.244Z",
		"size": 1779058,
		"path": "../public/images/subscriptions/ip-open-2026.png"
	},
	"/images/subscriptions/usn-nds-2026.png": {
		"type": "image/png",
		"etag": "\"1acc16-Up3oGABDpX6JunycJDLjMxSFWFo\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 1756182,
		"path": "../public/images/subscriptions/usn-nds-2026.png"
	},
	"/images/subscriptions/marketing-audit-10-minutes.png": {
		"type": "image/png",
		"etag": "\"1bd8ea-VWrGWf9vUi50vUHnfomMlL5rcE8\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 1825002,
		"path": "../public/images/subscriptions/marketing-audit-10-minutes.png"
	},
	"/images/authors/alexey-markov/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"9120-lN06AMRSecqN9dF/hv66RA7X5Xk\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 37152,
		"path": "../public/images/authors/alexey-markov/author.jpg"
	},
	"/images/authors/alexandra-nikitina/selling-resume.png": {
		"type": "image/png",
		"etag": "\"2b657-oxTXtsJeSxClkyc1FTKyj2F5BiQ\"",
		"mtime": "2026-08-31T04:35:25.259Z",
		"size": 177751,
		"path": "../public/images/authors/alexandra-nikitina/selling-resume.png"
	},
	"/images/subscriptions/trademark-registration.png": {
		"type": "image/png",
		"etag": "\"1c1d44-HTD64aYes5R+6yccg2RMFsjUmpo\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 1842500,
		"path": "../public/images/subscriptions/trademark-registration.png"
	},
	"/images/subscriptions/online-kassa.png": {
		"type": "image/png",
		"etag": "\"1d2f18-MPnQFB2PIiYFetrMx6R6jUgw688\"",
		"mtime": "2026-08-31T04:35:25.244Z",
		"size": 1912600,
		"path": "../public/images/subscriptions/online-kassa.png"
	},
	"/images/authors/alexey-markov/author.png": {
		"type": "image/png",
		"etag": "\"15efe-uP55gJBW5tTo7ko0Ua+qdlVaoK0\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 89854,
		"path": "../public/images/authors/alexey-markov/author.png"
	},
	"/images/subscriptions/safe-gph-contract.png": {
		"type": "image/png",
		"etag": "\"1b92fe-mnykGJpMk8f8kyPD+omk3WFr0/U\"",
		"mtime": "2026-08-31T04:35:25.245Z",
		"size": 1807102,
		"path": "../public/images/subscriptions/safe-gph-contract.png"
	},
	"/images/subscriptions/yandex-direct-min-budget.png": {
		"type": "image/png",
		"etag": "\"1b4fa2-i+uYKrExWrewgkNFfvFZmZZUQss\"",
		"mtime": "2026-08-31T04:35:25.247Z",
		"size": 1789858,
		"path": "../public/images/subscriptions/yandex-direct-min-budget.png"
	},
	"/images/authors/alexey-markov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"336-z+dxZFogxjlT1Ml1jQ59eXZrgVM\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 822,
		"path": "../public/images/authors/alexey-markov/author.svg"
	},
	"/images/authors/alexey-markov/breathing-and-voice.png": {
		"type": "image/png",
		"etag": "\"2f402-NQndZpQIPELwJDsspcZB9Y1qPck\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 193538,
		"path": "../public/images/authors/alexey-markov/breathing-and-voice.png"
	},
	"/images/authors/alexey-markov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e2-hCzkemJfDagRl+HrJHqFp6iFLZw\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 1506,
		"path": "../public/images/authors/alexey-markov/cover.svg"
	},
	"/images/authors/alexey-markov/cover-self-presentation.jpg": {
		"type": "image/jpeg",
		"etag": "\"89a7-gtoXk1u8nAfuuuHuCbCpEHq1Lm4\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 35239,
		"path": "../public/images/authors/alexey-markov/cover-self-presentation.jpg"
	},
	"/images/authors/alexey-markov/crs-1749992880045-bc6f8a373a12-1749992880190.jfif": {
		"type": "image/pjpeg",
		"etag": "\"8fa0-rbh4Y64q/dvGpj1AxJ5bufBvH4Q\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 36768,
		"path": "../public/images/authors/alexey-markov/crs-1749992880045-bc6f8a373a12-1749992880190.jfif"
	},
	"/images/authors/alexey-markov/cover.png": {
		"type": "image/png",
		"etag": "\"2f402-NQndZpQIPELwJDsspcZB9Y1qPck\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 193538,
		"path": "../public/images/authors/alexey-markov/cover.png"
	},
	"/images/authors/alexey-markov/effective-self-presentation.jpg": {
		"type": "image/jpeg",
		"etag": "\"89a7-gtoXk1u8nAfuuuHuCbCpEHq1Lm4\"",
		"mtime": "2026-08-31T04:35:25.260Z",
		"size": 35239,
		"path": "../public/images/authors/alexey-markov/effective-self-presentation.jpg"
	},
	"/images/authors/alexey-markov/effective-self-presentation.png": {
		"type": "image/png",
		"etag": "\"2f402-NQndZpQIPELwJDsspcZB9Y1qPck\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 193538,
		"path": "../public/images/authors/alexey-markov/effective-self-presentation.png"
	},
	"/images/authors/alexey-markov/voice-resonators.png": {
		"type": "image/png",
		"etag": "\"2f402-NQndZpQIPELwJDsspcZB9Y1qPck\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 193538,
		"path": "../public/images/authors/alexey-markov/voice-resonators.png"
	},
	"/images/authors/artem-mushin/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"14713-YhV2BiO4qKUBe79c9xa5ljoVG24\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 83731,
		"path": "../public/images/authors/artem-mushin/author.jpg"
	},
	"/images/authors/artem-mushin/author.png": {
		"type": "image/png",
		"etag": "\"f6e1-zrYvtS5vSjzcqgWThJKnoHgnNIo\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 63201,
		"path": "../public/images/authors/artem-mushin/author.png"
	},
	"/images/authors/artem-mushin/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"330-B1qLpj2fiW3pzm2psQgvVxDNS4U\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 816,
		"path": "../public/images/authors/artem-mushin/author.svg"
	},
	"/images/authors/artem-mushin/cover.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/cover.png"
	},
	"/images/authors/artem-mushin/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"621-eETaHICGjUP6vUNHoljNnom6rcI\"",
		"mtime": "2026-08-31T04:35:25.261Z",
		"size": 1569,
		"path": "../public/images/authors/artem-mushin/cover.svg"
	},
	"/images/authors/artem-mushin/strategic-storytelling-interviews.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/strategic-storytelling-interviews.png"
	},
	"/images/authors/igor-veretennikov/author.png": {
		"type": "image/png",
		"etag": "\"11aa3-UEXfuc1bfTmfGl9OWfUvQXLJ7l0\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 72355,
		"path": "../public/images/authors/igor-veretennikov/author.png"
	},
	"/images/authors/igor-veretennikov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33e-U1bZo7nK1w/roKg591FOwCcAr/4\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 830,
		"path": "../public/images/authors/igor-veretennikov/author.svg"
	},
	"/images/authors/igor-veretennikov/cover.png": {
		"type": "image/png",
		"etag": "\"2e3b0-UcnhZVAbv8+gVK969jUv3sbGZjE\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 189360,
		"path": "../public/images/authors/igor-veretennikov/cover.png"
	},
	"/images/authors/igor-veretennikov/easy-finance-management.png": {
		"type": "image/png",
		"etag": "\"2e3b0-UcnhZVAbv8+gVK969jUv3sbGZjE\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 189360,
		"path": "../public/images/authors/igor-veretennikov/easy-finance-management.png"
	},
	"/images/authors/igor-malinin/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"334-xsc43JOzmVjkbrOc5uUi6oUHEDI\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 820,
		"path": "../public/images/authors/igor-malinin/author.svg"
	},
	"/images/authors/igor-veretennikov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"608-Xza9scmD6L3h4g5iPcXRJAfjmmI\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 1544,
		"path": "../public/images/authors/igor-veretennikov/cover.svg"
	},
	"/images/authors/igor-malinin/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e8-4X3f41Y0TlSLNUcgH5W/KuVLi40\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 1512,
		"path": "../public/images/authors/igor-malinin/cover.svg"
	},
	"/images/authors/igor-malinin/author.png": {
		"type": "image/png",
		"etag": "\"6d04d-ptDrVu9owUv2KaU2jbFcsHvtR98\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 446541,
		"path": "../public/images/authors/igor-malinin/author.png"
	},
	"/images/authors/igor-malinin/brand-publicity-media-reputation.png": {
		"type": "image/png",
		"etag": "\"63b88-M3GPlL/XXyH3lfOJiOHYBTIJw5I\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 408456,
		"path": "../public/images/authors/igor-malinin/brand-publicity-media-reputation.png"
	},
	"/images/authors/igor-malinin/cover.png": {
		"type": "image/png",
		"etag": "\"6d04d-ptDrVu9owUv2KaU2jbFcsHvtR98\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 446541,
		"path": "../public/images/authors/igor-malinin/cover.png"
	},
	"/images/authors/darya-filimonova/author.png": {
		"type": "image/png",
		"etag": "\"15ac2-HZTqv63OoLVBzocYS3ZeO9eQ2pw\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 88770,
		"path": "../public/images/authors/darya-filimonova/author.png"
	},
	"/images/authors/darya-filimonova/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33a-Jl/Oe4gjQYhcBrRMoxTFi/TiC68\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 826,
		"path": "../public/images/authors/darya-filimonova/author.svg"
	},
	"/images/authors/darya-filimonova/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5ec-ToWlRMID7zmCF93JBjCqOqwCBGQ\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 1516,
		"path": "../public/images/authors/darya-filimonova/cover.svg"
	},
	"/images/authors/darya-filimonova/cover.png": {
		"type": "image/png",
		"etag": "\"2e6ff-zar/guWGV3TFiGM2/6L0aY9EN3c\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 190207,
		"path": "../public/images/authors/darya-filimonova/cover.png"
	},
	"/images/authors/darya-filimonova/word-of-mouth-promotion.png": {
		"type": "image/png",
		"etag": "\"2e6ff-zar/guWGV3TFiGM2/6L0aY9EN3c\"",
		"mtime": "2026-08-31T04:35:25.262Z",
		"size": 190207,
		"path": "../public/images/authors/darya-filimonova/word-of-mouth-promotion.png"
	},
	"/images/authors/pavel-semenov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"334-118CDTTqyYw9/eU5/nGKE/sjttA\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 820,
		"path": "../public/images/authors/pavel-semenov/author.svg"
	},
	"/images/authors/pavel-semenov/author.png": {
		"type": "image/png",
		"etag": "\"1339b-AulRTzXsK97VX2gz8F60UlQ060Q\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 78747,
		"path": "../public/images/authors/pavel-semenov/author.png"
	},
	"/images/authors/pavel-semenov/business-hypotheses-intro.png": {
		"type": "image/png",
		"etag": "\"2c69f-ZEQ3JFnwoJ/AVfUghc76LlxvTsg\"",
		"mtime": "2026-08-31T04:35:25.264Z",
		"size": 181919,
		"path": "../public/images/authors/pavel-semenov/business-hypotheses-intro.png"
	},
	"/images/authors/pavel-semenov/cover.png": {
		"type": "image/png",
		"etag": "\"2c69f-ZEQ3JFnwoJ/AVfUghc76LlxvTsg\"",
		"mtime": "2026-08-31T04:35:25.264Z",
		"size": 181919,
		"path": "../public/images/authors/pavel-semenov/cover.png"
	},
	"/images/authors/pavel-semenov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5dc-Es2EtAqfwYA5rR4LwrOUczkBiR4\"",
		"mtime": "2026-08-31T04:35:25.264Z",
		"size": 1500,
		"path": "../public/images/authors/pavel-semenov/cover.svg"
	},
	"/images/authors/konstantin-kharsky/author.png": {
		"type": "image/png",
		"etag": "\"e765-foWe/YTamBeMgupP8sePAoHEJXA\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 59237,
		"path": "../public/images/authors/konstantin-kharsky/author.png"
	},
	"/images/authors/konstantin-kharsky/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33e-cF4HU8FPiMRsl5IKc4tSX1lqi6g\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 830,
		"path": "../public/images/authors/konstantin-kharsky/author.svg"
	},
	"/images/authors/konstantin-kharsky/buyer-states-sales-alt.png": {
		"type": "image/png",
		"etag": "\"21a5a-njZAtC+IBnE6zVVwtEa8VRL8Mv0\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 137818,
		"path": "../public/images/authors/konstantin-kharsky/buyer-states-sales-alt.png"
	},
	"/images/authors/konstantin-kharsky/buyer-states-sales.png": {
		"type": "image/png",
		"etag": "\"21a5a-njZAtC+IBnE6zVVwtEa8VRL8Mv0\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 137818,
		"path": "../public/images/authors/konstantin-kharsky/buyer-states-sales.png"
	},
	"/images/authors/konstantin-kharsky/cover.png": {
		"type": "image/png",
		"etag": "\"21a5a-njZAtC+IBnE6zVVwtEa8VRL8Mv0\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 137818,
		"path": "../public/images/authors/konstantin-kharsky/cover.png"
	},
	"/images/authors/konstantin-kharsky/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5f6-8SZKJompa78/aYM3wuzQp2lkjyY\"",
		"mtime": "2026-08-31T04:35:25.263Z",
		"size": 1526,
		"path": "../public/images/authors/konstantin-kharsky/cover.svg"
	},
	"/images/authors/yulia-volkova/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"7276-QDrHt6/iBWb1Ma5PGQLt0c3fVMI\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 29302,
		"path": "../public/images/authors/yulia-volkova/author.jpg"
	},
	"/images/authors/yulia-volkova/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"332-/PQPrFy8yt4HpmVGZ8AIhx/Se8M\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 818,
		"path": "../public/images/authors/yulia-volkova/author.svg"
	},
	"/images/authors/yulia-volkova/author.png": {
		"type": "image/png",
		"etag": "\"14398-zhG30enBpSs7xc2wSXfgd4kG0qc\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 82840,
		"path": "../public/images/authors/yulia-volkova/author.png"
	},
	"/images/authors/yulia-volkova/cover.png": {
		"type": "image/png",
		"etag": "\"2d45f-BukWkcRdOVh5thrWAnTx++oenLU\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 185439,
		"path": "../public/images/authors/yulia-volkova/cover.png"
	},
	"/images/authors/yulia-volkova/tax-system-selection.jpg": {
		"type": "image/jpeg",
		"etag": "\"4cf2-bdUaiP3O0dm5tTBcsXOh/ZgPb2o\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 19698,
		"path": "../public/images/authors/yulia-volkova/tax-system-selection.jpg"
	},
	"/images/authors/yulia-volkova/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e6-OHNHJF5hBdrayzbhqIDQBdDYgvU\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 1510,
		"path": "../public/images/authors/yulia-volkova/cover.svg"
	},
	"/images/catalog/alexandra-nikitina/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"340-Hs4PlwY48KXTx3ep9WbwEtwdGh8\"",
		"mtime": "2026-08-31T04:35:25.265Z",
		"size": 832,
		"path": "../public/images/catalog/alexandra-nikitina/author.svg"
	},
	"/images/authors/yulia-volkova/tax-system-selection.png": {
		"type": "image/png",
		"etag": "\"2d45f-BukWkcRdOVh5thrWAnTx++oenLU\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 185439,
		"path": "../public/images/authors/yulia-volkova/tax-system-selection.png"
	},
	"/images/catalog/alexandra-nikitina/author.png": {
		"type": "image/png",
		"etag": "\"14403-7r9QjMjZ3pequ27ame5qsfDtpDA\"",
		"mtime": "2026-08-31T04:35:25.250Z",
		"size": 82947,
		"path": "../public/images/catalog/alexandra-nikitina/author.png"
	},
	"/images/catalog/alexandra-nikitina/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5f8-PhI23EzBiSaxHvMTA8439EBO5nA\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 1528,
		"path": "../public/images/catalog/alexandra-nikitina/cover.svg"
	},
	"/images/catalog/alexandra-nikitina/cover.png": {
		"type": "image/png",
		"etag": "\"2b657-oxTXtsJeSxClkyc1FTKyj2F5BiQ\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 177751,
		"path": "../public/images/catalog/alexandra-nikitina/cover.png"
	},
	"/images/catalog/alexey-markov/author.png": {
		"type": "image/png",
		"etag": "\"15efe-uP55gJBW5tTo7ko0Ua+qdlVaoK0\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 89854,
		"path": "../public/images/catalog/alexey-markov/author.png"
	},
	"/images/catalog/alexey-markov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"336-z+dxZFogxjlT1Ml1jQ59eXZrgVM\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 822,
		"path": "../public/images/catalog/alexey-markov/author.svg"
	},
	"/images/catalog/alexey-markov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e2-hCzkemJfDagRl+HrJHqFp6iFLZw\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 1506,
		"path": "../public/images/catalog/alexey-markov/cover.svg"
	},
	"/images/catalog/alexey-markov/cover.png": {
		"type": "image/png",
		"etag": "\"2f402-NQndZpQIPELwJDsspcZB9Y1qPck\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 193538,
		"path": "../public/images/catalog/alexey-markov/cover.png"
	},
	"/images/catalog/artem-mushin/author.png": {
		"type": "image/png",
		"etag": "\"f6e1-zrYvtS5vSjzcqgWThJKnoHgnNIo\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 63201,
		"path": "../public/images/catalog/artem-mushin/author.png"
	},
	"/images/catalog/artem-mushin/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"330-B1qLpj2fiW3pzm2psQgvVxDNS4U\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 816,
		"path": "../public/images/catalog/artem-mushin/author.svg"
	},
	"/images/catalog/artem-mushin/cover.png": {
		"type": "image/png",
		"etag": "\"22142-G0zsAVAPQbrd92bYdLJL4rDTcyA\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 139586,
		"path": "../public/images/catalog/artem-mushin/cover.png"
	},
	"/images/catalog/artem-mushin/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"621-eETaHICGjUP6vUNHoljNnom6rcI\"",
		"mtime": "2026-08-31T04:35:25.266Z",
		"size": 1569,
		"path": "../public/images/catalog/artem-mushin/cover.svg"
	},
	"/images/catalog/darya-filimonova/author.png": {
		"type": "image/png",
		"etag": "\"15ac2-HZTqv63OoLVBzocYS3ZeO9eQ2pw\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 88770,
		"path": "../public/images/catalog/darya-filimonova/author.png"
	},
	"/images/catalog/darya-filimonova/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33a-Jl/Oe4gjQYhcBrRMoxTFi/TiC68\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 826,
		"path": "../public/images/catalog/darya-filimonova/author.svg"
	},
	"/images/catalog/darya-filimonova/cover.png": {
		"type": "image/png",
		"etag": "\"2e6ff-zar/guWGV3TFiGM2/6L0aY9EN3c\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 190207,
		"path": "../public/images/catalog/darya-filimonova/cover.png"
	},
	"/images/catalog/darya-filimonova/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5ec-ToWlRMID7zmCF93JBjCqOqwCBGQ\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 1516,
		"path": "../public/images/catalog/darya-filimonova/cover.svg"
	},
	"/images/catalog/igor-malinin/author.png": {
		"type": "image/png",
		"etag": "\"13163-CFjEvQNJ9+Gt+FZwkaodoVjJDbI\"",
		"mtime": "2026-08-31T04:35:25.252Z",
		"size": 78179,
		"path": "../public/images/catalog/igor-malinin/author.png"
	},
	"/images/catalog/igor-malinin/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"334-xsc43JOzmVjkbrOc5uUi6oUHEDI\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 820,
		"path": "../public/images/catalog/igor-malinin/author.svg"
	},
	"/images/catalog/igor-malinin/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e8-4X3f41Y0TlSLNUcgH5W/KuVLi40\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 1512,
		"path": "../public/images/catalog/igor-malinin/cover.svg"
	},
	"/images/catalog/igor-malinin/cover.png": {
		"type": "image/png",
		"etag": "\"2f275-PvKwXSN40xf0pYbZpCEpNgvNF9k\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 193141,
		"path": "../public/images/catalog/igor-malinin/cover.png"
	},
	"/images/catalog/igor-veretennikov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33e-U1bZo7nK1w/roKg591FOwCcAr/4\"",
		"mtime": "2026-08-31T04:35:25.267Z",
		"size": 830,
		"path": "../public/images/catalog/igor-veretennikov/author.svg"
	},
	"/images/catalog/igor-veretennikov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"608-Xza9scmD6L3h4g5iPcXRJAfjmmI\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 1544,
		"path": "../public/images/catalog/igor-veretennikov/cover.svg"
	},
	"/images/catalog/igor-veretennikov/cover.png": {
		"type": "image/png",
		"etag": "\"2e3b0-UcnhZVAbv8+gVK969jUv3sbGZjE\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 189360,
		"path": "../public/images/catalog/igor-veretennikov/cover.png"
	},
	"/images/catalog/igor-veretennikov/author.png": {
		"type": "image/png",
		"etag": "\"11aa3-UEXfuc1bfTmfGl9OWfUvQXLJ7l0\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 72355,
		"path": "../public/images/catalog/igor-veretennikov/author.png"
	},
	"/images/catalog/konstantin-kharsky/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"33e-cF4HU8FPiMRsl5IKc4tSX1lqi6g\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 830,
		"path": "../public/images/catalog/konstantin-kharsky/author.svg"
	},
	"/images/catalog/konstantin-kharsky/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5f6-8SZKJompa78/aYM3wuzQp2lkjyY\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 1526,
		"path": "../public/images/catalog/konstantin-kharsky/cover.svg"
	},
	"/images/catalog/konstantin-kharsky/author.png": {
		"type": "image/png",
		"etag": "\"e765-foWe/YTamBeMgupP8sePAoHEJXA\"",
		"mtime": "2026-08-31T04:35:25.252Z",
		"size": 59237,
		"path": "../public/images/catalog/konstantin-kharsky/author.png"
	},
	"/images/catalog/pavel-semenov/author.png": {
		"type": "image/png",
		"etag": "\"1339b-AulRTzXsK97VX2gz8F60UlQ060Q\"",
		"mtime": "2026-08-31T04:35:25.253Z",
		"size": 78747,
		"path": "../public/images/catalog/pavel-semenov/author.png"
	},
	"/images/catalog/konstantin-kharsky/cover.png": {
		"type": "image/png",
		"etag": "\"21a5a-njZAtC+IBnE6zVVwtEa8VRL8Mv0\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 137818,
		"path": "../public/images/catalog/konstantin-kharsky/cover.png"
	},
	"/images/catalog/pavel-semenov/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"334-118CDTTqyYw9/eU5/nGKE/sjttA\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 820,
		"path": "../public/images/catalog/pavel-semenov/author.svg"
	},
	"/images/catalog/pavel-semenov/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5dc-Es2EtAqfwYA5rR4LwrOUczkBiR4\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 1500,
		"path": "../public/images/catalog/pavel-semenov/cover.svg"
	},
	"/images/catalog/pavel-semenov/cover.png": {
		"type": "image/png",
		"etag": "\"2c69f-ZEQ3JFnwoJ/AVfUghc76LlxvTsg\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 181919,
		"path": "../public/images/catalog/pavel-semenov/cover.png"
	},
	"/images/catalog/yulia-volkova/author.png": {
		"type": "image/png",
		"etag": "\"14398-zhG30enBpSs7xc2wSXfgd4kG0qc\"",
		"mtime": "2026-08-31T04:35:25.253Z",
		"size": 82840,
		"path": "../public/images/catalog/yulia-volkova/author.png"
	},
	"/images/catalog/yulia-volkova/author.svg": {
		"type": "image/svg+xml",
		"etag": "\"332-/PQPrFy8yt4HpmVGZ8AIhx/Se8M\"",
		"mtime": "2026-08-31T04:35:25.271Z",
		"size": 818,
		"path": "../public/images/catalog/yulia-volkova/author.svg"
	},
	"/images/catalog/yulia-volkova/cover.svg": {
		"type": "image/svg+xml",
		"etag": "\"5e6-OHNHJF5hBdrayzbhqIDQBdDYgvU\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 1510,
		"path": "../public/images/catalog/yulia-volkova/cover.svg"
	},
	"/images/catalog/yulia-volkova/cover.png": {
		"type": "image/png",
		"etag": "\"2d45f-BukWkcRdOVh5thrWAnTx++oenLU\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 185439,
		"path": "../public/images/catalog/yulia-volkova/cover.png"
	},
	"/images/scraped/alexey-markov/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"d15f-e2NDNciIRqF4/JP735G11h2tpic\"",
		"mtime": "2026-08-31T04:35:25.250Z",
		"size": 53599,
		"path": "../public/images/scraped/alexey-markov/author.jpg"
	},
	"/images/scraped/alexey-markov/book-cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"13494-HUpR5bMwQFY6Sm3JDPGA1X0Pves\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 78996,
		"path": "../public/images/scraped/alexey-markov/book-cover.jpg"
	},
	"/images/scraped/alexey-markov/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"25603-/fpFbSF/lSu3o41Bl0UshWwuj08\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 153091,
		"path": "../public/images/scraped/alexey-markov/cover.jpg"
	},
	"/images/scraped/alexey-markov/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f044-ODX8hEVF6bFXIoRKs+7B4gNm+wU\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 127044,
		"path": "../public/images/scraped/alexey-markov/lesson-01.jpg"
	},
	"/images/scraped/alexey-markov/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ee74-pbVCbbC0aD5QbZXLi+C0qb+mfbc\"",
		"mtime": "2026-08-31T04:35:25.274Z",
		"size": 126580,
		"path": "../public/images/scraped/alexey-markov/lesson-02.jpg"
	},
	"/images/scraped/alexey-markov/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ea65-gXpkCRYfn2kYAO6afXdOCRwOcWo\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 125541,
		"path": "../public/images/scraped/alexey-markov/lesson-03.jpg"
	},
	"/images/scraped/alexey-markov/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e9aa-GzjqCdOEBmMFOd4kTDPvZVQuEJk\"",
		"mtime": "2026-08-31T04:35:25.274Z",
		"size": 125354,
		"path": "../public/images/scraped/alexey-markov/lesson-04.jpg"
	},
	"/images/scraped/alexey-markov/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e6af-p/Rl1uvLiySApSKpn+NawKYg/BI\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 124591,
		"path": "../public/images/scraped/alexey-markov/lesson-05.jpg"
	},
	"/images/scraped/alexey-markov/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f06c-NhV3wQfl5zYlAsOKlm2TSMabWqg\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 127084,
		"path": "../public/images/scraped/alexey-markov/lesson-06.jpg"
	},
	"/images/scraped/alexey-markov/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e1f7-WpJkWedHITawnmKUYOP+IA5/PXA\"",
		"mtime": "2026-08-31T04:35:25.274Z",
		"size": 123383,
		"path": "../public/images/scraped/alexey-markov/material-01.jpg"
	},
	"/images/scraped/alexey-markov/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1eeb8-OEFWhFsjTYu1l9IOlm+KToDKxnY\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 126648,
		"path": "../public/images/scraped/alexey-markov/material-02.jpg"
	},
	"/images/scraped/alexey-markov/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f9b6-Jp53KI4hL9I30hQdRqYDYTUg35c\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 129462,
		"path": "../public/images/scraped/alexey-markov/material-03.jpg"
	},
	"/images/scraped/alexey-markov/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ef20-faDb2lI7O+XSWmT10H91Smto1L4\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 126752,
		"path": "../public/images/scraped/alexey-markov/material-04.jpg"
	},
	"/images/scraped/artem-mushin/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"e5d0-dfb6dTFaDtS3qKv9kQJtkcvgvyg\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 58832,
		"path": "../public/images/scraped/artem-mushin/author.jpg"
	},
	"/images/scraped/artem-mushin/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"17e18-9MSowQ7UTrDO9PtgX1k4H7X0sR8\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 97816,
		"path": "../public/images/scraped/artem-mushin/lesson-01.jpg"
	},
	"/images/scraped/artem-mushin/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a610-8bUJphwBa7PMH15ck1DTFd+YWEc\"",
		"mtime": "2026-08-31T04:35:25.253Z",
		"size": 173584,
		"path": "../public/images/scraped/artem-mushin/cover.jpg"
	},
	"/images/scraped/artem-mushin/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"15074-g8phcqsYuE10vRNUzNfuJAcN910\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 86132,
		"path": "../public/images/scraped/artem-mushin/lesson-02.jpg"
	},
	"/images/scraped/artem-mushin/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cc46-iPSvTc+3xPRSgBKOrIzA3P6OBC8\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 117830,
		"path": "../public/images/scraped/artem-mushin/lesson-03.jpg"
	},
	"/images/scraped/artem-mushin/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"17f4d-yPvxxEAsQTHlCZ76Dt2ucePsqPE\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 98125,
		"path": "../public/images/scraped/artem-mushin/lesson-04.jpg"
	},
	"/images/scraped/artem-mushin/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f10-Bc+/Dn7Ie2Gf9qW+UnvfDCKuRKk\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 85776,
		"path": "../public/images/scraped/artem-mushin/lesson-05.jpg"
	},
	"/images/scraped/artem-mushin/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"19c1b-ZbVR7JA4iwV6NP3XT3IzyV+zS7E\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 105499,
		"path": "../public/images/scraped/artem-mushin/material-01.jpg"
	},
	"/images/scraped/artem-mushin/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d7dc-F/JW+sdAAOl1I6jNMBuyMp2oyOI\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 120796,
		"path": "../public/images/scraped/artem-mushin/lesson-06.jpg"
	},
	"/images/scraped/artem-mushin/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"17b07-8PRp+zZnDFpQhwOEBZpkZOCK6AM\"",
		"mtime": "2026-08-31T04:35:25.276Z",
		"size": 97031,
		"path": "../public/images/scraped/artem-mushin/material-02.jpg"
	},
	"/images/scraped/artem-mushin/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"19c1b-ZbVR7JA4iwV6NP3XT3IzyV+zS7E\"",
		"mtime": "2026-08-31T04:35:25.278Z",
		"size": 105499,
		"path": "../public/images/scraped/artem-mushin/material-04.jpg"
	},
	"/images/scraped/artem-mushin/photo-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ed34-eRxFubO7jnmxVoSmvU7J7L9gshE\"",
		"mtime": "2026-08-31T04:35:25.278Z",
		"size": 60724,
		"path": "../public/images/scraped/artem-mushin/photo-1.jpg"
	},
	"/images/scraped/artem-mushin/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f951-mlcLCpNt2JcWAgJR8n7YI73QvJ0\"",
		"mtime": "2026-08-31T04:35:25.279Z",
		"size": 129361,
		"path": "../public/images/scraped/artem-mushin/material-03.jpg"
	},
	"/images/scraped/artem-mushin/photo-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"fbb9-YtZRE1sytJw3zabrS/xgmS1ZEhs\"",
		"mtime": "2026-08-31T04:35:25.279Z",
		"size": 64441,
		"path": "../public/images/scraped/artem-mushin/photo-2.jpg"
	},
	"/images/scraped/artem-mushin/photo-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"47609-y1s7WDeAZZ4qPVEiIzAMzY3G+no\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 292361,
		"path": "../public/images/scraped/artem-mushin/photo-3.jpg"
	},
	"/images/scraped/igor-veretennikov/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"5806-lU82Dv/dZ6/soQHqY23IQqSrOfk\"",
		"mtime": "2026-08-31T04:35:25.254Z",
		"size": 22534,
		"path": "../public/images/scraped/igor-veretennikov/author.jpg"
	},
	"/images/scraped/igor-veretennikov/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"25ad5-D18oEFzhh5762Mo850jHwTq3v+U\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 154325,
		"path": "../public/images/scraped/igor-veretennikov/cover.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"16f0e-DFDBQv5qGe3JbV3nKSG7sGzhGng\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 93966,
		"path": "../public/images/scraped/igor-veretennikov/lesson-01.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"33895-mYokitN+kIs30N3fH073hUJnqZ8\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 211093,
		"path": "../public/images/scraped/igor-veretennikov/lesson-02.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 127220,
		"path": "../public/images/scraped/igor-veretennikov/lesson-04.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"2514d-q+un3Yt0IGljdQTk6rm7wtUUsm8\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 151885,
		"path": "../public/images/scraped/igor-veretennikov/lesson-03.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 127220,
		"path": "../public/images/scraped/igor-veretennikov/lesson-05.jpg"
	},
	"/images/scraped/igor-veretennikov/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 127220,
		"path": "../public/images/scraped/igor-veretennikov/lesson-06.jpg"
	},
	"/images/scraped/igor-veretennikov/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"19331-djMMB3eXi3nYxujyCKfUBj7XqIw\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 103217,
		"path": "../public/images/scraped/igor-veretennikov/material-01.jpg"
	},
	"/images/scraped/igor-veretennikov/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"3703a-50zcUAHJHO5818DZLsDv0KxPaHc\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 225338,
		"path": "../public/images/scraped/igor-veretennikov/material-02.jpg"
	},
	"/images/scraped/darya-filimonova/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d8f-WyeD/0kgeJ8fPARZGxE+MeW3Olc\"",
		"mtime": "2026-08-31T04:35:25.254Z",
		"size": 32143,
		"path": "../public/images/scraped/darya-filimonova/author.jpg"
	},
	"/images/scraped/darya-filimonova/course-page.webp": {
		"type": "image/webp",
		"etag": "\"1a270-zc1TEI6Tn/f6vCUbhuQM+/u6Ews\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 107120,
		"path": "../public/images/scraped/darya-filimonova/course-page.webp"
	},
	"/images/scraped/igor-veretennikov/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"225c2-BdAOX7w77hPjhL8BKR5mY9DVzNs\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 140738,
		"path": "../public/images/scraped/igor-veretennikov/material-04.jpg"
	},
	"/images/scraped/igor-veretennikov/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"29ae6-8mdSAdY3GmAYffDCuJYo2c9rdcc\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 170726,
		"path": "../public/images/scraped/igor-veretennikov/material-03.jpg"
	},
	"/images/scraped/darya-filimonova/author.webp": {
		"type": "image/webp",
		"etag": "\"848-0M0KxwmjjsEARROnoOXB8hCOO4k\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 2120,
		"path": "../public/images/scraped/darya-filimonova/author.webp"
	},
	"/images/scraped/darya-filimonova/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"15004-6SfjrSWcNgOfl/D6CvBrWQ1OOPk\"",
		"mtime": "2026-08-31T04:35:25.279Z",
		"size": 86020,
		"path": "../public/images/scraped/darya-filimonova/cover.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"c623-Ohd5Dt5vng9eJlrxprQSy8v4QSw\"",
		"mtime": "2026-08-31T04:35:25.281Z",
		"size": 50723,
		"path": "../public/images/scraped/darya-filimonova/lesson-01.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"b3ec-MrYkMtda+EPJDjfZED4B4paKgA8\"",
		"mtime": "2026-08-31T04:35:25.281Z",
		"size": 46060,
		"path": "../public/images/scraped/darya-filimonova/lesson-02.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"af99-K5I6uifKHkkEl5/5DIpYWBvLCYY\"",
		"mtime": "2026-08-31T04:35:25.282Z",
		"size": 44953,
		"path": "../public/images/scraped/darya-filimonova/lesson-03.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"dd2d-o/lSRO3/vfgV6VTCmHAaq6B8kD4\"",
		"mtime": "2026-08-31T04:35:25.281Z",
		"size": 56621,
		"path": "../public/images/scraped/darya-filimonova/lesson-04.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"c353-dGj58cis7xXLxzsoZJoHVBl3DLQ\"",
		"mtime": "2026-08-31T04:35:25.282Z",
		"size": 50003,
		"path": "../public/images/scraped/darya-filimonova/lesson-05.jpg"
	},
	"/images/scraped/darya-filimonova/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"bd0c-/tTIben8F08rDiUM3Y1S0OpBh7E\"",
		"mtime": "2026-08-31T04:35:25.282Z",
		"size": 48396,
		"path": "../public/images/scraped/darya-filimonova/lesson-06.jpg"
	},
	"/images/scraped/darya-filimonova/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"d73e-Egk7PYsHdAJIRRobqjMZZmQVaqY\"",
		"mtime": "2026-08-31T04:35:25.282Z",
		"size": 55102,
		"path": "../public/images/scraped/darya-filimonova/material-01.jpg"
	},
	"/images/scraped/darya-filimonova/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"c857-2LkS2JYCiA5ho69XLnP4zhbd2XA\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 51287,
		"path": "../public/images/scraped/darya-filimonova/material-02.jpg"
	},
	"/images/scraped/darya-filimonova/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"c111-aiKVB3sPz2xr/MiXqJSsr/lT5QE\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 49425,
		"path": "../public/images/scraped/darya-filimonova/material-03.jpg"
	},
	"/images/scraped/darya-filimonova/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"eeea-6heQ5h7bxQWGcsUeDf29Y6KhSY4\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 61162,
		"path": "../public/images/scraped/darya-filimonova/material-04.jpg"
	},
	"/images/scraped/igor-malinin/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"12f64-z5xmi9ha2Mr7ktFVNHdY4dEUBH8\"",
		"mtime": "2026-08-31T04:35:25.254Z",
		"size": 77668,
		"path": "../public/images/scraped/igor-malinin/author.jpg"
	},
	"/images/scraped/igor-malinin/author.webp": {
		"type": "image/webp",
		"etag": "\"66da-Gkxk4khDgyENrCC915h31FdWFrA\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 26330,
		"path": "../public/images/scraped/igor-malinin/author.webp"
	},
	"/images/scraped/igor-malinin/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"28337-52yQAVkOlDRUJUf1IQ6a9ZZd85w\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 164663,
		"path": "../public/images/scraped/igor-malinin/cover.jpg"
	},
	"/images/scraped/igor-malinin/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cc11-qHWhgPPtRoYopT8w9Nisr9n0/zA\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 117777,
		"path": "../public/images/scraped/igor-malinin/lesson-01.jpg"
	},
	"/images/scraped/igor-malinin/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"2018a-nXVZPtYbuCmrQOuylgpWd9CcANY\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 131466,
		"path": "../public/images/scraped/igor-malinin/lesson-03.jpg"
	},
	"/images/scraped/igor-malinin/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"30f45-Ee6PAxBr7kgOT1L1knpiegN1wgM\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 200517,
		"path": "../public/images/scraped/igor-malinin/lesson-02.jpg"
	},
	"/images/scraped/igor-malinin/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cf32-32pibEcamGSOyNuAW4heEYgunbU\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 118578,
		"path": "../public/images/scraped/igor-malinin/lesson-04.jpg"
	},
	"/images/scraped/igor-malinin/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d2c1-ZRVGsSeB499NsmLwqUzPnNESc1M\"",
		"mtime": "2026-08-31T04:35:25.284Z",
		"size": 119489,
		"path": "../public/images/scraped/igor-malinin/lesson-06.jpg"
	},
	"/images/scraped/igor-malinin/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"30c66-zwaTtJEfv+lKSQbW1Ez45bqJeUY\"",
		"mtime": "2026-08-31T04:35:25.283Z",
		"size": 199782,
		"path": "../public/images/scraped/igor-malinin/lesson-05.jpg"
	},
	"/images/scraped/igor-malinin/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"22a60-5jdj5lPx96cBh1JRNihJ1qpwJ7w\"",
		"mtime": "2026-08-31T04:35:25.284Z",
		"size": 141920,
		"path": "../public/images/scraped/igor-malinin/material-01.jpg"
	},
	"/images/scraped/igor-malinin/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ebbb-xPe/krumwcD+cMcpo2B2aDj8FkA\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 125883,
		"path": "../public/images/scraped/igor-malinin/material-03.jpg"
	},
	"/images/scraped/igor-malinin/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"22a60-5jdj5lPx96cBh1JRNihJ1qpwJ7w\"",
		"mtime": "2026-08-31T04:35:25.284Z",
		"size": 141920,
		"path": "../public/images/scraped/igor-malinin/material-04.jpg"
	},
	"/images/scraped/igor-malinin/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"356f2-mie7MEWojk58PdRIU3o5d361Q5M\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 218866,
		"path": "../public/images/scraped/igor-malinin/material-02.jpg"
	},
	"/images/scraped/igor-malinin/photo-1.webp": {
		"type": "image/webp",
		"etag": "\"1f78c-oDxl7v+dIPR93C6WrxSnmlRjyl0\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 128908,
		"path": "../public/images/scraped/igor-malinin/photo-1.webp"
	},
	"/images/scraped/pavel-semenov/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"d143-3EQs2NcRj5vFQFmirizZyhzD/KE\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 53571,
		"path": "../public/images/scraped/pavel-semenov/author.jpg"
	},
	"/images/scraped/igor-malinin/photo-2.webp": {
		"type": "image/webp",
		"etag": "\"54996-2ghwSispfrMY3cmpE6q+VUSW+CQ\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 346518,
		"path": "../public/images/scraped/igor-malinin/photo-2.webp"
	},
	"/images/scraped/pavel-semenov/author-cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"2940c-KSoIfYbm4eYNqsuduZq6ZKarCpE\"",
		"mtime": "2026-08-31T04:35:25.254Z",
		"size": 168972,
		"path": "../public/images/scraped/pavel-semenov/author-cover.jpg"
	},
	"/images/scraped/igor-malinin/photo-3.webp": {
		"type": "image/webp",
		"etag": "\"13160-otDTp7bs7kIEs2UNVJJMFwha7ZQ\"",
		"mtime": "2026-08-31T04:35:25.285Z",
		"size": 78176,
		"path": "../public/images/scraped/igor-malinin/photo-3.webp"
	},
	"/images/scraped/pavel-semenov/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"29740-Nhc8hGkXxG1edhpIe2dpwlO9Veg\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 169792,
		"path": "../public/images/scraped/pavel-semenov/cover.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"16398-IF+m1kI1/rV56WICdDgY855QXLA\"",
		"mtime": "2026-08-31T04:35:25.289Z",
		"size": 91032,
		"path": "../public/images/scraped/pavel-semenov/lesson-01.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1648b-G6s+fYTBGhc5iqEJ6lj/wQgqnzE\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 91275,
		"path": "../public/images/scraped/pavel-semenov/lesson-02.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"16496-La4VpsDHJAZTfs8d6ezTo9yudn8\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 91286,
		"path": "../public/images/scraped/pavel-semenov/lesson-03.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"105c6-oSI0QdZeVWlld/Kom3e4skjt844\"",
		"mtime": "2026-08-31T04:35:25.286Z",
		"size": 67014,
		"path": "../public/images/scraped/pavel-semenov/lesson-04.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"105c6-oSI0QdZeVWlld/Kom3e4skjt844\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 67014,
		"path": "../public/images/scraped/pavel-semenov/lesson-05.jpg"
	},
	"/images/scraped/pavel-semenov/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"101ad-Av19ePOvUlI4bP3kwAWnI59HGsI\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 65965,
		"path": "../public/images/scraped/pavel-semenov/lesson-06.jpg"
	},
	"/images/scraped/pavel-semenov/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f5c-jk3SIQdaPRBbXgqilkaCWBfsaIQ\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 85852,
		"path": "../public/images/scraped/pavel-semenov/material-01.jpg"
	},
	"/images/scraped/pavel-semenov/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"174cf-6yXLEaDMdybezmvFjlaivUjLqBo\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 95439,
		"path": "../public/images/scraped/pavel-semenov/material-02.jpg"
	},
	"/images/scraped/pavel-semenov/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"11805-yczzPzlI5NxSorr4YJTs5d62WJY\"",
		"mtime": "2026-08-31T04:35:25.287Z",
		"size": 71685,
		"path": "../public/images/scraped/pavel-semenov/material-03.jpg"
	},
	"/images/scraped/pavel-semenov/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f5c-jk3SIQdaPRBbXgqilkaCWBfsaIQ\"",
		"mtime": "2026-08-31T04:35:25.288Z",
		"size": 85852,
		"path": "../public/images/scraped/pavel-semenov/material-04.jpg"
	},
	"/images/reference/course/irina-avatar.jpg": {
		"type": "image/jpeg",
		"etag": "\"1b512-ZXc+6AT95ddTQh97LYiMvQY5B+I\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 111890,
		"path": "../public/images/reference/course/irina-avatar.jpg"
	},
	"/images/reference/course/irina-video.jpg": {
		"type": "image/jpeg",
		"etag": "\"16b46-oTNRlnQyTMWMinx7/xPylbHGnTA\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 92998,
		"path": "../public/images/reference/course/irina-video.jpg"
	},
	"/images/reference/course/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"9dea-VptvneGimT9Yom+/QPG5pjQmeS8\"",
		"mtime": "2026-08-31T04:35:25.272Z",
		"size": 40426,
		"path": "../public/images/reference/course/lesson-01.jpg"
	},
	"/images/reference/course/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"89f6-RNAGJqyMHr4oBduCdsjiqeZwIdQ\"",
		"mtime": "2026-08-31T04:35:25.275Z",
		"size": 35318,
		"path": "../public/images/reference/course/lesson-02.jpg"
	},
	"/images/reference/course/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"10cdc-qbkSnsTg/zK2+mDYvY9mHltouNI\"",
		"mtime": "2026-08-31T04:35:25.271Z",
		"size": 68828,
		"path": "../public/images/reference/course/lesson-03.jpg"
	},
	"/images/reference/course/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"dcfd-zpIDp6FcsBeP3P+IUz28yAM7AYI\"",
		"mtime": "2026-08-31T04:35:25.271Z",
		"size": 56573,
		"path": "../public/images/reference/course/lesson-04.jpg"
	},
	"/images/reference/course/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"b8eb-PRjHGAlX5azvz9STw5KpY9vFMqY\"",
		"mtime": "2026-08-31T04:35:25.272Z",
		"size": 47339,
		"path": "../public/images/reference/course/lesson-05.jpg"
	},
	"/images/reference/course/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"10c73-IYjhn6k8MbdEF9et7g2KuggAAIM\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 68723,
		"path": "../public/images/reference/course/material-03.jpg"
	},
	"/images/reference/course/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"10c73-IYjhn6k8MbdEF9et7g2KuggAAIM\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 68723,
		"path": "../public/images/reference/course/material-04.jpg"
	},
	"/images/reference/course/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"10c73-IYjhn6k8MbdEF9et7g2KuggAAIM\"",
		"mtime": "2026-08-31T04:35:25.273Z",
		"size": 68723,
		"path": "../public/images/reference/course/material-01.jpg"
	},
	"/images/reference/course/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"13a79-iKomuRtQmARnbQYFEj39bMhbSyY\"",
		"mtime": "2026-08-31T04:35:25.272Z",
		"size": 80505,
		"path": "../public/images/reference/course/lesson-06.jpg"
	},
	"/images/reference/course/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"10c73-IYjhn6k8MbdEF9et7g2KuggAAIM\"",
		"mtime": "2026-08-31T04:35:25.272Z",
		"size": 68723,
		"path": "../public/images/reference/course/material-02.jpg"
	},
	"/images/reference/author/course-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"c53e-948qeyApFWTMOqC0KUlL3Lf+bIg\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 50494,
		"path": "../public/images/reference/author/course-03.jpg"
	},
	"/images/reference/author/course-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"124fb-7ofa15P3H84mVH8zPCRg8Xd/3yI\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 75003,
		"path": "../public/images/reference/author/course-01.jpg"
	},
	"/images/reference/author/course-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1836b-Z9DmGAik5t22/Gp4J6NxzpAT5pA\"",
		"mtime": "2026-08-31T04:35:25.268Z",
		"size": 99179,
		"path": "../public/images/reference/author/course-02.jpg"
	},
	"/images/reference/course/beach-cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"c70d0-zFW6Kw3XwdzG0tPkAl9ctUPisAU\"",
		"mtime": "2026-08-31T04:35:25.253Z",
		"size": 815312,
		"path": "../public/images/reference/course/beach-cover.jpg"
	},
	"/images/reference/author/artem.jpg": {
		"type": "image/jpeg",
		"etag": "\"afa0-57Kzou0Vfr66LqFl6FDn2VNMXYo\"",
		"mtime": "2026-08-31T04:35:25.250Z",
		"size": 44960,
		"path": "../public/images/reference/author/artem.jpg"
	},
	"/images/reference/author/course-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"8b82-qYVmffJUY8pt0yGyLIDJMzW+KPQ\"",
		"mtime": "2026-08-31T04:35:25.269Z",
		"size": 35714,
		"path": "../public/images/reference/author/course-04.jpg"
	},
	"/images/reference/author/course-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"fffc-mxu4zl4tNVedM4YgHJkvCCC8WSc\"",
		"mtime": "2026-08-31T04:35:25.269Z",
		"size": 65532,
		"path": "../public/images/reference/author/course-05.jpg"
	},
	"/images/reference/author/course-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cbc5-VOvEBohMmZLzGXLUqrWmyuW9D54\"",
		"mtime": "2026-08-31T04:35:25.270Z",
		"size": 117701,
		"path": "../public/images/reference/author/course-06.jpg"
	},
	"/images/reference/author/course-07.jpg": {
		"type": "image/jpeg",
		"etag": "\"bd7c-47iJ8M3NG8YXJA326IrkkDgcqTM\"",
		"mtime": "2026-08-31T04:35:25.271Z",
		"size": 48508,
		"path": "../public/images/reference/author/course-07.jpg"
	},
	"/images/reference/author/course-08.jpg": {
		"type": "image/jpeg",
		"etag": "\"dfee-vYyDRndaoV5suKbvCD6uLlSMnQk\"",
		"mtime": "2026-08-31T04:35:25.271Z",
		"size": 57326,
		"path": "../public/images/reference/author/course-08.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/1.jpg": {
		"type": "image/jpeg",
		"etag": "\"154f3-+b0w1nlWNDmm8+rlwpQcA9jxBaQ\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 87283,
		"path": "../public/images/authors/alexandra-nikitina/lessons/1.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/10.jfif": {
		"type": "image/pjpeg",
		"etag": "\"fcb8-uX85jOP3e0mzjZo5sxUBIJ6gSSs\"",
		"mtime": "2026-08-31T04:35:25.289Z",
		"size": 64696,
		"path": "../public/images/authors/alexandra-nikitina/lessons/10.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/10.jpg": {
		"type": "image/jpeg",
		"etag": "\"fcb8-uX85jOP3e0mzjZo5sxUBIJ6gSSs\"",
		"mtime": "2026-08-31T04:35:25.288Z",
		"size": 64696,
		"path": "../public/images/authors/alexandra-nikitina/lessons/10.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/11.jfif": {
		"type": "image/pjpeg",
		"etag": "\"12690-UQ6kdxPEKMumCwtswiXHCwhUn+Q\"",
		"mtime": "2026-08-31T04:35:25.289Z",
		"size": 75408,
		"path": "../public/images/authors/alexandra-nikitina/lessons/11.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/11.jpg": {
		"type": "image/jpeg",
		"etag": "\"12690-UQ6kdxPEKMumCwtswiXHCwhUn+Q\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 75408,
		"path": "../public/images/authors/alexandra-nikitina/lessons/11.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/12.jfif": {
		"type": "image/pjpeg",
		"etag": "\"14d83-KsV0AjZjltAuQ0QDnkKiHFOJwKc\"",
		"mtime": "2026-08-31T04:35:25.289Z",
		"size": 85379,
		"path": "../public/images/authors/alexandra-nikitina/lessons/12.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/12.jpg": {
		"type": "image/jpeg",
		"etag": "\"14d83-KsV0AjZjltAuQ0QDnkKiHFOJwKc\"",
		"mtime": "2026-08-31T04:35:25.289Z",
		"size": 85379,
		"path": "../public/images/authors/alexandra-nikitina/lessons/12.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/13.jfif": {
		"type": "image/pjpeg",
		"etag": "\"129dd-PctabReihAEiuegGr8Rhev/yJs8\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 76253,
		"path": "../public/images/authors/alexandra-nikitina/lessons/13.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/13.jpg": {
		"type": "image/jpeg",
		"etag": "\"14d83-KsV0AjZjltAuQ0QDnkKiHFOJwKc\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 85379,
		"path": "../public/images/authors/alexandra-nikitina/lessons/13.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/2.jfif": {
		"type": "image/pjpeg",
		"etag": "\"18463-nySW5aYhPnDT777wXv826H4UXZQ\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 99427,
		"path": "../public/images/authors/alexandra-nikitina/lessons/2.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/2.jpg": {
		"type": "image/jpeg",
		"etag": "\"18463-nySW5aYhPnDT777wXv826H4UXZQ\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 99427,
		"path": "../public/images/authors/alexandra-nikitina/lessons/2.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/3.jfif": {
		"type": "image/pjpeg",
		"etag": "\"cade-E8j3CHrD9nxLq0K7llvHkJaeeuM\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 51934,
		"path": "../public/images/authors/alexandra-nikitina/lessons/3.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/3.jpg": {
		"type": "image/jpeg",
		"etag": "\"cade-E8j3CHrD9nxLq0K7llvHkJaeeuM\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 51934,
		"path": "../public/images/authors/alexandra-nikitina/lessons/3.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/1.png": {
		"type": "image/png",
		"etag": "\"aa426-LNxREjBSuWOy/J33Xsi7fuKpZLQ\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 697382,
		"path": "../public/images/authors/alexandra-nikitina/lessons/1.png"
	},
	"/images/authors/alexandra-nikitina/lessons/4.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e906-g+mgSYjSuZaLiyUx9ZaQvcyDvaA\"",
		"mtime": "2026-08-31T04:35:25.290Z",
		"size": 59654,
		"path": "../public/images/authors/alexandra-nikitina/lessons/4.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/4.jpg": {
		"type": "image/jpeg",
		"etag": "\"e906-g+mgSYjSuZaLiyUx9ZaQvcyDvaA\"",
		"mtime": "2026-08-31T04:35:25.291Z",
		"size": 59654,
		"path": "../public/images/authors/alexandra-nikitina/lessons/4.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/5.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e463-VptqLPePDqTZTqv8DUc4XulOtbY\"",
		"mtime": "2026-08-31T04:35:25.291Z",
		"size": 58467,
		"path": "../public/images/authors/alexandra-nikitina/lessons/5.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/5.jpg": {
		"type": "image/jpeg",
		"etag": "\"e463-VptqLPePDqTZTqv8DUc4XulOtbY\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 58467,
		"path": "../public/images/authors/alexandra-nikitina/lessons/5.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/6.jfif": {
		"type": "image/pjpeg",
		"etag": "\"e6d2-jENDS0xZ89Ykwg4WneaMNpl7CIc\"",
		"mtime": "2026-08-31T04:35:25.291Z",
		"size": 59090,
		"path": "../public/images/authors/alexandra-nikitina/lessons/6.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/424p2v6xzhlcxcr5kf4k.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a332-/JRwOnxPNm+qQevTXwnDZ0aApaM\"",
		"mtime": "2026-08-31T04:35:25.291Z",
		"size": 107314,
		"path": "../public/images/authors/alexandra-nikitina/lessons/424p2v6xzhlcxcr5kf4k.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/6.jpg": {
		"type": "image/jpeg",
		"etag": "\"e6d2-jENDS0xZ89Ykwg4WneaMNpl7CIc\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 59090,
		"path": "../public/images/authors/alexandra-nikitina/lessons/6.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/7.jfif": {
		"type": "image/pjpeg",
		"etag": "\"c8de-iNTN1JFx3iUeD5SCIEC93C1jjQc\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 51422,
		"path": "../public/images/authors/alexandra-nikitina/lessons/7.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/7.jpg": {
		"type": "image/jpeg",
		"etag": "\"c8de-iNTN1JFx3iUeD5SCIEC93C1jjQc\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 51422,
		"path": "../public/images/authors/alexandra-nikitina/lessons/7.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/8.jfif": {
		"type": "image/pjpeg",
		"etag": "\"da71-MYvgdaQvEnx75CtAFBcJeCW8P0k\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 55921,
		"path": "../public/images/authors/alexandra-nikitina/lessons/8.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/8.jpg": {
		"type": "image/jpeg",
		"etag": "\"da71-MYvgdaQvEnx75CtAFBcJeCW8P0k\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 55921,
		"path": "../public/images/authors/alexandra-nikitina/lessons/8.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/9.jfif": {
		"type": "image/pjpeg",
		"etag": "\"ce1a-QHEZn9qxJ95lRDh1GweHK3sNot0\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 52762,
		"path": "../public/images/authors/alexandra-nikitina/lessons/9.jfif"
	},
	"/images/authors/alexandra-nikitina/lessons/9.jpg": {
		"type": "image/jpeg",
		"etag": "\"ce1a-QHEZn9qxJ95lRDh1GweHK3sNot0\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 52762,
		"path": "../public/images/authors/alexandra-nikitina/lessons/9.jpg"
	},
	"/images/authors/alexey-markov/lessons/1.jpg": {
		"type": "image/jpeg",
		"etag": "\"89a7-gtoXk1u8nAfuuuHuCbCpEHq1Lm4\"",
		"mtime": "2026-08-31T04:35:25.250Z",
		"size": 35239,
		"path": "../public/images/authors/alexey-markov/lessons/1.jpg"
	},
	"/images/authors/alexey-markov/lessons/10.jpg": {
		"type": "image/jpeg",
		"etag": "\"9120-lN06AMRSecqN9dF/hv66RA7X5Xk\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 37152,
		"path": "../public/images/authors/alexey-markov/lessons/10.jpg"
	},
	"/images/authors/alexey-markov/lessons/2.jpg": {
		"type": "image/jpeg",
		"etag": "\"b135-yVojhrPRuTXwPdqj/pclRCRIhsM\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 45365,
		"path": "../public/images/authors/alexey-markov/lessons/2.jpg"
	},
	"/images/authors/alexey-markov/lessons/3.jpg": {
		"type": "image/jpeg",
		"etag": "\"9001-n73Tc4nJaab6X+iyGVE95wJYZec\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 36865,
		"path": "../public/images/authors/alexey-markov/lessons/3.jpg"
	},
	"/images/authors/alexey-markov/lessons/4.jpg": {
		"type": "image/jpeg",
		"etag": "\"91c5-2EIe+L2t5X0U3Vbkmcb4Oa7MMJU\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 37317,
		"path": "../public/images/authors/alexey-markov/lessons/4.jpg"
	},
	"/images/authors/alexey-markov/lessons/5.jpg": {
		"type": "image/jpeg",
		"etag": "\"9120-lN06AMRSecqN9dF/hv66RA7X5Xk\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 37152,
		"path": "../public/images/authors/alexey-markov/lessons/5.jpg"
	},
	"/images/authors/alexey-markov/lessons/8.jpg": {
		"type": "image/jpeg",
		"etag": "\"96cb-bt7PEa8crHdLY6rRUR7141t2SSA\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 38603,
		"path": "../public/images/authors/alexey-markov/lessons/8.jpg"
	},
	"/images/authors/alexey-markov/lessons/7.jpg": {
		"type": "image/jpeg",
		"etag": "\"92f0-K2jOsG20MSFIW0rPNRJ4kWT3pJg\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 37616,
		"path": "../public/images/authors/alexey-markov/lessons/7.jpg"
	},
	"/images/authors/alexey-markov/lessons/6.jpg": {
		"type": "image/jpeg",
		"etag": "\"b355-kh6RUyUt1Ihl67Cae/rew/ooTGI\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 45909,
		"path": "../public/images/authors/alexey-markov/lessons/6.jpg"
	},
	"/images/authors/alexey-markov/lessons/9.jpg": {
		"type": "image/jpeg",
		"etag": "\"9e89-5AyE9nhlUFCF9+vF8e4oeHZBY1s\"",
		"mtime": "2026-08-31T04:35:25.293Z",
		"size": 40585,
		"path": "../public/images/authors/alexey-markov/lessons/9.jpg"
	},
	"/images/authors/alexey-markov/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"d15f-e2NDNciIRqF4/JP735G11h2tpic\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 53599,
		"path": "../public/images/authors/alexey-markov/media/author.jpg"
	},
	"/images/authors/alexey-markov/media/book-cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"13494-HUpR5bMwQFY6Sm3JDPGA1X0Pves\"",
		"mtime": "2026-08-31T04:35:25.256Z",
		"size": 78996,
		"path": "../public/images/authors/alexey-markov/media/book-cover.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f044-ODX8hEVF6bFXIoRKs+7B4gNm+wU\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 127044,
		"path": "../public/images/authors/alexey-markov/media/lesson-01.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ee74-pbVCbbC0aD5QbZXLi+C0qb+mfbc\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 126580,
		"path": "../public/images/authors/alexey-markov/media/lesson-02.jpg"
	},
	"/images/authors/alexey-markov/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"25603-/fpFbSF/lSu3o41Bl0UshWwuj08\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 153091,
		"path": "../public/images/authors/alexey-markov/media/cover.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ea65-gXpkCRYfn2kYAO6afXdOCRwOcWo\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 125541,
		"path": "../public/images/authors/alexey-markov/media/lesson-03.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e9aa-GzjqCdOEBmMFOd4kTDPvZVQuEJk\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 125354,
		"path": "../public/images/authors/alexey-markov/media/lesson-04.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e6af-p/Rl1uvLiySApSKpn+NawKYg/BI\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 124591,
		"path": "../public/images/authors/alexey-markov/media/lesson-05.jpg"
	},
	"/images/authors/alexey-markov/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f06c-NhV3wQfl5zYlAsOKlm2TSMabWqg\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 127084,
		"path": "../public/images/authors/alexey-markov/media/lesson-06.jpg"
	},
	"/images/authors/alexandra-nikitina/lessons/124.png": {
		"type": "image/png",
		"etag": "\"284177-E7X8XvMEZXGAxvYxxqcFZyDce48\"",
		"mtime": "2026-08-31T04:35:25.292Z",
		"size": 2638199,
		"path": "../public/images/authors/alexandra-nikitina/lessons/124.png"
	},
	"/images/authors/alexey-markov/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e1f7-WpJkWedHITawnmKUYOP+IA5/PXA\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 123383,
		"path": "../public/images/authors/alexey-markov/media/material-01.jpg"
	},
	"/images/authors/alexey-markov/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1eeb8-OEFWhFsjTYu1l9IOlm+KToDKxnY\"",
		"mtime": "2026-08-31T04:35:25.294Z",
		"size": 126648,
		"path": "../public/images/authors/alexey-markov/media/material-02.jpg"
	},
	"/images/authors/alexey-markov/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f9b6-Jp53KI4hL9I30hQdRqYDYTUg35c\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 129462,
		"path": "../public/images/authors/alexey-markov/media/material-03.jpg"
	},
	"/images/authors/alexey-markov/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ef20-faDb2lI7O+XSWmT10H91Smto1L4\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 126752,
		"path": "../public/images/authors/alexey-markov/media/material-04.jpg"
	},
	"/images/authors/artem-mushin/lessons/1.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/1.png"
	},
	"/images/authors/artem-mushin/lessons/10.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/10.png"
	},
	"/images/authors/artem-mushin/lessons/2.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/2.png"
	},
	"/images/authors/artem-mushin/lessons/4.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/4.png"
	},
	"/images/authors/artem-mushin/lessons/3.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.295Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/3.png"
	},
	"/images/authors/artem-mushin/lessons/5.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/5.png"
	},
	"/images/authors/artem-mushin/lessons/6.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/6.png"
	},
	"/images/authors/artem-mushin/lessons/7.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/7.png"
	},
	"/images/authors/artem-mushin/lessons/8.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/8.png"
	},
	"/images/authors/artem-mushin/lessons/9.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/lessons/9.png"
	},
	"/images/authors/artem-mushin/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"14713-YhV2BiO4qKUBe79c9xa5ljoVG24\"",
		"mtime": "2026-08-31T04:35:25.256Z",
		"size": 83731,
		"path": "../public/images/authors/artem-mushin/media/author.jpg"
	},
	"/images/authors/artem-mushin/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"2a610-8bUJphwBa7PMH15ck1DTFd+YWEc\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 173584,
		"path": "../public/images/authors/artem-mushin/media/cover.jpg"
	},
	"/images/authors/artem-mushin/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"15074-g8phcqsYuE10vRNUzNfuJAcN910\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 86132,
		"path": "../public/images/authors/artem-mushin/media/lesson-02.jpg"
	},
	"/images/authors/artem-mushin/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"17e18-9MSowQ7UTrDO9PtgX1k4H7X0sR8\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 97816,
		"path": "../public/images/authors/artem-mushin/media/lesson-01.jpg"
	},
	"/images/authors/artem-mushin/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cc46-iPSvTc+3xPRSgBKOrIzA3P6OBC8\"",
		"mtime": "2026-08-31T04:35:25.296Z",
		"size": 117830,
		"path": "../public/images/authors/artem-mushin/media/lesson-03.jpg"
	},
	"/images/authors/artem-mushin/media/cover.png": {
		"type": "image/png",
		"etag": "\"18bc8-NHT4CrEo1iSGaAGCvWcvYzS0Of0\"",
		"mtime": "2026-08-31T04:35:25.297Z",
		"size": 101320,
		"path": "../public/images/authors/artem-mushin/media/cover.png"
	},
	"/images/authors/artem-mushin/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"17f4d-yPvxxEAsQTHlCZ76Dt2ucePsqPE\"",
		"mtime": "2026-08-31T04:35:25.297Z",
		"size": 98125,
		"path": "../public/images/authors/artem-mushin/media/lesson-04.jpg"
	},
	"/images/authors/artem-mushin/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f10-Bc+/Dn7Ie2Gf9qW+UnvfDCKuRKk\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 85776,
		"path": "../public/images/authors/artem-mushin/media/lesson-05.jpg"
	},
	"/images/authors/artem-mushin/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d7dc-F/JW+sdAAOl1I6jNMBuyMp2oyOI\"",
		"mtime": "2026-08-31T04:35:25.297Z",
		"size": 120796,
		"path": "../public/images/authors/artem-mushin/media/lesson-06.jpg"
	},
	"/images/authors/artem-mushin/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"19c1b-ZbVR7JA4iwV6NP3XT3IzyV+zS7E\"",
		"mtime": "2026-08-31T04:35:25.297Z",
		"size": 105499,
		"path": "../public/images/authors/artem-mushin/media/material-01.jpg"
	},
	"/images/authors/artem-mushin/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"17b07-8PRp+zZnDFpQhwOEBZpkZOCK6AM\"",
		"mtime": "2026-08-31T04:35:25.297Z",
		"size": 97031,
		"path": "../public/images/authors/artem-mushin/media/material-02.jpg"
	},
	"/images/authors/artem-mushin/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f951-mlcLCpNt2JcWAgJR8n7YI73QvJ0\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 129361,
		"path": "../public/images/authors/artem-mushin/media/material-03.jpg"
	},
	"/images/authors/artem-mushin/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"19c1b-ZbVR7JA4iwV6NP3XT3IzyV+zS7E\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 105499,
		"path": "../public/images/authors/artem-mushin/media/material-04.jpg"
	},
	"/images/authors/artem-mushin/media/photo-1.jpg": {
		"type": "image/jpeg",
		"etag": "\"ed34-eRxFubO7jnmxVoSmvU7J7L9gshE\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 60724,
		"path": "../public/images/authors/artem-mushin/media/photo-1.jpg"
	},
	"/images/authors/artem-mushin/media/photo-2.jpg": {
		"type": "image/jpeg",
		"etag": "\"fbb9-YtZRE1sytJw3zabrS/xgmS1ZEhs\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 64441,
		"path": "../public/images/authors/artem-mushin/media/photo-2.jpg"
	},
	"/images/authors/igor-veretennikov/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"5806-lU82Dv/dZ6/soQHqY23IQqSrOfk\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 22534,
		"path": "../public/images/authors/igor-veretennikov/media/author.jpg"
	},
	"/images/authors/igor-veretennikov/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"25ad5-D18oEFzhh5762Mo850jHwTq3v+U\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 154325,
		"path": "../public/images/authors/igor-veretennikov/media/cover.jpg"
	},
	"/images/authors/artem-mushin/media/photo-3.jpg": {
		"type": "image/jpeg",
		"etag": "\"47609-y1s7WDeAZZ4qPVEiIzAMzY3G+no\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 292361,
		"path": "../public/images/authors/artem-mushin/media/photo-3.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"16f0e-DFDBQv5qGe3JbV3nKSG7sGzhGng\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 93966,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-01.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"33895-mYokitN+kIs30N3fH073hUJnqZ8\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 211093,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-02.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"2514d-q+un3Yt0IGljdQTk6rm7wtUUsm8\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 151885,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-03.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 127220,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-04.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 127220,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-05.jpg"
	},
	"/images/authors/igor-veretennikov/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f0f4-vAipz51XJhuHp08a+12YkU80qcI\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 127220,
		"path": "../public/images/authors/igor-veretennikov/media/lesson-06.jpg"
	},
	"/images/authors/igor-veretennikov/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"19331-djMMB3eXi3nYxujyCKfUBj7XqIw\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 103217,
		"path": "../public/images/authors/igor-veretennikov/media/material-01.jpg"
	},
	"/images/authors/igor-veretennikov/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"3703a-50zcUAHJHO5818DZLsDv0KxPaHc\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 225338,
		"path": "../public/images/authors/igor-veretennikov/media/material-02.jpg"
	},
	"/images/authors/igor-malinin/lessons/1.jpg": {
		"type": "image/jpeg",
		"etag": "\"12758-UZtr5gYWM+MxZQpwPJarCqY6AIw\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 75608,
		"path": "../public/images/authors/igor-malinin/lessons/1.jpg"
	},
	"/images/authors/igor-veretennikov/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"29ae6-8mdSAdY3GmAYffDCuJYo2c9rdcc\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 170726,
		"path": "../public/images/authors/igor-veretennikov/media/material-03.jpg"
	},
	"/images/authors/igor-veretennikov/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"225c2-BdAOX7w77hPjhL8BKR5mY9DVzNs\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 140738,
		"path": "../public/images/authors/igor-veretennikov/media/material-04.jpg"
	},
	"/images/authors/igor-malinin/lessons/2.jpg": {
		"type": "image/jpeg",
		"etag": "\"1355b-GGqbB6iAVzMaQHY6dw74cxh3G18\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 79195,
		"path": "../public/images/authors/igor-malinin/lessons/2.jpg"
	},
	"/images/authors/igor-malinin/lessons/3.jpg": {
		"type": "image/jpeg",
		"etag": "\"140d9-k6DrkKF1nIA4Q8yi6pxUkrag/yc\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 82137,
		"path": "../public/images/authors/igor-malinin/lessons/3.jpg"
	},
	"/images/authors/igor-malinin/lessons/4.jpg": {
		"type": "image/jpeg",
		"etag": "\"13a48-QUdr+uxMTzuyaiLBjT3BvmrPelM\"",
		"mtime": "2026-08-31T04:35:25.301Z",
		"size": 80456,
		"path": "../public/images/authors/igor-malinin/lessons/4.jpg"
	},
	"/images/authors/igor-malinin/lessons/6.jpg": {
		"type": "image/jpeg",
		"etag": "\"140d9-k6DrkKF1nIA4Q8yi6pxUkrag/yc\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 82137,
		"path": "../public/images/authors/igor-malinin/lessons/6.jpg"
	},
	"/images/authors/igor-malinin/lessons/5.jpg": {
		"type": "image/jpeg",
		"etag": "\"15821-BtFj5ijPu5xOeGgGFe6DI56xgqg\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 88097,
		"path": "../public/images/authors/igor-malinin/lessons/5.jpg"
	},
	"/images/authors/igor-malinin/media/author.webp": {
		"type": "image/webp",
		"etag": "\"66da-Gkxk4khDgyENrCC915h31FdWFrA\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 26330,
		"path": "../public/images/authors/igor-malinin/media/author.webp"
	},
	"/images/authors/igor-malinin/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"12f64-z5xmi9ha2Mr7ktFVNHdY4dEUBH8\"",
		"mtime": "2026-08-31T04:35:25.258Z",
		"size": 77668,
		"path": "../public/images/authors/igor-malinin/media/author.jpg"
	},
	"/images/authors/igor-malinin/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"28337-52yQAVkOlDRUJUf1IQ6a9ZZd85w\"",
		"mtime": "2026-08-31T04:35:25.301Z",
		"size": 164663,
		"path": "../public/images/authors/igor-malinin/media/cover.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cc11-qHWhgPPtRoYopT8w9Nisr9n0/zA\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 117777,
		"path": "../public/images/authors/igor-malinin/media/lesson-01.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"30f45-Ee6PAxBr7kgOT1L1knpiegN1wgM\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 200517,
		"path": "../public/images/authors/igor-malinin/media/lesson-02.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"2018a-nXVZPtYbuCmrQOuylgpWd9CcANY\"",
		"mtime": "2026-08-31T04:35:25.301Z",
		"size": 131466,
		"path": "../public/images/authors/igor-malinin/media/lesson-03.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"1cf32-32pibEcamGSOyNuAW4heEYgunbU\"",
		"mtime": "2026-08-31T04:35:25.301Z",
		"size": 118578,
		"path": "../public/images/authors/igor-malinin/media/lesson-04.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d2c1-ZRVGsSeB499NsmLwqUzPnNESc1M\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 119489,
		"path": "../public/images/authors/igor-malinin/media/lesson-06.jpg"
	},
	"/images/authors/igor-malinin/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"30c66-zwaTtJEfv+lKSQbW1Ez45bqJeUY\"",
		"mtime": "2026-08-31T04:35:25.301Z",
		"size": 199782,
		"path": "../public/images/authors/igor-malinin/media/lesson-05.jpg"
	},
	"/images/authors/igor-malinin/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"22a60-5jdj5lPx96cBh1JRNihJ1qpwJ7w\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 141920,
		"path": "../public/images/authors/igor-malinin/media/material-01.jpg"
	},
	"/images/authors/igor-malinin/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"356f2-mie7MEWojk58PdRIU3o5d361Q5M\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 218866,
		"path": "../public/images/authors/igor-malinin/media/material-02.jpg"
	},
	"/images/authors/igor-malinin/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"1ebbb-xPe/krumwcD+cMcpo2B2aDj8FkA\"",
		"mtime": "2026-08-31T04:35:25.309Z",
		"size": 125883,
		"path": "../public/images/authors/igor-malinin/media/material-03.jpg"
	},
	"/images/authors/igor-malinin/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"22a60-5jdj5lPx96cBh1JRNihJ1qpwJ7w\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 141920,
		"path": "../public/images/authors/igor-malinin/media/material-04.jpg"
	},
	"/images/authors/igor-malinin/media/photo-1.webp": {
		"type": "image/webp",
		"etag": "\"1f78c-oDxl7v+dIPR93C6WrxSnmlRjyl0\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 128908,
		"path": "../public/images/authors/igor-malinin/media/photo-1.webp"
	},
	"/images/authors/igor-malinin/media/photo-3.webp": {
		"type": "image/webp",
		"etag": "\"13160-otDTp7bs7kIEs2UNVJJMFwha7ZQ\"",
		"mtime": "2026-08-31T04:35:25.302Z",
		"size": 78176,
		"path": "../public/images/authors/igor-malinin/media/photo-3.webp"
	},
	"/images/authors/darya-filimonova/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"7d8f-WyeD/0kgeJ8fPARZGxE+MeW3Olc\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 32143,
		"path": "../public/images/authors/darya-filimonova/media/author.jpg"
	},
	"/images/authors/darya-filimonova/media/author.webp": {
		"type": "image/webp",
		"etag": "\"848-0M0KxwmjjsEARROnoOXB8hCOO4k\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 2120,
		"path": "../public/images/authors/darya-filimonova/media/author.webp"
	},
	"/images/authors/igor-malinin/media/photo-2.webp": {
		"type": "image/webp",
		"etag": "\"54996-2ghwSispfrMY3cmpE6q+VUSW+CQ\"",
		"mtime": "2026-08-31T04:35:25.304Z",
		"size": 346518,
		"path": "../public/images/authors/igor-malinin/media/photo-2.webp"
	},
	"/images/authors/darya-filimonova/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"15004-6SfjrSWcNgOfl/D6CvBrWQ1OOPk\"",
		"mtime": "2026-08-31T04:35:25.298Z",
		"size": 86020,
		"path": "../public/images/authors/darya-filimonova/media/cover.jpg"
	},
	"/images/authors/darya-filimonova/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"c623-Ohd5Dt5vng9eJlrxprQSy8v4QSw\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 50723,
		"path": "../public/images/authors/darya-filimonova/media/lesson-01.jpg"
	},
	"/images/authors/darya-filimonova/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"b3ec-MrYkMtda+EPJDjfZED4B4paKgA8\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 46060,
		"path": "../public/images/authors/darya-filimonova/media/lesson-02.jpg"
	},
	"/images/authors/darya-filimonova/media/course-page.webp": {
		"type": "image/webp",
		"etag": "\"1a270-zc1TEI6Tn/f6vCUbhuQM+/u6Ews\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 107120,
		"path": "../public/images/authors/darya-filimonova/media/course-page.webp"
	},
	"/images/authors/darya-filimonova/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"af99-K5I6uifKHkkEl5/5DIpYWBvLCYY\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 44953,
		"path": "../public/images/authors/darya-filimonova/media/lesson-03.jpg"
	},
	"/images/authors/darya-filimonova/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"dd2d-o/lSRO3/vfgV6VTCmHAaq6B8kD4\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 56621,
		"path": "../public/images/authors/darya-filimonova/media/lesson-04.jpg"
	},
	"/images/authors/darya-filimonova/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"c353-dGj58cis7xXLxzsoZJoHVBl3DLQ\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 50003,
		"path": "../public/images/authors/darya-filimonova/media/lesson-05.jpg"
	},
	"/images/authors/darya-filimonova/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"bd0c-/tTIben8F08rDiUM3Y1S0OpBh7E\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 48396,
		"path": "../public/images/authors/darya-filimonova/media/lesson-06.jpg"
	},
	"/images/authors/darya-filimonova/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"d73e-Egk7PYsHdAJIRRobqjMZZmQVaqY\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 55102,
		"path": "../public/images/authors/darya-filimonova/media/material-01.jpg"
	},
	"/images/authors/darya-filimonova/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"c857-2LkS2JYCiA5ho69XLnP4zhbd2XA\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 51287,
		"path": "../public/images/authors/darya-filimonova/media/material-02.jpg"
	},
	"/images/authors/darya-filimonova/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"c111-aiKVB3sPz2xr/MiXqJSsr/lT5QE\"",
		"mtime": "2026-08-31T04:35:25.299Z",
		"size": 49425,
		"path": "../public/images/authors/darya-filimonova/media/material-03.jpg"
	},
	"/images/authors/darya-filimonova/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"eeea-6heQ5h7bxQWGcsUeDf29Y6KhSY4\"",
		"mtime": "2026-08-31T04:35:25.300Z",
		"size": 61162,
		"path": "../public/images/authors/darya-filimonova/media/material-04.jpg"
	},
	"/images/authors/pavel-semenov/media/author-cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"2940c-KSoIfYbm4eYNqsuduZq6ZKarCpE\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 168972,
		"path": "../public/images/authors/pavel-semenov/media/author-cover.jpg"
	},
	"/images/authors/pavel-semenov/media/author.jpg": {
		"type": "image/jpeg",
		"etag": "\"d143-3EQs2NcRj5vFQFmirizZyhzD/KE\"",
		"mtime": "2026-08-31T04:35:25.304Z",
		"size": 53571,
		"path": "../public/images/authors/pavel-semenov/media/author.jpg"
	},
	"/images/authors/pavel-semenov/media/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"29740-Nhc8hGkXxG1edhpIe2dpwlO9Veg\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 169792,
		"path": "../public/images/authors/pavel-semenov/media/cover.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"16398-IF+m1kI1/rV56WICdDgY855QXLA\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 91032,
		"path": "../public/images/authors/pavel-semenov/media/lesson-01.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"1648b-G6s+fYTBGhc5iqEJ6lj/wQgqnzE\"",
		"mtime": "2026-08-31T04:35:25.303Z",
		"size": 91275,
		"path": "../public/images/authors/pavel-semenov/media/lesson-02.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"16496-La4VpsDHJAZTfs8d6ezTo9yudn8\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 91286,
		"path": "../public/images/authors/pavel-semenov/media/lesson-03.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"105c6-oSI0QdZeVWlld/Kom3e4skjt844\"",
		"mtime": "2026-08-31T04:35:25.304Z",
		"size": 67014,
		"path": "../public/images/authors/pavel-semenov/media/lesson-04.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-05.jpg": {
		"type": "image/jpeg",
		"etag": "\"105c6-oSI0QdZeVWlld/Kom3e4skjt844\"",
		"mtime": "2026-08-31T04:35:25.304Z",
		"size": 67014,
		"path": "../public/images/authors/pavel-semenov/media/lesson-05.jpg"
	},
	"/images/authors/pavel-semenov/media/material-01.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f5c-jk3SIQdaPRBbXgqilkaCWBfsaIQ\"",
		"mtime": "2026-08-31T04:35:25.304Z",
		"size": 85852,
		"path": "../public/images/authors/pavel-semenov/media/material-01.jpg"
	},
	"/images/authors/pavel-semenov/media/lesson-06.jpg": {
		"type": "image/jpeg",
		"etag": "\"101ad-Av19ePOvUlI4bP3kwAWnI59HGsI\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 65965,
		"path": "../public/images/authors/pavel-semenov/media/lesson-06.jpg"
	},
	"/images/authors/pavel-semenov/media/material-03.jpg": {
		"type": "image/jpeg",
		"etag": "\"11805-yczzPzlI5NxSorr4YJTs5d62WJY\"",
		"mtime": "2026-08-31T04:35:25.308Z",
		"size": 71685,
		"path": "../public/images/authors/pavel-semenov/media/material-03.jpg"
	},
	"/images/authors/pavel-semenov/media/material-02.jpg": {
		"type": "image/jpeg",
		"etag": "\"174cf-6yXLEaDMdybezmvFjlaivUjLqBo\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 95439,
		"path": "../public/images/authors/pavel-semenov/media/material-02.jpg"
	},
	"/images/authors/pavel-semenov/media/material-04.jpg": {
		"type": "image/jpeg",
		"etag": "\"14f5c-jk3SIQdaPRBbXgqilkaCWBfsaIQ\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 85852,
		"path": "../public/images/authors/pavel-semenov/media/material-04.jpg"
	},
	"/images/authors/yulia-volkova/lessons/2.jpg": {
		"type": "image/jpeg",
		"etag": "\"a058-PFubiKHnGcOQhghX4nvHdWQE+3Y\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 41048,
		"path": "../public/images/authors/yulia-volkova/lessons/2.jpg"
	},
	"/images/authors/yulia-volkova/lessons/3.jpg": {
		"type": "image/jpeg",
		"etag": "\"60a8-WUOqFlmjrqftl/T9K/bcq3BlfMw\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 24744,
		"path": "../public/images/authors/yulia-volkova/lessons/3.jpg"
	},
	"/images/authors/yulia-volkova/lessons/10.jpg": {
		"type": "image/jpeg",
		"etag": "\"6f02-jsoNjtAkJ2OMClEa2q7kGFwJLFA\"",
		"mtime": "2026-08-31T04:35:25.251Z",
		"size": 28418,
		"path": "../public/images/authors/yulia-volkova/lessons/10.jpg"
	},
	"/images/authors/yulia-volkova/lessons/4.jpg": {
		"type": "image/jpeg",
		"etag": "\"7a31-0zepL2iqKu5IhMSMCOPai8Rl/fo\"",
		"mtime": "2026-08-31T04:35:25.307Z",
		"size": 31281,
		"path": "../public/images/authors/yulia-volkova/lessons/4.jpg"
	},
	"/images/authors/yulia-volkova/lessons/5.jpg": {
		"type": "image/jpeg",
		"etag": "\"60f8-8jkDeLyt3o4l/0Ja84dpJfxFMx4\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 24824,
		"path": "../public/images/authors/yulia-volkova/lessons/5.jpg"
	},
	"/images/authors/yulia-volkova/lessons/6.jpg": {
		"type": "image/jpeg",
		"etag": "\"6094-dnuAMvdoPD/AavUMMJ6EnnJPqAk\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 24724,
		"path": "../public/images/authors/yulia-volkova/lessons/6.jpg"
	},
	"/images/authors/yulia-volkova/lessons/7.jpg": {
		"type": "image/jpeg",
		"etag": "\"55f8-6yykNl8qjnZkLa0Vw08SDiC4ayo\"",
		"mtime": "2026-08-31T04:35:25.305Z",
		"size": 22008,
		"path": "../public/images/authors/yulia-volkova/lessons/7.jpg"
	},
	"/images/authors/yulia-volkova/lessons/8.jpg": {
		"type": "image/jpeg",
		"etag": "\"5af6-scZHbyJPEwR7oQL0jHF2N3DIXrA\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 23286,
		"path": "../public/images/authors/yulia-volkova/lessons/8.jpg"
	},
	"/images/authors/yulia-volkova/lessons/9.jpg": {
		"type": "image/jpeg",
		"etag": "\"5672-AoJB+brauxwvukbkqoyXUmE+/MQ\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 22130,
		"path": "../public/images/authors/yulia-volkova/lessons/9.jpg"
	},
	"/images/authors/yulia-volkova/lessons/cover.jpg": {
		"type": "image/jpeg",
		"etag": "\"4cf2-bdUaiP3O0dm5tTBcsXOh/ZgPb2o\"",
		"mtime": "2026-08-31T04:35:25.306Z",
		"size": 19698,
		"path": "../public/images/authors/yulia-volkova/lessons/cover.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_2qXXEo = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_2qXXEo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
