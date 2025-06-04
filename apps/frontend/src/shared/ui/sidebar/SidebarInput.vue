<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/shared/utils'
import { Input } from '@/shared/ui/input'
import type { InputHTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'],
  type?: InputHTMLAttributes['type']
}>()
</script>

<template>
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    :class="cn(
      'bg-background h-8 w-full shadow-none',
      props.class,
    )"
    :type
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot />
  </Input>
</template>
