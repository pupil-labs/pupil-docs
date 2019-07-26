<script>
import { isActive, hashRE, groupHeaders } from "../util";

export default {
  functional: true,

  props: ["item", "sidebarDepth"],

  render(
    h,
    {
      parent: { $page, $site, $route, $themeConfig, $themeLocaleConfig },
      props: { item, sidebarDepth }
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
          item.children.some(c =>
            isActive($route, item.basePath + "#" + c.slug)
          )
        : selfActive;
    const link =
      item.type === "external"
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active);

    const configDepth =
      $page.frontmatter.sidebarDepth ||
      sidebarDepth ||
      $themeLocaleConfig.sidebarDepth ||
      $themeConfig.sidebarDepth;

    const maxDepth = configDepth == null ? 1 : configDepth;

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    if (item.type === "auto") {
      return [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth)
      ];
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers);
      return [link, renderChildren(h, children, item.path, $route, maxDepth)];
    } else {
      return link;
    }
  }
};

function renderLink(h, to, text, active) {
  return h(
    "router-link",
    {
      props: {
        to,
        activeClass: "",
        exactActiveClass: ""
      },
      class: {
        active,
        "sidebar-link": true
      }
    },
    text
  );
}

function renderI(h, depth) {
  if (depth == 1) {
    return h("i", {
      class: {
        "side-nav__progress-bar": true
      }
    });
  }
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h(
    "ul",
    { class: `sidebar-sub-headers depth--${depth}` },
    children.map(c => {
      const active = isActive(route, path + "#" + c.slug);
      return h("li", { class: "sidebar-sub-header" }, [
        renderI(h, depth),
        renderLink(h, path + "#" + c.slug, c.title, active),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1)
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
        rel: "noopener noreferrer"
      },
      class: {
        "sidebar-link": true
      }
    },
    [text, h("OutboundLink")]
  );
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers
  // padding-left 1rem
  font-size 0.95em

.sidebar-sub-header
  position relative

.sidebar-group-items
  a
    border-left unset !important

a.sidebar-link
  font-size 18px
  font-weight 400
  display flex
  align-items center
  color #455A64
  border-left 0.25rem solid transparent
  padding 8px 16px
  line-height 1.4
  width: 100%
  box-sizing: border-box
  min-height 42px
  &:hover
    color #0D122A
    background-color #ECEFF1
  &.active
    font-weight 600
    color #0D122A
    border-left-color  #0D122A
  .sidebar-group &
    padding-left 40px
  .sidebar-sub-headers &
    padding-left 64px
  // .depth--2 &
  //   padding-left 72px

.sidebar-group
  .sidebar-link
    font-size 14px

.side-nav__progress-bar
    display: block
    position: absolute
    top: 0
    bottom: 0
    left: 50px
    width: 2px
    background: rgba(189,189,189,.4)
</style>
