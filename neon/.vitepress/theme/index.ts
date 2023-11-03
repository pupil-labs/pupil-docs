import "/../custom.css";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Youtube from "@theme/components/Youtube.vue";
import PhotoGrid from "@theme/components/PhotoGrid.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("Youtube", Youtube);
    app.component("PhotoGrid", PhotoGrid);
  },
} satisfies Theme;
