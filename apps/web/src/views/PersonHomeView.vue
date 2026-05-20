<script setup lang="ts">
import { computed } from 'vue'

import { personProfiles, type PersonKey } from '@/content/people'

const props = defineProps<{
  person: PersonKey
}>()

const profile = computed(() => personProfiles[props.person])
</script>

<template>
  <section
    v-if="profile"
    class="person-page"
  >
    <section class="person-hero">
      <RouterLink
        class="person-back"
        to="/"
      >
        返回首页
      </RouterLink>
      <p class="eyebrow">Personal Space</p>
      <h1 class="person-title">{{ profile.name }}</h1>
      <p class="person-subtitle">{{ profile.subtitle }}</p>
      <p class="person-copy">{{ profile.description }}</p>

      <div
        v-if="profile.key === 'pp'"
        class="admin-toolbar"
      >
        <RouterLink
          class="button secondary-button"
          to="/admin/novels"
        >
          上传小说
        </RouterLink>
        <RouterLink
          class="button secondary-button"
          to="/pp/novels"
        >
          进入小说模块
        </RouterLink>
      </div>
    </section>

    <section
      v-if="profile.modules.length"
      class="module-grid"
    >
      <RouterLink
        v-for="module in profile.modules"
        :key="module.path"
        class="module-card"
        :to="module.path"
      >
        <span class="status-pill">{{ module.status }}</span>
        <h2>{{ module.title }}</h2>
        <p>{{ module.description }}</p>
      </RouterLink>
    </section>

    <section
      v-else
      class="panel"
    >
      这个入口已经准备好了，具体模块待定。
    </section>
  </section>
</template>
