<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import alphaCards from "./../alpha-lab/cards.json";
import Footer from "./Footer.vue";
import RandomBanner from "./banner/RandomBanner.vue";
import CardLink from "./cards/CardLink.vue";
const { frontmatter } = useData();

type FrontMatter = typeof frontmatter;

interface FM extends FrontMatter {
  hero?: {
    title?: string;
    text?: string;
    tagline?: string;
  };
}

const fm: FM = frontmatter;
const cards = computed(() => alphaCards.slice().reverse());
</script>

<style scoped>
.text-padding:not(:last-child) {
  padding-bottom: 16px;
}
</style>

<template>
  <div
    class="container grid gap-6 sm:gap-12 md:gap-16 lg:gap-20 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
  >
    <div class="grid gap-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
        <div class="order-2 sm:order-1">
          <h1
            v-if="fm.hero?.title"
            class="text-2xl sm:text-4xl pb-4 md:pb-9 lg:pb-6 font-semibold"
            style="color: var(--vp-c-brand-1)"
          >
            {{ fm.hero.title }}
          </h1>
          <p
            v-if="fm.hero?.tagline"
            v-for="tagline in fm.hero?.tagline"
            class="text-base text-2 text-padding"
          >
            {{ tagline }}
          </p>
        </div>
        <div class="col-span-2 order-1 sm:order-2 flex justify-end">
          <RandomBanner />
        </div>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider)" />
    <div>
      <div
        v-if="cards"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <CardLink
          v-for="(product, index) in cards"
          :key="index"
          :product="product"
        />
      </div>
      <!-- <Content /> -->
    </div>
  </div>
  <Footer />
</template>
