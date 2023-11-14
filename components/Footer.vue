<script setup lang="ts">
  import PupilLogo from "./PupilLogo.vue";
</script>

<template>
  <div class="container grid gap-20 px-6 my-8 mx-auto">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <a href="https://docs-staging.pupil-labs.com" style="color(--vp-c-text-1)"
        ><PupilLogo />
      </a>
      <div class="text-sm">
        <div>info@pupil-labs.com</div>
        <div>Copyright 2023 Pupil Labs GmbH. All rights reserved.</div>
      </div>
    </div>
  </div>
</template>
