import DefaultTheme from 'vitepress/theme'
// import Youtube from '/components/Youtube.vue'
// import PhotoGrid from '/components/PhotoGrid.vue'

import '/../custom.css'


export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        // register your custom global components
        // ctx.app.component('Youtube', Youtube)
        // ctx.app.component('PhotoGrid', PhotoGrid)
    },
}
