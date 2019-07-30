<template lang="pug">

  div
    v-toolbar.elevation-1(
      app
      fixed
      clipped-left
      height="60px"
    )
      SidebarButton(@toggle-sidebar="$emit('toggle-sidebar')")
      router-link.align-center.d-flex(to="/")
        img(:src="$withBase('/pl_logo.svg')")
      v-spacer
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

export default {
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
    SidebarButton
  }
};
</script>