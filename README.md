<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# UniSchedule - 大学课程表管理应用

一个现代化的大学课程表管理应用，支持多种格式导入和移动端使用。

## 功能特性

- 📅 **课程表展示**：周视图和日视图两种模式
- 📥 **多格式导入**：支持 .ics (iCalendar)、.json 和文本格式
- 💾 **本地存储**：课程数据自动保存到浏览器
- 📱 **移动优先**：响应式设计，支持移动端使用
- 🎨 **美观界面**：类 iPhone 风格的现代化 UI
- 📦 **APK 构建**：可打包为 Android 应用

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

将应用打包为 Android APK：

1. 同步构建：
   ```bash
   npm run android:sync
   ```

2. 构建 APK：
   ```bash
   npm run android:build
   ```

详细步骤请查看 [BUILD_APK.md](BUILD_APK.md)

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

## AI Studio

View your app in AI Studio: https://ai.studio/apps/drive/1wattRPPEPBtilIdGgmlf7A_3rnTbs2U6

## 许可证

MIT License
