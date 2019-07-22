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
          sm4
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
      v-card(
        dark
        style="background:linear-gradient(135deg, rgba(40,53,147,1) 0%, rgba(3,155,229,1) 100%);"
      )
        v-layout(row wrap justify-center align-center)
          v-flex(xs12 sm6 order-xs2 order-sm1).pa-4
            v-container
              Content(slot-key="cloud")
          v-flex(xs12 sm6 order-xs1 order-sm2)
            v-img(
              max-height="370px"
              :src="$withBase('/illustrations/companion_screens.png')"
            )

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

    v-container.grid-list-xl
      v-layout(row justify-space-between).ma-0
        p.pb-2 Community Projects
        a(
          target="__blank"
          href="https://pupil-labs.com/news/"
        )
          p.pb-2.font-weight-bold.link-blue
            | View all
      v-divider
      v-layout(row wrap)
        v-flex(
          sm4
          xs12
          v-for="(project, i) in projects"
        )
          v-card(
            :href="project.href"
            target="__blank"
          )
            v-img(
              height="180px"
              :src="$withBase(project.src)"
            )
            v-container(style="min-height:130px;")
              v-layout(
                column
                justify-space-between
                style="min-height:130px;"
              ).ma-0
                div
                  p.caption--1.pb-1 {{ project.tag }}
                  p.font-weight-bold.pb-0 {{ project.title }}
                p.caption--1.pb-0 {{ project.date }}

    v-container.grid-list-xl
      v-layout(row justify-space-between).ma-0
        p.pb-2 Featured Citation
        a(
          target="__blank"
          href="https://docs.google.com/spreadsheets/d/1ZD6HDbjzrtRNB4VB0b7GFMaXVGKZYeI0zBOBEEPwvBI"
        )
          p.pb-2.font-weight-bold.link-blue
            | View all
      v-divider
      v-card(style="margin-top:12px;")
        v-layout(row wrap).ma-0
          v-flex(xs12 sm6).pa-0
            v-img(
              height="100%"
              :src="$withBase('/news/01.jpg')"
            )
          v-flex(xs12 sm6)
            v-container(fill-height).pa-5
              v-layout(column fill-height).pa-4
                v-flex(shrink)
                  p.caption--1.pb-1 Citation
                  h2 Autofocals
                  p Evaliating gaze-contingent eyeglasses for presyopes
                v-spacer
                v-flex(shrink)
                  v-layout(row justify-space-between align-center).ma-0
                    v-btn(
                      dark
                      round
                      href="https://advances.sciencemag.org/content/5/6/eaav6187.full"
                      target="__blank"
                    ).bg-link-blue.ml-0 Read Citation
                    p.pa-0 AUGUST 24, 2019

    div.bg-sclera-gray
      v-container
        v-layout(row wrap).py-2
          v-flex(xs12 sm6)
            v-layout(row)
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
  data() {
    return {
      projects: [
        {
          tag: "News",
          title: "ETRA 2019",
          date: "JUNE 24, 2019",
          src: "/news/01.jpg",
          href: "https://pupil-labs.com/news/etra-2019"
        },
        {
          tag: "Product Updates",
          title: "pmd Picoflexx Integration For Pupil Capture",
          date: "ARIL 5, 2019",
          src: "/news/02.jpg",
          href: "https://pupil-labs.com/news/picoflexx-integration"
        },
        {
          tag: "News",
          title: "Pupil Plugin For Lab Streaming Layer 2.0",
          date: "APRIL 3, 2019",
          src: "/news/03.jpg",
          href: "https://pupil-labs.com/news/pupil-plugin-lsl-2.0"
        }
      ]
    };
  },
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