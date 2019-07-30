<template lang="pug">

  aside.sidebar
    v-list.hidden-md-and-up
      template(v-for="item in docs_menu")
        v-list-tile(:to="item.link")
          v-list-tile-title(
            :class="{'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
          )
            | {{ item.title }}

    v-divider(v-if="!$page.frontmatter.home")

    v-layout(justify-center).pt-4
      Search(v-if="!$page.frontmatter.home")
      //- AlgoliaSearchBox
    NavLinks
    slot(name="top")
    SidebarLinks(
      :depth="0"
      :items="items"
    )
    slot(name="bottom")

</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";
import Search from "@theme/components/Search.vue";
import AlgoliaSearchBox from "@AlgoliaSearchBox";

export default {
  name: "Sidebar",

  data() {
    return {
      docs_menu: [
        { icon: "invisible", title: "invisible", link: "/invisible/" },
        { icon: "core", title: "core", link: "/core/" },
        { icon: "vr-ar", title: "vr/ar", link: "/vr-ar/" },
        { icon: "cloud", title: "cloud", link: "/cloud/" },
        { icon: "developer", title: "developer", link: "/developer/" }
      ]
    };
  },

  components: {
    SidebarLinks,
    NavLinks,
    AlgoliaSearchBox,
    Search
  },

  props: ["items"],

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    }
  },

  mounted() {
    console.log(this.$page);
  }
};
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem
</style>
