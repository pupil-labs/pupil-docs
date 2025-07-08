<script setup lang="ts">
interface Props {
  src: string;
  height: string;
  width: string;
  muted: string;
  autoplay: string;
  closedCaption: string;
  color?: "red" | "white";
  controls?: "0" | "1";
  iv_load_policy?: "1" | "3";
  loop?: "0" | "1";
  list?: string;
}

const {
  src,
  height = "auto",
  muted = "1",
  autoplay = "0",
  closedCaption = "1",
  iv_load_policy = "1",
  loop = "1",
  controls = "1",
} = defineProps<Props>();
</script>

<template>
  <div style="display: flex; justify-content: center; aspect-ratio: 16 / 9">
    <iframe
      width="100%"
      height="height"
      :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=${autoplay}&rel=0&loop=${loop}&muted=${muted}&cc_load_policy=${closedCaption}&controls=${controls}&iv_load_policy=${iv_load_policy}&rel=0&enablejsapi=1`"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>
