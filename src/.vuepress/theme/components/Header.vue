<template lang="pug">
div
  v-toolbar.elevation-1.gap-container(app, fixed, clipped-left, height="60px")
    SidebarButton(@toggle-sidebar="$emit('toggle-sidebar')")
    a.align-center.d-flex(
      href="https://pupil-labs.com",
      target="_blank",
      rel="noopener"
    )
      img.sm-hidden-down(
        :src="$withBase('/logos/pl_logo.svg')",
        alt="Pupil Labs logo"
      )
      img.sm-hidden-up(
        :src="$withBase('/logos/pl_logomark.svg')",
        height="52px",
        width="auto",
        alt="Pupil Labs logo"
      )
    v-spacer
    AlgoliaSearchBox(:options="algolia")
    v-spacer.lg-hidden-down
    v-toolbar-items.lg-hidden-down(style="gap: 16px")
      template(v-for="item in docs_menu")
        v-btn(
          flat,
          :key="item.title",
          :to="item.link",
          :class="{ 'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }",
          style="margin: 0; height: 36px"
        ) {{ item.title }}
      //- v-btn.text-capitalize(
      //-   flat,
      //-   href="https://pupil-labs.com/chat/",
      //-   style="margin: 0; height: 36px",
      //-   target="_blank"
      //- )
      //-   span.pr-1 Chat
      //-   OutboundLink
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
        { icon: "the-forge", title: "the forge", link: "/the-forge/" },
      ],
    };
  },
  components: {
    SidebarButton,
    Search,
    AlgoliaSearchBox,
  },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },
  },
};
</script>
