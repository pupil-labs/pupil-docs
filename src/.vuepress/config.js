const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  title: "Pupil Labs",
  description: "Pupil Labs - We build state of the art eye tracking hardware and software. \
                We work hard to bring research ideas out of the lab and into the real world.",
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: "Last Updated",
    sidebar:{
      '/invisible/':[
        '',
        {
          title: 'Getting Started',
          children: [
            ['getting-started/', 'Overview'],
            'getting-started/capture-walkthrough',
            'getting-started/capture-workflow',
            'getting-started/player-walkthrough',
            'getting-started/player-workflow',
          ]
        },
        {
          title: 'Hardware',
          children: [
            ['pupil-hardware/', 'Overview'],
            'pupil-hardware/hardware-dev',
            'pupil-hardware/hololens-add-on',
            'pupil-hardware/htc-vive-add-on',
            'pupil-hardware/oculus-dk2-add-on',
            'pupil-hardware/pupil-diy',
            'pupil-hardware/pupil-headset',
          ]
        },
        {
          title: 'License',
          children: [
            ['license/', 'Overview'],
          ]
        },
      ],
      '/core/':[
        '',
      ],
      '/vr-ar/':[
        '',
      ],
      '/cloud/':[
        '',
      ],
      '/developer/':[
        '',
      ],
    },
    sidebarDepth: 3,
    displayAllHeaders: true,

    lastUpdated: 'Last Updated',
    repo: 'https://github.com/pupil-labs/pupil-docs-website',
    repoLabel: 'See on Github',
    docsRepo: 'https://github.com/pupil-labs/pupil-docs',
    docsDir: 'src',
    docsBranch: 'vuepress-refactor',
    editLinks: true,
    editLinkText: 'Edit this page!'
  },

  plugins: [
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
      "@vuepress/google-analytics",
      {
        ga: "UA-40856943-2"
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


}