<script setup lang="ts">
  import ArrowIcon from "../ArrowIcon.vue";

  interface ProductProps {
    title?: string;
    details?: string;
    image?: string;
    link?: {
      text?: string;
      href?: string;
      target?: string;
    };
    category?: string;
  }

  interface Props {
    product: ProductProps;
  }

  const { product } = defineProps<Props>();
</script>

<style scoped>
  .category-name {
    font-size: 14px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    color: var(--vp-c-text-3);
  }
</style>

<template>
  <a
    :href="product.link.href"
    class="textLink"
    :target="product.link.target || '_self'"
  >
    <div class="rounded-lg flex flex-col h-full bg-card">
      <img
        v-if="product.image"
        :src="product.image"
        style="aspect-ratio: 1.6296; object-fit: cover"
        class="h-auto w-full rounded-tl-lg rounded-tr-lg"
      />
      <div
        class="grid grid-rows-[auto,_1fr,_auto] gap-4 p-6 h-full justify-between"
      >
        <p v-if="product.title" class="text-1 font-semibold">
          {{ product.title }}
        </p>
        <p v-if="product.details" class="text-2 text-sm pb-3">
          {{ product.details }}
        </p>
        <div class="flex gap-2 justify-between">
          <div v-if="product.category" class="category-name">
            {{ product.category }}
          </div>
          <div
            v-if="product.link"
            class="flex gap-2 items-center text-sm font-medium"
          >
            <span v-if="product.link.text" class="font-medium">{{
              product.link.text
            }}</span>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
