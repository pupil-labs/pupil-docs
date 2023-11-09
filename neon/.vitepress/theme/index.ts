import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import ProductPageLayout from "@components/ProductPageLayout.vue";
import Youtube from "@components/Youtube.vue";
import PhotoGrid from "@components/PhotoGrid.vue";

import "../../../custom.css";
import "./tailwind.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("ProductPageLayout", ProductPageLayout);
    app.component("Youtube", Youtube);
    app.component("PhotoGrid", PhotoGrid);
  },
} satisfies Theme;
