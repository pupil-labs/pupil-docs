<script lang="ts" setup>
  import { useData } from "vitepress/dist/client/theme-default/composables/data";
  import SocialLinks from "./SocialLinks.vue";

  const { theme } = useData();
</script>

<template>
  <SocialLinks
    v-if="theme.socialLinks"
    class="VPNavBarSocialLinks"
    :links="theme.socialLinks"
  />
</template>

<style scoped>
  .VPNavBarSocialLinks {
    display: none;
  }

  @media (min-width: 1280px) {
    .VPNavBarSocialLinks {
      display: flex;
      align-items: center;
    }
  }
</style>
