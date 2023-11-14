<script setup lang="ts">
  import ArrowIcon from "../ArrowIcon.vue";

  interface ProductProps {
    title?: string;
    details?: string;
    image?: string;
    link?: {
      text?: string;
      href?: string;
      target?: string;
    };
  }

  interface Props {
    product: ProductProps;
  }

  const { product } = defineProps<Props>();
</script>

<template>
  <a :href="product.link.href" class="textLink">
    <div class="rounded-lg flex flex-col h-full bg-card">
      <img
        v-if="product.image"
        :src="product.image ? product.image : `https://place-hold.it/450x300/`"
        class="h-auto w-full rounded-tl-lg rounded-tr-lg"
      />
      <div
        class="grid grid-rows-[auto,_1fr,_auto] gap-4 p-6 h-full justify-between"
      >
        <p v-if="product.title" class="text-1 font-semibold">
          {{ product.title }}
        </p>
        <p v-if="product.details" class="text-2 text-sm">
          {{ product.details }}
        </p>
        <div v-if="product.link" class="flex gap-2 items-center text-sm">
          <span v-if="product.link.text">{{ product.link.text }}</span>
          <ArrowIcon />
        </div>
      </div>
    </div>
  </a>
</template>
