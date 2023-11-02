import "../../../custom.css";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomePage from "@theme/HomePage.vue";
// import Youtube from "@theme/components/youtube";

import "./tailwind.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("HomePage", HomePage);
    // app.component("Youtube", Youtube);
  },
} satisfies Theme;
