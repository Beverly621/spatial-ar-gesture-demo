# AR 手势特效跨平台版

原始创意来源标注：instagram `@wxll.hx`。本仓库基于上传的 Windows 分享版文件重构为 macOS、Linux、Windows 均可启动的浏览器 AR demo。

## 启动

```bash
npm run setup
npm start
```

默认访问地址：

```text
http://localhost:5173/
```

点击右上角摄像机按钮进入摄像头模式，或点击指针按钮进入无摄像头演示模式。

## 技术栈

- HTML Canvas 2D
- 原生 JavaScript ES Module
- Node.js 静态服务器
- MediaPipe Hands
- MediaPipe Selfie Segmentation
- jsDelivr CDN
- Git SSH，端口 443

如需指定端口：

```bash
npm start -- --port 3001
```

## 配置

项目源码目录不保存 `.env`。第三方 API 或 CDN 配置通过运行时手动配置注入，默认无需 API key。

可选的浏览器端覆盖配置：

```js
window.AR_GESTURE_CONFIG = {
  cdnBase: "https://cdn.jsdelivr.net/npm",
  handsPackage: "@mediapipe/hands",
  segmentationPackage: "@mediapipe/selfie_segmentation"
};
```
