<template lang="pug">
.pb-4(style="display: flex; justify-content: center; aspect-ratio: 16 / 9")
  iframe(
    width="100%",
    height=height,
    :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=${autoplay}&rel=0&modestbranding=1&loop=1&muted=${muted}&cc_load_policy=${ccLoadPolicy}`",
    frameborder="0",
    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen
  )
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
    muted: {
      type: String,
      default: "0",
    },
    autoplay: {
      type: String,
      default: "0",
    },
    closed_caption: {
      type: String,
      default: "0",
    },
  },
};
</script>
