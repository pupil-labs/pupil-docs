const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  title: "Pupil Labs",
  description: "Pupil Labs - We build state of the art eye tracking hardware and software. \
                We work hard to bring research ideas out of the lab and into the real world.",
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: "apple-touch-icon", type: "image/x-icon", href: "/favicons/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png" }],
    ['link', {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png" }]
  ],
  themeConfig: {
    displayAllHeaders: false,
    lastUpdated: "Last Updated",
    sidebar: {
      '/invisible/': [
        '',
        'hardware/',
        {
          title: 'User Guide',
          children: [
            'user-guide/intro',
            'user-guide/invisible-companion-app',
            'user-guide/analysis',
            'user-guide/troubleshooting'
          ]
        }
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
            'software/pupil-mobile',
            'software/recording-format',
            'terminology',
            'academic-citation',
          ]
        },
        'diy/'

      ],
      '/vr-ar/': [
        '',
        'vive',
        'hololens',
        'rift',
        // 'bt300',
      ],
      // '/cloud/': [
      //   '',
      // ],
      '/developer/': [
        '',
        {
          title: 'Core',
          children: [
            'core/overview',
            'core/network-api',
            'core/recording-format',
            'core/plugin-api',
          ]
        },
        'invisible/',
        'vr-ar/'
      ],
    },
    sidebarDepth: 2,
    repo: 'https://github.com/pupil-labs/pupil-docs-website',
    repoLabel: 'See on Github',
    docsRepo: 'https://github.com/pupil-labs/pupil-docs',
    docsDir: 'src',
    docsBranch: 'vuepress-refactor',
    editLinks: true,
    editLinkText: 'Edit this page',
    search: false,
    searchPlaceholder: 'Search',
    algolia: {
      apiKey: 'a46ad8b3e5154fd970cd0ffeedb52562',
      indexName: 'pupil-labs'
    }
  },

  plugins: [
    // [
    //   "@vuepress/medium-zoom",
    //   {
    //     options: {
    //       margin: 100,
    //       background: '#fafafa'
    //     }
    //   }
    // ],
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