<template>
  <v-app
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Header ref="header" @toggle-sidebar="toggleSidebar"></Header>
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" slot="top" />
      <slot name="sidebar-bottom" slot="bottom" />
    </Sidebar>
    <v-content>
      <v-container justify-center align-center fill-height style="display:flex;">
        <div>
          <div class="pb-4">
            <h1 style="font-size:144px;line-height:144px;">404</h1>
            <h2 class="pb-1">Oops!</h2>
            <h2>{{ getMsg() }}</h2>
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
import Sidebar from "@theme/components/Sidebar.vue";
import Footer from "@theme/components/Footer.vue";
import { resolveSidebarItems } from "../util";

export default {
  data() {
    return {
      isSidebarOpen: false,
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
    Sidebar,
    Footer
  },
  computed: {
    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    }
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },
  methods: {
    getMsg() {
      return this.msgs[Math.floor(Math.random() * this.msgs.length)];
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  }
};
</script>