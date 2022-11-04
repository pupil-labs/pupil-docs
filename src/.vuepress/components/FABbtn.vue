<template>
  <div v-if="show_big">
    <!-- Use this if full screen on Desktop -->
    <v-btn
      round
      fixed
      bottom
      right
      dark
      color="#5865F2"
      class="fixed"
      style="bottom: 2rem; right: 2rem; font-size: small;"
      @click="gotoChat()"
    >
      <v-img width="20" src="../../logos/discord-mark-white.svg"></v-img>
      &nbsp; Chat with us in Discord
    </v-btn>
  </div>
  <div v-else>
    <!-- Use this if small screen -->
    <v-tooltip top color="#5865F2">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          fab
          fixed
          bottom
          right
          color="#5865F2"
          @click="gotoChat()"
        >
          <v-img
            max-width="28"
            src="../../logos/discord-mark-white.svg"
          ></v-img>
        </v-btn>
      </template>
      <span>Chat with us in Discord</span>
    </v-tooltip>
  </div>
</template>

<!-- <v-btn v-if="show-big" color="#5865F2" fab fixed bottom right @click="gotoChat">
    <v-img max-width="28" src="../../logos/discord-mark-white.svg"></v-img> 
    <v-icon color="white">forum</v-icon> 
    <v-icon large color="white">contact_support</v-icon>
    <v-icon color="white">chat</v-icon>
    <v-icon color="white">3p</v-icon> 
  </v-btn> -->

<script>
export default {
  data() {
    return {
      show_big: true,
      gotoChat() {
        window.open("https://pupil-labs.com/chat/", "_blank");
      },
    };
  },
  mounted() {
    this.show_big = window.innerWidth > 600;
  },
  /*if resize window, change the button size*/
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.show_big = window.innerWidth > 600;
    },
  },
};
</script>
