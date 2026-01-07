<script setup lang="ts">
  import { useData, useRoute } from "vitepress";
  import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
  import alphaCards from "./../alpha-lab/cards.json";
  import categoriesData from "./../alpha-lab/categories.json";
  import Footer from "./Footer.vue";
  import CardLink from "./cards/CardLink.vue";
  import ArrowIcon from "./ArrowIcon.vue";
  const { frontmatter } = useData();
  const route = useRoute();

  type FrontMatter = typeof frontmatter;

  interface FM extends FrontMatter {
    hero?: {
      title?: string;
      text?: string;
      tagline?: string[];
    };
    tags?: string[];
  }

  const fm: FM = frontmatter;

  // Category definitions - add "All Categories" option at the beginning
  const categories = [
    {
      id: "",
      title: "All Categories",
      description: "All articles.",
    },
    ...categoriesData,
  ];

  // Available filters
  const availableFilters = [
    "Real-Time Analysis",
    "3D Reconstruction",
    "AI/Deep Learning",
    "AOI Mapping",
    "Assistive Technology",
    "Metric Extraction",
    "Multimodal Data",
    "Neon",
    "Offline Processing",
    "Pupil Cloud",
    "Pupil Invisible",
  ];

  // Helper function to convert to kebab-case
  const toKebabCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/[^a-z0-9]+/g, "-") // Replace any sequence of non-alphanumeric chars with hyphen
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  };

  // Create mappings from kebab-case to actual names
  const categoryKebabMap = new Map<string, string>();
  categories.forEach((cat) => {
    if (cat.id) {
      categoryKebabMap.set(toKebabCase(cat.id), cat.id);
    }
  });

  const filterKebabMap = new Map<string, string>();
  availableFilters.forEach((filter) => {
    filterKebabMap.set(toKebabCase(filter), filter);
  });

  // Helper to convert from kebab-case back to actual name
  const fromKebabCase = (
    kebab: string,
    map: Map<string, string>
  ): string | null => {
    return map.get(kebab) || null;
  };

  // Cards with reversed order
  const cards = computed(() => {
    return alphaCards.slice().reverse();
  });

  // State from query params
  const selectedCategory = ref("");
  const selectedFilters = ref<string[]>([]);
  const isUpdatingFromQuery = ref(false);

  // Initialize from query params
  const updateFromQuery = () => {
    isUpdatingFromQuery.value = true;

    // Read from URL search params directly (works reliably on refresh)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("cat");
    const filtersParams = urlParams.getAll("tags");

    // Update category from query param (convert from kebab-case)
    if (categoryParam) {
      const decoded = decodeURIComponent(categoryParam);
      const actualCategory = fromKebabCase(decoded, categoryKebabMap);
      selectedCategory.value = actualCategory || "";
    } else {
      selectedCategory.value = "";
    }

    // Update filters from query params (convert from kebab-case)
    if (filtersParams.length > 0) {
      selectedFilters.value = filtersParams
        .map((f) => {
          const decoded = decodeURIComponent(f);
          return fromKebabCase(decoded, filterKebabMap);
        })
        .filter((f): f is string => f !== null);
    } else {
      selectedFilters.value = [];
    }
    // Reset flag after a tick to allow watchers to run
    nextTick(() => {
      isUpdatingFromQuery.value = false;
    });
  };

  // Handle popstate events (browser back/forward buttons)
  const handlePopState = () => {
    if (!isUpdatingFromQuery.value) {
      updateFromQuery();
    }
  };

  onMounted(() => {
    updateFromQuery();
    // Also update URL on mount if there are initial values
    nextTick(() => {
      if (selectedCategory.value || selectedFilters.value.length > 0) {
        const params = new URLSearchParams();
        if (selectedCategory.value) {
          params.set("cat", toKebabCase(selectedCategory.value));
        }
        if (selectedFilters.value.length > 0) {
          selectedFilters.value.forEach((filter) => {
            params.append("tags", toKebabCase(filter));
          });
        }
        const queryString = params.toString();
        const newUrl =
          window.location.pathname +
          (queryString ? "?" + queryString : "") +
          (window.location.hash || "");
        window.history.replaceState({ ...window.history.state }, "", newUrl);
      }
    });

    // Set up popstate listener for browser navigation
    window.addEventListener("popstate", handlePopState);
  });

  // Clean up event listener on unmount
  onUnmounted(() => {
    window.removeEventListener("popstate", handlePopState);
  });

  // Watch for URL changes (browser back/forward and VitePress navigation)
  // Watch route.path for VitePress navigation (covers both path and query changes)
  watch(
    () => route.path,
    () => {
      if (!isUpdatingFromQuery.value) {
        updateFromQuery();
      }
    }
  );

  // Update URL when filters/category change
  watch(
    [selectedCategory, selectedFilters],
    () => {
      if (isUpdatingFromQuery.value) return;

      nextTick(() => {
        const params = new URLSearchParams();

        if (selectedCategory.value) {
          // Convert to kebab-case for URL
          params.set("cat", toKebabCase(selectedCategory.value));
        } else {
          // Explicitly remove category param when "All Categories" is selected
          params.delete("cat");
        }

        if (selectedFilters.value.length > 0) {
          // Convert filters to kebab-case and append each as separate param
          selectedFilters.value.forEach((filter) => {
            params.append("tags", toKebabCase(filter));
          });
        } else {
          // Explicitly remove filters param when no filters are selected
          params.delete("tags");
        }

        // Build query string
        const queryString = params.toString();

        // Update URL using window.history (works reliably in VitePress)
        const newUrl =
          window.location.pathname +
          (queryString ? "?" + queryString : "") +
          (window.location.hash || "");

        // Update URL without page reload
        window.history.replaceState({ ...window.history.state }, "", newUrl);
      });
    },
    { deep: true }
  );

  // Toggle filter
  const toggleFilter = (filter: string) => {
    const index = selectedFilters.value.indexOf(filter);
    if (index > -1) {
      selectedFilters.value.splice(index, 1);
    } else {
      selectedFilters.value.push(filter);
    }
  };

  // Clear all filters and category
  const clearAllFilters = () => {
    selectedCategory.value = "";
    selectedFilters.value = [];
  };

  // Filter cards based on category and filters (AND logic for filters)
  const filteredCards = computed(() => {
    let result = cards.value;

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter(
        (card) => card.category === selectedCategory.value
      );
    }

    // Filter by selected filters (AND logic - card must have ALL of the selected filters)
    if (selectedFilters.value.length > 0) {
      result = result.filter((card) => {
        const cardFilters = card.filters || [];
        return selectedFilters.value.every((filter) =>
          cardFilters.includes(filter)
        );
      });
    }

    return result;
  });

  // Get the selected category object
  const selectedCategoryData = computed(() => {
    if (!selectedCategory.value) return null;
    return categories.find((cat) => cat.id === selectedCategory.value);
  });

  // Generate category page link
  const categoryPageLink = computed(() => {
    if (!selectedCategoryData.value) return null;
    const slug = toKebabCase(selectedCategoryData.value.id);
    return `/alpha-lab/${slug}/`;
  });
