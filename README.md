# 📝 Xinzhe.Blog

使用 Notion + Next.js 构建的自部署博客系统，支持 SEO、社交分享、高速加载和自动部署。内容直接来自 Notion 页面，专注于编程、AI、前端开发等技术分享。

👉 在线预览：https://xinzhe.dev  
👉 项目地址：https://github.com/XinzheGao/Xinzhe.Blog

---

## 📌 项目简介

Xinzhe.Blog 是一个基于 **Notion API** 和 **Next.js** 构建的轻量级博客系统，内容写在 Notion 上，通过静态生成（SSG）方式发布到 Vercel，既拥有出色的性能，又便于维护与更新。

---

## ✨ 特性亮点

- ⚡️ **Notion 作为 CMS**：内容从 Notion 实时同步，写文章像记笔记一样方便。
- 🚀 **Next.js 静态生成**：构建速度快，访问延迟低，支持 ISR 增量更新。
- 🌐 **SEO 完善**：自动生成 sitemap，支持结构化数据、Open Graph、Twitter Card。
- 🎨 **Tailwind CSS**：现代响应式布局，样式简洁优雅。
- 📱 **移动端适配**：在手机、平板、桌面端都能良好展示。
- 🧩 **模块化结构**：组件清晰易维护，方便自定义扩展。
- 🔒 **开源部署**：支持一键部署至 Vercel 或其他平台。

---

## 🛠 技术栈

| 技术       | 用途                   |
|------------|------------------------|
| [Next.js]  | React 框架，支持 SSG/SSR |
| [React]    | 页面组件开发           |
| [Notion API] | 获取文章内容数据        |
| [Tailwind CSS] | 响应式 UI 样式库      |
| [Vercel]   | 自动构建与部署平台       |
| [next-sitemap] | 自动生成 Sitemap     |

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/XinzheGao/Xinzhe.Blog.git
cd Xinzhe.Blog
````

### 2. 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 3. 设置环境变量

在根目录下创建 `.env.local` 文件，添加以下内容：

```env
NOTION_TOKEN=你的Notion整合密钥
NOTION_DATABASE_ID=你的Notion数据库ID
```

> 👉 获取方式请参考：[Notion API 文档](https://developers.notion.com/docs/getting-started)

### 4. 本地启动

```bash
npm run dev
# 或 yarn dev
```

浏览器访问：[http://localhost:3000](http://localhost:3000)

---

## 🖼 网站截图

> *（你可以在这里贴上 `xinzhe.dev` 首页和文章页的截图）*

---

## ☁️ 一键部署至 Vercel

1. 前往 [vercel.com](https://vercel.com) 登录 GitHub。
2. 点击 `New Project`，导入本项目。
3. 设置环境变量（与 `.env.local` 相同）。
4. 点击部署即可。

---

## 📦 文件结构说明（简略）

```
.
├── components/         # 公共组件
├── lib/                # 数据处理与 Notion API
├── pages/              # Next.js 页面路由
├── public/             # 静态资源
├── styles/             # Tailwind 样式配置
├── .env.local          # 环境变量
├── next.config.js      # Next.js 配置
└── vercel.json         # Vercel 构建配置
```

---

## 📚 博客内容

博客主题围绕以下方向：

* 前端开发（React / Next.js / CSS / 工程化）
* 人工智能（大语言模型、AI 应用）
* 编程实践（小项目分享、工具推荐）
* 技术成长记录（学习心得、思维方式）

---

## 🤝 贡献与交流

欢迎感兴趣的开发者一起交流或提交 PR，也可以 fork 本项目搭建属于你自己的 Notion 博客。

> 如果你喜欢这个项目，请 Star 支持一下吧！

---

## 📇 作者信息

* 👨‍💻 作者：高信哲（Xinzhe Gao）
* 🌐 博客主页：[https://xinzhe.dev](https://xinzhe.dev)
* 🐙 GitHub：[https://github.com/XinzheGao](https://github.com/XinzheGao)

---

## 📝 License

[MIT](LICENSE) License © 2025-present 高信哲
