<script lang="ts" setup>
  import type { DefaultTheme } from "vitepress/theme";
  import { computed } from "vue";
  import { icons } from "vitepress/dist/client/theme-default/support/socialIcons";

  const props = defineProps<{
    icon: DefaultTheme.SocialLinkIcon;
    link: string;
    ariaLabel?: string;
    target?: string;
  }>();

  const svg = computed(() => {
    if (typeof props.icon === "object") return props.icon.svg;
    return icons[props.icon];
  });
</script>

<template>
  <a
    class="VPSocialLink no-icon"
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    :target="target || '_blank'"
    rel="noopener"
    v-html="svg"
  >
  </a>
</template>

<style scoped>
  .VPSocialLink {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
  }

  .VPSocialLink:hover {
    color: var(--vp-c-text-1);
    transition: color 0.25s;
  }

  .VPSocialLink > :deep(svg) {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
</style>
