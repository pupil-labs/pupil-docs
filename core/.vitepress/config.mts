import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/core/favicon.png' }]],
  base: '/core/',
  title: "Pupil Core",
  description: "Documentation of the Pupil Core eye tracker and it's ecosystem.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'User Guide', link: '/software/pupil-capture/' },
      { text: 'DIY', link: '/diy/' },
      { text: 'Developer', link: '/developer/' },
      { text: 'VR/AR', link: '/vr-ar/' },
    ],

    sidebar: {
      "/": [
        {
          text: 'Software', items: [
            { text: 'Pupil Capture', link: '/software/pupil-capture/' },
            { text: 'Pupil Player', link: '/software/pupil-player/' },
            { text: 'Pupil Service', link: '/software/pupil-service/' },
            { text: 'Recording Format', link: '/software/recording-format/' },
          ]
        },
        {
          text: 'Other', items: [
            { text: 'Hardware', link: '/hardware/' },
            { text: 'Terminology', link: '/terminology/' },
            { text: 'Best Practices', link: '/best-practices/' },
            { text: 'Academic Citation', link: '/academic-citation/' },
          ]
        },


      ],
      "/developer/": [
        { text: 'Overview', link: '/developer/' },
        { text: 'Netowork API', link: '/developer/network-api/' },
        { text: 'Recording Format', link: '/developer/recording-format/' },
        { text: 'Plugin API', link: '/developer/plugin-api/' },
        { text: 'py3d Pupil Detection', link: '/developer/pye3d/' },
      ],
      "/vr-ar/": [
        { text: 'Overview', link: '/vr-ar/' },
        { text: 'HTC-Vice Add-On', link: '/vr-ar/vive/' },
        { text: 'HoloLens Add-On', link: '/vr-ar/hololens/' },
        { text: 'Oculus Rift DK2 Add-On', link: '/vr-ar/rift/' },
        { text: 'Developer', link: '/vr-ar/developer/' },
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
  appearance: 'force-dark',
})
