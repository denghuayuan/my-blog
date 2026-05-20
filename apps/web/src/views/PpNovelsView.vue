<template>
  <section class="person-page">
    <section class="person-hero">
      <RouterLink
        class="person-back"
        to="/pp"
      >
        返回 PP
      </RouterLink>
      <p class="eyebrow">PP Module</p>
      <h1 class="person-title">看小说</h1>
      <p class="person-copy">
        小说模块建议先做成自用书架：管理员上传 TXT 或 Markdown 文件，系统拆成章节，前台按章节阅读。
        这样 2G 服务器也能轻松跑起来，页面不会一次性加载整本书。
      </p>
      <div class="admin-toolbar">
        <RouterLink
          class="button secondary-button"
          to="/admin/novels"
        >
          去后台上传小说
        </RouterLink>
      </div>
    </section>

    <section class="module-grid">
      <article class="module-card">
        <span class="status-pill">推荐方案</span>
        <h2>自己上传</h2>
        <p>先支持 TXT、Markdown。文件存本地磁盘，数据库只存书名、作者、章节索引和阅读进度。</p>
      </article>
      <article class="module-card">
        <span class="status-pill">轻量阅读</span>
        <h2>按章加载</h2>
        <p>阅读器每次只请求一个章节，适合小服务器，也方便以后做字体大小、夜间模式和进度记录。</p>
      </article>
      <article class="module-card">
        <span class="status-pill">后续扩展</span>
        <h2>书架管理</h2>
        <p>可以继续加上传入口、封面、分类、最近阅读、章节目录和删除/重新解析。</p>
      </article>
    </section>
  </section>
</template>