</script>

<style scoped>
  .text-padding:not(:last-child) {
    padding-bottom: 8px;
  }

  .category-button {
    padding: 12px 16px;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .category-button:hover {
    background-color: var(--vp-c-default-1);
    border-color: var(--vp-c-brand-1);
  }

  .category-button.selected {
    background-color: var(--vp-c-default-2);
    border-color: var(--vp-c-brand-1);
  }

  .category-button-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 8px;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }

  .category-button-description {
    font-size: 14px;
    color: var(--vp-c-text-2);
    font-family: Inter, "Helvetica Neue", sans-serif;
  }

  .filter-chip {
    padding: 6px 14px;
    border-radius: 9999px;
    color: var(--vp-c-text-1);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    transition: all 0.2s;
  }

  .filter-chip:hover {
    background-color: var(--vp-c-default-1);
  }

  .filter-chip.selected {
    background-color: var(--vp-c-default-2);
    border-color: var(--vp-c-brand-1);
    color: var(--vp-c-brand-1);
  }

  .text-link-color {
    color: var(--vp-c-brand-1);
  }
  .text-link-color:hover {
    color: var(--vp-c-brand-2);
  }
  .category-link {
    color: var(--vp-c-text-1);
  }
  .category-link:hover {
    color: var(--vp-c-brand-2);
  }
  .learn-more-link {
    color: var(--vp-c-text-2);
  }
  .learn-more-link:hover {
    color: var(--vp-c-brand-2);
  }
  a,
  p {
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
</style>

<template>
  <div
    class="container grid gap-4 sm:gap-6 md:gap-8 px-6 pt-4 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
  >
    <!-- Hero Section - Title with tagline below -->
    <div>
      <h1
        v-if="fm.hero?.title"
        class="text-2xl sm:text-3xl pb-2 font-semibold"
        style="color: var(--vp-c-brand-1)"
      >
        {{ fm.hero.title }}
      </h1>
      <div v-if="fm.hero?.tagline" class="mt-2">
        <p
          v-for="(tagline, index) in fm.hero.tagline"
          :key="index"
          class="text-sm sm:text-base text-2"
          :class="{ 'mt-2': Number(index) > 0 }"
        >
          {{ tagline
          }}<span v-if="index === fm.hero.tagline.length - 1" class="ml-1">
            <a
              href="/alpha-lab/about/"
              class="learn-more-link font-medium underline"
              >Learn more</a
            ></span
          >
        </p>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider); margin: 0" />

    <!-- Categories Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-button"
        :class="{ selected: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
        role="button"
        :aria-pressed="selectedCategory === cat.id"
        tabindex="0"
        @keydown.enter="selectedCategory = cat.id"
        @keydown.space.prevent="selectedCategory = cat.id"
      >
        <div class="category-button-title">{{ cat.title }}</div>
        <div class="category-button-description">{{ cat.description }}</div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="mt-6">
      <div style="display: flex; gap: 12px; flex-wrap: wrap">
        <span
          class="filter-chip"
          :class="{ selected: selectedFilters.length === 0 }"
          @click="selectedFilters = []"
          role="button"
          :aria-pressed="selectedFilters.length === 0"
          tabindex="0"
          @keydown.enter="selectedFilters = []"
          @keydown.space.prevent="selectedFilters = []"
        >
          All Filters
        </span>
        <span
          v-for="filter in availableFilters"
          :key="filter"
          class="filter-chip"
          :class="{ selected: selectedFilters.includes(filter) }"
          @click="toggleFilter(filter)"
          role="button"
          :aria-pressed="selectedFilters.includes(filter)"
          tabindex="0"
          @keydown.enter="toggleFilter(filter)"
          @keydown.space.prevent="toggleFilter(filter)"
        >
          {{ filter }}
        </span>
      </div>
    </div>

    <!-- Cards Section -->
    <div>
      <div
        v-if="filteredCards.length === 0"
        class="flex flex-col items-center justify-center py-16"
      >
        <p class="text-base mb-4" style="color: var(--vp-c-text-2)">
          There are no articles that match your filters :(
        </p>
        <a
          @click.prevent="clearAllFilters"
          href="#"
          class="text-link-color font-medium text-sm flex items-center gap-2"
        >
          See all articles <ArrowIcon />
        </a>
      </div>
      <div v-else class="relative">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <CardLink
            v-for="(product, index) in filteredCards"
            :key="product.link?.href || product.title || `card-${index}`"
            :product="product"
          />
        </div>
        <!-- Category page link in bottom left -->
        <div
          v-if="selectedCategoryData && categoryPageLink"
          class="mt-8 flex items-start"
        >
          <a :href="categoryPageLink" class="category-link font-medium text-sm">
            Articles from
            <span style="text-decoration: underline">{{
              selectedCategoryData.title
            }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
