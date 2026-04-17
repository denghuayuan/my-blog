<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { fetchAdminArticles, type AdminArticleSummary } from '@/api/articles'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const articles = ref<AdminArticleSummary[]>([])
const loading = ref(true)
const error = ref('')

async function loadArticles() {
  loading.value = true
  error.value = ''

  try {
    articles.value = await fetchAdminArticles(authStore.token)
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '加载文章列表失败'
  } finally {
    loading.value = false
  }
}

onMounted(loadArticles)

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <section class="page-grid">
    <article class="hero-card">
      <span class="eyebrow">Admin Panel</span>
      <h1 class="hero-title">
        文章管理
      </h1>
      <p class="hero-copy">
        这里先提供最小可用的管理视图：查看现有文章、进入编辑页、继续新增文章。
      </p>
    </article>

    <section class="panel page-grid">
      <div class="admin-toolbar">
        <RouterLink
          class="button secondary-button"
          to="/admin/articles/new"
        >
          新建文章
        </RouterLink>
        <button
          class="button secondary-button"
          type="button"
          :disabled="loading"
          @click="loadArticles"
        >
          {{ loading ? '刷新中…' : '刷新列表' }}
        </button>
      </div>

      <div
        v-if="loading"
        class="panel"
      >
        正在加载后台文章列表…
      </div>
      <div
        v-else-if="error"
        class="error"
      >
        {{ error }}
      </div>
      <div
        v-else-if="!articles.length"
        class="empty"
      >
        当前还没有任何文章。
      </div>

      <div
        v-else
        class="admin-article-list"
      >
        <article
          v-for="article in articles"
          :key="article.id"
          class="admin-article-card"
        >
          <img
            v-if="article.coverUrl"
            class="asset-thumb"
            :src="article.coverUrl"
            :alt="article.title"
          >
          <div class="page-grid">
            <div class="meta">
              <span>{{ formatDate(article.updatedAt) }}</span>
              <span class="status-pill">{{ article.status }}</span>
              <span class="status-pill">{{ article.bodyType }}</span>
            </div>
            <h2 class="article-title">
              {{ article.title }}
            </h2>
            <p class="muted">
              {{ article.summary || '暂无摘要' }}
            </p>
            <p
              v-if="article.author"
              class="muted"
            >
              作者：{{ article.author.displayName }} · @{{ article.author.username }}
            </p>
            <div class="admin-toolbar">
              <RouterLink
                class="button secondary-button"
                :to="`/admin/articles/${article.id}/edit`"
              >
                编辑文章
              </RouterLink>
              <RouterLink
                class="button secondary-button"
                :to="`/u/${article.author?.username || 'admin'}/article/${article.slug}`"
              >
                查看前台
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>