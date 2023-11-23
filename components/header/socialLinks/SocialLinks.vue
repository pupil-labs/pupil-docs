<script lang="ts" setup>
  import type { SocialLink as LinkProp } from "../../../default_config.mts";
  import SocialLink from "./SocialLink.vue";

  defineProps<{
    links: LinkProp[];
  }>();
</script>

<template>
  <div class="VPSocialLinks">
    <SocialLink
      v-for="{ link, icon, ariaLabel, target } in links"
      :key="link"
      :icon="icon"
      :link="link"
      :target="target"
      :ariaLabel="ariaLabel"
    />
  </div>
</template>

<style scoped>
  .VPSocialLinks {
    display: flex;
    justify-content: center;
  }
</style>
