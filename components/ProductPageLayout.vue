<script setup lang="ts">
  import CardLink from "./cards/CardLink.vue";
  import Footer from "./Footer.vue";

  import { useData } from "vitepress";
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
</script>

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
          <div
            v-if="fm.hero?.tagline"
            class="text-lg md:text-xl lg:text-2xl text-2"
          >
            {{ fm.hero?.tagline }}
          </div>
        </div>
        <div class="col-span-2 order-1 sm:order-2 flex justify-end">
          <img
            class="w-full rounded-lg"
            :src="
              fm.hero.image ? fm.hero.image : `https://place-hold.it/600x250`
            "
            width="100%"
            height="auto"
            style="max-width: 320px"
            alt="Product hero image"
          />
        </div>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider)" />
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="grid col-span-3">
          <div
            v-if="fm?.cards"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <CardLink
              v-for="(product, index) in fm?.cards"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>
      <!-- <Content /> -->
    </div>
  </div>
  <Footer />
</template>
