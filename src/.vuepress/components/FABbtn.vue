<template>
  <v-btn v-if="show" color="#5865F2" fab fixed bottom right @click="gotoChat">
    <v-img max-width="28" src="../../logos/discord-mark-white.svg"></v-img>
    <!-- <v-icon color="white">question_answer</v-icon> -->
  </v-btn>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  methods: {
    gotoChat() {
      window.open("https://pupil-labs.com/chat/", "_blank");
    },
  },
};
</script>
