<template lang="pug">
v-list(style="display: grid; gap: 8px")
  template(v-for="item in banner_menu")
    v-list-tile(
      :key="item.title",
      :href="item.href",
      target="_blank",
      rel="noopener noreferrer"
    )
      .d-flex(style="gap: 16px")
        v-img(
          v-if="item.img",
          :src="$withBase(`/icons/${item.img}.svg`)",
          width="32px"
        )
        v-icon(v-else, color="#000") {{ item.icon }}
        v-list-tile-title
          span.pr-1 {{ item.title }}
</template>

<script>
export default {
  data() {
    return {
      banner_menu: [
        {
          icon: "book",
          title: "Publications",
          href: "/invisible/publications.html",
        },
        {
          icon: "campaign",
          title: "Request a feature",
          href: "https://feedback.pupil-labs.com/",
        },
        {
          img: "discord_dark",
          title: "Chat with us",
          href: "https://pupil-labs.com/chat/",
        },
      ],
    };
  },
  watch: {
    $route(to, from) {
      this.banner_menu[1].href = to.path.includes("core")
        ? "https://github.com/pupil-labs/pupil/discussions/2275"
        : "https://feedback.pupil-labs.com/";
      this.banner_menu[0].href =
        to.path.includes("core") || to.path.includes("vr-ar")
          ? "core/academic-citation/"
          : "/invisible/publications.html";
    },
  },
};
</script>
