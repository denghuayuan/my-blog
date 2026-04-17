<script setup lang="ts">
import FooterColumn from '@/components/home/FooterColumn.vue'
import { homeContent } from '@/content/home'
</script>

<template>
  <footer class="home-footer">
    <div class="home-footer__main">
      <section class="home-footer__brand">
        <div class="home-header__brand">
          <div class="home-header__brand-mark">
            Y
          </div>
          <span>{{ homeContent.brandName }}</span>
        </div>
        <p>{{ homeContent.footer.description }}</p>
        <div class="home-footer__socials">
          <a
            v-for="link in homeContent.about.socialLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.shortLabel }}
          </a>
        </div>
      </section>

      <div class="home-footer__columns">
        <FooterColumn
          v-for="column in homeContent.footer.columns"
          :key="column.title"
          :column="column"
        />
      </div>
    </div>

    <div class="home-footer__bottom">
      <p>{{ homeContent.footer.copyright }}</p>
      <div class="home-footer__legal">
        <a
          v-for="link in homeContent.footer.legalLinks"
          :key="link.label"
          :href="link.href"
        >{{ link.label }}</a>
      </div>
    </div>
  </footer>
</template>
