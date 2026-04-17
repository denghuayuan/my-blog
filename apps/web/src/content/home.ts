export interface HomeNavItem {
  label: string
  href: string
}

export interface HomeStatItem {
  value: string
  label: string
}

export interface HomeSkillItem {
  title: string
  subtitle: string
  articleCount: string
  iconLabel: string
  tone: 'violet' | 'blue' | 'amber' | 'mint'
}

export interface HomeFactItem {
  text: string
  iconLabel: string
  tone: 'violet' | 'pink' | 'mint'
}

export interface HomeSocialLink {
  label: string
  href: string
  shortLabel: string
}

export interface HomeFooterColumn {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

export const homeContent = {
  brandName: "Yuki's Blog",
  navItems: [
    { label: '首页', href: '#top' },
    { label: '文章', href: '#featured' },
    { label: '项目', href: '#skills' },
    { label: '关于我', href: '#about' },
  ] satisfies HomeNavItem[],
  hero: {
    badge: '欢迎来到我的小天地',
    title: 'Hi! 我是 Yuki',
    subtitle: '一个热爱设计与代码的创作者',
    description: [
      '在这里分享我的设计心得、编程笔记，',
      '也记录那些值得回看的灵感片段与生活碎片。',
    ],
    primaryAction: {
      label: '阅读文章',
      href: '#featured',
    },
    secondaryAction: {
      label: 'GitHub',
      href: 'https://github.com/',
    },
    stats: [
      { value: '128+', label: '篇文章' },
      { value: '5k+', label: '月访客' },
      { value: '3年+', label: '创作经验' },
    ] satisfies HomeStatItem[],
    profileTags: ['设计', '代码', '生活'],
    roleLine: 'UI 设计师 · 前端开发者 · 博主',
  },
  featured: {
    badge: '精选文章',
    title: '最近在写的内容',
    description: '用心记录每一个灵感瞬间',
    actionLabel: '查看全部',
  },
  skills: {
    badge: '我的技能树',
    title: '探索我的创作领域',
    description: '设计、开发、摄影、写作，每一个方向都有持续积累。',
    items: [
      {
        title: 'UI/UX 设计',
        subtitle: 'Figma · Pixso · Principle',
        articleCount: '42篇文章',
        iconLabel: 'UI',
        tone: 'violet',
      },
      {
        title: '前端开发',
        subtitle: 'Vue · CSS · TypeScript',
        articleCount: '35篇文章',
        iconLabel: 'FE',
        tone: 'blue',
      },
      {
        title: '摄影与生活',
        subtitle: '日常 · 旅行 · 街拍',
        articleCount: '28篇文章',
        iconLabel: 'PH',
        tone: 'amber',
      },
      {
        title: '读书与写作',
        subtitle: '书评 · 随笔 · 书单',
        articleCount: '23篇文章',
        iconLabel: 'WR',
        tone: 'mint',
      },
    ] satisfies HomeSkillItem[],
  },
  about: {
    badge: '关于我',
    title: ['我是一个', '充满好奇心的', '创作者'],
    description:
      '毕业于设计学院，现在是一名全职 UI/UX 设计师，同时也在学习前端开发。我喜欢用设计、代码和文字，把生活里的灵感整理成可分享的内容。',
    facts: [
      { text: '目前在杭州 · 曾游历 12 个城市', iconLabel: 'MAP', tone: 'violet' },
      { text: '离不开咖啡 · 每天至少两杯拿铁', iconLabel: 'CAF', tone: 'pink' },
      { text: '喜欢 Lo-Fi · 写作时总会循环播放', iconLabel: 'MUS', tone: 'mint' },
    ] satisfies HomeFactItem[],
    socialLinks: [
      { label: 'Twitter', href: 'https://twitter.com/', shortLabel: 'Tw' },
      { label: 'GitHub', href: 'https://github.com/', shortLabel: 'Gh' },
      { label: 'RSS', href: '#', shortLabel: 'Rs' },
    ] satisfies HomeSocialLink[],
  },
  newsletter: {
    badge: '订阅我的 Newsletter',
    title: '不错过任何一篇好文章',
    description: [
      '每周精选 3 到 5 篇内容直接发送到你的邮箱，',
      '没有广告，也可以随时取消订阅。',
    ],
    placeholder: '输入你的邮箱地址...',
    submitLabel: '立即订阅',
    highlights: ['1,200+ 订阅者', '每周一发送', '随时退订'],
  },
  footer: {
    description: '用设计与文字，记录生活中的灵感与感动。感谢你来到这里。',
    columns: [
      {
        title: '博客',
        links: [
          { label: '最新文章', href: '#featured' },
          { label: '设计系列', href: '#skills' },
          { label: '开发笔记', href: '#featured' },
          { label: '生活随笔', href: '#about' },
        ],
      },
      {
        title: '关于',
        links: [
          { label: '关于我', href: '#about' },
          { label: '我的项目', href: '#skills' },
          { label: '合作咨询', href: '#newsletter' },
        ],
      },
      {
        title: '资源',
        links: [
          { label: '设计资源', href: '#skills' },
          { label: '推荐工具', href: '#skills' },
          { label: 'RSS 订阅', href: '#' },
        ],
      },
    ] satisfies HomeFooterColumn[],
    legalLinks: [
      { label: '隐私政策', href: '#' },
      { label: '使用条款', href: '#' },
      { label: '站点地图', href: '#' },
    ],
    copyright: "2024 Yuki's Blog. 用设计记录生活。",
  },
  floating: {
    weeklyReads: '1,284 次',
    weeklyDelta: '较上周 +24%',
    notificationTitle: '新文章已发布',
    notificationTime: '2 分钟前',
  },
}
