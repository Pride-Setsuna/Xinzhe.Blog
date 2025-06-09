# Xinzhe.Blog

个人技术博客，基于 Next.js + Notion API 自部署，实现高性能的静态站点生成和优雅的内容管理。

---

## 项目简介

Xinzhe.Blog 是我的个人技术博客，使用 Notion 作为内容管理系统（CMS），通过 Notion API 获取文章数据，结合 Next.js 进行静态生成，支持 SEO 优化和社交分享。博客内容涵盖编程、AI、前端开发等技术领域。

---

## 主要特性

- 📝 **Notion 集成**：直接从 Notion 页面同步内容，免去繁琐的后台管理。
- ⚡ **Next.js 静态生成（SSG）**：提升页面加载速度和 SEO 表现。
- 🎨 **Tailwind CSS**：美观且响应式设计，适配多端设备。
- 🔍 **SEO 优化**：自动生成 sitemap，配置 Meta 标签和结构化数据。
- 🚀 **社交分享**：支持 Open Graph 和 Twitter Card，分享时显示漂亮的卡片。
- 📦 **自动部署**：支持 Vercel 一键部署和持续集成。
- 📊 **性能优化**：合理缓存、图片懒加载，提升访问体验。

---

## 技术栈

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Notion API](https://developers.notion.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- Vercel（托管平台）

---

## 使用说明

1. 克隆仓库：
```bash
git clone https://github.com/XinzheGao/Xinzhe.Blog.git
cd Xinzhe.Blog

安装依赖：
npm install
# or
yarn install

配置环境变量 .env.local：
NOTION_TOKEN=你的Notion集成Token
NOTION_DATABASE_ID=你的Notion数据库ID

本地启动开发服务器：
npm run dev
# or
yarn dev
访问 http://localhost:3000 查看博客。

部署
推荐使用 Vercel 平台进行部署，直接连接 GitHub 仓库，自动构建和发布。

贡献
欢迎提交 issues 和 pull requests，共同完善博客功能！

联系
主页: https://xinzhe.dev
GitHub: https://github.com/XinzheGao

许可证

MIT License
