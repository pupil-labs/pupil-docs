import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: './favicon.png' }]],
  ignoreDeadLinks: true,
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: {},

    socialLinks: [
      { icon: 'discord', link: 'TODO' },
      { icon: 'youtube', link: 'TODO' },
      { icon: 'twitter', link: 'TODO' },

    ],
    outline: [2, 3],
  },
  appearance: 'force-dark',
})
