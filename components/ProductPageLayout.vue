<script setup lang="ts">
  import ArrowIcon from "./ArrowIcon.vue";
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

<style>
  .textLink {
    color: var(--vp-c-brand-1);
  }

  .textLink:hover {
    color: var(--vp-c-brand-2);
  }
</style>

<template>
  <div
    class="container grid gap-20 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
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
          <div v-if="fm.hero?.tagline" class="text-lg md:text-xl lg:text-2xl">
            {{ fm.hero?.tagline }}
          </div>
        </div>
        <div class="col-span-2 order-1 sm:order-2">
          <img class="w-full" src="https://place-hold.it/600x250" alt="" />
        </div>
      </div>
      <div class="grid gap-4">
        <div v-if="fm.products" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="product in fm.products"
            :key="product.title"
            class="rounded-lg flex flex-col"
            style="background-color: var(--vp-c-bg-elv)"
          >
            <img
              src="https://place-hold.it/450x300/"
              class="h-auto w-full rounded-tl-lg rounded-tr-lg"
              style="aspect-ratio: 1.5"
            />
            <div
              class="grid grid-rows-[auto,_1fr,_auto] gap-4 p-6 h-full justify-between"
            >
              <p class="font-semibold">{{ product.title }}</p>
              <p class="text-sm">{{ product.details }}</p>
              <a :href="product.link.href" class="textLink">
                <div
                  v-if="product.link"
                  class="flex gap-2 items-center text-sm"
                >
                  <span>{{ product.link.text }}</span>
                  <ArrowIcon />
                </div>
              </a>
            </div>
          </div>
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
            <div
              v-for="product in fm?.cards"
              :key="product.title"
              class="rounded-lg flex flex-col"
              style="background-color: var(--vp-c-bg-elv)"
            >
              <div
                class="grid grid-rows-[auto,_1fr,_auto] gap-4 p-6 h-full justify-between"
              >
                <p class="font-semibold">{{ product.title }}</p>
                <p class="text-sm">{{ product.details }}</p>
                <a :href="product.link.href" class="textLink">
                  <div
                    v-if="product.link"
                    class="flex gap-2 items-center text-sm"
                  >
                    <span>{{ product.link.text }}</span>
                    <ArrowIcon />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Content /> -->
    </div>
  </div>
  <Footer />
</template>
