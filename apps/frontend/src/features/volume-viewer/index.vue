<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Sheet from './components/sheet/Sheet.vue';
import { ConfigurationPanel, ViewerCanvas } from './components/index'
import { SidebarProvider, SidebarTrigger } from '@/shared/ui/sidebar';

const volumeRenderX = useTemplateRef("volume-render-x");
const volumeRenderY = useTemplateRef("volume-render-y");
const volumeRenderZ = useTemplateRef("volume-render-z");
</script>

<template>
  <SidebarProvider>
    <ConfigurationPanel :vtk-containers="[volumeRenderX?.$el, volumeRenderY?.$el, volumeRenderZ?.$el]" />
    <ViewerCanvas>
    <div class="flex items-center justify-between gap-2 border-b shrink-0 w-full p-2 bg-sidebar">
      <div class="flex text-xs">
        <span>Workspace</span>
      </div>
      <SidebarTrigger icon="radix-icons:gear" />
    </div>
    <div class="p-4 flex flex-wrap gap-x-4 gap-y-4">
      <Sheet ref="volume-render-x" />
      <Sheet ref="volume-render-y" />
      <Sheet ref="volume-render-z" />
    </div>
    </ViewerCanvas>
  </SidebarProvider> 
</template>