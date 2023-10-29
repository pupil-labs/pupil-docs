import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: './favicon.png' }]],
  ignoreDeadLinks: true,
  base: '/core/',
  title: "Pupil Core",
  description: "Documentation of the Pupil Core eye tracker and it's ecosystem.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Hardware', link: '/general/module-technical-overview/' },
      { text: 'User Guide', link: '/data-collection/' },
      { text: 'DIY', link: '/data-collection/' },
      { text: 'Developer', link: '/real-time-api/' },
      { text: 'VR/AR', link: 'https://docs.pupil-labs.com/alpha-lab/' },
    ],

    sidebar: {
      "/user-guide/": [
        { text: 'Pupil Capture', link: '/data-collection/' },
        { text: 'Pupil Player', link: '/data-collection/' },
        { text: 'Pupil Service', link: '/data-collection/' },
        { text: 'Recording Format', link: '/data-collection/' },
        { text: 'Terminology', link: '/data-collection/' },
        { text: 'Best Practices', link: '/data-collection/' },

      ],
      "/developer/": [
        { text: 'Overview', link: '/data-collection/' },
        { text: 'Netowork API', link: '/data-collection/' },
        { text: 'Recording Format', link: '/data-collection/' },
        { text: 'Plugin API', link: '/data-collection/' },
        { text: 'py3d Pupil Detection', link: '/data-collection/' },
      ],
    },

    socialLinks: [
      { icon: 'discord', link: 'TODO' },
      { icon: 'youtube', link: 'TODO' },
      { icon: 'twitter', link: 'TODO' },

    ],

    search: {
      provider: 'local'
    },

    outline: [2, 3],
  },
  appearance: false,
})
