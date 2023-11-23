<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      tags: string[];
    }>(),
    {
      tags: () => [],
    }
  );

  const getPageLink = (tag: string) => {
    const url = "https://pupil-labs.com/products";
    if (tag.toLowerCase().includes("invisible")) {
      return `${url}/invisible/`;
    } else if (tag.toLowerCase().includes("neon")) {
      return `${url}/neon/`;
    } else if (tag.toLowerCase().includes("cloud")) {
      return `${url}/cloud/`;
    }
  };
</script>

<template>
  <div class="caption--1 pb-3">
    <span class="">Products used: </span>
    <span class="taglinks">
      <a
        v-for="(tag, index) in props.tags"
        :key="`${tag}-${index}`"
        :href="getPageLink(tag)"
        color="primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ tag }}{{ index < props.tags.length - 1 ? ", " : "" }}
      </a>
    </span>
  </div>
</template>
