<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import AssetPickerPanel from '@/components/AssetPickerPanel.vue'
import { createArticle } from '@/api/articles'
import { useAuthStore } from '@/stores/auth'

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

const loading = ref(false)
const error = ref('')
const success = ref('')
const coverPreviewUrl = ref('')
const coverUploadMessage = ref('')

async function handleSubmit() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const article = await createArticle(form, authStore.token)

    if (article.status === 'published') {
      success.value = '文章已发布，正在跳转到前台详情页'
      await router.push(`/u/${authStore.username}/article/${article.slug}`)
      return
    }

    success.value = '草稿已保存。草稿不会出现在公开首页，也不能通过前台详情页访问。'
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '创建文章失败'
  } finally {
    loading.value = false
  }
}

function handleAssetError(message: string) {
  error.value = message
}

function fillSlug() {
  if (form.slug.trim()) {
    return
  }

  form.slug = form.title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
</script>

<template>
  <section class="page-grid">
    <article class="hero-card">
      <span class="eyebrow">Admin Panel</span>
      <h1 class="hero-title">
        发布文章
      </h1>
      <p class="hero-copy">
        这里只有登录后的管理员可以访问。先把最小发文流程接通，后面再补编辑、删除和文章管理列表。
      </p>
      <p class="muted">
        `published` 会进入公开首页和详情页，`draft` 只保留在后台。
      </p>
    </article>

    <section class="panel">
      <form
        class="form"
        @submit.prevent="handleSubmit"
      >
        <label>
          标题
          <input
            v-model="form.title"
            type="text"
            maxlength="120"
            @blur="fillSlug"
          >
        </label>

        <label>
          slug
          <input
            v-model="form.slug"
            type="text"
            maxlength="120"
            placeholder="my-first-post"
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
          正文类型
          <select v-model="form.bodyType">
            <option value="plain">纯文本</option>
            <option value="markdown">Markdown</option>
          </select>
        </label>

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

        <button
          class="button"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? '提交中…' : '创建文章' }}
        </button>
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
      <p class="muted">
        现在文章已经支持 `plain` 和 `markdown` 两种正文类型，先保留文本展示，后面再接 Markdown 渲染器。
      </p>
    </section>
  </section>
</template>