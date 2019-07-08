<template lang="pug">

  div.toolbar_container(class="navbar")


    v-toolbar#desktop_toolbar(
      app
      fixed
      extended
      clipped-left
    )
      SidebarButton(@toggle-sidebar="$emit('toggle-sidebar')")
      v-spacer

      a(href="https://pupil-labs.com/")
        img(
          :src="$withBase('/website_content/pl_logo_med_dark.svg')"
        )

      v-spacer

      SearchBox
      // AlgoliaSearchBox(:options="algolia")

      template(v-slot:extension)
        v-toolbar-items(style="width:100%; ")
          v-container(style="padding-left:0; padding-right:0;  ")
            v-layout(row justify-center fill-height)
              template(xs4 v-for="item in docs_menu")
                v-btn.btn_submenu(
                  :class="{'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
                  fill-height
                  flat
                  :key="item.title"
                  :to="item.link"
                  :ripple="false"
                  color="white"
                  style="padding-left:0; padding-right:0; margin-left:-20px; color:white;"
                ) {{ item.title }}
                v-spacer



</template>

<script>
import SidebarButton from '@theme/components/SidebarButton.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'

export default {
  data() {
    return {
      main_menu: [
        { icon: "product", title: "products", link: "https://pupil-labs.com/products/" },
        { icon: "learn", title: "learn", href: "https://pupil-labs.com/learn/" },
        { icon: "about", title: "about", link: "https://pupil-labs.com/about/" },
        { icon: "career", title: "careers", link: "https://pupil-labs.com/careers/" },
        { icon: "news", title: "news", link: "https://pupil-labs.com/news/" }
      ],

      docs_menu: [
        { icon: "invisible", title: "invisible", link: "/invisible/" },
        { icon: "core", title: "core", link: "/core/" },
        { icon: "vr-ar", title: "vr/ar", link: "/vr-ar/" },
        { icon: "cloud", title: "cloud", link: "/cloud/" },
        { icon: "developer", title: "developer", link: "/developer/" }
      ],
      drawer: false,
      sub_menu: [],
      showExtention: false,
      route_array: [],
      isLandingPage: true,
      nav_width: 300
    };
  },
  components: {
    SidebarButton,
    AlgoliaSearchBox,
    SearchBox
  },

  watch: {

  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },
  },

  methods: {

  }





};
</script>

<style lang="stylus">


.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding


.dot_transition {
  transition: background-color 0.25s cubic-bezier(0.25, 0.8, 0.5, 1);

  &.v-btn--active {
    span {
      color: #263238;
    }
  }

  span {
    text-transform: capitalize;
    color: #90A4AE;
  }

  &.v-btn:before {
    transition: unset;
  }

  &.v-btn:hover:before {
    content: '';
    background-color: #263238 !important;
    opacity: 0.5;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: calc(50% - 4px);
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
}

.v-btn--active {
  font-weight: bold;

  &:before {
    content: '';
    background-color: #263238 !important;
    opacity: 1;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: calc(50% - 4px);
  }
}

.toolbar_container {
  .v-toolbar__content {
    width: 100%;
    margin: auto;
    // padding unset
  }
}

.theme--dark.v-toolbar, .v-toolbar__extension {
  background-color: #263238;
}

.v-content {
  &.toolbar_extend, &.toolbar_no_padding {
    transition: padding-top 0ms;
  }
}

.landingpage_toolbar {
  background-color: transparent !important;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}

@media only screen and (max-width: 959px) {
  .landingpage_toolbar {
    .v-toolbar__content {
      height: 60px !important;
    }
  }
}

.drawer--active {
  color: #263238;
}
</style>