<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
  email: 'admin@example.com',
  password: '',
})

const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    await authStore.signIn(form)
    const redirectTarget = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin/articles/new'
    await router.push(redirectTarget)
  } catch (requestError) {
    error.value = requestError instanceof Error ? requestError.message : '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page-grid">
    <article class="hero-card">
      <span class="eyebrow">Admin Access</span>
      <h1 class="hero-title">
        管理员登录
      </h1>
      <p class="hero-copy">
        这个页面已经接上后端登录接口。登录成功后会把 accessToken 保存到本地，方便后续继续接后台发文页。
      </p>
    </article>

    <section class="panel">
      <form
        class="form"
        @submit.prevent="handleSubmit"
      >
        <label>
          邮箱
          <input
            v-model="form.email"
            type="email"
            autocomplete="username"
          >
        </label>

        <label>
          密码
          <input
            v-model="form.password"
            type="password"
            autocomplete="current-password"
          >
        </label>

        <button
          class="button"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? '登录中…' : '登录' }}
        </button>
      </form>

      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>

      <div
        v-if="authStore.isLoggedIn"
        class="page-grid"
      >
        <p class="muted">
          当前 token 已保存到本地存储，现在可以直接进入后台发文页。
        </p>
        <div class="token-box">
          {{ authStore.token }}
        </div>
        <RouterLink
          class="button secondary-button"
          :to="authStore.authorBlogPath"
        >
          查看我的博客主页
        </RouterLink>
        <RouterLink
          class="button secondary-button"
          to="/admin/articles/new"
        >
          去发文章
        </RouterLink>
        <button
          class="button"
          type="button"
          @click="authStore.signOut()"
        >
          退出登录
        </button>
      </div>
    </section>
  </section>
</template>