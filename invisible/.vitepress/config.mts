import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/invisible/',
  ignoreDeadLinks: true,
  head: [['link', { rel: 'icon', href: './favicon.png' }]],
  title: "Pupil Invisible",
  description: "Documentation of the Pupil Invisible eye tracker and it's ecosystem.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Getting Started', link: '/getting-started/first-recording/' },
      { text: 'General', link: '/general/technical-overview/' },
      { text: 'Data Collection', link: '/data-collection/' },
      { text: 'Pupil Cloud', link: '/pupil-cloud/' },
      { text: 'Real-Time API', link: '/real-time-api/tutorials/' },
      { text: 'Alpha Lab', link: 'https://docs.pupil-labs.com/alpha-lab/' },
      { text: 'Feedback', link: 'https://feedback.pupil-labs.com/' },
    ],

    sidebar: {
      "/getting-started/": [
        {
          text: 'Getting Started',
          items: [
            { text: 'Your first Recording', link: '/getting-started/first-recording/' },
            { text: 'Understand the Ecosystem', link: '/getting-started/ecosystem/' }
          ]
        }
      ],
      "/general/": [
        {
          text: 'Pupil Invisible',
          items: [
            { text: 'Technical Overview', link: '/general/technical-overview/' },
            { text: 'Cleaning & Disinfecting', link: '/general/clean-and-disinfect/' },
          ]
        },
        {
          text: 'Companion Device',
          items: [
            { text: 'Compatible Devices', link: '/general/compatible-devices/' },
            { text: 'Using a USB Hub', link: '/general/using-a-usb-hub/' },

          ]
        },
        {
          text: 'Recordings',
          items: [
            { text: 'Overview', link: '/general/recordings/' },
            { text: 'Data Streams', link: '/general/data-streams/' },
            { text: 'Data Format', link: '/general/data-format/' },

          ]
        },
        {
          text: 'Additional Data',
          items: [
            { text: 'Events', link: '/general/events/' },
            { text: 'Wearers', link: '/general/wearers/' },
            { text: 'Templates', link: '/general/templates/' },

          ]
        }
      ],
      "/data-collection/": [
        {
          text: 'Tutorials',
          items: [
            { text: 'Offset Correction', link: '/data-collection/offset-correction/' },
          ]
        },
        {
          text: 'Software & Integrations',
          items: [
            { text: 'Monitor App', link: '/data-collection/monitor-app/' },
            { text: 'Lab Streaming Layer', link: '/data-collection/lab-streaming-layer/' },
            // { text: 'PsychoPy', link: '/data-collection/psychopy/' },
          ]
        },
        {
          text: 'How-To Guides',
          items: [
            { text: 'Transfer Recordings via USB', link: '/data-collection/transfer-recordings-via-usb/' },
            { text: 'Time Synchronization', link: '/data-collection/time-synchronization/' },
          ]
        },
      ],
      "/pupil-cloud/": [
        {
          text: 'Tutorials',
          items: [
            { text: 'Analysis in Pupil Coud', link: '/pupil-cloud/tutorials/' },
          ]
        },
        {
          text: 'General',
          items: [
            { text: 'Projects', link: '/pupil-cloud/projects/' },
            { text: 'Workspaces', link: '/pupil-cloud/workspaces/' },
          ]
        },
        {
          text: 'Enrichments',
          items: [
            { text: 'Overview', link: '/pupil-cloud/enrichments/' },
            { text: 'Reference Image Mapper', link: '/pupil-cloud/enrichments/reference-image-mapper/' },
            { text: 'Marker Mapper', link: '/pupil-cloud/enrichments/marker-mapper/' },
            { text: 'Face Mapper', link: '/pupil-cloud/enrichments/face-mapper/' },
          ]
        },
        {
          text: 'Visualizations',
          items: [
            { text: 'Heatmap', link: '/pupil-cloud/visualizations/heatmap/' },
            { text: 'Video Renderer', link: '/pupil-cloud/visualizations/video-renderer/' },
          ]
        },
      ],
      "/real-time-api/": [
        {
          text: 'Tutorials',
          items: [
            { text: 'Overview', link: '/real-time-api/tutorials/' },
          ]
        },
        {
          text: 'How-To Guides',
          items: [
            { text: 'Track your Experiment Progress using Events', link: '/real-time-api/track-your-experiment-progress-using-events/' },
            { text: 'Track your Experiment in Matlab', link: '/real-time-api/track-your-experiment-in-matlab/' },

          ]
        },
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
