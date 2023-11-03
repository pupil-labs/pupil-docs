<script setup lang="ts">
  interface Props {
    images: string[];
  }

  const { images } = defineProps<Props>();
</script>

<template>
  <div class="gallery">
    <div class="gallery-panel" v-for="photo in images">
      <img :src="photo" />
    </div>
  </div>
</template>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, 24%);
    grid-gap: 0.5%;
    max-width: 100%;
    margin: 0rem 0rem;
    padding: 0 0px;
  }

  .gallery-panel img {
    width: 100%;
    height: 15vw;
    object-fit: cover;
    border-radius: 0.75rem;
    background-color: rgb(245, 245, 245);
  }

  @media screen and (min-width: 1025px) and (max-width: 1200px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, 48%);
    }

    .gallery-panel img {
      height: 20vw;
    }
  }

  @media screen and (max-width: 800px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, 49%);
    }

    .gallery-panel img {
      object-fit: contain;
      height: 30vw;
    }
  }

  /* One column for mobiles */
  @media screen and (max-width: 400px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, 100%);
    }

    .gallery-panel img {
      height: 100%;
    }
  }
</style>
