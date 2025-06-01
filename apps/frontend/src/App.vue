<script setup lang="ts">
import { Button } from '@/shared/ui/button';
import { useColorMode } from '@vueuse/core';
import ThemeToggler from '@/features/theme-toggler/ThemeToggler.vue';

const mode = useColorMode({
  disableTransition: false
});

function toggleThemeMode() {
  if (mode.value === 'light') {
    mode.value = 'dark';
  } else {
    mode.value = 'light';
  }
}
</script>

<template>
  <header class="bg-background sticky top-0 z-50 w-full">
    <div class="px-4 py-2">
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <svg width="1.5em" height="1.5em" stroke="var(--color-primary)" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="20" stroke="currentColor" stroke-width="12" fill="none" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" stroke-width="12" fill="none" />
            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="12" fill="none" />
          </svg>
        </Button>
        <div class="ml-auto flex items-center gap-2 justify-end">
          <ThemeToggler />
        </div>
      </div>
    </div>
  </header>
  <main class="flex flex-1 flex-col">
    <!-- <RouterView /> -->
  </main>
</template>