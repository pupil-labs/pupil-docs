<template>
  <div class="banner">
    <v-btn
      v-if="isInvisible"
      fixed
      bottom
      flat
      left
      class="banner-btn"
      style="bottom: 67px; min-height:60px;"
      @click="gotoCanny()"
      ><v-icon left>
        campaign
      </v-icon>
      Missing something? <br />
      &nbsp;Suggest a feature!</v-btn
    >
    <v-btn
      fixed
      bottom
      flat
      left
      class="banner-btn"
      style="bottom: 16px; min-height:50px;"
      @click="gotoChat()"
    >
      <v-img
        min-width="10"
        max-width="15"
        src="../../logos/discord-mark-color.svg"
      ></v-img>
      &nbsp; Chat with us in Discord
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInvisible: true,
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
      this.isInvisible = window.location.href.indexOf("invisible") != -1;
    }
  },
  created() {
    if (typeof window !== "undefined") {
      this.isInvisible = window.location.href.indexOf("invisible") != -1;
    }
  },
  watch: {
    $route() {
      this.isInvisible = window.location.href.indexOf("invisible") != -1;
    },
  },
};
</script>
<style>
@media screen {
  .banner {
    background-color: #ffffff;
    height: 140px;
    width: 239px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .v-btn.banner-btn {
    font-size: 14px;
    font-weight: bold;
    color: #455a64;
    line-height: 1.4;
    width: 207px; /* Mobile collapsible bar is 239px wide */
    left: 1rem;
    flex: auto;
    text-align: left;
    padding-left: 0px;
    align-content: center;
  }
}
@media screen and (min-width: 1025px) {
  .banner {
    background-color: #ffffff;
    height: 140px;
    width: 279px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .v-btn.banner-btn {
    width: 247px; /*  2 rem = 32px - Sidebar on desktop is 279px wide*/
  }
}
</style>
