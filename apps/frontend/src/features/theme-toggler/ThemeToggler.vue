<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Button } from '@/shared/ui/button';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode({
  disableTransition: false
});

function toggleColorMode() {
  if (mode.value === 'light') {
    mode.value = 'dark';
  } else {
    mode.value = 'light';
  }
}
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleColorMode">
    <Icon v-if="mode === 'light'" icon="radix-icons:moon" />
    <Icon v-else="mode === 'dark'" icon="radix-icons:sun" />
  </Button>
</template>