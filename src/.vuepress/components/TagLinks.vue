<template lang="html">
  <div class="caption--1 pb-3">
    <span>Products used in this experiment: </span>
    <a
      v-for="(tag, index) in $page.frontmatter.tags"
      :key="tag"
      :href="getPageLink(tag)"
      color="primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ index + 1 < $page.frontmatter.tags.length ? `${tag}, ` : tag }}
    </a>
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
        return `${url}/cloud`;
      } else if (tag.toLowerCase().includes("core")) {
        return `${url}/core/`;
      } else {
        return;
      }
    }
  }
};
</script>
