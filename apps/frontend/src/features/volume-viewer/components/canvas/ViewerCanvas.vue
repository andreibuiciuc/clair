<script setup lang="ts">
import { useSidebar } from '@/shared/ui/sidebar';

const { state } = useSidebar();
</script>

<template>
  <div class="w-full h-full">
    <div 
      class="flex flex-col justify-center items-center transition-all duration-300"
      :style="{ width: state === 'expanded' ? 'calc(100% - var(--sidebar-width))' : '100%' }"
    >
      <slot />
    </div>
  </div>
</template>