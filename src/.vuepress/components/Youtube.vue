<template lang="pug">
  div(style="display:flex;justify-content:center;").pb-4
    iframe(
      width="800"
      height="450"
      :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=0&rel=0&modestbranding=1&loop=1`"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    )
</template>

<script>
export default {
  props: {
    src: String
  }
};
</script>