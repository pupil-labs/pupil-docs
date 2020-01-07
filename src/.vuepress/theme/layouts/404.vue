<template>
  <v-app>
    <Header ref="header" @toggle-sidebar="toggleSidebar"></Header>
    <v-content>
      <v-container justify-center align-center fill-height style="display:flex;">
        <div>
          <div class="pb-4">
            <h1 style="font-size:144px;line-height:144px;">404</h1>
            <h2 class="pb-1">Oops!</h2>
            <h2>Something’s missing.</h2>
            <blockquote>{{ getMsg() }}</blockquote>
          </div>
          <v-btn dark round block to="/" color="primary" class="ma-0">Go Home</v-btn>
        </div>
      </v-container>
      <Footer></Footer>
    </v-content>
  </v-app>
</template>

<script>
import Header from "@theme/components/Header.vue";
import Footer from "@theme/components/Footer.vue";

export default {
  data() {
    return {
      msgs: [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `This is not the page you are looking for.`
      ]
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },
    getMsg() {
      return this.msgs[Math.floor(Math.random() * this.msgs.length)];
    }
  }
};
</script>