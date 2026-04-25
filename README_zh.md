# JennaPress

[![Website](https://img.shields.io/badge/Website-www.jennapress.com-blue)](https://www.jennapress.com)
![Framework](https://img.shields.io/badge/Framework-Nuxt_3-00DC82?style=for-the-badge&logo=nuxt.js)
![Strategy](https://img.shields.io/badge/Strategy-Static_First-blue?style=for-the-badge)
![Design](https://img.shields.io/badge/Design-Template_Driven-FF69B4?style=for-the-badge)

JennaPress 是一个基于 Nuxt 3 的轻量级、静态优先、模板驱动的网站框架。

它适合构建大部分业务变化都应发生在 `content/`、`templates/` 和 `public/template-assets/` 中的网站，而路由、渲染和数据读取逻辑应尽量保持通用和稳定。

典型使用场景包括公司官网、落地页、产品展示站、博客、文档站、内容站、目录站，以及其它静态或偏静态网站。

---

## 1. 设计目标

JennaPress 遵循以下核心原则：

- 框架层保持稳定。
- 使用者主要修改 `content/*`。
- 设计师和模板作者主要修改 `templates/*` 与 `public/template-assets/*`。
- 路由保持通用，不把业务页面写死在框架中。
- 支持 `page`、`blog`、`product` 等多种内容类型。
- 通过注册的多语言内容支持国际化站点。
- 模板可以作为独立包分发和安装。

---

## 2. 快速开始

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

生成静态站点：

```bash
npm run generate
```

预览生成结果：

```bash
npm run preview
```

---

## 3. 工程结构

```text
content/
  l18n.ts
  site.md
  site.<locale>.md
  pages/
  posts/
  products/

public/
  template-assets/
    <template-id>/

templates/
  <template-id>/
    template.meta.json
    Template.vue
    Frame.vue
    template.css
    components/
    page/
    blog/
    product/

pages/
  index.vue
  [...slug].vue
  blog/
  products/

lib/
components/
composables/
types/
```

主要可编辑区域是：

- `content/`：站点数据和内容数据。
- `templates/`：模板布局、样式和不同内容类型的渲染。
- `public/template-assets/`：模板专属静态资源。

创建或安装模板时，通常不应修改 `pages/`、`lib/`、`components/`、`composables/`、`types/` 等框架目录。

---

## 4. 内容层

内容层负责站点配置、多语言文本、页面、文章和产品数据。

### 必须保留的注册文件

```text
content/l18n.ts
content/site.md
content/site.<locale>.md
```

`content/l18n.ts` 用于注册支持的语言。

`content/site.md` 是默认站点配置。

`content/site.<locale>.md` 用于提供本地化站点配置，例如：

```text
content/site.zh.md
```

### 内容类型

JennaPress 可以渲染多种内容类型：

```text
page
blog
product
```

每个内容项应声明对应类型需要的字段。以 product 为例，常见字段如下：

```yaml
title: "Example Product"
description: "Short product description."
category: "example-category"
tags:
  - seo
  - nuxt
price: 0
previewImage: "/template-assets/example/cover.webp"
previewUrl: "https://example.com/preview"
downloadUrl: "https://example.com/download.zip"
```

一个 product 应只归属于一个主 `category`，但可以拥有多个 `tags`，用于筛选、搜索和推荐。

---

## 5. 模板层

模板位于：

```text
templates/<template-id>/
```

一个典型模板包含：

```text
template.meta.json
Template.vue
Frame.vue
template.css
components/
page/
blog/
product/
```

### 模板负责什么

模板主要负责：

- 视觉设计
- 响应式布局
- 内容类型渲染
- 组件组合
- 模板专属 CSS
- 使用 `public/template-assets/<template-id>/` 中的资源

模板不应负责：

- 修改核心路由
- 修改全局数据读取逻辑
- 修改构建配置
- 引入只能依赖后端的行为
- 把应该放在 `content/` 中的业务数据硬编码到模板里

### 内容类型模块

模板可以为不同内容类型实现独立模块：

```text
templates/<template-id>/page/
templates/<template-id>/blog/
templates/<template-id>/product/
```

例如，一个偏 product 的模板可以提供：

```text
templates/<template-id>/product/ProductHome.vue
templates/<template-id>/product/ProductCategory.vue
templates/<template-id>/product/ProductDetail.vue
```

---

## 6. 公共资源

模板专属公共资源应放在：

```text
public/template-assets/<template-id>/
```

示例：

```text
public/template-assets/<template-id>/cover.webp
public/template-assets/<template-id>/screenshot-1.webp
public/template-assets/<template-id>/icons.svg
```

不要把模板资源散落到无关的 public 目录中。按照 template id 隔离资源，可以让打包、安装和清理更加安全。

---

## 7. 多语言内容

JennaPress 使用语言注册文件和本地化内容文件来支持多语言。

典型结构：

```text
content/l18n.ts
content/site.md
content/site.zh.md
```

模板应使用支持 locale 的导航 helper，避免在需要多语言路由的地方硬编码内部链接。

语言切换器应在已注册语言之间切换，并尽量保持当前页面上下文。

---

## 8. 模板包标准

JennaPress 模板包是可以安装到 JennaPress 项目中的独立包。

为了保证可移植性和安装安全，一个模板包应只包含以下五个顶层项目：

```text
example-template/
  jennapress-template.json
  templates/
    <template-id>/
  public/
    template-assets/
      <template-id>/
  demo-content/
    l18n.ts
    site.md
    site.<locale>.md
    pages/
    posts/
    products/
  README.md
```

五个顶层项目分别是：

1. `jennapress-template.json`：模板包 manifest。
2. `templates/`：真正的模板实现。
3. `public/`：模板专属公共资源。
4. `demo-content/`：用于预览或手动导入的示例内容。
5. `README.md`：安装说明和该模板包的使用说明。

模板包不得包含 JennaPress 框架源码。它不应包含 `pages/`、`lib/`、`components/`、`composables/`、`types/`、`server/`、`nuxt.config.ts` 或 `package.json` 等框架目录或文件。

模板包也不应包含根级 `content/` 目录。示例内容应放入 `demo-content/`，避免默认覆盖用户已有站点内容。

---

## 9. 模板 manifest

`jennapress-template.json` 示例：

```json
{
  "id": "example-template",
  "name": "Example Template",
  "type": "product",
  "version": "1.0.0",
  "entry": "templates/example-template",
  "assets": "public/template-assets/example-template",
  "demoContent": "demo-content",
  "supports": ["en", "zh"],
  "requires": {
    "jennapress": ">=1.0.0"
  }
}
```

manifest 用于描述模板包、定位模板入口、定位资源目录、声明示例内容，以及定义兼容版本。

---

## 10. 安全安装规则

将模板安装到已有项目时：

1. 复制 `templates/<template-id>/` 到项目中。
2. 复制 `public/template-assets/<template-id>/` 到项目中。
3. 不要自动覆盖 `content/`。
4. 将 `demo-content/` 视为可选示例数据。
5. 除非用户明确确认替换，否则保留已有的 `content/l18n.ts`、`content/site.md` 和本地化 site 文件。
6. 除非模板明确声明所需核心版本或迁移步骤，否则不要修改框架层。

这样可以让模板安装更容易回滚，也能降低用户内容丢失风险。

---

## 11. 开发边界

普通模板开发通常应限制在：

```text
templates/
content/
public/
```

除非任务明确是框架开发，否则应避免修改：

```text
pages/
lib/
components/
composables/
types/
server/
nuxt.config.ts
package.json
```

这个边界可以让 code review 更清晰，也能保持模板的可移植性。

---

## 12. 部署

JennaPress 是静态优先的。执行以下命令后，可以将生成结果部署到静态托管平台：

```bash
npm run generate
```

生成结果可以由静态文件服务器、CDN、对象存储或传统 Web 服务器提供服务。

---

## 13. 授权模型

JennaPress 框架和独立 JennaPress 模板包可以使用不同的授权模型。

对于 JennaPress 框架仓库，使用、修改、再分发和商业使用权限由该仓库中的 `LICENSE` 文件决定。

对于独立模板包，推荐规则是：

```text
模板包不包含框架源码。
模板包的权利由模板包自身决定。
如果模板包不包含 LICENSE 文件，则默认不授予开源许可。
```

专有模板包可以在其 README 中加入如下声明：

```text
本模板包为专有资源。未授权任何再分发、转售、再许可、公开托管，或作为竞争性模板包或模板市场使用的权利。保留所有权利。
```

这样可以将开源的 JennaPress 框架与专有模板包清晰分离。
