import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

import { config as default_config } from './../../default_config.mts'
import { theme_config as default_theme_config } from './../../default_config.mts'


let theme_config_additions = {

}

let theme_config = { ...default_theme_config, ...theme_config_additions }

let config_additions = {
  title: "Pupil Labs Documentation",
  description: "Documentation for all Pupil Labs products.",
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBar\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomNavBar.vue', import.meta.url)
          )
        }
      ]
    }
  },
  rewrites: {
    'abc/': 'xyz/',
    '/abc/': '/xyz/',
    'neon/abc/': 'neon/xyz/',
  }
}

export default defineConfig({
  ...default_config,
  ...config_additions,
  themeConfig: theme_config,
})