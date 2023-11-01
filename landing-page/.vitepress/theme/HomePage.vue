<script setup lang="ts">
  import { useData } from "vitepress";
  const { frontmatter } = useData();

  type FrontMatter = typeof frontmatter;

  interface FM extends FrontMatter {
    hero?: {
      name?: string;
      text?: string;
      tagline?: string;
    };
  }

  const fm: FM = frontmatter;
</script>

<template>
  <div class="container p-6 mx-auto grid gap-4">
    <div class="grid grid-cols-3">
      <div>
        <h1
          v-if="fm.hero?.name"
          class="text-4xl pb-2"
          style="color: var(--vp-c-brand-1)"
        >
          {{ fm.hero.name }}
        </h1>
        <p v-if="fm.hero?.text">{{ fm.hero.text }}</p>
        <div v-if="fm.hero?.tagline">{{ fm.hero?.tagline }}</div>
      </div>
    </div>
    <div v-if="fm.products" class="grid grid-cols-3 gap-4">
      <div
        v-for="product in fm.products"
        :key="product.title"
        class="rounded-lg"
        style="background-color: var(--vp-c-bg-elv)"
      >
        <img
          src="https://place-hold.it/450x300/"
          class="h-auto w-full rounded-tl-lg rounded-tr-lg"
        />
        <div class="grid gap-2 p-3">
          <p>{{ product.title }}</p>
          <p>{{ product.details }}</p>
          <div v-if="product.link">
            <a
              :href="product.link.href"
              class="text-blue-400 hover:text-blue-300"
            >
              <span>{{ product.link.text }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <Content />
  </div>
</template>
