import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

import { config as default_config } from './../../default_config.mts'
import { theme_config as default_theme_config } from './../../default_config.mts'


let theme_config_additions = {
  nav: [
    { text: 'Getting Started', link: '/getting-started/first-recording/' },
    { text: 'General', link: '/general/technical-overview/' },
    { text: 'Data Collection', link: '/data-collection/' },
    { text: 'Pupil Cloud', link: '/pupil-cloud/' },
    { text: 'Real-Time API', link: '/real-time-api/tutorials/' },
  ],

  sidebar: {
    "/getting-started/": [
      {
        text: 'Getting Started',
        items: [
          { text: 'Your first Recording', link: '/getting-started/first-recording/' },
          { text: 'Understand the Ecosystem', link: '/getting-started/understand-the-ecosystem/' }
        ]
      }
    ],
    "/general/": [
      {
        text: 'Pupil Invisible',
        items: [
          { text: 'Technical Overview', link: '/general/technical-overview/' },
          { text: 'Exchange Lenses', link: '/general/exchange-lenses/' },
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
      { text: 'Troubleshooting', link: '/data-collection/troubleshooting/' },
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
}

let theme_config = { ...default_theme_config, ...theme_config_additions }

let config_additions = {
  base: '/invisible/',
  title: "Pupil Invisible",
  description: "Documentation of the Pupil Invisible eye tracker and it's ecosystem.",
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./../../components/CustomNavBar.vue', import.meta.url)
          )
        }
      ]
    }
  },
}

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
})
