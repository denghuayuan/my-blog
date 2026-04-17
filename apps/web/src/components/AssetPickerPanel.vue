<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import { deleteAsset, fetchAssets, uploadAsset, type AssetSummary } from '@/api/assets'

const props = defineProps<{
  token: string
  modelValue: string
  previewUrl?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:previewUrl': [value: string]
  error: [message: string]
  info: [message: string]
}>()

const uploadLoading = ref(false)
const assetLoading = ref(false)
const assetLibrary = ref<AssetSummary[]>([])
const filters = reactive({
  kind: 'all' as 'all' | 'image' | 'file',
  query: '',
})

async function loadAssets() {
  assetLoading.value = true

  try {
    assetLibrary.value = await fetchAssets(props.token, filters)
  } catch (requestError) {
    emit('error', requestError instanceof Error ? requestError.message : '加载资产列表失败')
  } finally {
    assetLoading.value = false
  }
}

async function handleUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    return
  }

  uploadLoading.value = true

  try {
    const asset = await uploadAsset(file, props.token)
    emit('update:modelValue', asset.id)
    emit('update:previewUrl', asset.url)
    emit('info', `封面已上传：${asset.originalName}`)
    assetLibrary.value = [asset, ...assetLibrary.value.filter((item) => item.id !== asset.id)]
  } catch (requestError) {
    emit('error', requestError instanceof Error ? requestError.message : '封面上传失败')
  } finally {
    uploadLoading.value = false
    target.value = ''
  }
}

function selectAsset(asset: AssetSummary) {
  emit('update:modelValue', asset.id)
  emit('update:previewUrl', asset.url)
  emit('info', `已选择已有资源：${asset.originalName}`)
}

async function removeAsset(asset: AssetSummary) {
  try {
    await deleteAsset(asset.id, props.token)
    assetLibrary.value = assetLibrary.value.filter((item) => item.id !== asset.id)

    if (props.modelValue === asset.id) {
      emit('update:modelValue', '')
      emit('update:previewUrl', '')
    }

    emit('info', `已删除资源：${asset.originalName}`)
  } catch (requestError) {
    emit('error', requestError instanceof Error ? requestError.message : '删除资产失败')
  }
}

watch(
  () => props.token,
  () => {
    if (props.token) {
      void loadAssets()
    }
  }
)

onMounted(() => {
  void loadAssets()
})
</script>

<template>
  <div class="asset-picker">
    <label>
      封面上传
      <input
        type="file"
        accept="image/*"
        @change="handleUpload"
      >
    </label>

    <p
      v-if="uploadLoading"
      class="muted"
    >
      封面上传中…
    </p>

    <div class="asset-library-block">
      <div class="asset-library-header">
        <span class="muted">资源库</span>
        <button
          class="button secondary-button"
          type="button"
          :disabled="assetLoading"
          @click="loadAssets"
        >
          {{ assetLoading ? '刷新中…' : '刷新资源' }}
        </button>
      </div>

      <div class="asset-filter-row">
        <input
          v-model="filters.query"
          type="text"
          placeholder="按文件名或类型搜索"
        >
        <select v-model="filters.kind">
          <option value="all">
            全部
          </option>
          <option value="image">
            图片
          </option>
          <option value="file">
            文件
          </option>
        </select>
        <button
          class="button secondary-button"
          type="button"
          @click="loadAssets"
        >
          应用筛选
        </button>
      </div>

      <p
        v-if="!assetLibrary.length && !assetLoading"
        class="muted"
      >
        没有匹配的资源。
      </p>

      <div
        v-else
        class="asset-grid"
      >
        <article
          v-for="asset in assetLibrary"
          :key="asset.id"
          class="asset-card"
        >
          <button
            class="asset-select"
            type="button"
            @click="selectAsset(asset)"
          >
            <img
              v-if="asset.mimeType.startsWith('image/')"
              class="asset-thumb"
              :src="asset.url"
              :alt="asset.originalName"
            >
            <div
              v-else
              class="asset-file"
            >
              {{ asset.originalName.slice(0, 2).toUpperCase() }}
            </div>
            <strong>{{ asset.originalName }}</strong>
            <span class="muted">{{ asset.mimeType }}</span>
            <span class="muted">引用次数：{{ asset.usageCount }}</span>
          </button>

          <div class="asset-actions">
            <button
              class="button secondary-button"
              type="button"
              @click="selectAsset(asset)"
            >
              选择
            </button>
            <button
              class="button danger-button"
              type="button"
              :disabled="asset.isInUse"
              @click="removeAsset(asset)"
            >
              {{ asset.isInUse ? '使用中' : '删除' }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>