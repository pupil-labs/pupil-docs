<script setup lang="ts">
  interface Props {
    src: string;
    height: string;
    width: string;
    muted: string;
    autoplay: string;
    closedCaption: string;
  }

  const { src, muted, autoplay, closedCaption } = withDefaults(
    defineProps<Props>(),
    {
      height: "auto",
      muted: "1",
      autoplay: "0",
      closedCaption: "1",
    }
  );
</script>

<template>
  <div style="display: flex; justify-content: center; aspect-ratio: 16 / 9">
    <iframe
      width="100%"
      height="height"
      :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=${autoplay}&rel=0&modestbranding=1&loop=1&muted=${muted}&cc_load_policy=${closedCaption}`"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
