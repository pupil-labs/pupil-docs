<template lang="pug">
aside.sidebar
  NavLinks
  slot(name="top")
  div.sidebar-content
    div(style="width: inherit")
      v-list.lg-hidden-up.pa-3
        template(v-for="item in docs_menu")
          v-list-tile(v-if="item.link", :to="item.link")
            v-list-tile-title(
              :class="{ 'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
            )
              | {{ item.title }}
          v-list-tile(v-else, :href="item.href", target="_blank")
            v-list-tile-title.text-capitalize
              span.pr-1 {{ item.title }}
              OutboundLink
      v-divider.lg-hidden-up
      .pa-3
        SidebarLinks(:depth="0", :items="items")
    .pa-3(style="width: inherit")
      SidebarBanner
  slot(name="bottom")
  slot(name="bottombutton")
</template>

<script>
import SidebarBanner from "@theme/components/SidebarBanner.vue";
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  name: "Sidebar",

  data() {
    return {
      docs_menu: [
        { icon: "home", title: "home", link: "/" },
        { icon: "neon", title: "neon", link: "/neon/" },
        { icon: "invisible", title: "invisible", link: "/invisible/" },
        { icon: "core", title: "core", link: "/core/" },
        { icon: "vr-ar", title: "vr/ar", link: "/vr-ar/" },
        { icon: "alpha-lab", title: "alpha lab", link: "/alpha-lab/" },
      ],
    };
  },

  components: {
    SidebarBanner,
    SidebarLinks,
    NavLinks,
  },

  props: ["items"],
};
</script>

<style lang="stylus">
.sidebar-content {
  display: grid;
  height: 100%;
  align-content: space-between;
  overflow: hidden;
}
.sidebar {
  ul {
    padding: 0;
    padding-bottom: 8px;
    margin: 0;
    list-style-type: none;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 16px;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links:not(.sidebar-group-items) {
    display: grid;
    gap: 8px;
  }

  & > .sidebar-links {
    & > li > a.sidebar-link {
      font-size: 13px;
      line-height: 1.7;
      font-weight: bold;
    }

    & > li:not(:first-child) {
      margin-top: 4px;
    }
  }
}
</style>
