<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted, watch, nextTick } from "vue";
  import { useData, useRoute } from "vitepress";
  import alphaCards from "./../alpha-lab/cards.json";
  import Footer from "./Footer.vue";
  import CardLink from "./cards/CardLink.vue";
  import TagLinks from "./TagLinks.vue";

  const { frontmatter, page } = useData();
  const route = useRoute();

  const activeHeader = ref<string | null>(null);
  const headerOffset = ref(96);

  type FrontMatter = typeof frontmatter;

  interface FM extends FrontMatter {
    tags?: string[];
    title?: string;
  }

  const fm: FM = frontmatter;

  const normalizePath = (path: string) => {
    if (!path) return "";
    if (path === "/") return path;
    return path.replace(/\/$/, "");
  };

  const currentRoutePath = computed(() => normalizePath(route.path));

  const currentArticle = computed(() => {
    const currentPath = currentRoutePath.value;
    return alphaCards.find((card) => {
      const href = card.link?.href;
      if (!href) return false;
      return normalizePath(href) === currentPath;
    });
  });

  const articleCategory = computed(
    () => currentArticle.value?.category || null
  );
  const articleFilters = computed(() => currentArticle.value?.filters || []);

  const relatedArticles = computed(() => {
    const category = articleCategory.value;
    if (!category) return [];
    const currentPath = currentRoutePath.value;
    return alphaCards
      .filter((card) => {
        const href = card.link?.href;
        const cardPath = href ? normalizePath(href) : "";
        return (
          card.category === category && cardPath && cardPath !== currentPath
        );
      })
      .slice(0, 3);
  });

  const displayTitle = computed(() => fm.title || page.value?.title || "");
  const pageHeaders = computed(() => {
    // VitePress stores headers in page.value.headers array
    const pageData = page.value as any;
    const headers = pageData?.headers || [];

    // Filter for h2 and h3 (level 2 and 3) - matching outline config [2, 3]
    return headers.filter((header: any) => {
      const level = header.level || header.depth || 0;
      return level >= 2 && level <= 3;
    });
  });

  const updateHeaderOffset = () => {
    const nav = document.querySelector(".VPNavBar");
    const layoutTopValue = getComputedStyle(document.documentElement)
      .getPropertyValue("--vp-layout-top-height")
      .trim();
    const layoutTop = parseFloat(layoutTopValue) || 0;
    const navHeight = nav?.getBoundingClientRect().height || 0;
    headerOffset.value = navHeight + layoutTop;
  };

  // Scroll-based active link highlighting
  const updateActiveHeader = () => {
    const headers = pageHeaders.value;
    if (!headers.length) {
      activeHeader.value = null;
      return;
    }

    const scrollY = window.scrollY;
    const offset = 120; // Fixed offset as requested
    const threshold = scrollY + offset;

    // Start with null so nothing is highlighted at the very top
    let currentActive: string | null = null;

    for (const header of headers) {
      const slug = header.slug || header.link || "";
      if (!slug) continue;

      const el = document.getElementById(slug);
      if (!el) continue;

      const top = el.getBoundingClientRect().top + scrollY;

      // If the header is above the threshold line, it becomes the active candidate
      if (top <= threshold) {
        currentActive = slug;
      } else {
        // Headers are ordered; if this one is below threshold, subsequent ones are too
        break;
      }
    }

    activeHeader.value = currentActive;
  };

  let scrollHandler: (() => void) | null = null;
  let resizeHandler: (() => void) | null = null;
  let hashHandler: (() => void) | null = null;

  onMounted(() => {
    updateHeaderOffset();

    scrollHandler = () => updateActiveHeader();
    window.addEventListener("scroll", scrollHandler, { passive: true });

    resizeHandler = () => {
      updateHeaderOffset();
      updateActiveHeader();
    };
    window.addEventListener("resize", resizeHandler);

    hashHandler = () => {
      // Wait for the browser/VitePress scroll-to-anchor to finish
      requestAnimationFrame(() => {
        updateHeaderOffset();
        updateActiveHeader();
      });
    };
    window.addEventListener("hashchange", hashHandler);

    // Initial update after content is rendered
    nextTick(() => {
      updateActiveHeader();
    });
  });

  onUnmounted(() => {
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
    }
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }
    if (hashHandler) {
      window.removeEventListener("hashchange", hashHandler);
    }
  });

  // Update active header when route changes
  watch(
    () => route.path,
    () => {
      activeHeader.value = null;
      nextTick(() => {
        updateHeaderOffset();
        updateActiveHeader();
      });
    }
  );
