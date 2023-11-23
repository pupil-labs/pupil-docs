<script setup lang="ts">
  interface Image {
    url: string;
    alt?: string;
  }

  interface Props {
    images: Image[];
    cols?: string | number;
    gap?: string | number;
  }

  const { images, cols, gap } = withDefaults(defineProps<Props>(), {
    images: () => [],
    cols: "2",
    gap: "4",
  });
</script>

<template>
  <div :class="`grid grid-cols-${cols} gap-${gap}`">
    <div v-for="(image, index) in images" :key="index">
      <img :src="image.url" :alt="image.alt" />
    </div>
  </div>
</template>
