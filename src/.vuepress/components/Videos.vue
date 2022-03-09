<template lang="pug">
.pb-4
  video.w-full.h-full(controls)
    source(:src="src", :type="type")
</template>

<script>
export default {
  props: {
    src: {
      type: String | Object,
      required: true,
    },
    type: {
      type: String,
      default: "video/mp4",
    },
  },
};
</script>

<style>
</style>