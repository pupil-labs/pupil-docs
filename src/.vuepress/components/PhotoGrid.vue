<!-- A vue class for a gallery view -->
<template>
    <div class="gallery">
        <div class="gallery-panel"
            v-for="photo in Number(count)">
            <img :src="path2(src, photo)">
        </div>
    </div>
</template>

<script>
export default {
   props: {
        src: {
        type: String | Object,
        required: true,
        },
        count: {
        type: String,
        required: true,
        },
    },
    computed: {
    console: () => console,
    window: () => window,
    },
    methods: {
        path2(src, photo) {
            return require(`${src}${photo.toString()}.jpg`);
        }
    }
};
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }

  .gallery-panel img {
    width: 100%;
    height: 22vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }
</style>