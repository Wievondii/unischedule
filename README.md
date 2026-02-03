<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# UniSchedule - 大学课程表管理应用

一个现代化的大学课程表管理应用，支持多种格式导入和移动端使用。**完全离线运行，无需任何 API 配置。**

## 功能特性

- 📅 **课程表展示**：周视图和日视图两种模式
- 📥 **多格式导入**：支持 .ics (iCalendar)、.json 和文本格式
- 💾 **本地存储**：课程数据自动保存到浏览器
- 📱 **移动优先**：响应式设计，支持移动端使用
- 🎨 **美观界面**：类 iPhone 风格的现代化 UI
- 📦 **APK 构建**：可打包为 Android 应用
- 🔌 **完全离线**：无需网络连接或 API 配置
- 📲 **桌面小部件**：在主屏幕显示课程表（Android）
- ⚡ **即时同步**：应用和小部件数据自动同步

## 快速开始

### 前置要求

- Node.js 16+
- npm 或 yarn

### 本地运行

1. 安装依赖：
   ```bash
   npm install
   ```

2. 运行开发服务器：
   ```bash
   npm run dev
   ```

3. 在浏览器中打开：`http://localhost:3000`

### 构建生产版本

```bash
npm run build
```

**注意**：本应用完全离线运行，无需配置任何 API 密钥。

## 导入课程

应用支持三种导入方式：

### 1. ICS 格式（推荐）
- 支持 RFC 5545 标准
- 兼容 Apple 日历和 Outlook
- 详细格式说明见 [导入指南](IMPORT_GUIDE.md)

### 2. JSON 格式
- 标准 JSON 数组格式
- 适合程序化生成

### 3. 文本格式
- 简单的文本格式
- 支持多种分隔符

详细的导入格式说明请查看 [IMPORT_GUIDE.md](IMPORT_GUIDE.md)

## 构建 APK

将应用打包为 Android APK（含桌面小部件）：

### 本地构建

1. 同步构建：
   ```bash
   npm run android:sync
   ```

2. 构建 APK：
   ```bash
   npm run android:build
   ```

详细步骤请查看 [BUILD_APK.md](BUILD_APK.md)

### 自动构建与发布

本项目配置了 GitHub Actions 自动构建工作流。创建版本标签即可自动构建并发布 APK：

```bash
git tag v1.0.0
git push origin v1.0.0
```

构建完成后，APK 将自动发布到 GitHub Releases。详细信息请查看 [RELEASE_WORKFLOW.md](RELEASE_WORKFLOW.md)

## 桌面小部件

Android 版本支持主屏幕小部件，让您无需打开应用即可查看今日课程：

- 📱 显示今日所有课程
- ⏰ 显示时间和地点信息
- 🔄 每30分钟自动更新
- 👆 点击打开应用

详细使用说明请查看 [WIDGET_GUIDE.md](WIDGET_GUIDE.md)

## 项目结构

```
unischedule/
├── components/          # React 组件
│   ├── ImportPage.tsx   # 导入页面
│   ├── ScheduleGrid.tsx # 周视图
│   ├── DailyView.tsx    # 日视图
│   └── SettingsPage.tsx # 设置页面
├── utils/              # 工具函数
│   ├── icsParser.ts    # ICS 解析器
│   ├── jsonParser.ts   # JSON 解析器
│   └── textParser.ts   # 文本解析器
├── types.ts            # TypeScript 类型定义
├── constants.ts        # 常量配置
└── App.tsx            # 主应用组件
```

## 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式**：Tailwind CSS (via CDN)
- **图标**：Lucide React
- **移动端**：Capacitor

## 许可证

MIT License
