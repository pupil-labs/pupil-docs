<template>
  <div class="caption--1 pb-3">
    <span class="">Products used:</span>
    <span class="taglinks">
      <template v-for="(tag, index) in $page.frontmatter.tags">
        <a
          :key="`${tag}-${index}`"
          :href="getPageLink(tag)"
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
          >{{ tag }}</a
        >
      </template>
    </span>
  </div>
</template>
<script>
  export default {
    methods: {
      getPageLink(tag) {
        const url = "https://pupil-labs.com/products";
        if (tag.toLowerCase().includes("invisible")) {
          return `${url}/invisible/`;
        } else if (tag.toLowerCase().includes("cloud")) {
          return `${url}/cloud/`;
        } else if (tag.toLowerCase().includes("core")) {
          return `${url}/core/`;
        } else {
          return;
        }
      },
    },
  };
</script>

<style scoped>
  .taglinks a:not(:first-child):before {
    font-family: AtlasGrotesk, sans-serif;
    font-size: 12px !important;
    content: ", ";
  }
</style>
