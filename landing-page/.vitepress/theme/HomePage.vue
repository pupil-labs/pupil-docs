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
  <div class="container p-6 mx-auto">
    <div class="hero">
      <h1 v-if="fm.hero?.name">{{ fm.hero.name }}</h1>
      <div v-if="fm.hero?.text">{{ fm.hero.text }}</div>
      <div v-if="fm.hero?.tagline">{{ fm.hero?.tagline }}</div>
    </div>
    <div v-if="fm.products" class="products">
      <div v-for="product in fm.products" :key="product.title" class="py-3">
        <div>{{ product.title }}</div>
        <div>{{ product.details }}</div>
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
    <div class="content">
      <Content />
    </div>
  </div>
</template>
