<script setup lang="ts">
  import CardLink from "@components/cards/CardLink.vue";
  import Footer from "@components/Footer.vue";

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
    class="container grid gap-20 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
  >
    <div class="grid gap-8">
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <div>
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
      </div>
      <div class="grid gap-4">
        <div v-if="fm.products" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CardLink
            v-for="(product, index) in fm.products"
            :key="index"
            :product="product"
          />
        </div>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider)" />
    <div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h2
            v-if="fm.alpha?.title"
            class="text-2xl sm:text-4xl pb-4 md:pb-9 lg:pb-6 font-semibold"
            style="color: var(--vp-c-brand-1)"
          >
            {{ fm.alpha.title }}
          </h2>
          <div
            v-if="fm.alpha?.tagline"
            class="text-lg md:text-xl lg:text-2xl pb-6 text-2"
          >
            {{ fm.alpha?.tagline }}
          </div>
          <div v-if="fm.alpha?.action" class="text-lg md:text-xl lg:text-2xl">
            <button
              class="text-white py-2 px-4 text-sm font-medium rounded-full action-button"
            >
              <p>{{ fm.alpha?.action.text }}</p>
            </button>
          </div>
        </div>
        <div class="grid col-span-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CardLink
              v-for="(product, index) in fm.alpha.cards"
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
