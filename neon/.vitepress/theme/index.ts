import PhotoGrid from "@components/PhotoGrid.vue";
import ProductPageLayout from "@components/ProductPageLayout.vue";
import TextWrap from "@components/TextWrap.vue";
import Youtube from "@components/Youtube.vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "../../../custom.css";
import "./tailwind.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("ProductPageLayout", ProductPageLayout);
    app.component("Youtube", Youtube);
    app.component("PhotoGrid", PhotoGrid);
    app.component("TextWrap", TextWrap);
  },
} satisfies Theme;
