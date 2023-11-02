import "/../custom.css";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Youtube from "@theme/components/youtube";
import PhotoGrid from "@theme/components/photoGrid";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component("Youtube", Youtube);
    app.component("PhotoGrid", PhotoGrid);
  },
} satisfies Theme;
