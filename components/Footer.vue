<script setup lang="ts">
import PupilLogo from "./PupilLogo.vue";
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="container grid gap-20 px-6 my-8 mx-auto">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <a
        href="https://docs.pupil-labs.com"
        :style="{ color: 'var(--vp-c-text-1)' }"
        ><PupilLogo />
      </a>
      <div class="text-sm">
        <div>info@pupil-labs.com</div>
        <div>
          Copyright {{ currentYear }} Pupil Labs GmbH. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>
