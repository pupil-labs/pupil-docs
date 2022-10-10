<template lang="pug">
v-content.home
  //- md content
  .bg-sclera-white
    v-container.grid-list-xl
      v-layout.py-4(row, wrap, justify-between, align-center)
        v-flex(xs12, sm6)
          h1.pb-0 {{ data.title }}
        v-flex(xs12, sm6)
          div
            p(style="font-size: 20px") {{ data.subtitle }}
      v-divider

  v-container(v-if="data.top_links")
    .grid(
      style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px"
    )
      div(v-for="(item, i) in data.top_links", :key="i")
        v-card.h-full.grid(
          flat,
          style="grid-template-rows: auto 1fr; border: 1px solid #eceff1"
        )
          v-img(
            height="100%",
            min-height="200px",
            max-height="300px",
            :alt="item.alt",
            :src="require(`../../../media/${item.src}`)"
          )
          v-container.h-full.pa-4
            .h-full(
              style="display: flex; flex-direction: column; justify-content: space-between"
            )
              div
                h3.font-weight-bold {{ item.title }}
                p {{ item.description }}
              div
                v-btn.ma-0.elevation-0(
                  :to="item.link",
                  color="#1263CC",
                  round,
                  dark
                ) {{ item.btn_text }}

  v-container.mb-4
    v-card(dark, elevation="0")
      v-img(:src="require('../../../media/invisible/pi_wide_02.jpg')")
        v-container.h-full.pa-4.sm-pa-5
          v-layout
            v-flex(xs12, sm6)
              Content.justify-space-between(
                slot-key="articles",
                style="display: flex; flex-direction: column"
              )

  v-container(v-if="data.bottom_links")
    .grid(
      style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px"
    )
      div(v-for="(item, i) in data.bottom_links", :key="i")
        v-card.h-full(flat, style="background-color: #eceff1")
          v-container.h-full.pa-4
            .h-full(
              style="display: flex; flex-direction: column; justify-content: space-between"
            )
              .pb-3
                .pb-3(v-if="!item.logo")
                  h3.font-weight-bold.pb-0(style="height: 40px") {{ item.title }}
                .pb-3(v-else)
                  v-img(
                    contain,
                    height="40px",
                    width="auto",
                    position="left",
                    :src="require(`../../../media/logos/${item.logo}`)"
                  )
                p.pb-3 {{ item.description }}
              div
                v-btn.ma-0.elevation-0(
                  v-if="item.link",
                  :to="item.link",
                  color="#1263CC",
                  round,
                  dark
                ) {{ item.btn_text }}
                v-btn.ma-0.elevation-0(
                  v-else,
                  :href="item.href",
                  color="#1263CC",
                  round,
                  dark
                ) {{ item.btn_text }}

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
