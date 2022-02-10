const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const description = "Pupil Labs - We build state of the art eye tracking hardware and software. We work hard to bring research ideas out of the lab and into the real world."

module.exports = {

  extendPageData($page) {
    const { frontmatter, regularPath } = $page
    frontmatter.meta = frontmatter.meta || [];

    // get the main page names
    let pageName = regularPath.split('/').slice(1).shift()
    let capitalizedName = ''
    if (pageName.length === 0) {
      capitalizedName = 'Docs'
    } else if (pageName === 'vr-ar') {
      capitalizedName = pageName.toUpperCase()
    } else {
      capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1)
    }

    // inject meta tags to each page object
    const default_metas = [
      {
        name: 'twitter:title',
        content: `${capitalizedName} - ${$page.title} - Pupil Labs`
      },
      {
        property: 'og:title',
        content: `${capitalizedName} - ${$page.title} - Pupil Labs`
      },
      {
        property: 'og:description',
        content: `${frontmatter.description ? frontmatter.description : description}`
      },
      {
        name: 'description',
        content: `${frontmatter.description ? frontmatter.description : description}`
      }
    ]
    for (const meta of default_metas) {
      frontmatter.meta.push(meta)
    }
  },

  title: "Pupil Labs",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#eceff1' }],
    ['link', { rel: "apple-touch-icon", type: "image/x-icon", href: "/favicons/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png" }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@pupil_labs' }],
    ['meta', { name: 'twitter:creator', content: '@pupil_labs' }],
    ['meta', { name: 'twitter:image', content: '/favicons/og-image-primary.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Pupil Labs' }],
    ['meta', { property: 'og:url', content: 'https://docs.pupil-labs.com' }],
    ['meta', { property: 'og:image', content: '/favicons/og-image-primary.png' }],
  ],

  themeConfig: {
    displayAllHeaders: false,
    lastUpdated: "Last Updated",
    sidebar: {
      '/invisible/': [
        {
          title: 'Getting Started',
          children: [
            'getting-started/first-recording',
            'getting-started/understand-the-ecosystem',
            'getting-started/analyse-recordings-in-pupil-cloud',
          ]
        },
        {
          title: 'Explainers',
          children: [
            'explainers/basic-concepts',
            'explainers/data-streams',
            'explainers/enrichments',
            'explainers/glasses-and-companion-device',
            'explainers/publications',
          ]
        },
        {
          title: 'How-Tos',
          children: [
            {
              title: 'Pupil Invisible Glasses',
              children: [
                'how-tos/pupil-invisible-glasses/exchange-lenses',
                'how-tos/pupil-invisible-glasses/clean-and-disinfect',
                'how-tos/pupil-invisible-glasses/attach-the-head-strap',
              ]
            },
            {
              title: 'Data Collection with the Companion App',
              children: [
                'how-tos/data-collection-with-the-companion-app/achieve-super-precise-time-sync-using-events',
                'how-tos/data-collection-with-the-companion-app/apply-offset-correction',
                'how-tos/data-collection-with-the-companion-app/monitor-your-data-collection-in-real-time',
                'how-tos/data-collection-with-the-companion-app/transfer-recordings-via-usb',
              ]
            },
            {
              title: 'Pupil Cloud',
              children: [
                'how-tos/pupil-cloud/organize-a-study-using-templates',
                'how-tos/pupil-cloud/use-workspaces-to-organize-data',
                'how-tos/pupil-cloud/make-complex-search-queries',
              ]
            },
            {
              title: 'Advanced Analysis',
              children: [
                'how-tos/advanced-analysis/gaze-metrics-in-aois/',
              ]
            },
            {
              title: 'Integrate with the Real-Time API',
              children: [
                'how-tos/integrate-with-the-real-time-api/introduction/',
                'how-tos/integrate-with-the-real-time-api/track-your-experiment-progress-using-events/',
                'how-tos/integrate-with-the-real-time-api/implement-hci-applications-using-the-real-time-api-and-screen-tracking',
                'how-tos/integrate-with-the-real-time-api/write-your-own-client',
              ]
            },
          ]
        },
        {
          title: 'Reference',
          children: [
            'reference/export-formats',
          ]
        },
        "troubleshooting"
      ],
      '/core/': [
        '',
        'hardware/',
        {
          title: 'User Guide',
          children: [
            'software/pupil-capture',
            'software/pupil-player',
            'software/pupil-service',
            'software/recording-format',
            'terminology',
            'best-practices',
            'academic-citation',
          ]
        },
        'diy/',
        {
          title: 'Developer',
          children: [
            'developer/overview',
            'developer/network-api',
            'developer/recording-format',
            'developer/plugin-api',
            'developer/pye3d',
          ]
        },

      ],
      '/vr-ar/': [
        '',
        'vive',
        'hololens',
        'rift',
        // 'bt300',
        'developer',
      ],
    },
    sidebarDepth: 1,
    repo: 'https://github.com/pupil-labs/pupil-docs-website',
    repoLabel: 'See on Github',
    docsRepo: 'https://github.com/pupil-labs/pupil-docs',
    docsDir: 'src',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Edit this page',
    search: false,
    searchPlaceholder: 'Search',
    algolia: {
      appId: 'BANVRGB2LF',
      apiKey: 'e19afb93d6e94c2bd3d5e594b4967e0a',
      indexName: 'pupil-labs'
    }
  },

  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        popupComponent: 'div'
      }
    ],
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          var date = new Date(timestamp);
          var yy = date.getFullYear();
          var mm = ("0" + (date.getMonth() + 1)).slice(-2);
          var dd = ("0" + date.getDate()).slice(-2);
          return `${yy}-${mm}-${dd}`;
        }
      }
    ],
    [
      "sitemap",
      {
        hostname: "https://docs.pupil-labs.com"
      }
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-40856943-3"
      }
    ]
  ],

  chainWebpack: config => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader")
      .loader("pug-plain-loader")
      .end();
  },
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  },
};
