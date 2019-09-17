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

    v-container(v-if="data.featured_products").grid-list-xl
      v-layout(row wrap)
        v-flex(
          xs12
          sm6
          v-for="(product, i) in data.featured_products"
          :key="i"
        )
          v-card(
            :to="product.link"
          )
            v-img(
              height="250px"
              :alt="product.alt"
              :src="$withBase(product.src)"
            )
            v-container
              p {{ product.title }}


    v-container
      v-card.bg-pl-dark-gray(dark)
        v-layout(row wrap justify-center align-center)
          v-flex(xs12 sm6 order-xs2 order-sm1).pa-4
            v-container
              Content(slot-key="dev")
          v-flex(xs12 sm6 order-xs1 order-sm2).pt-4
            v-img(
              :src="$withBase('/illustrations/web_analyze_cropped.svg')"
            )

    v-container
      v-layout(justify-center align-center text-xs-center)
        div(style="max-width:550px;")
          Content(slot-key="discover")

    div.bg-sclera-gray
      v-container
        v-layout(row wrap).py-2
          v-flex(xs12 sm6)
            v-layout(row align-center)
              v-img(
                contain
                height="52px"
                width="52px"
                :src="$withBase('/icons/discord_dark.svg')"
              ).mr-4
              h2.pa-0 Chat with the Pupil Community and Pupil Labs team on Discord.
          v-flex(xs12 sm6)
            v-layout(justify-end)
              v-btn(
                dark
                round
                target="__blank"
              ).bg-link-blue.mr-0 Chat

    Footer

</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import Footer from "@theme/components/Footer.vue";

export default {
  components: { NavLink, Footer },
  computed: {
    data() {
      return this.$page.frontmatter;
    },
    page() {
      return this.$page;
    }
  }
};
</script>