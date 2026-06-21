import { accessSync, constants, existsSync } from "node:fs";
import { resolve } from "node:path";

const requiredFiles = [
  "index.html",
  "src/styles.css",
  "src/skills/mediapipe-loader.js",
  "scripts/serve.mjs",
  "scripts/package.mjs",
];

const checks = [];

function addCheck(name, pass, detail = "") {
  checks.push({ name, pass, detail });
}

const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
addCheck("Node.js >= 18", nodeMajor >= 18, process.version);

for (const file of requiredFiles) {
  const absolutePath = resolve(file);
  addCheck(`文件存在：${file}`, existsSync(absolutePath), absolutePath);
  if (existsSync(absolutePath)) {
    try {
      accessSync(absolutePath, constants.R_OK);
      addCheck(`文件可读：${file}`, true);
    } catch {
      addCheck(`文件可读：${file}`, false);
    }
  }
}

const failed = checks.filter((check) => !check.pass);
for (const check of checks) {
  console.log(`${check.pass ? "OK" : "FAIL"} ${check.name}${check.detail ? ` - ${check.detail}` : ""}`);
}

if (failed.length > 0) {
  console.error(`环境校验失败：${failed.length} 项未通过。`);
  process.exit(1);
}

console.log("环境校验通过。");
