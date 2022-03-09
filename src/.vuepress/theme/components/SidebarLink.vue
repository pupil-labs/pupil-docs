<script>
import { isActive, hashRE, groupHeaders } from "../util";

export default {
  functional: true,

  props: ["item", "sidebarDepth"],

  render(
    h,
    {
      parent: { $page, $site, $route, $themeConfig, $themeLocaleConfig },
      props: { item, sidebarDepth },
    }
  ) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path);
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active =
      item.type === "auto"
        ? selfActive ||
          item.children.some((c) =>
            isActive($route, item.basePath + "#" + c.slug)
          )
        : selfActive;
    const link =
      item.type === "external"
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active);

    // const configDepth =
    //   $page.frontmatter.sidebarDepth ||
    //   sidebarDepth ||
    //   $themeLocaleConfig.sidebarDepth ||
    //   $themeConfig.sidebarDepth;

    // const maxDepth = configDepth == null ? 1 : configDepth;

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    if (item.type === "auto") {
      return [link, renderChildren(h, item.children, item.basePath, $route, 0)];
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers);
      return [link, renderChildren(h, children, item.path, $route, 0)];
    } else {
      return link;
    }
  },
};

function renderLink(h, to, text, active) {
  return h(
    "router-link",
    {
      props: {
        to,
        activeClass: "",
        exactActiveClass: "",
      },
      class: {
        active,
        "sidebar-link": true,
      },
    },
    [h("span", text)]
  );
}

function renderI(h, depth, active) {
  if (depth >= 1) {
    return h("i", {
      class: {
        active,
        "side-nav__progress-bar": true,
      },
    });
  }
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h(
    "ul",
    { class: `sidebar-sub-headers depth--${depth}` },
    children.map((c) => {
      const active = isActive(route, path + "#" + c.slug);
      return h("li", { class: "sidebar-sub-header" }, [
        renderI(h, depth, active),
        renderLink(h, path + "#" + c.slug, c.title, active),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1),
      ]);
    })
  );
}

function renderExternal(h, to, text) {
  return h(
    "a",
    {
      attrs: {
        href: to,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      class: {
        "sidebar-link": true,
      },
    },
    [h("span", text), h("OutboundLink")]
  );
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers {
  // padding-left 1rem
  font-size: 0.95em;
}

.sidebar-sub-header {
  position: relative;
}

.sidebar-group-items {
  a {
    border-left: unset !important;
  }
}

a.sidebar-link {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #455A64;
  padding: 4px 16px;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;
  min-height: 24px;
  line-height: 1;

  > span {
    transform: translateY(1px);
  }

  &:hover {
    color: #0D122A;
    background-color: #ECEFF1;
  }

  &.heading-active {
    font-weight: 600;
    color: #0D122A;
  }

  &.page-active {
    color: #1263cc;
  }

  // .sidebar-group &
  // padding-left 40px
  .sidebar-sub-headers & {
    padding-left: 48px;
    border-left: unset;
  }

  .depth--2 & {
    padding-left: 64px;
  }
}

li > a.sidebar-link {
  padding-left: 40px;
}

.sidebar-group-items {
  padding: 4px 0 !important;

  .sidebar-link {
    padding-left: 40px;
  }

  .sidebar-sub-headers {
    .sidebar-link {
      padding-left: 48px;
    }

    .depth--2 {
      .sidebar-link {
        padding-left: 64px;
      }
    }
  }

  .depth--1 {
    .side-nav__progress-bar {
      height: 42px;
    }
  }

  .depth--2 {
    .side-nav__progress-bar {
      height: unset;
    }
  }
}

.side-nav__progress-bar {
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 30px;
  width: 2px;
  background: rgba(189, 189, 189, 0.4);

  &.active {
    background-color: blue;
  }
}

// .depth-1 {
// .sidebar-heading {
// font-weight: bold;
// }
// }
.sidebar-group {
  .sidebar-link {
    font-weight: bold;
  }

  .sidebar-group-items {
    .sidebar-link {
      font-weight: 400;
      font-size: 12px;

      &.active {
        background-color: unset;
        color: #1263cc;
      }
    }

    .sidebar-heading {
      font-weight: bold;
    }
  }

  .side-nav__progress-bar {
    left: 32px;
  }
}

.sidebar-links {
  .sidebar-link.active {
    background-color: #E8F0FE;
    border-radius: 4px;
    color: #1263cc;
  }
}

.icon.outbound {
  margin-left: 4px;
  top: 0;
}
</style>
