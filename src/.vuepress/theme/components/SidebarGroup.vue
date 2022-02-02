<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0
      },
      `depth-${depth}`
    ]"
  >
    <router-link
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        'active': isActive($route, item.path)
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span class="arrow" v-if="collapsable" :class="open ? 'down' : 'right'"></span>
    </router-link>

    <a
      v-else
      class="sidebar-heading sidebar-link justify-space-between"
      :class="{ open, 'heading-active': groupHeadActive() }"
      @click="$emit('toggle')"
    >
      {{ item.title }}
      <span class="arrow" v-if="collapsable" :class="open ? 'down' : 'right'"></span>
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
</template>

<script>
import { isActive } from "../util";
import DropdownTransition from "@theme/components/DropdownTransition.vue";

export default {
  name: "SidebarGroup",
  props: ["item", "open", "collapsable", "depth"],
  components: { DropdownTransition },
  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require("./SidebarLinks.vue").default;
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
    }
  }
};
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 12px
      line-height 1.4
      font-weight normal
      padding-left 32px
      // &:not(.clickable)
      //   opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link
        font-size: 12px
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  // text-transform uppercase
  // padding 8px 16px !important
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  &.open, &:hover
    // color inherit
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
    &:hover
      color $accentColor
  &.active
    font-weight 600

.sidebar-group-items
  transition height .1s ease-out
  font-size 0.95em
  overflow hidden
</style>
