<template lang="pug">

  div

    v-toolbar.elevation-1(
      app
      fixed
      clipped-left
      height="60px"
    )
      SidebarButton(
        v-if="!$page.frontmatter.home"
        @toggle-sidebar="$emit('toggle-sidebar')"
      )
      router-link.pl-logo(to="/")
        img(
          :src="$withBase('/pl_logo.svg')"
        )

      template(v-slot:extension)
        div.fill-height.d-flex.justify-center.align-center(style="width:100%;")
          template(v-for="item in docs_menu")
            v-btn.ma-0(
              dark
              flat
              round
              :key="item.title"
              :to="item.link"
              :class="{'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
              style="max-width:110px;"
            ) {{ item.title }}

    //- div.pageLinks.hidden-md-and-down
    //-   div.fill-height.d-flex.justify-center
    //-     template(v-for="item in docs_menu")
    //-       v-btn.fill-height(
    //-         flat
    //-         :key="item.title"
    //-         :to="item.link"
    //-         :class="{'text-capitalize': item.title != 'vr/ar', 'text-uppercase': item.title == 'vr/ar' }"
    //-         style="margin:0;"
    //-       ) {{ item.title }}


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

<style lang="stylus">
.pageLinks {
  z-index: 4;
  position: fixed;
  left: 0;
  right: 0
  max-width: 800px
  margin: auto;
  height:60px;
}
</style>