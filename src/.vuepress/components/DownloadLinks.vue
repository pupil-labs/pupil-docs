

<template>

  <v-menu offset-y

    class="mb-4">
    <template v-slot:activator="{ on }">
      <v-btn
        large
        color="primary"
        dark
        v-on="on"
      >
        Download Pupil Core Software
      </v-btn>
    </template>

    <v-list
      style="padding:0">
      <div
        style="margin:0;padding:0">
        <v-btn
          style="width:100%; margin:0;padding:0"
          color="none"
          :href="url_windows"
          >Windows (64 bit)
        </v-btn>
      </div>
      <div
        style="margin:0;padding:0">
        <v-btn
          style="width:100%; margin:0;padding:0"
          color="none"
          :href="url_linux"
          >Linux (64 bit)
        </v-btn>
      </div>
      <div
        style="margin:0;padding:0">
        <v-btn
          style="width:100%; margin:0;padding:0"
          color="none"
          :href="url_mac"
          >MacOs (64 bit)
        </v-btn>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
const axios = require('axios')
export default {
  data () {
      return {
        url_windows: '',
        url_linux: '',
        url_mac: '',
      }
  },
  beforeMount() {
    var self = this
    axios.get("https://api.github.com/repos/pupil-labs/pupil/releases/latest")
    .then(response => {
      response.data.assets.forEach(asset=>{
        if (asset.browser_download_url.indexOf('windows_x64.zip')>=0){
           self.url_windows = asset.browser_download_url
        } else if (asset.browser_download_url.indexOf('linux_x64.zip')>=0){
           self.url_linux = asset.browser_download_url
        } else if (asset.browser_download_url.indexOf('macos_x64.zip')>=0){
           self.url_mac = asset.browser_download_url
        }
      })
    })
    .catch(error => {
        console.log(error);
    })
  }
}
</script>