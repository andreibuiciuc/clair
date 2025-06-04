<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { RadixIcon } from '@/shared/constants/icons';

interface Props {
  icon: RadixIcon;
  label: string;
}

defineProps<Props>();
</script>

<template>
  <div class="w-full flex items-center gap-2">
    <Icon :icon />
    <span>{{ label }}</span>
  </div>
</template>
