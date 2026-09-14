import { r as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\r\n<html lang=\"ru\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\" />\r\n    <meta name=\"theme-color\" content=\"#ffdc00\" />\r\n    <meta name=\"description\" content=\"Практические онлайн-курсы от экспертов AskHow по бизнесу, карьере, маркетингу, продажам и развитию навыков.\" />\r\n    <meta name=\"robots\" content=\"index, follow, max-image-preview:large\" />\r\n    <link rel=\"icon\" href=\"/favicon.ico\" type=\"image/svg+xml\" />\r\n    <link rel=\"manifest\" href=\"/site.webmanifest\" />\r\n    <title>AskHow — практические онлайн-курсы от экспертов</title>\r\n  </head>\r\n  <body>\r\n    <div id=\"root\"></div>\r\n    <script type=\"module\" src=\"/src/main.jsx\"><\/script>\r\n  </body>\r\n</html>\r\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
