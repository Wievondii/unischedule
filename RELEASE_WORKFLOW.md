# Release Workflow Documentation

## 自动构建和发布 APK (Automatic APK Build and Release)

本仓库配置了 GitHub Actions 工作流，可以自动构建 Android APK 并发布到 GitHub Releases。

### 触发方式 (How to Trigger)

工作流可以通过以下两种方式触发：

#### 1. 创建版本标签 (Create Version Tag)

当推送以 `v` 开头的标签时，工作流会自动运行并创建正式发行版：

```bash
# 创建版本标签
git tag v1.0.0

# 推送标签到远程仓库
git push origin v1.0.0
```

发布的 APK 文件名格式：`UniSchedule-v1.0.0.apk`

#### 2. 手动触发 (Manual Trigger)

也可以通过 GitHub 网页界面手动触发工作流：

1. 访问仓库的 Actions 页面
2. 选择 "Build and Release APK" 工作流
3. 点击 "Run workflow" 按钮
4. 选择要运行的分支
5. 点击 "Run workflow" 确认

手动触发时，APK 会作为 artifact 上传，但不会创建正式发行版。
APK 文件名格式：`UniSchedule-dev-<7位commit哈希>.apk`（例如：`UniSchedule-dev-abc1234.apk`）

### 工作流步骤 (Workflow Steps)

工作流会执行以下步骤：

1. **检出代码** - 获取仓库代码
2. **设置 Node.js 环境** - 安装 Node.js 20
3. **安装依赖** - 运行 `npm ci` 安装项目依赖
4. **构建 Web 应用** - 运行 `npm run build` 构建前端
5. **设置 Java JDK** - 安装 Java 17（Android 构建所需）
6. **设置 Android SDK** - 安装 Android SDK 工具
7. **同步 Capacitor** - 运行 `npx cap sync android` 生成 Android 项目
8. **构建 APK** - 使用 Gradle 构建 debug APK
9. **重命名和上传 APK** - 将 APK 重命名并上传
10. **创建发行版** - 如果是标签触发，自动创建 GitHub Release

### 查看构建结果 (View Build Results)

#### 查看构建日志 (Build Logs)

1. 访问仓库的 Actions 页面
2. 点击相应的工作流运行
3. 查看各个步骤的详细日志

#### 下载 APK (Download APK)

##### 从 Release 下载（推荐）

1. 访问仓库的 Releases 页面
2. 找到相应的版本
3. 在 Assets 部分下载 APK 文件

##### 从 Artifacts 下载

1. 访问 Actions 页面的工作流运行详情
2. 在 Artifacts 部分找到 "UniSchedule-APK"
3. 点击下载

### 注意事项 (Notes)

1. 当前工作流构建的是 **debug APK**，适合测试使用
2. 如需生产环境的 **release APK**，需要：
   - 配置签名密钥
   - 修改工作流使用 `assembleRelease`
   - 添加签名配置到 Secrets
3. APK 文件会同时：
   - 作为 artifact 保存（所有触发方式）
   - 发布到 Releases（仅标签触发）
4. 构建时间约 5-10 分钟，取决于 GitHub Actions 的资源分配

### 本地测试工作流 (Test Workflow Locally)

如果需要在本地测试构建过程，可以使用以下命令：

```bash
# 安装依赖
npm install

# 构建 Web 应用
npm run build

# 同步 Capacitor（需要 Android SDK）
npx cap sync android

# 构建 APK（需要 Android SDK 和 Java）
cd android
./gradlew assembleDebug
```

生成的 APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 故障排除 (Troubleshooting)

#### 构建失败

- 检查 Node.js 依赖是否正确
- 确认 `package.json` 中的构建脚本正确
- 查看详细的构建日志

#### Android 构建失败

- 检查 Android SDK 版本是否兼容
- 确认 Gradle 配置正确
- 查看 Gradle 错误日志

#### 发布失败

- 确认有推送权限
- 检查 `GITHUB_TOKEN` 是否有足够的权限
- 确认标签格式正确（以 `v` 开头）
