<template lang="pug">
  div(style="display:flex;justify-content:center;").pb-4
    iframe(
      width="560"
      height="315"
      :src="`https://www.youtube-nocookie.com/embed/${src}?autoplay=0&rel=0`"
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