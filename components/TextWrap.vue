<template>
  <div class="text-wrap-container">
    <img
      :src="src"
      :alt="alt"
      :class="['floating-image', align]"
      :style="{ width: width }"
    />
    <div class="content">
      <slot />
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  align: { type: String, default: "left" }, // 'left' or 'right'
  width: { type: String, default: "300px" }, // Default width of image
});
</script>

<style scoped>
.text-wrap-container {
  margin: 2rem 0;
}

.floating-image {
  margin-bottom: 1rem;
  border-radius: 8px; /* Optional: adds rounded corners */
}

/* Desktop Styles */
@media (min-width: 768px) {
  .floating-image.left {
    float: left;
    margin-right: 1.5rem;
  }

  .floating-image.right {
    float: right;
    margin-left: 1.5rem;
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .floating-image {
    float: none;
    display: block;
    width: 100% !important; /* Force full width on mobile */
    margin: 0 0 1rem 0;
  }
}
</style>
