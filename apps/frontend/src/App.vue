<script setup lang="ts">
import { useRoute } from 'vue-router';
import ClairLogo from './shared/components/logo/ClairLogo.vue';
import ThemeToggler from '@/shared/components/theme-toggler/ThemeToggler.vue';

const route = useRoute();
</script>

<template>
  <header class="bg-background sticky top-0 z-50 w-full">
    <div class="px-4 py-2" v-if="route.name === 'home'">
      <div class="flex items-center gap-2">
        <ClairLogo />
        <div class="ml-auto flex items-center gap-2 justify-end">
          <ThemeToggler />
        </div>
      </div>
    </div>
  </header>
  <main class="flex flex-1 flex-col">
    <RouterView />
  </main>
</template>
