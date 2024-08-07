<script setup lang="ts">
  import { useData } from "vitepress";
  import Footer from "./Footer.vue";
  import ArrowIcon from "./ArrowIcon.vue";
  import BuilderIcon from "./BuilderIcon.vue";
  import ResearchIcon from "./ResearchIcon.vue";
  import ExpertIcon from "./ExpertIcon.vue";
  const { frontmatter } = useData();

  // @ts-ignore
  import officeImage from "../alpha-lab/public/office.webp";

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

<style scoped>
  p {
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
  .text-padding:not(:last-child) {
    padding-bottom: 16px;
  }
  .category-chip {
    padding: 10px 16px;
    border-radius: 9999px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: medium;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }
  .category-chip:hover {
    background-color: var(--vp-c-default-1);
  }
  .selected {
    background-color: var(--vp-c-default-2);
  }
  .text-link-color {
    color: var(--vp-c-brand-1);
  }
  .text-link-color:hover {
    color: var(--vp-c-brand-2);
  }
  button {
    @apply py-2 px-4 rounded-full flex gap-2 items-center text-sm font-medium;
    font-family: Inter, "Helvetica Neue", sans-serif;
  }

  button.primary {
    background-color: var(--vp-c-brand-3);
    color: var(--vp-c-text-1);
  }

  button.primary:hover {
    background-color: var(--vp-c-brand-2);
  }

  button.darkButton {
    background-color: var(--vp-c-default-2);
    color: var(--vp-c-text-1);
  }

  button.darkButton:hover {
    background-color: var(--vp-c-default-1);
  }
</style>

<template>
  <div
    class="container grid gap-6 sm:gap-12 md:gap-16 lg:gap-20 px-6 pt-9 sm:pb-12 md:pb-16 lg:pb-20 mx-auto"
  >
    <div class="grid gap-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div class="order-2 lgd:order-1 col-span-full lg:col-span-5 h-full">
          <div>
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
              style="color: var(--vp-c-text-1)"
              v-html="tagline"
            ></p>
          </div>
          <div class="mt-16">
            <!-- <hr class="mt-2 mb-8" style="border-color: var(--vp-c-divider)" /> -->
            <p class="text-xl font-semibold mb-2">Need help?</p>
            <p style="color: var(--vp-c-text-1)">
              We are happy to help integrate examples into your workflow, or
              even partner up to build something fully customized to your
              requirements.
            </p>
            <div class="flex flex-wrap gap-4 mt-6 sm:mb-4 mb-0">
              <a
                href="https://calendly.com/pupil-labs/research-consultancy-intro"
                target="_blank"
                class="flex items-center gap-2 text-link-color"
              >
                <button class="primary">
                  <span>Contact Us for a Consultation</span>
                  <ArrowIcon />
                </button>
              </a>
              <a
                href="https://pupil-labs.com/products/support"
                target="_blank"
                class="flex items-center gap-2 text-link-color"
              >
                <button class="darkButton">
                  <span>Learn More</span>
                  <ArrowIcon />
                </button>
              </a>
            </div>
          </div>
        </div>
        <div
          class="order-1 lg:order-2 lg:col-span-7 xl:col-span-6 xl:col-start-7"
        >
          <img
            :src="officeImage"
            alt="Pupil Labs Office"
            style="object-fit: cover; object-position: right"
            class="w-full h-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
