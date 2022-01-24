<template lang="pug">
v-content.home
  //- md content
  .bg-sclera-white
    v-container
      v-container
        v-layout(column, justify-center, align-center)
          h1.pb-4 {{ data.title }}
          div(style="max-width: 500px; margin: auto; text-align: center")
            p {{ data.subtitle }}

  v-container.grid-list-xl(v-if="data.featured_products")
    v-layout(row, wrap)
      v-flex(
        xs12,
        sm6,
        v-for="(product, i) in data.featured_products",
        :key="i"
      )
        v-card(:to="product.link")
          v-img(
            height="250px",
            :alt="product.alt",
            :src="require(`../../../media/${product.src}`)"
          )
          v-container
            p {{ product.title }}

  v-container.mb-4
    v-card.bg-pl-dark-gray(dark)
      v-layout(row, wrap, justify-center, align-center)
        v-flex.pa-4(xs12, sm6, order-xs2, order-sm1)
          v-container
            Content(slot-key="articles")
        v-flex.pt-4(xs12, sm6, order-xs1, order-sm2)
          v-img(
            :src="require('../../../media/illustrations/web_analyze_cropped.svg')"
          )

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
    },
  },
};
</script>