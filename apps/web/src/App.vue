<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const route = useRoute()

const authorLink = computed(() => authStore.authorBlogPath)
const authorLinkLabel = computed(() => (authStore.displayName ? `${authStore.displayName} 的主页` : '作者主页'))
const isBlogHomeRoute = computed(() => route.name === 'blog-home')
</script>

<template>
  <RouterView v-if="isBlogHomeRoute" />

  <div
    v-else
    class="shell"
  >
    <header class="site-header">
      <RouterLink
        class="brand"
        to="/"
      >
        Inkhouse
      </RouterLink>
      <nav class="site-nav">
        <RouterLink to="/">
          文章
        </RouterLink>
        <RouterLink :to="authorLink">
          {{ authorLinkLabel }}
        </RouterLink>
        <RouterLink to="/admin/login">
          管理登录
        </RouterLink>
        <RouterLink to="/admin/articles">
          文章管理
        </RouterLink>
        <RouterLink to="/admin/articles/new">
          写文章
        </RouterLink>
      </nav>
    </header>

    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>
