<script setup lang="ts">
  import { useData } from "vitepress";
  import { ref, computed } from "vue";
  import alphaCards from "./../alpha-lab/cards.json";
  import Footer from "./Footer.vue";
  import CardLink from "./cards/CardLink.vue";
  import ArrowIcon from "./ArrowIcon.vue";
  const { frontmatter } = useData();

  type FrontMatter = typeof frontmatter;

  interface FM extends FrontMatter {
    hero?: {
      title?: string;
      text?: string;
      tagline?: string;
    };
    tags?: string[];
  }

  const fm: FM = frontmatter;

  const cards = computed(() => alphaCards.slice().reverse());

  const categories: any = cards.value.map((element) => {
    return element.category;
  });

  const unqiueCategories: any = new Set(categories);
  // console.log(unqiueCategories);

  const category = ref(""); // initial category is empty

  const filteredCards = computed(() => {
    if (!category.value) {
      return cards.value; // if no category is selected, return all cards
    }
    return cards.value.filter((card) => card.category === category.value);
  });
</script>

<style scoped>
  .text-padding:not(:last-child) {
    padding-bottom: 16px;
  }
  .category-chip {
    padding: 10px 16px;
    border-radius: 9999px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: medium;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
  .category-chip:hover {
    background-color: var(--vp-c-default-1);
  }
  .selected {
    background-color: var(--vp-c-default-2);
  }
  .text-link-color {
    color: var(--vp-c-brand-1);
  }
  .text-link-color:hover {
    color: var(--vp-c-brand-2);
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
          <a
            href="/alpha-lab/about/"
            class="flex items-center gap-2 text-link-color"
            >More about Alpha Lab <ArrowIcon
          /></a>
        </div>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider)" />
    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      <span
        class="category-chip"
        :class="{ selected: category === '' }"
        @click="category = ''"
      >
        All Categories
      </span>
      <span
        v-for="cat in unqiueCategories"
        :key="cat"
        class="category-chip"
        :class="{ selected: category === cat }"
        @click="category = cat"
      >
        {{ cat }}
      </span>
    </div>
    <div>
      <div
        v-if="cards"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14"
      >
        <CardLink
          v-for="(product, index) in filteredCards"
          :key="index"
          :product="product"
        />
      </div>
      <!-- <Content /> -->
    </div>
  </div>
  <Footer />
</template>
