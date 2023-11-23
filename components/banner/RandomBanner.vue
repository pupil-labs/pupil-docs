<script setup lang="ts">
  import { ref } from "vue";
  import bannerJson from "./banners.json";

  const image = ref({
    img_name: "",
    alt_text: "",
  });

  const loadRandomImage = async () => {
    // Set the banner text from a JSON file
    var bannerText = bannerJson;
    // Get the current month
    const month = new Date().getMonth();
    // If it's December, change the banner to one with a Christmas theme
    if (month === 11) {
      // @ts-ignore
      const img_name = await import("./images/xmas.webp");
      image.value = {
        img_name: img_name.default,
        alt_text: bannerText.xmas,
      };
    } else {
      // If it's not December, pick a random banner from the 7 available banners
      const numberOfImages = 7;
      const randomImageNumber = Math.trunc(Math.random() * numberOfImages) + 1;
      console.log(randomImageNumber);
      var randomImage = `img${randomImageNumber.toString()}`;
      var randomImageAltText = "img" + randomImageNumber.toString();

      const img_name = await import(`./images/${randomImage}.webp`);
      image.value = {
        img_name: img_name.default,
        alt_text: bannerText[randomImageAltText],
      };
    }
  };

  loadRandomImage();
</script>

<template>
  <div class="banner">
    <img
      :src="image.img_name"
      :alt="image.alt_text"
      class="w-full rounded-lg"
      width="100%"
      height="auto"
      style="max-width: 700px"
    />
  </div>
</template>
