<script setup lang="ts">
  import { useData, useRoute, useRouter } from "vitepress";
  import { ref, computed, watch, onMounted, nextTick } from "vue";
  import alphaCards from "./../alpha-lab/cards.json";
  import Footer from "./Footer.vue";
  import CardLink from "./cards/CardLink.vue";
  import ArrowIcon from "./ArrowIcon.vue";
  const { frontmatter } = useData();
  const route = useRoute();
  const router = useRouter();

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

  // Category definitions
  const categories = [
    {
      id: "",
      title: "All Categories",
      description: "All articles.",
    },
    {
      id: "Behavior Detection & Annotation",
      title: "Behavior Detection & Annotation",
      description:
        "Detect and classify human behaviour using gaze and context.",
    },
    {
      id: "Eye Tracking in Physical Spaces",
      title: "Eye Tracking in Physical Spaces",
      description: "Map gaze onto physical environments and 3D spaces.",
    },
    {
      id: "Data Processing & Workflows",
      title: "Data Processing & Workflows",
      description:
        "Workflows for processing, synchronizing, and transforming gaze data.",
    },
    {
      id: "Gaze on Screens & Interfaces",
      title: "Gaze on Screens & Interfaces",
      description:
        "Detect and classify human behaviour using gaze and context.",
    },
    {
      id: "Social Gaze & Interactions",
      title: "Social Gaze & Interactions",
      description:
        "Analyze gaze patterns during social interactions and communication.",
    },
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

  // Cards with reversed order
  const cards = computed(() => {
    return alphaCards.slice().reverse();
  });

  // Get unique categories from cards
  const uniqueCategories = computed(() => {
    const cats = new Set(cards.value.map((card) => card.category));
    return Array.from(cats).sort();
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
    const categoryParam = urlParams.get("category");
    const filtersParam = urlParams.get("filters");

    // Update category from query param
    if (categoryParam) {
      selectedCategory.value = decodeURIComponent(categoryParam);
    } else {
      selectedCategory.value = "";
    }

    // Update filters from query param
    if (filtersParam) {
      selectedFilters.value = filtersParam
        .split(",")
        .map((f) => decodeURIComponent(f.trim()))
        .filter((f) => f);
    } else {
      selectedFilters.value = [];
    }
    // Reset flag after a tick to allow watchers to run
    setTimeout(() => {
      isUpdatingFromQuery.value = false;
    }, 0);
  };

  onMounted(() => {
    updateFromQuery();
    // Also update URL on mount if there are initial values
    nextTick(() => {
      if (selectedCategory.value || selectedFilters.value.length > 0) {
        const query: Record<string, string> = {};
        if (selectedCategory.value) {
          query.category = selectedCategory.value;
        }
        if (selectedFilters.value.length > 0) {
          query.filters = selectedFilters.value.join(",");
        }
        const queryString =
          Object.keys(query).length > 0
            ? "?" + new URLSearchParams(query).toString()
            : "";
        const newUrl =
          window.location.pathname + queryString + (window.location.hash || "");
        window.history.replaceState({ ...window.history.state }, "", newUrl);
      }
    });
  });

  // Watch for URL changes (browser back/forward)
  watch(
    () => window.location.search,
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
        const query: Record<string, string> = {};

        if (selectedCategory.value) {
          query.category = selectedCategory.value;
        }

        if (selectedFilters.value.length > 0) {
          query.filters = selectedFilters.value.join(",");
        }

        // Build query string
        const queryString =
          Object.keys(query).length > 0
            ? "?" + new URLSearchParams(query).toString()
            : "";

        // Update URL using window.history (works reliably in VitePress)
        const newUrl =
          window.location.pathname + queryString + (window.location.hash || "");

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

  // Filter cards based on category and filters (OR logic for filters)
  const filteredCards = computed(() => {
    let result = cards.value;

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter(
        (card) => card.category === selectedCategory.value
      );
    }

    // Filter by selected filters (OR logic - card must have ANY of the selected filters)
    if (selectedFilters.value.length > 0) {
      result = result.filter((card) => {
        const cardFilters = card.filters || [];
        return selectedFilters.value.some((filter) =>
          cardFilters.includes(filter)
        );
      });
    }

    return result;
  });
</script>

<style scoped>
  .text-padding:not(:last-child) {
    padding-bottom: 16px;
  }

  .category-button {
    padding: 16px 20px;
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
    padding: 8px 16px;
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
  a,
  p {
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
</style>

<template>
  <div
    class="container grid gap-6 sm:gap-12 md:gap-16 lg:gap-14 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
  >
    <div class="grid gap-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="order-2 sm:order-1 col-auto lg:col-span-5">
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
            class="flex items-center gap-2 text-link-color font-medium text-sm"
            >More about Alpha Lab <ArrowIcon
          /></a>
        </div>
      </div>
    </div>
    <hr style="border-color: var(--vp-c-divider)" />

    <!-- Categories Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="category-button"
        :class="{ selected: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        <div class="category-button-title">{{ cat.title }}</div>
        <div class="category-button-description">{{ cat.description }}</div>
      </div>
    </div>

    <!-- Filters Section -->
    <div>
      <div
        class="mb-4 text-sm font-medium"
        style="color: var(--vp-c-text-2); margin-bottom: 12px"
      >
        Filters
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap">
        <span
          class="filter-chip"
          :class="{ selected: selectedFilters.length === 0 }"
          @click="selectedFilters = []"
        >
          All Filters
        </span>
        <span
          v-for="filter in availableFilters"
          :key="filter"
          class="filter-chip"
          :class="{ selected: selectedFilters.includes(filter) }"
          @click="toggleFilter(filter)"
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
      <div
        v-else-if="cards"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14"
      >
        <CardLink
          v-for="(product, index) in filteredCards"
          :key="index"
          :product="product"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>
