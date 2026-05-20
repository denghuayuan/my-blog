import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import AdminArticlesView from '@/views/AdminArticlesView.vue'
import AdminArticleEditView from '@/views/AdminArticleEditView.vue'
import AdminComposeView from '@/views/AdminComposeView.vue'
import AdminNovelsView from '@/views/AdminNovelsView.vue'
import ArticleDetailView from '@/views/ArticleDetailView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PlatformHomeView from '@/views/PlatformHomeView.vue'
import PersonHomeView from '@/views/PersonHomeView.vue'
import PpNovelsView from '@/views/PpNovelsView.vue'
import PpPoemsView from '@/views/PpPoemsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'platform-home',
      component: PlatformHomeView,
    },
    ...['dhy', 'thp', 'hjy', 'pp'].map((person) => ({
      path: `/${person}`,
      name: `person-${person}`,
      component: PersonHomeView,
      props: {
        person,
      },
    })),
    {
      path: '/pp/novels',
      name: 'pp-novels',
      component: PpNovelsView,
    },
    {
      path: '/pp/poems',
      name: 'pp-poems',
      component: PpPoemsView,
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
    {
      path: '/admin/novels',
      name: 'admin-novels',
      component: AdminNovelsView,
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
