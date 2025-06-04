<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { RadixIcon } from '@/shared/constants/icons';
import { Icon } from '@iconify/vue';
import { Button } from '@/shared/ui/button'
import { useSidebar } from './utils'

const props = defineProps<{
  icon: RadixIcon;
  class?: HTMLAttributes['class'],
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="props.class" 
    @click="toggleSidebar"
  >
    <Icon :icon />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
