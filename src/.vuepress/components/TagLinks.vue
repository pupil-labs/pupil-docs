<template lang="html">
  <div>
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: getPageLink(tag) }"
    >
        {{ tag }}  
    </router-link>
    <br></br>
  </div>
</template>
<script>
export default {
    methods: {
        getPageLink(tag) {
            if (tag.toLowerCase().includes('invisible')) {
                return '/invisible/'
            }
            else if (tag.toLowerCase().includes('cloud')) {
                return '/invisible/getting-started/analyse-recordings-in-pupil-cloud/'
            }
            else if (tag.toLowerCase().includes('core')) {
                return '/core/'
            }
            else {
                return '/tags.html'
            }
        }
    },
}
</script>