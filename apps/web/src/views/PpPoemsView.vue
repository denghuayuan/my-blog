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
      <h1 class="person-title">小学生读诗词</h1>
      <p class="person-copy">
        诗词模块建议先从固定诗词库开始，展示诗文、拼音、注释、译文和背诵练习。内容量小，
        可以直接放在前端或数据库里，服务器压力很低。
      </p>
    </section>

    <section class="module-grid">
      <article class="module-card">
        <span class="status-pill">第一步</span>
        <h2>诗词卡片</h2>
        <p>展示标题、作者、正文、拼音、注释和译文，适合小学生逐句读。</p>
      </article>
      <article class="module-card">
        <span class="status-pill">练习模式</span>
        <h2>背诵练习</h2>
        <p>可以做遮字、填空、显示下一句等互动，不需要复杂后端。</p>
      </article>
      <article class="module-card">
        <span class="status-pill">可扩展</span>
        <h2>每日一首</h2>
        <p>后面可以按年级、主题和难度推荐诗词。</p>
      </article>
    </section>
  </section>
</template>
