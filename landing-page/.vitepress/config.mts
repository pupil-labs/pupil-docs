import { defineConfig } from "vitepress";

const url = `https://docs-staging.pupil-labs.com/`;

import { config as default_config } from "./../../default_config.mts";
import { theme_config as default_theme_config } from "./../../default_config.mts";

const theme_config_additions = {
  nav: [
    { text: "Neon", link: url + "neon/", target: "_self" },
    { text: "Invisible", link: url + "invisible/", target: "_self" },
    { text: "Core", link: url + "core/", target: "_self" },
    { text: "Alpha Lab", link: url + "alpha-lab/", target: "_self" },
  ],
};

const theme_config = { ...default_theme_config, ...theme_config_additions };

const config_additions = {
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  rewrites: {
    "abc/": "xyz/",
    "/abc/": "/xyz/",
    "neon/abc/": "neon/xyz/",
  },
};

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
});
