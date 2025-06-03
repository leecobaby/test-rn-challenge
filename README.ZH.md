# Sign & Verify Demo

一个基于 React Native Web 的数字签名和验证演示应用，支持 Ed25519 签名算法和 SHA-256 哈希。

## 📱 功能特性

### 核心功能
- **数字签名**: 输入消息进行 SHA-256 哈希和 Ed25519 签名
- **签名验证**: 验证消息、公钥和签名的有效性
- **结果展示**: 清晰显示哈希值、签名和公钥（支持一键复制）
- **Profile界面**: 美观的用户信息和统计界面，带有流畅动画

### 技术特性
- ✅ **跨平台**: 支持 Web、iOS 和 Android
- ✅ **TypeScript**: 完整的类型安全
- ✅ **现代UI**: 基于 NativeWind 和 Gluestack UI
- ✅ **状态管理**: 使用 Jotai 进行原子化状态管理
- ✅ **动画效果**: React Native Reanimated 流畅动画
- ✅ **响应式设计**: 适配各种屏幕尺寸

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- npm 或 yarn
- Expo CLI

### 安装依赖

```bash
npm install
```

### 开发运行

```bash
# 启动 Web 开发服务器
npm run web

# 启动 iOS 模拟器
npm run ios

# 启动 Android 模拟器
npm run android

# 启动开发服务器（选择平台）
npm start
```

### 构建部署

```bash
# 构建 Web 版本
npx expo export -p web

npx expo export

npx expo serve

```

## 🔐 加密算法

### Ed25519 数字签名
- **算法**: Ed25519 椭圆曲线数字签名
- **库**: `@noble/ed25519`
- **特点**: 高性能、高安全性、抗量子攻击

### SHA-256 哈希
- **算法**: SHA-256 安全哈希算法
- **库**: `js-sha256`
- **用途**: 消息完整性验证

## 📖 使用说明

### 1. 数字签名

1. 在"签名"标签页输入要签名的消息
2. 点击"Hash + Sign"按钮
3. 系统将显示：
   - SHA-256 哈希值（十六进制）
   - Ed25519 签名（Base64）
   - 公钥（Base64）
4. 可以一键复制任意结果到剪贴板

### 2. 签名验证

1. 在"验证"标签页输入：
   - 原始消息
   - 公钥（Base64 格式）
   - 签名（Base64 格式）
2. 点击"验证签名"按钮
3. 系统将显示验证结果（有效/无效）

### 3. Profile 功能

- 点击主页右上角的"Profile"按钮
- 查看用户信息和签名统计
- 体验流畅的入场/出场动画

## 🛠 技术栈

### 前端框架
- **React Native**: 0.79.2
- **Expo**: ~53.0.7
- **React**: 19.0.0

### UI 组件
- **NativeWind**: ^4.1.23 (Tailwind CSS for React Native)
- **Gluestack UI**: 按需组件库
- **React Native Reanimated**: ~3.17.4 (动画)

### 状态管理
- **Jotai**: ^2.12.5 (原子化状态管理)

### 加密库
- **@noble/ed25519**: Ed25519 数字签名
- **js-sha256**: SHA-256 哈希算法

### 开发工具
- **TypeScript**: ~5.8.3
- **ESLint**: ^9.25.0
- **Expo Router**: ~5.0.5 (文件系统路由)

## 📁 项目结构

```
├── app/                    # 页面路由
│   ├── (tabs)/            # 标签页路由
│   │   ├── index.tsx      # 签名页面
│   │   ├── verify.tsx     # 验证页面
│   │   └── _layout.tsx    # 标签页布局
│   └── _layout.tsx        # 根布局
├── components/            # 组件
│   ├── ui/                # UI 基础组件
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   └── ...
│   ├── navigation/        # 导航组件
│   └── ProfileModal.tsx   # Profile 模态框
├── store/                 # 状态管理
│   └── atomState.ts       # Jotai 状态原子
├── utils/                 # 工具函数
│   └── crypto.ts          # 加密相关函数
├── hooks/                 # 自定义钩子
├── constants/             # 常量定义
└── assets/                # 静态资源
```

## 🎨 设计系统

### 颜色主题
- 支持明亮/暗黑主题自动切换
- 跟随系统主题设置

### 组件设计
- 卡片式布局
- 一致的间距和圆角
- 清晰的层次结构
- 友好的交互反馈

### 动画效果
- Profile 模态框: 弹性进入 + 渐变背景
- 按钮状态: 加载状态指示
- 结果展示: 平滑显示/隐藏

## 🧪 测试

```bash
# 运行 linting
npm run lint

# 类型检查
npx tsc --noEmit
```

## 📝 开发说明

### 添加新页面
1. 在 `app/` 目录下创建新的 `.tsx` 文件
2. 使用 Expo Router 的文件系统路由

### 添加新组件
1. 在 `components/ui/` 下创建组件目录
2. 导出组件和相关类型

### 状态管理
- 使用 Jotai 原子化状态管理
- 在 `store/atomState.ts` 中定义新的状态原子

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 🙋‍♂️ 联系方式

如有问题或建议，请创建 Issue 或联系开发者。

---

**技术特色**
- 🔒 军事级加密算法
- 📱 跨平台原生体验  
- 🎨 现代化 UI 设计
- ⚡ 高性能动画效果
- 🧪 完整 TypeScript 支持