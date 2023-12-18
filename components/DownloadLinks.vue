<template>
  <div class="button-container">
    <button @click="download" class="download-button">
      <img :src="icon" alt="Download Icon" class="button-icon" />
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "DownloadLinks",
  props: {
    src: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "Download",
    },
    icon: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      urlWindows: "",
      urlMac: "",
      urlLinux: "",
    };
  },
  mounted() {
    fetch(this.src)
      .then((response) => response.json())
      .then((data) => {
        data.assets.forEach((asset) => {
          if (asset.browser_download_url.includes("windows")) {
            this.urlWindows = asset.browser_download_url;
          } else if (asset.browser_download_url.includes("linux")) {
            this.urlLinux = asset.browser_download_url;
          } else if (asset.browser_download_url.includes("macos")) {
            this.urlMac = asset.browser_download_url;
          }
        });
      })
      .catch((error) => console.error("Error:", error));
  },
  methods: {
    download() {
      const platform = navigator.platform.toLowerCase();

      if (platform.includes("win")) {
        window.location.href = this.urlWindows;
      } else if (platform.includes("mac")) {
        window.location.href = this.urlMac;
      } else if (platform.includes("linux")) {
        window.location.href = this.urlLinux;
      } else {
        console.log("Unsupported platform");
      }
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100h;
}
.download-button {
  background-color: var(#0d122a, white);
  color: var(white, black);
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-weight: 500;
  font-size: 24px;
  box-shadow: inset 0 0 0 2px #455a64;
}

.button-icon {
  height: 30px;
  margin-right: 8px;
}
</style>
