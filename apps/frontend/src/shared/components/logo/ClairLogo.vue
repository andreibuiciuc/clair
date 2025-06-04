<script setup lang="ts">
import { Button } from '@/shared/ui/button';

interface Props {
  width?: string;
  height?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

withDefaults(defineProps<Props>(), {
  width: '1.5em',
  height: '1.5em',
  strokeColor: 'var(--color-primary)',
  strokeWidth: 12
});

</script>
<template>
   <Button variant="ghost" size="icon">
    <svg 
      :width
      :height 
      :stroke="strokeColor" 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="20" stroke="currentColor" :stroke-width fill="none" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" :stroke-width fill="none" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" :stroke-width fill="none" />
    </svg>
  </Button>
</template>