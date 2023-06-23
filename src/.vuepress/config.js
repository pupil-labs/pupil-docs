const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const description =
  "Pupil Labs - We build state of the art eye tracking hardware and software. We work hard to bring research ideas out of the lab and into the real world.";

module.exports = {
  extendPageData($page) {
    const { frontmatter, regularPath } = $page;
    frontmatter.meta = frontmatter.meta || [];

    // get the main page names
    let pageName = regularPath.split("/").slice(1).shift();
    let capitalizedName = "";
    if (pageName.length === 0) {
      capitalizedName = "Docs";
    } else if (pageName === "vr-ar") {
      capitalizedName = pageName.toUpperCase();
    } else {
      capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }

    // inject meta tags to each page object
    const default_metas = [
      {
        name: "twitter:title",
        content: `${capitalizedName} - ${$page.title} - Pupil Labs`,
      },
      {
        property: "og:title",
        content: `${capitalizedName} - ${$page.title} - Pupil Labs`,
      },
      {
        property: "og:description",
        content: `${frontmatter.description ? frontmatter.description : description
          }`,
      },
      {
        name: "description",
        content: `${frontmatter.description ? frontmatter.description : description
          }`,
      },
    ];
    for (const meta of default_metas) {
      frontmatter.meta.push(meta);
    }
  },

  title: "Pupil Labs",
  head: [
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#eceff1" }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        type: "image/x-icon",
        href: "/favicons/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:site", content: "@pupil_labs" }],
    ["meta", { name: "twitter:creator", content: "@pupil_labs" }],
    [
      "meta",
      { name: "twitter:image", content: "/favicons/og-image-primary.png" },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Pupil Labs" }],
    ["meta", { property: "og:url", content: "https://docs.pupil-labs.com" }],
    [
      "meta",
      { property: "og:image", content: "/favicons/og-image-primary.png" },
    ],
  ],

  themeConfig: {
    displayAllHeaders: false,
    lastUpdated: "Last Updated",
    sidebar: {
      "/neon/": [
        {
          title: "Overview",
          path: "/neon/",
          collapsable: false,
        },
        {
          // Getting started
          title: "Getting Started",
          children: [
            "getting-started/first-recording",
            "getting-started/understand-the-ecosystem",
            {
              title: "Analysis in Pupil Cloud",
              path: "getting-started/analyse-recordings-in-pupil-cloud",
            },
          ],
        },
        {
          // Basic Concepts
          title: "Basic Concepts",
          children: [
            "basic-concepts/data-streams",
            "basic-concepts/recordings-wearers-and-templates",
            "basic-concepts/projects-and-workspaces",
            "basic-concepts/events",
          ],
        },
        {
          // Glasses & Companion
          title: "Glasses & Companion",
          children: [
            "glasses-and-companion/technical-overview",
            "glasses-and-companion/companion-device",
            {
              title: "Hardware handling",
              children: [
                // 'glasses-and-companion/hardware-handling/swap-frames',
                "glasses-and-companion/hardware-handling/clean-and-disinfect",
              ],
            },
          ],
        },
        {
          // Enrichments
          title: "Enrichments",
          children: [
            { title: "Overview", path: "/enrichments/" },
            {
              title: "Reference Image Mapper",
              path: "/enrichments/reference-image-mapper/",
            },
            { title: "Marker Mapper", path: "/enrichments/marker-mapper/" },
            { title: "Face Mapper", path: "/enrichments/face-mapper/" },
            { title: "Gaze Overlay", path: "/enrichments/gaze-overlay/" },
          ],
        },
        {
          // How-To Guides
          title: "How-To Guides",
          children: [
            {
              title: "Data Collection",
              children: [
                "how-tos/data-collection-with-the-companion-app/monitor-your-data-collection-in-real-time",
                "how-tos/data-collection-with-the-companion-app/transfer-recordings-via-usb",
                "how-tos/data-collection-with-the-companion-app/achieve-super-precise-time-sync",
                "how-tos/data-collection-with-the-companion-app/calibrate-the-imu-for-accurate-yaw-orientation"
              ],
            },
          ],
        },
        {
          // Real-Time API
          title: "Real-Time API",
          children: [
            "real-time-api/introduction/",
            "real-time-api/track-your-experiment-progress-using-events/",
            "real-time-api/track-your-experiment-in-matlab",
            {
              title: "API Client - Developer Docs",
              path: "https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/index.html",
            },
          ],
        },
        {
          // Recording Format
          title: "Export Formats",
          children: [
            {
              title: "Recording Data",
              path: "/export-formats/recording-data/neon",
            },
            {
              title: "Enrichment Data",
              children: [
                {
                  title: "Reference Image Mapper",
                  path: "/export-formats/enrichment-data/reference-image-mapper",
                },
                {
                  title: "Marker Mapper",
                  path: "/export-formats/enrichment-data/marker-mapper",
                },
                {
                  title: "Face Mapper",
                  path: "/export-formats/enrichment-data/face-mapper",
                },
                {
                  title: "Gaze Overlay",
                  path: "/export-formats/enrichment-data/gaze-overlay",
                },
              ],
            },
          ],
        },
        "troubleshooting",
      ],
      "/invisible/": [
        {
          title: "Overview",
          path: "/invisible/",
          collapsable: false,
        },
        {
          // Getting started
          title: "Getting Started",
          children: [
            "getting-started/first-recording",
            "getting-started/understand-the-ecosystem",
            {
              title: "Analysis in Pupil Cloud",
              path: "getting-started/analyse-recordings-in-pupil-cloud",
            },
          ],
        },
        {
          // Basic Concepts
          title: "Basic Concepts",
          children: [
            "basic-concepts/data-streams",
            "basic-concepts/recordings-wearers-and-templates",
            "basic-concepts/projects-and-workspaces",
            "basic-concepts/events",
          ],
        },
        {
          // Glasses & Companion
          title: "Glasses & Companion",
          children: [
            "glasses-and-companion/technical-overview",
            "glasses-and-companion/companion-device",
            {
              title: "Hardware handling",
              children: [
                "glasses-and-companion/hardware-handling/exchange-lenses",
                "glasses-and-companion/hardware-handling/clean-and-disinfect",
                "glasses-and-companion/hardware-handling/attach-the-head-strap",
              ],
            },
          ],
        },
        {
          // Enrichments
          title: "Enrichments",
          children: [
            {
              title: "Overview",
              path: "/enrichments",
            },
            {
              title: "Reference Image Mapper",
              path: "/enrichments/reference-image-mapper",
            },
            {
              title: "Marker Mapper",
              path: "/enrichments/marker-mapper/",
            },
            { title: "Face Mapper", path: "/enrichments/face-mapper" },
            {
              title: "Gaze Overlay",
              path: "/enrichments/gaze-overlay",
            },
          ],
        },
        {
          // How-To Guides
          title: "How-To Guides",
          children: [
            {
              title: "Data Collection",
              children: [
                "how-tos/data-collection-with-the-companion-app/monitor-your-data-collection-in-real-time",
                "how-tos/data-collection-with-the-companion-app/transfer-recordings-via-usb",
                "how-tos/data-collection-with-the-companion-app/achieve-super-precise-time-sync",
              ],
            },
            {
              title: "Advanced Analysis",
              children: [
                "how-tos/advanced-analysis/syncing-sensors/",
                {
                  title: "Undistort Video and Gaze Data",
                  path: "how-tos/advanced-analysis/intrinsics/",
                },
              ],
            },
          ],
        },
        {
          // Real-Time API
          title: "Real-Time API",
          children: [
            "real-time-api/introduction/",
            "real-time-api/track-your-experiment-progress-using-events/",
            "real-time-api/track-your-experiment-in-matlab",
            {
              title: "API Client - Developer Docs",
              path: "https://pupil-labs-realtime-api.readthedocs.io/en/stable/api/index.html",
            },
            "real-time-api/legacy-api",
          ],
        },
        {
          // Recording Format
          title: "Export Formats",
          children: [
            {
              title: "Recording Data",
              path: "/export-formats/recording-data/invisible",
            },
            {
              title: "Enrichment Data",
              children: [
                {
                  title: "Reference Image Mapper",
                  path: "/export-formats/enrichment-data/reference-image-mapper",
                },
                {
                  title: "Marker Mapper",
                  path: "/export-formats/enrichment-data/marker-mapper",
                },
                {
                  title: "Face Mapper",
                  path: "/export-formats/enrichment-data/face-mapper",
                },
                {
                  title: "Gaze Overlay",
                  path: "/export-formats/enrichment-data/gaze-overlay",
                },
              ],
            },
          ],
        },
        "troubleshooting",
      ],
      "/core/": [
        "",
        "hardware/",
        {
          // User Guide
          title: "User Guide",
          children: [
            "software/pupil-capture",
            "software/pupil-player",
            "software/pupil-service",
            "software/recording-format",
            "terminology",
            "best-practices",
            "academic-citation",
          ],
        },
        "diy/",
        {
          // Developer
          title: "Developer",
          children: [
            "developer/overview",
            "developer/network-api",
            "developer/recording-format",
            "developer/plugin-api",
            "developer/pye3d",
          ],
        },
      ],
      "/vr-ar/": [
        "",
        "vive",
        "hololens",
        "rift",
        // 'bt300',
        "developer",
      ],
      "/alpha-lab/": [
        {
          title: "Welcome",
          path: "/alpha-lab/",
          collapsable: false,
        },
        "gaze-metrics-in-aois/",
        {
          title: "Use multiple Reference Image Mapper enrichments",
          path: "multiple-rim",
        },
        {
          title: "Map your gaze onto screen content",
          path: "map-your-gaze-to-a-2d-screen",
        },
        {
          title: "Map your gaze onto body parts",
          path: "dense-pose",
        },
        {
          title: "Map your gaze onto 3D models with NerfStudio",
          path: "nerfs",
        },
        {
          title: "Generate scanpaths with Reference Image Mapper",
          path: "scanpath-rim",
        },
        {
          title: "Uncover gaze behaviour on phone screens with Neon",
          path: "phone-screens",
        },
      ],
    },
    sidebarDepth: 1,
    repo: "https://github.com/pupil-labs/pupil-docs-website",
    repoLabel: "See on Github",
    docsRepo: "https://github.com/pupil-labs/pupil-docs",
    docsDir: "src",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Edit this page",
    search: false,
    searchPlaceholder: "Search documentation",
    algolia: {
      appId: "BANVRGB2LF",
      apiKey: "e19afb93d6e94c2bd3d5e594b4967e0a",
      indexName: "pupil-labs",
    },
  },

  plugins: [
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        popupComponent: "div",
      },
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
        },
      },
    ],
    [
      "sitemap",
      {
        hostname: "https://docs.pupil-labs.com",
      },
    ],
    [
      "dehydrate",
      {
        noSSR: "404.html",
      },
    ],
    [
      "google-analytics-4", {
        gtag: "G-YSCHB0T6ML"
      }
    ]
  ],

  chainWebpack: (config) => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-plain-loader")
      .loader("pug-plain-loader")
      .end();
  },
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },
};
