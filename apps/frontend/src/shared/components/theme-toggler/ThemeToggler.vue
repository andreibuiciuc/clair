<script setup lang="ts">
import { useTheme} from './index';
import { Icon } from "@iconify/vue";
import { Button } from "@/shared/ui/button";

const { colorMode, toggleColorMode } = useTheme();
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleColorMode">
    <Icon v-if="colorMode === 'light'" icon="radix-icons:moon" />
    <Icon v-else="colorMode === 'dark'" icon="radix-icons:sun" />
  </Button>
</template>