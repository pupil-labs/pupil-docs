<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vitepress";
  import alphaCards from "./../alpha-lab/cards.json";
  import categories from "./../alpha-lab/categories.json";
  import Footer from "./Footer.vue";
  import CardLink from "./cards/CardLink.vue";
  import ArrowIcon from "./ArrowIcon.vue";

  const route = useRoute();

  // Helper function to convert to kebab-case (same as AlphaPageLayout)
  const toKebabCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Extract category from route path
  // Path format: /alpha-lab/behavior-detection-annotation/
  const categorySlug = computed(() => {
    const path = route.path;
    // Extract first segment after /alpha-lab/
    const match = path.match(/^\/alpha-lab\/([^\/]+)/);
    if (!match) return null;

    const slug = match[1];
    // Verify it's a valid category slug
    const isValidCategory = categories.some(
      (cat: { id: string; title: string; description: string }) =>
        toKebabCase(cat.id) === slug
    );

    return isValidCategory ? slug : null;
  });

  // Find the actual category name from the slug
  const currentCategory = computed(() => {
    if (!categorySlug.value) return null;
    return categories.find(
      (cat: { id: string; title: string; description: string }) =>
        toKebabCase(cat.id) === categorySlug.value
    );
  });

  // Filter cards by category
  const categoryCards = computed(() => {
    if (!currentCategory.value) return [];
    return alphaCards
      .filter((card) => card.category === currentCategory.value?.id)
      .reverse(); // Reverse to show newest first (matching AlphaPageLayout)
  });

  // Back link with category query param
  const backLink = computed(() => {
    if (!currentCategory.value) return "/alpha-lab/";
    const categoryParam = toKebabCase(currentCategory.value.id);
    return `/alpha-lab/?category=${encodeURIComponent(categoryParam)}`;
  });
</script>

<style scoped>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--vp-c-brand-1);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    margin-bottom: 24px;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--vp-c-brand-2);
  }

  .category-title {
    color: var(--vp-c-brand-1);
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 12px;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }

  .category-description {
    color: var(--vp-c-text-2);
    font-size: 16px;
    margin-bottom: 32px;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
</style>

<template>
  <div>
    <div
      class="container grid gap-6 sm:gap-12 md:gap-16 lg:gap-14 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
    >
      <div class="grid gap-8">
        <!-- Back Button -->
        <a :href="backLink" class="back-link">
          <ArrowIcon style="transform: rotate(180deg)" />
          Back
        </a>

        <!-- Category Title and Description -->
        <div v-if="currentCategory">
          <h1 class="category-title">{{ currentCategory.title }}</h1>
          <p class="category-description">{{ currentCategory.description }}</p>
        </div>

        <!-- Cards Grid -->
        <div
          v-if="categoryCards.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14"
        >
          <CardLink
            v-for="(product, index) in categoryCards"
            :key="product.link?.href || product.title || `card-${index}`"
            :product="product"
          />
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16">
          <p class="text-base" style="color: var(--vp-c-text-2)">
            No articles found in this category.
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
