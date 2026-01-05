<script setup lang="ts">
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
    mappedCategory?: string;
    filters?: string[];
  }

  interface Props {
    product: ProductProps;
  }

  const { product } = defineProps<Props>();
  
  // Use mappedCategory if available, otherwise fall back to category
  const displayCategory = product.mappedCategory || product.category;
</script>

<style scoped>
  .category-tag {
    font-size: 12px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    color: #ACC7FF;
    padding: 4px 0;
    display: inline-block;
  }
  
  .filter-tag {
    font-size: 11px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    color: #E3E2E6;
    background-color: var(--vp-c-default-1);
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
  }
</style>

<template>
  <a
    :href="product.link?.href"
    class="textLink"
    :target="product.link?.target || '_self'"
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
        <div class="flex flex-col gap-2">
          <div v-if="displayCategory" class="category-tag">
            {{ displayCategory }}
          </div>
          <p v-if="product.title" class="text-1 font-semibold">
            {{ product.title }}
          </p>
        </div>
        <p v-if="product.details" class="text-2 text-sm pb-3">
          {{ product.details }}
        </p>
        <div v-if="product.filters && product.filters.length > 0" class="flex gap-2 flex-wrap">
          <span
            v-for="filter in product.filters"
            :key="filter"
            class="filter-tag"
          >
            {{ filter }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
