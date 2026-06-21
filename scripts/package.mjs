import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const distRoot = join(root, "dist");
const packageRoot = join(distRoot, "spatial-ar-gesture-demo");

const includePaths = ["index.html", "src", "scripts", "package.json", "package-lock.json", "README.md", ".gitignore"];

rmSync(packageRoot, { recursive: true, force: true });
mkdirSync(packageRoot, { recursive: true });

for (const relativePath of includePaths) {
  const source = join(root, relativePath);
  if (!existsSync(source)) continue;
  cpSync(source, join(packageRoot, relativePath), {
    recursive: true,
    filter: (src) => !src.includes(`${join(root, "dist")}`) && !src.endsWith(".env"),
  });
}

writeFileSync(
  join(packageRoot, "PACKAGE_INFO.txt"),
  [
    "spatial-ar-gesture-demo",
    "跨平台打包产物。",
    "启动：npm start",
    "默认端口：5173，可通过 npm start -- --port <端口> 覆盖",
    "仓库：git@github.com:Beverly621/spatial-ar-gesture-demo.git",
    "",
  ].join("\n"),
);

console.log(`打包完成：${packageRoot}`);
