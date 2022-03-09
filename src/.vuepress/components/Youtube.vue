<template lang="pug">
.pb-4(style="display: flex; justify-content: center; aspect-ratio: 16 / 9")
  iframe(
    width="100%",
    height="100%",
    :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=0&rel=0&modestbranding=1&loop=1`",
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
  },
};
</script>