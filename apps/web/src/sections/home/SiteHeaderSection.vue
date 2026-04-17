<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { HomeNavItem } from '@/content/home'

const props = defineProps<{
  brandName: string
  items: HomeNavItem[]
}>()

const activeHref = ref('#top')

let sectionObserver: IntersectionObserver | null = null

function setActiveHref(nextHref: string) {
  activeHref.value = nextHref || '#top'
}

function syncHash() {
  setActiveHref(window.location.hash || '#top')
}

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)

  const sections = props.items
    .map((item) => document.querySelector<HTMLElement>(item.href))
    .filter((section): section is HTMLElement => Boolean(section))

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

      if (visibleEntry?.target.id) {
        setActiveHref(`#${visibleEntry.target.id}`)
      }
    },
    {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.2, 0.35, 0.5, 0.7],
    },
  )

  sections.forEach((section) => {
    sectionObserver?.observe(section)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncHash)
  sectionObserver?.disconnect()
})
</script>

<template>
  <header
    id="top"
    class="home-header"
  >
    <div class="home-header__brand">
      <div class="home-header__brand-mark">
        Y
      </div>
      <span>{{ brandName }}</span>
    </div>
    <nav class="home-header__nav">
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        :class="{ 'is-active': activeHref === item.href }"
        :aria-current="activeHref === item.href ? 'page' : undefined"
        @click="setActiveHref(item.href)"
      >{{ item.label }}</a>
    </nav>
    <a
      class="home-header__cta"
      href="#newsletter"
    >联系我</a>
  </header>
</template>
