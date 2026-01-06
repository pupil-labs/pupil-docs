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
  const hasStartedHighlighting = ref(false);

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

  // Scroll-based active link highlighting
  const updateActiveHeader = () => {
    if (pageHeaders.value.length === 0) return;

    const headers = pageHeaders.value;
    const scrollY = window.scrollY;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    const offset = 96; // Offset from top (nav height) to consider header "active"

    // Find the header that's currently in view
    let currentActive: string | null = null;

    // Check headers from bottom to top to find the one that's currently in viewport
    for (let i = headers.length - 1; i >= 0; i--) {
      const header = headers[i];
      const slug = header.slug || header.link || "";
      if (!slug) continue;

      const element = document.getElementById(slug);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;

        // Check if element is in viewport and above the threshold
        const isInViewport =
          elementTop < viewportBottom && elementBottom > viewportTop;
        const isAboveThreshold = elementTop <= viewportTop + offset;

        if (isInViewport && isAboveThreshold) {
          currentActive = slug;
          break;
        }
      }
    }

    // Special handling for initial load: only highlight if first header is in view
    if (!hasStartedHighlighting.value) {
      if (headers.length > 0) {
        const firstSlug = headers[0].slug || headers[0].link || "";
        if (firstSlug) {
          const firstElement = document.getElementById(firstSlug);
          if (firstElement) {
            const rect = firstElement.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementBottom = elementTop + rect.height;
            const isFirstInViewport =
              elementTop < viewportBottom && elementBottom > viewportTop;
            const isFirstAboveThreshold = elementTop <= viewportTop + offset;

            // Only start highlighting if first header is actually in view
            if (isFirstInViewport && isFirstAboveThreshold) {
              hasStartedHighlighting.value = true;
              activeHeader.value = currentActive || firstSlug;
            } else {
              // First header not in view yet, don't highlight anything
              activeHeader.value = null;
            }
            return;
          }
        }
      }
    }

    // After highlighting has started, check if we've scrolled above the first h2
    if (headers.length > 0) {
      const firstSlug = headers[0].slug || headers[0].link || "";
      if (firstSlug) {
        const firstElement = document.getElementById(firstSlug);
        if (firstElement) {
          const rect = firstElement.getBoundingClientRect();
          const firstElementTop = rect.top + scrollY;

          // If we've scrolled above the first h2, remove highlight completely
          if (viewportTop < firstElementTop) {
            activeHeader.value = null;
            return;
          }
        }
      }
    }

    // After highlighting has started, always highlight the section in view
    if (currentActive) {
      activeHeader.value = currentActive;
    } else {
      // If no section is in view, find the closest one above the viewport
      // This ensures highlighting continues smoothly as you scroll
      let closestSlug: string | null = null;
      let closestDistance = Infinity;

      for (const header of headers) {
        const slug = header.slug || header.link || "";
        if (!slug) continue;

        const element = document.getElementById(slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          // Find the header that's closest to being in view (above viewport)
          if (elementTop <= viewportTop) {
            const distance = viewportTop - elementTop;
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSlug = slug;
            }
          }
        }
      }

      // If we found a closest header, use it. Otherwise keep the last active one.
      if (closestSlug) {
        activeHeader.value = closestSlug;
      }
    }
  };

  let scrollHandler: (() => void) | null = null;

  onMounted(() => {
    scrollHandler = () => updateActiveHeader();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    // Initial update after content is rendered
    nextTick(() => {
      updateActiveHeader();
    });
  });

  onUnmounted(() => {
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
    }
  });

  // Update active header when route changes
  watch(
    () => route.path,
    () => {
      hasStartedHighlighting.value = false;
      activeHeader.value = null;
      nextTick(() => {
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
  .outline-link {
    display: block;
    padding: 4px 12px 4px 16px;
    margin-left: -16px;
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
          <div
            class="text-xs font-semibold uppercase tracking-wider mb-4"
            style="color: var(--vp-c-text-2)"
          >
            On this page
          </div>
          <ul class="space-y-1 text-sm">
            <li
              v-for="header in pageHeaders"
              :key="header.slug || header.link"
              :class="(header.level || header.depth || 0) > 2 ? 'ml-3' : ''"
            >
              <a
                :class="[
                  'outline-link',
                  {
                    active: activeHeader === (header.slug || header.link || ''),
                  },
                ]"
                :href="`#${header.slug || header.link || ''}`"
              >
                {{ header.text || header.title }}
              </a>
            </li>
          </ul>
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
