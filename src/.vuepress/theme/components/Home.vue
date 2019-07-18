<template lang="pug">
  v-content.home
    //- md content
    div.bg-sclera-white
      v-container
        v-container
          v-layout(column justify-center align-center)
            h1 {{ data.title }}
            div(style="max-width:500px;margin:auto;text-align:center;")
              p {{ data.subtitle }}

    //- md content
    Content.theme-default-content.custom
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    }
  }
};
</script>