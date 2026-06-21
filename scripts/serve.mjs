import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const portArgIndex = process.argv.findIndex((arg) => arg === "--port" || arg === "-p");
const cliPort = portArgIndex >= 0 ? process.argv[portArgIndex + 1] : "";
const requestedPort = Number.parseInt(cliPort || process.env.PORT || "5173", 10);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".mjs", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".wasm", "application/wasm"],
]);

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function resolveRequestPath(url) {
  const requestUrl = new URL(url, `http://${host}:${requestedPort}`);
  const decodedPath = decodeURIComponent(requestUrl.pathname);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const relativePath = safePath === sep || safePath === "/" ? "index.html" : safePath.replace(/^[/\\]/, "");
  const absolutePath = resolve(join(root, relativePath));

  if (absolutePath !== root && !absolutePath.startsWith(`${root}${sep}`)) {
    return null;
  }

  return absolutePath;
}

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method Not Allowed");
    return;
  }

  const filePath = resolveRequestPath(req.url || "/");
  if (!filePath || !existsSync(filePath)) {
    send(res, 404, "Not Found");
    return;
  }

  const fileStat = statSync(filePath);
  if (!fileStat.isFile()) {
    send(res, 403, "Forbidden");
    return;
  }

  res.writeHead(200, {
    "Content-Type": contentTypes.get(extname(filePath).toLowerCase()) || "application/octet-stream",
    "Content-Length": fileStat.size,
    "Cache-Control": "no-store",
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`端口 ${requestedPort} 已被占用。请释放端口，或临时使用 PORT=8001 npm start。`);
    process.exit(1);
  }
  throw error;
});

server.listen(requestedPort, host, () => {
    console.log(`AR 手势特效跨平台版已启动：http://localhost:${requestedPort}/`);
  console.log("请使用 Chrome、Edge 或 Safari，并在浏览器中允许摄像头权限。");
});
