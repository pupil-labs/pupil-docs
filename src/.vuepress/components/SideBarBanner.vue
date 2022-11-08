<template>
  <div class="banner">
    <v-btn
      v-if="isInvisible"
      fixed
      bottom
      left
      color="white"
      class="banner-btn"
      style="bottom: 6rem; min-height:60px;"
      @click="gotoCanny()"
      ><v-icon>
        campaign
      </v-icon>
      &nbsp; Missing something? <br />
      &nbsp;&nbsp;Suggest a feature!</v-btn
    >
    <v-tooltip top color="#5865F2">
      <template v-slot:activator="{ on }">
        <v-btn
          fixed
          bottom
          left
          color="white"
          class="banner-btn"
          style="bottom: 2rem; max-height:60px;"
          @click="gotoChat()"
        >
          <v-img
            min-width="10"
            max-width="15"
            :src="../../logos/discord-mark-color.svg"
          ></v-img>
          &nbsp; Chat with us in Discord
        </v-btn>
      </template>
      <span>Chat with us in Discord</span>
    </v-tooltip>
  </div>
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
      gotoChat() {
        if (typeof window !== "undefined") {
          window.open("https://pupil-labs.com/chat/", "_blank");
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
@media screen {
  .v-btn.banner-btn {
    min-width: 192px;
    max-width: 192px; /* Mobile collapsible bar is 240px wide */
    left: 1.5rem;
    font-size: small;
    font-weight: 500;
    flex: auto;
    text-align: left;
  }
}
@media screen and (min-width: 1025px) {
  .v-btn.banner-btn {
    min-width: 232px;
    max-width: 232px; /*  1.5 rem = 24px - Sidebar on desktop is 280px wide*/
    left: 1.5rem;
    font-size: small;
    font-weight: 500;
    flex: auto;
    text-align: left;
  }
}
</style>
