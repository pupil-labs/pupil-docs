<template>
  <v-btn
    v-if="!isMobile && isInvisible"
    text
    fixed
    bottom
    color="#f3f3f3"
    elevation="0"
    class="banner-canny"
    style="font-size: small;font-weight: 500;min-height:60px;text-align: left;"
    @click="gotoCanny()"
  >
    <v-icon left outline>
      campaign
    </v-icon>
    Missing something?
    <br />
    Suggest a feature!
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      isMobile: false,
      isInvisible: false,
      gotoCanny() {
        if (typeof window !== "undefined") {
          window.open("https://pupil-labs.canny.io/", "_blank");
        }
      },
    };
  },
  mounted() {
    if (typeof window !== "undefined") {
      this.isMobile = window.innerWidth < 600;
      this.isInvisible = window.location.href.indexOf("invisible") != -1;
    }
  },
  /*if resize window, change the button size*/
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize);
    }
  },
  created() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.handleResize);
      this.isInvisible = window.location.href.indexOf("invisible") != -1;
    }
  },
  methods: {
    handleResize() {
      if (typeof window !== "undefined") {
        this.isMobile = window.innerWidth < 600;
      }
    },
  },
};
</script>
<style>
@media screen and (min-width: 1025px) {
  .banner-canny {
    min-width: 225px;
    margin-left: 25px;
  }
}
@media screeen {
  .banner-canny {
    min-width: 215px;
    margin-left: 15px;
  }
}
</style>
