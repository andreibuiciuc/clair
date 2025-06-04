<script lang="ts" setup>
import { cn } from '@/shared/utils';
import type { HTMLAttributes } from 'vue';
import { sheetVariants, type SheetVariants } from './index';

interface Props {
  size?: SheetVariants['size']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>();
</script>

<template>
  <div
    :class="cn(sheetVariants({ size }))">
    <slot />
  </div>
</template>