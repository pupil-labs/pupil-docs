<template lang="pug">
aside.sidebar
  v-list.hidden-md-and-up
    template(v-for="item in docs_menu")
      v-list-tile(:to="item.link")
        v-list-tile-title(
          :class="{ 'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
        )
          | {{ item.title }}

  NavLinks
  slot(name="top")
  .pa-3
    SidebarLinks(:depth="0", :items="items")
  slot(name="bottom")
</template>

<script>
import SidebarLinks from "@theme/components/SidebarLinks.vue";
import NavLinks from "@theme/components/NavLinks.vue";

export default {
  name: "Sidebar",

  data() {
    return {
      docs_menu: [
        { icon: "home", title: "home", link: "/" },
        { icon: "invisible", title: "invisible", link: "/invisible/" },
        { icon: "cloud", title: "cloud", link: "/cloud/" },
        { icon: "core", title: "core", link: "/core/" },
        { icon: "vr-ar", title: "vr/ar", link: "/vr-ar/" },
        { icon: "developer", title: "developer", link: "/developer/" },
      ],
    };
  },

  components: {
    SidebarLinks,
    NavLinks,
  },

  props: ["items"],
};
</script>

<style lang="stylus">
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
