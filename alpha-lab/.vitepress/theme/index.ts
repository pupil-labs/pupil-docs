import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import AlphaPageLayout from "@components/AlphaPageLayout.vue";
import AlphaAboutLayout from "@components/AlphaAboutLayout.vue";
import Youtube from "@components/Youtube.vue";
import PhotoGrid from "@components/PhotoGrid.vue";

import "/../custom.css";
import "./tailwind.css";
import "virtual:group-icons.css"
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("AlphaPageLayout", AlphaPageLayout);
    app.component("AlphaAboutLayout", AlphaAboutLayout);
    app.component("Youtube", Youtube);
    app.component("PhotoGrid", PhotoGrid);
  },
} satisfies Theme;
