import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/alpha-lab/',
  head: [['link', { rel: 'icon', href: './favicon.png' }]],
  ignoreDeadLinks: true,
  title: "Alpha Lab",
  description: "Documentation of the Neon eye tracker and it's ecosystem.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Documentation', link: 'https://docs.pupil-labs.com/' },
      { text: 'Feedback', link: 'https://feedback.pupil-labs.com/' },
    ],

    sidebar: [
      { text: 'Welcome', link: '/' },
      {
        text: 'Gaze Mapping',
        items: [
          { text: 'Onto screen content', link: '/map-your-gaze-to-a-2d-screen/' },
          { text: 'Onto body parts', link: '/dense-pose/' },
          { text: 'Onto 3D models with NerfStudio', link: '/nerfs/' },
        ]
      },
      {
        text: 'Reference Image Mapper',
        items: [
          { text: 'AOIs and Gaze Metrics', link: '/gaze-metrics-in-aois/' },
          { text: 'Mapping a whole Room', link: '/multiple-rim/' },
          { text: 'Scanpaths on Reference Images', link: '/scanpath-rim/' },
          { text: 'Gaze Behaviour on Phone Screens', link: '/phone-neon/' },
        ]
      },
      {
        text: 'Other',
        items: [
          { text: 'Gaze-Contingent Assistive Applications', link: '/gaze-contingency-assistive/' },
          { text: 'Undistort Video and Gaze Data', link: '/undistort/' },
          { text: 'Use Neon with Pupil Capture', link: '/neon-with-capture/' },
        ]
      },
    ],

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
  appearance: true,
})
