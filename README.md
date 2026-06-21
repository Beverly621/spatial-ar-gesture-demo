# AR 手势特效 (跨平台浏览器版)

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D_18.x-blue.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-Windows_%7C_macOS_%7C_Linux-lightgrey.svg)]()
[![License](https://img.shields.io/badge/license-learning-orange.svg)]()

基于原 Windows 专属分享版源码重构，实现 Windows、macOS、Linux 全平台兼容。这是一个浏览器端 AR 手势特效 demo，不需要安装本地 AI 运行环境，AI 手势识别与人物分割能力由浏览器加载 MediaPipe 组件完成。

> 原始创意来源：Instagram [@wxll.hx](https://instagram.com/wxll.hx)

## 重要说明

不建议直接双击打开 `index.html` 作为正式使用方式。摄像头权限、MediaPipe 模型文件、WASM 资源与 CDN 加载在不同浏览器和系统上对 `file://` 本地文件协议支持不一致，可能出现摄像头无法授权、模型加载失败或特效不显示。

推荐方式是启动本地服务后，通过 `http://localhost:<端口>/` 打开。`localhost` 属于浏览器允许摄像头的安全上下文，跨平台行为最稳定。

GitHub 上的代码包不是 macOS 专用。Windows、macOS、Linux 都可以下载使用，只要安装 Node.js 18 或更高版本，并按本 README 启动本地服务即可。

## 快速启动

### 1. 安装 Node.js

请先安装 Node.js `18.x` 或更高版本：

[https://nodejs.org/](https://nodejs.org/)

检查版本：

```bash
node --version
npm --version
```

### 2. 下载项目

方式一：使用 Git 克隆。

```bash
git clone git@github.com:Beverly621/spatial-ar-gesture-demo.git
cd spatial-ar-gesture-demo
```

方式二：在 GitHub 页面点击 `Code` -> `Download ZIP`，解压后进入项目目录。

### 3. 初始化依赖

```bash
npm run setup
```

### 4. 启动本地服务

```bash
npm start
```

默认地址：

```text
http://localhost:5173/
```

如果 `5173` 已被其他项目占用，请自行选择一个空闲端口：

```bash
npm start -- --port 5174
```

然后在浏览器访问：

```text
http://localhost:5174/
```

端口不需要和作者、维护者或其他设备保持一致。每台电脑只要选择自己本机未被占用的端口即可。

## 不同系统使用教程

### macOS

1. 安装 Node.js 18 或更高版本。
2. 从 GitHub 克隆仓库，或下载 ZIP 后解压。
3. 打开 Terminal，进入项目目录。
4. 运行：

```bash
npm run setup
npm start
```

5. 在 Chrome、Edge 或 Safari 中打开 `http://localhost:5173/`。
6. 点击右上角摄像机按钮，并在浏览器弹窗中允许摄像头权限。

如果端口被占用：

```bash
npm start -- --port 5174
```

### Windows

1. 安装 Node.js 18 或更高版本。
2. 从 GitHub 下载 ZIP 并解压，或使用 Git 克隆仓库。
3. 打开 PowerShell、Windows Terminal 或命令提示符。
4. 进入项目目录，例如：

```powershell
cd C:\Users\YourName\Downloads\spatial-ar-gesture-demo
```

5. 运行：

```powershell
npm run setup
npm start
```

6. 在 Chrome 或 Edge 中打开 `http://localhost:5173/`。
7. 点击摄像机按钮并允许浏览器使用摄像头。

如果端口被占用：

```powershell
npm start -- --port 5174
```

### Linux

1. 安装 Node.js 18 或更高版本。
2. 克隆仓库或下载 ZIP。
3. 进入项目目录后运行：

```bash
npm run setup
npm start
```

4. 在现代浏览器中打开 `http://localhost:5173/`。
5. 授权摄像头权限。

如果端口被占用：

```bash
npm start -- --port 5174
```

## 使用方式

页面右上角有两个按钮：

- 摄像机按钮：开启本机摄像头，体验实时手势识别、人像分割与 AR 滤镜特效。
- 指针按钮：进入无摄像头演示模式，可拖动控制点预览特效。

摄像头模式下，需要让两只手同时完整进入画面。项目会使用两只手的拇指、食指、中指、小指指尖围出三块滤镜区域。

如果授权摄像头后没有出现特效，页面底部会显示运行状态，例如：

```text
摄像头已启动，人物遮罩已就绪，已识别 1/2 只手。请让两只手同时完整进入画面。
```

## 技术栈

- 渲染层：HTML Canvas 2D
- 核心脚本：原生 JavaScript
- 本地服务：Node.js 静态文件服务
- AI 能力：MediaPipe Hands、MediaPipe Selfie Segmentation
- 资源分发：jsDelivr CDN
- 运行协议：本地 `localhost` HTTP 服务
- 默认端口：`5173`
- 可配置端口：`npm start -- --port <端口>`
- 仓库传输：Git SSH，支持 443 端口配置

## 配置说明

项目默认无需 API key，也不会在源码目录保存 `.env` 环境文件。第三方 API、密钥或私有接口参数不应硬编码到代码中。

浏览器端可选高级配置如下，适合私有化部署或更换 CDN 镜像源。该配置必须在加载 `src/skills/mediapipe-loader.js` 之前注入：

```js
window.AR_GESTURE_CONFIG = {
  cdnBase: "https://cdn.jsdelivr.net/npm",
  handsPackage: "@mediapipe/hands",
  segmentationPackage: "@mediapipe/selfie_segmentation"
};
```

## 打包

```bash
npm run package
```

打包结果会生成在：

```text
dist/spatial-ar-gesture-demo
```

`dist/` 是本地交付产物，不提交到仓库。

## 常见问题

### Q1: 可以直接打开 HTML 使用吗？

不建议。直接打开 `index.html` 可能只在部分浏览器、部分模式下可用。摄像头模式需要浏览器安全上下文和稳定的模型资源加载，因此请使用 `npm start` 启动本地服务后访问 `localhost`。

### Q2: GitHub 下载的代码包只有 macOS 能用吗？

不是。代码包支持 Windows、macOS、Linux。区别只在于打开终端的方式不同，启动命令基本一致。

### Q3: 默认端口和我的电脑不一致怎么办？

端口只需要在自己的电脑上可用，不需要和其他人一致。如果 `5173` 被占用，换一个空闲端口：

```bash
npm start -- --port 5174
```

### Q4: 页面打开了，但没有显示特效？

请先看页面底部状态提示。常见原因：

- 只识别到一只手，需要两只手同时入镜；
- 手指没有完整进入画面；
- 人物分割遮罩还没加载完成；
- CDN 或网络导致 MediaPipe 模型加载较慢；
- 浏览器没有摄像头权限。

### Q5: 摄像头打不开？

- 确认浏览器地址是 `http://localhost:<端口>/`；
- 检查浏览器地址栏的摄像头权限；
- macOS 还需要在系统设置中允许浏览器访问摄像头；
- Windows 需要检查系统隐私设置中的相机权限。

### Q6: CDN 加载慢或失败？

项目默认使用 `https://cdn.jsdelivr.net/npm` 加载 MediaPipe 组件。网络不稳定时，可以通过高级配置替换为可访问的合规镜像源。

## 开源协议与致谢

本项目仅供学习与技术交流使用。原始创意来源标注为 Instagram [@wxll.hx](https://instagram.com/wxll.hx)。二次开发、演示或分发时请保留原始来源说明。
