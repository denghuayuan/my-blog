<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AssetPickerPanel from '@/components/AssetPickerPanel.vue'
import { fetchAdminArticleDetail, updateArticle } from '@/api/articles'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  title: '',
  slug: '',
  summary: '',
  bodyType: 'plain' as 'plain' | 'markdown',
  content: '',
  coverAssetId: '',
  status: 'draft' as 'draft' | 'published',
})

const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')
const coverPreviewUrl = ref('')
const coverUploadMessage = ref('')
const articleAuthorUsername = ref('')

async function loadArticle() {
  const id = String(route.params.id || '')

  if (!id) {
    error.value = '文章 id 缺失'
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await fetchAdminArticleDetail(id, authStore.token)
    form.title = result.article.title
    form.slug = result.article.slug
    form.summary = result.article.summary || ''
    form.bodyType = result.article.bodyType
    form.content = result.article.content
    form.coverAssetId = result.article.coverAssetId || ''
    form.status = result.article.status
    coverPreviewUrl.value = result.article.coverUrl || ''
    articleAuthorUsername.value = result.author?.username || authStore.username
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '加载文章失败'
  } finally {
    loading.value = false
  }
}

function handleAssetError(message: string) {
  error.value = message
}

async function handleSubmit() {
  const id = String(route.params.id || '')

  if (!id) {
    error.value = '文章 id 缺失'
    return
  }

  error.value = ''
  success.value = ''
  saving.value = true

  try {
    const article = await updateArticle(id, form, authStore.token)
    success.value = '文章已更新'

    if (article.status === 'published') {
      await router.push(`/u/${articleAuthorUsername.value || authStore.username}/article/${article.slug}`)
      return
    }
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '更新文章失败'
  } finally {
    saving.value = false
  }
}

onMounted(loadArticle)
</script>

<template>
  <section class="page-grid">
    <article class="hero-card">
      <span class="eyebrow">Admin Panel</span>
      <h1 class="hero-title">
        编辑文章
      </h1>
      <p class="hero-copy">
        这里先做最小编辑闭环：修改正文、封面、状态和 slug，保存后回到前台或留在后台。
      </p>
    </article>

    <section class="panel">
      <div
        v-if="loading"
        class="panel"
      >
        正在加载文章内容…
      </div>

      <form
        v-else
        class="form"
        @submit.prevent="handleSubmit"
      >
        <label>
          标题
          <input
            v-model="form.title"
            type="text"
            maxlength="120"
          >
        </label>

        <label>
          slug
          <input
            v-model="form.slug"
            type="text"
            maxlength="120"
          >
        </label>

        <label>
          摘要
          <textarea
            v-model="form.summary"
            rows="3"
            maxlength="240"
          />
        </label>

        <label>
          正文类型
          <select v-model="form.bodyType">
            <option value="plain">纯文本</option>
            <option value="markdown">Markdown</option>
          </select>
        </label>

        <p
          v-if="coverUploadMessage"
          class="panel-success"
        >
          {{ coverUploadMessage }}
        </p>

        <label>
          封面资源 ID
          <input
            v-model="form.coverAssetId"
            type="text"
            placeholder="上传后会自动填充，也可手动粘贴"
          >
        </label>

        <img
          v-if="coverPreviewUrl"
          class="detail-cover"
          :src="coverPreviewUrl"
          alt="cover preview"
        >

        <AssetPickerPanel
          v-model="form.coverAssetId"
          :preview-url="coverPreviewUrl"
          :token="authStore.token"
          @update:preview-url="coverPreviewUrl = $event"
          @error="handleAssetError"
          @info="coverUploadMessage = $event"
        />

        <label>
          正文
          <textarea
            v-model="form.content"
            rows="12"
            :placeholder="form.bodyType === 'markdown' ? '# 在这里写 Markdown 内容' : '在这里写正文内容'"
          />
        </label>

        <label>
          状态
          <select v-model="form.status">
            <option value="draft">草稿</option>
            <option value="published">发布</option>
          </select>
        </label>

        <div class="admin-toolbar">
          <button
            class="button"
            type="submit"
            :disabled="saving"
          >
            {{ saving ? '保存中…' : '保存修改' }}
          </button>
          <RouterLink
            class="button secondary-button"
            to="/admin/articles"
          >
            返回列表
          </RouterLink>
        </div>
      </form>

      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>
      <p
        v-if="success"
        class="panel-success"
      >
        {{ success }}
      </p>
    </section>
  </section>
</template>