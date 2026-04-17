import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 忽略构建产物
  { ignores: ['dist/**', 'node_modules/**'] },

  // JS 推荐规则
  js.configs.recommended,

  // TypeScript 推荐规则
  ...tseslint.configs.recommended,

  // Vue 3 推荐规则
  ...pluginVue.configs['flat/recommended'],

  // 自定义规则
  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Vue
      'vue/multi-word-component-names': 'off',      // 单词组件名不强制
      'vue/no-v-html': 'off',                       // 文章正文渲染需要 v-html
      'vue/no-unused-vars': 'error',
      'vue/component-api-style': ['error', ['script-setup']], // 统一用 <script setup>
      'vue/define-macros-order': ['error', {         // defineProps 在前
        order: ['defineProps', 'defineEmits', 'defineSlots', 'defineExpose'],
      }],
      'vue/block-order': ['error', {                 // 块顺序 script → template → style
        order: ['script', 'template', 'style'],
      }],

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // 通用
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
)
