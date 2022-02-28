<template>
  <section
    v-if="collapsable"
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
  >
    <router-link
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'"
      ></span>
      <span>{{ item.title }}</span>
    </router-link>

    <a
      v-else
      class="sidebar-heading sidebar-link"
      :class="{ open, 'heading-active': groupHeadActive() }"
      :style="collapsable ? 'gap:16px;' : ''"
      @click="$emit('toggle')"
    >
      <span
        v-if="collapsable"
        class="arrow"
        :class="open ? 'down' : 'right'"
      ></span>
      <span> {{ item.title }} </span>
    </a>

    <DropdownTransition>
      <SidebarLinks
        class="sidebar-group-items"
        :items="item.children"
        v-if="open || !collapsable"
        :sidebarDepth="item.sidebarDepth"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </section>
  <SidebarLink
    v-else
    :sidebarDepth="item.sidebarDepth"
    :items="item"
    @click.native="$emit('toggle')"
  />
</template>

<script>
import { isActive } from "../util";
import DropdownTransition from "@theme/components/DropdownTransition.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";

export default {
  name: "SidebarGroup",
  props: ["item", "open", "collapsable", "depth"],
  components: { DropdownTransition, SidebarLink },
  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks =
      require("./SidebarLinks.vue").default;
  },
  methods: {
    isActive,
    groupHeadActive() {
      let title = this.item.title.toLowerCase();
      let subroute = this.$page.path
        .split("/")
        .slice(2, 3)
        .pop()
        .split("-")
        .join(" ");
      if (subroute == title) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="stylus">
.page-active > .depth-0 > .sidebar-heading {
  background-color: #E8F0FE;
  border-radius: 4px;

  .arrow {
    border-top-color: #1263CC;
  }

  span {
    color: #1263CC;
  }
}

.sidebar-group {
  &.uncollapsable {
    a.sidebar-link {
      padding-left: 40px;
    }
  }

  .sidebar-group {
    padding-left: 0.5em;
  }

  &:not(.collapsable) {
    .sidebar-heading:not(.clickable) {
      cursor: auto;
      color: inherit;
    }
  }

  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      font-size: 12px;
      line-height: 1.4;
      font-weight: normal;
      padding-left: 16px;
      // &:not(.clickable)
      // opacity 0.5
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 12px;
        border-left: none;
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}

.sidebar-heading {
  color: $textColor;
  transition: color 0.15s ease;
  cursor: pointer;
  // text-transform uppercase
  // padding 8px 16px !important
  width: 100%;
  box-sizing: border-box;
  margin: 0;

  &.open, &:hover {
    // color inherit
  }

  &.clickable {
    &.active {
      font-weight: 600;
      color: $accentColor;
      border-left-color: $accentColor;
    }

    &:hover {
      color: $accentColor;
    }
  }

  &.active {
    font-weight: 600;
  }
}

.sidebar-group-items {
  transition: height 0.1s ease-out;
  font-size: 0.95em;
  overflow: hidden;
}
</style>
