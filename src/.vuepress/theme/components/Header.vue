<template lang="pug">

  div
    v-toolbar.elevation-1(
      app
      fixed
      clipped-left
      height="60px"
    )
      SidebarButton(@toggle-sidebar="$emit('toggle-sidebar')")
      a.align-center.d-flex(href="https://pupil-labs.com" target="_blank" rel="noopener")
        img(:src="$withBase('/logos/pl_logo.svg')")
      v-spacer
      AlgoliaSearchBox(:options="algolia")
      v-toolbar-items.hidden-sm-and-down
        template(v-for="item in docs_menu")
          v-btn(
            flat
            :key="item.title"
            :to="item.link"
            :class="{'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
            style="margin:0;"
          ) {{ item.title }}

</template>

<script>
import SidebarButton from "@theme/components/SidebarButton.vue";
import Search from "@theme/components/Search.vue";
import AlgoliaSearchBox from "@theme/components/AlgoliaSearchBox.vue";

export default {
  data() {
    return {
      docs_menu: [
        { icon: "home", title: "home", link: "/" },
        { icon: "invisible", title: "invisible", link: "/invisible/" },
        { icon: "core", title: "core", link: "/core/" },
        { icon: "vr-ar", title: "vr/ar", link: "/vr-ar/" },
        // { icon: "cloud", title: "cloud", link: "/cloud/" },
        { icon: "developer", title: "developer", link: "/developer/" }
      ]
    };
  },
  components: {
    SidebarButton,
    Search,
    AlgoliaSearchBox
  },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    }
  }
};
</script>