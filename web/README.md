# Cloudflare Web 版

这是“花掉首富的钱！”的 Cloudflare Pages 版本。前端不需要构建，排行榜使用 Pages Functions + D1。D1 Binding 通过 Cloudflare 网页控制台管理，避免本地 Wrangler 配置锁定控制台设置。



## 完全免费方案

不需要购买域名。当前游戏使用 Cloudflare Pages 免费提供的公开地址：

```text
此处不披露，可问作者要网址
```

这个地址全球可以访问，也可以运行 Pages Functions 和 D1 全站排行榜。当前项目针对免费额度做了以下控制：

- 静态页面、CSS、JavaScript 不经过 Function。
- 每次打开页面只请求一次排行榜，不进行定时轮询。
- 每局结束只提交一次成绩。
- 排行榜只读取前 20 名。
- D1 使用 `day + score` 索引，避免扫描全部历史数据。
- Function 或 D1 暂时不可用、免费额度耗尽时，游戏会自动降级为浏览器本地排行榜。

Cloudflare 当前免费额度足以支持早期使用：Pages 静态资源请求免费；Pages Functions/Workers 每天提供免费请求额度；D1 也包含每日读写和存储额度。只有访问量明显增长后才需要考虑付费。

## 本地预览

仅预览游戏界面时，可以在 `web` 目录启动任意静态服务器：

```bash
python -m http.server 8788
```

本地静态服务器无法运行 Pages Functions，因此排行榜会自动使用浏览器本地存储。

## 发布到 Cloudflare Pages

### 1. 创建 D1 数据库

```bash
npx wrangler d1 create spend-richest-leaderboard
```

记录命令返回的数据库 ID，然后在 Cloudflare Pages 项目的 Settings → Bindings 中添加 D1 绑定：

- Variable name：`DB`
- D1 database：刚创建的数据库

### 2. 初始化排行榜表

```bash
npx wrangler d1 execute spend-richest-leaderboard --remote --file=./schema.sql
```

### 3. 连接 Git 仓库

在 Cloudflare Pages 中设置：

- Root directory：`web`
- Build command：留空
- Build output directory：`.`

部署完成后，`/api/leaderboard` 会自动由 Pages Functions 提供，全站玩家共享当日排行榜。

自定义域名是可选项。保持 Cloudflare 自动分配的 `*.pages.dev` 地址即可一直使用，不影响全站排行榜。

## 直接上传

Cloudflare Dashboard 的 Direct Upload 适合仅发布静态游戏。若要使用排行榜函数，推荐连接 Git 仓库，或者使用 Wrangler 部署整个 `web` 项目。
