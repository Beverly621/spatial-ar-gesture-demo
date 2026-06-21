# 全平台-- AR 在线交互手势特效

[![Node.js Version](https://img.shields.io/badge/node.js-%3E%3D_18.x-blue.svg)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/platform-Windows_%7C_macOS_%7C_Linux-lightgrey.svg)]()
[![License](https://img.shields.io/badge/license-learning-orange.svg)]()

全平台浏览器 AR 交互手势特效，支持 Windows、macOS、Linux。

项目不需要安装本地 AI 运行环境，手势识别和人物分割由浏览器加载 MediaPipe 组件完成。启动本地服务后，在浏览器中打开页面，即可体验摄像头手势识别、人像分割和 AR 滤镜效果。

原始创意来源：Instagram [@wxll.hx](https://instagram.com/wxll.hx)（无开源仓库）  

## 在线说明

请不要直接双击打开 `index.html` 作为正式使用方式。

由于摄像头权限、MediaPipe 模型文件、WASM 资源和 CDN 加载在 `file://` 本地文件协议下不够稳定，可能会出现摄像头无法授权、模型加载失败或特效不显示等问题。

推荐使用本地服务方式启动，然后访问：

```text
http://localhost:<端口>/
```

`localhost` 属于浏览器允许摄像头访问的安全上下文，跨平台表现更稳定。

## 快速启动

### 1. 安装 Node.js

请先安装 Node.js `18.x` 或更高版本：

[https://nodejs.org/](https://nodejs.org/)

安装后可以检查版本：

```bash
node --version
npm --version
```

### 2. 下载项目

方式一：使用 Git 克隆：

```bash
git clone git@github.com:Beverly621/spatial-ar-gesture-demo.git
cd spatial-ar-gesture-demo
```

方式二：下载 ZIP：

1. 打开 GitHub 项目页面；
2. 点击 `Code`；
3. 选择 `Download ZIP`；
4. 解压后进入项目目录。

### 3. 安装依赖

```bash
npm run setup
```

### 4. 启动项目

```bash
npm start
```

默认访问地址：

```text
http://localhost:5173/
```

如果 `5173` 端口被占用，可以换一个端口：

```bash
npm start -- --port 5174
```

然后访问：

```text
http://localhost:5174/
```

端口只需要在自己的电脑上可用，不需要和其他人保持一致。

## 下载纯净安装包

最新版压缩包：

[AR-Gesture-Demo-v1.0.0.zip](https://github.com/Beverly621/spatial-ar-gesture-demo/releases/download/v1.0.0/AR-Gesture-Demo-v1.0.0.zip)

所有历史版本：

[前往 Releases 页面](https://github.com/Beverly621/spatial-ar-gesture-demo/releases)

Release 压缩包会自动剔除 `node_modules/`、`.git/`、`dist/`、`.env*`、日志文件等本地或敏感内容，更适合直接下载体验。

## Windows / macOS / Linux 使用方式

三个系统的启动命令基本一致，区别主要是打开终端的方式不同。

### macOS

打开 Terminal，进入项目目录后运行：

```bash
npm run setup
npm start
```

然后在 Chrome、Edge 或 Safari 中打开：

```text
http://localhost:5173/
```

点击页面右上角摄像机按钮，并允许浏览器访问摄像头。

### Windows

打开 PowerShell、Windows Terminal 或命令提示符，进入项目目录，例如：

```powershell
cd C:\Users\YourName\Downloads\spatial-ar-gesture-demo
```

然后运行：

```powershell
npm run setup
npm start
```

在 Chrome 或 Edge 中打开：

```text
http://localhost:5173/
```

点击页面右上角摄像机按钮，并允许浏览器访问摄像头。

### Linux

打开终端，进入项目目录后运行：

```bash
npm run setup
npm start
```

然后在现代浏览器中打开：

```text
http://localhost:5173/
```

点击页面右上角摄像机按钮，并允许摄像头权限。

## 使用方式

页面右上角有两个按钮：

- 摄像机按钮：开启本机摄像头，体验实时手势识别、人像分割和 AR 滤镜特效。
- 指针按钮：进入无摄像头演示模式，可以拖动控制点预览特效。

摄像头模式下，需要让两只手同时完整进入画面。项目会使用两只手的拇指、食指、中指、小指指尖围出三块滤镜区域。

如果授权摄像头后没有出现特效，请先查看页面底部状态提示，例如：

```text
摄像头已启动，人物遮罩已就绪，已识别 1/2 只手。请让两只手同时完整进入画面。
```

## 常见问题

### Q1：可以直接打开 HTML 使用吗？

不建议。

直接打开 `index.html` 可能只在部分浏览器或部分系统下可用。摄像头模式需要浏览器安全上下文，并且需要稳定加载 MediaPipe 相关资源。

推荐使用：

```bash
npm start
```

然后通过 `localhost` 访问页面。

### Q2：GitHub 下载的代码包只有 macOS 能用吗？

不是。

本项目支持 Windows、macOS、Linux。只要安装 Node.js 18 或更高版本，并按上面的方式启动本地服务即可。

### Q3：默认端口和我的电脑不一致怎么办？

没关系。

端口只需要在自己的电脑上可用。如果默认的 `5173` 被占用，可以换一个空闲端口：

```bash
npm start -- --port 5174
```

### Q4：页面打开了，但没有显示特效？

请先看页面底部状态提示。常见原因包括：

- 只识别到一只手，需要两只手同时入镜；
- 手指没有完整进入画面；
- 人物分割遮罩还没加载完成；
- MediaPipe 模型加载较慢；
- 浏览器没有摄像头权限；
- 当前网络访问 CDN 不稳定。

### Q5：摄像头打不开怎么办？

可以按下面顺序检查：

1. 确认访问地址是 `http://localhost:<端口>/`；
2. 检查浏览器地址栏中的摄像头权限；
3. macOS 用户需要在系统设置中允许浏览器访问摄像头；
4. Windows 用户需要检查系统隐私设置中的相机权限；
5. 确认摄像头没有被其他软件占用。

### Q6：CDN 加载慢或失败怎么办？

项目默认通过 CDN 加载 MediaPipe 组件。如果网络不稳定，模型文件可能加载较慢，页面也可能暂时没有特效。

可以尝试：

- 刷新页面；
- 更换网络环境；
- 等待模型加载完成；
- 使用可访问的合规镜像源进行私有化部署。

## 开源协议与致谢

本项目仅供学习与技术交流使用。

原始创意来源标注为 Instagram [@wxll.hx](https://instagram.com/wxll.hx)。再次开发、演示或分发时，请保留原始来源说明。