</script>

<style scoped>
  .category-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    border-radius: 9999px;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    font-size: 14px;
    font-weight: 600;
    font-family: Inter, "Helvetica Neue", sans-serif;
    margin-bottom: 12px;
  }

  .filter-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: 9999px;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    font-size: 12px;
    font-weight: 500;
    font-family: Inter, "Helvetica Neue", sans-serif;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .metadata-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 14px;
  }

  .related-heading {
    color: var(--vp-c-text-1);
    font-weight: 600;
    margin-bottom: 24px;
  }

  a,
  p {
    font-family: Inter, "Helvetica Neue", sans-serif;
  }

  /* Outline link styles matching VitePress default */
  .outline-container {
    border-left: 1px solid var(--vp-c-divider);
  }

  .outline-list {
    list-style: none;
  }

  .outline-link {
    display: block;
    padding: 4px 12px 4px 16px;
    margin-left: -21px;
    border-left: 2px solid transparent;
    color: var(--vp-c-text-2);
    text-decoration: none;
    transition: color 0.2s, border-color 0.2s;
    line-height: 1.4;
  }

  .outline-link:hover {
    color: var(--vp-c-text-1);
  }

  .outline-link.active {
    color: var(--vp-c-brand-1);
    border-left-color: var(--vp-c-brand-1);
    font-weight: 500;
  }
</style>

<template>
  <div>
    <div
      class="container grid gap-6 sm:gap-12 md:gap-16 lg:gap-14 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
    >
      <!-- Header Section -->
      <div class="grid gap-8">
        <div>
          <h1
            v-if="displayTitle"
            class="text-2xl sm:text-4xl pb-4 md:pb-6 font-semibold"
            style="color: var(--vp-c-brand-1)"
          >
            {{ displayTitle }}
          </h1>

          <div
            v-if="articleCategory || articleFilters.length"
            class="metadata-row"
          >
            <span v-if="articleCategory" class="category-badge">
              {{ articleCategory }}
            </span>
            <span
              v-for="filter in articleFilters"
              :key="filter"
              class="filter-chip"
            >
              {{ filter }}
            </span>
          </div>

          <TagLinks v-if="fm.tags && fm.tags.length > 0" :tags="fm.tags" />
        </div>
      </div>

      <hr style="border-color: var(--vp-c-divider)" />

      <!-- Content and Aside Section (matching VitePress default structure) -->
      <div class="vp-doc flex gap-8 items-start">
        <div class="content flex-1 min-w-0">
          <Content />
        </div>
        <aside
          v-if="pageHeaders.length > 0"
          class="aside hidden xl:block flex-shrink-0"
          style="
            width: 256px;
            padding-left: 32px;
            position: sticky;
            top: 96px;
            align-self: start;
          "
        >
          <div class="outline-container">
            <div
              class="text-xs font-semibold tracking-wider mb-4"
              style="color: var(--vp-c-text-1); padding-left: 16px"
            >
              On this page
            </div>
            <ul class="outline-list space-y-1 text-sm">
              <li
                v-for="header in pageHeaders"
                :key="header.slug || header.link"
                :class="(header.level || header.depth || 0) > 2 ? 'ml-3' : ''"
              >
                <a
                  :class="[
                    'outline-link',
                    {
                      active:
                        activeHeader === (header.slug || header.link || ''),
                    },
                  ]"
                  :href="`#${header.slug || header.link || ''}`"
                >
                  {{ header.text || header.title }}
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div v-if="relatedArticles.length > 0">
        <hr style="border-color: var(--vp-c-divider); margin: 2rem 0" />
        <h2 class="text-xl sm:text-2xl related-heading">Related Articles</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          <CardLink
            v-for="(article, index) in relatedArticles"
            :key="article.link?.href || article.title || `related-${index}`"
            :product="article"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
