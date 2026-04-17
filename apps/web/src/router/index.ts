import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import AdminArticlesView from '@/views/AdminArticlesView.vue'
import AdminArticleEditView from '@/views/AdminArticleEditView.vue'
import AdminComposeView from '@/views/AdminComposeView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/u/:username',
      name: 'blog-home',
      component: HomeView,
    },
    {
      path: '/article/:slug',
      name: 'article-detail',
      component: ArticleDetailView,
    },
    {
      path: '/u/:username/article/:slug',
      name: 'blog-article-detail',
      component: ArticleDetailView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginView,
    },
    {
      path: '/admin/articles/new',
      name: 'admin-compose',
      component: AdminComposeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/articles',
      name: 'admin-articles',
      component: AdminArticlesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin/articles/:id/edit',
      name: 'admin-article-edit',
      component: AdminArticleEditView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: 'admin-login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.name === 'admin-login' && authStore.isLoggedIn) {
    return {
      name: 'admin-compose',
    }
  }

  return true
})

export default router