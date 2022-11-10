<template>
  <v-content class="page">
    <slot name="top" />

    <div class="gridCol" id="observer-root">
      <div>
        <Content class="theme-default-content" />
        <v-divider class="mt-4"></v-divider>
        <footer class="page-edit justify-space-between" style="display: flex">
          <div class="edit-link" v-if="editLink">
            <a
              class="caption--1"
              :href="editLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ editLinkText }}
              <OutboundLink />
            </a>
          </div>
          <div class="last-updated caption--1" v-if="lastUpdated">
            <span class="prefix">{{ lastUpdatedText }}:</span>
            <span class="time">{{ lastUpdated }}</span>
          </div>
        </footer>
        <div class="page-nav" v-if="prev || next">
          <v-layout>
            <div>
              <v-btn
                class="ml-0 page-nav-btn"
                round
                color="primary"
                v-if="prev"
                :to="prev.path"
                :id="prev.title"
              >
                <v-icon left dark>arrow_back</v-icon>
                Back
              </v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              class="mr-0 page-nav-btn"
              round
              color="primary"
              v-if="next"
              :to="next.path"
              :id="next.title"
            >
              Next
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </div>
      <div v-if="haveTitle" class="pageContent">
        <div class="page-toc">
          <div style="display: grid; gap: 8px; padding: 8px 0">
            <template v-for="head in $page.headers">
              <div
                :key="head.slug"
                style="font-size: 12px; line-height: normal"
              >
                <a v-if="head.level == '2'" :href="`#${head.slug}`">
                  {{ head.title }}
                </a>
                <div v-if="head.level == '3'" style="padding-left: 12px">
                  <a :href="`#${head.slug}`">
                    {{ head.title }}
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <slot name="bottom" />
  </v-content>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from "../util";

export default {
  props: ["sidebarItems"],

  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    this.initObserver();
  },

  watch: {
    $route(to, from) {
      this.initObserver();
    },
  },

  beforeDestroy() {
    this.observer.disconnect();
  },

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated;
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo,
      } = this.$site.themeConfig;
      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    },
    //
    haveTitle() {
      if (this.$page.headers) {
        let pageHeaders = this.$page.headers;
        for (let i = 0; i < pageHeaders.length; i++) {
          const headers = pageHeaders[i];
          if (headers.level == 2 || headers.level == 3) {
            return true;
          }
        }
      }
    },
  },

  methods: {
    initObserver() {
      setTimeout(() => {
        this.observer = new IntersectionObserver(this.observeHeader, {
          threshold: 1.0,
        });
        document.querySelectorAll("h2[id]").forEach((el) => {
          this.observer.observe(el);
        });
      }, 200);
    },

    observeHeader(entries) {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          const div = document.querySelector(`div > a[href="#${id}"]`);
          if (div) {
            div.classList.add("active");
          }
        } else if (!entry.isIntersecting) {
          const div = document.querySelector(`div > a[href="#${id}"]`);
          if (div) {
            div.classList.remove("active");
          }
        }
      });
    },

    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.dev/${docsRepo}`;

      var link = (
        base.replace("github.com", "github.dev").replace(endingSlashRE, "") +
        `/blob` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
      if (this.$page.frontmatter.isNotebook) {
        link = changeExtension(link, ".ipynb")
      }
      return link;
    },
  },
};

function changeExtension(file, extension) {
  const path = require('path');
  const basename = path.basename(file, path.extname(file))
  return path.join(path.dirname(file), basename + extension)
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      const link = res[i + offset];
      if (link !== undefined && link.type === "external") {
        const href = res[i + offset + offset];
        return href;
      } else {
        return link;
      }
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page-toc {
  position: sticky;
  top: 120px;
  border-left: 1px solid #1263CC;
  padding: 0 20px;

  a {
    color: black;

    &.active {
      color: #1263cc;
      font-weight: bold;
    }

    &:hover {
      color: #1263cc;
    }
  }
}

.gridCol {
  display: grid;
  position: relative;
  grid-template-columns: minmax(0, 4fr) minmax(200px, 1fr);
  gap: 80px;
  padding: 2rem 2.5rem;
}

.page {
  padding: 60px 0 0 330px !important;
  padding-bottom: 2rem;
  display: block;
  background-color: white;
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    // font-size 0.9em
    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 24px;
  padding-bottom: 24px;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: 1024px) {
  .pageContent {
    display: none !important;
  }

  .gridCol {
    grid-template-columns: 1fr;
  }

  .page {
    padding-left: unset !important;
  }

  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
