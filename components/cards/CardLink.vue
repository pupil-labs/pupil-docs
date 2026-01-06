<script setup lang="ts">
  import { useRouter } from "vitepress";

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
    filters?: string[];
  }

  interface Props {
    product: ProductProps;
  }

  const { product } = defineProps<Props>();
  const router = useRouter();

  const isExternalLink = (href?: string): boolean => {
    if (!href) return false;
    return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
  };

  const handleClick = (e: MouseEvent) => {
    const href = product.link?.href;
    const target = product.link?.target;
    
    // Only handle internal links (not external, and not opening in new tab/window)
    if (href && !isExternalLink(href) && (!target || target === '_self')) {
      e.preventDefault();
      // Use router.go for navigation to maintain browser history
      router.go(href);
    }
    // Let external links and links with target="_blank" use default behavior
  };
</script>

<style scoped>
  .category-tag {
    font-size: 12px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    color: #acc7ff;
    padding: 4px 0;
    display: inline-block;
  }

  .filter-tag {
    font-size: 11px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    color: #e3e2e6;
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
    @click="handleClick"
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
          <div v-if="product.category" class="category-tag">
            {{ product.category }}
          </div>
          <p v-if="product.title" class="text-1 font-semibold">
            {{ product.title }}
          </p>
        </div>
        <p v-if="product.details" class="text-2 text-sm pb-3">
          {{ product.details }}
        </p>
        <div
          v-if="product.filters && product.filters.length > 0"
          class="flex gap-2 flex-wrap"
        >
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
