<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchAssets, uploadAsset, type AssetSummary } from '@/api/assets'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const novels = ref<AssetSummary[]>([])
const loading = ref(true)
const uploading = ref(false)
const error = ref('')
const info = ref('')

const textAssets = computed(() =>
  novels.value.filter((asset) => {
    const name = asset.originalName.toLowerCase()
    return name.endsWith('.txt') || name.endsWith('.md') || asset.mimeType.startsWith('text/')
  })
)

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

async function loadNovels() {
  loading.value = true
  error.value = ''

  try {
    novels.value = await fetchAssets(authStore.token, {
      kind: 'file',
    })
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '加载小说文件失败'
  } finally {
    loading.value = false
  }
}

async function handleUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  const lowerName = file.name.toLowerCase()
  const allowed = lowerName.endsWith('.txt') || lowerName.endsWith('.md')

  if (!allowed) {
    error.value = '目前先支持上传 TXT 或 Markdown 小说文件'
    target.value = ''
    return
  }

  uploading.value = true
  error.value = ''
  info.value = ''

  try {
    const asset = await uploadAsset(file, authStore.token)
    novels.value = [asset, ...novels.value.filter((item) => item.id !== asset.id)]
    info.value = `已上传：${asset.originalName}`
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '上传小说失败'
  } finally {
    uploading.value = false
    target.value = ''
  }
}

onMounted(loadNovels)
</script>

<template>
  <section class="page-grid">
    <article class="hero-card">
      <span class="eyebrow">Admin Panel</span>
      <h1 class="hero-title">
        小说上传
      </h1>
      <p class="hero-copy">
        先从轻量上传开始：把 TXT 或 Markdown 小说文件保存到服务器本地磁盘。下一步再把文件解析成章节，
        接到 PP 的小说阅读器。
      </p>
    </article>

    <section class="panel page-grid">
      <div class="admin-toolbar">
        <label class="button secondary-button novel-upload-button">
          {{ uploading ? '上传中...' : '选择小说文件' }}
          <input
            type="file"
            accept=".txt,.md,text/plain,text/markdown"
            :disabled="uploading"
            @change="handleUpload"
          >
        </label>
        <button
          class="button secondary-button"
          type="button"
          :disabled="loading"
          @click="loadNovels"
        >
          {{ loading ? '刷新中...' : '刷新列表' }}
        </button>
        <RouterLink
          class="button secondary-button"
          to="/pp/novels"
        >
          查看前台
        </RouterLink>
      </div>

      <div
        v-if="info"
        class="panel-success"
      >
        {{ info }}
      </div>
      <div
        v-if="error"
        class="error"
      >
        {{ error }}
      </div>

      <div
        v-if="loading"
        class="panel"
      >
        正在加载小说文件...
      </div>
      <div
        v-else-if="!textAssets.length"
        class="empty"
      >
        还没有上传小说。先选择一个 TXT 或 Markdown 文件。
      </div>

      <div
        v-else
        class="admin-article-list"
      >
        <article
          v-for="novel in textAssets"
          :key="novel.id"
          class="admin-article-card"
        >
          <div class="meta">
            <span class="status-pill">{{ novel.mimeType }}</span>
            <span>{{ formatSize(novel.size) }}</span>
          </div>
          <h2 class="article-title">
            {{ novel.originalName }}
          </h2>
          <p class="muted">
            当前已经保存为资源文件，后续会继续接入章节解析和阅读器。
          </p>
          <div class="admin-toolbar">
            <a
              class="button secondary-button"
              :href="novel.url"
              target="_blank"
              rel="noreferrer"
            >
              打开原文件
            </a>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>
