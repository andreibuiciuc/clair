<script setup lang="ts">
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarRail,
  SidebarInput,
} from '@/shared/ui/sidebar';
import { ThemeToggler, useTheme } from "@/shared/components/theme-toggler";
import { useVtkRender } from '../../composables/useVtkRender';
import type { VolumePayload } from '@/shared/types';
import { ARCHIVE } from '@/shared/constants/icons';
import PanelLabel from './PanelLabel.vue';
import ClairLogo from "@/shared/components/logo/ClairLogo.vue"

const props = defineProps<{
  vtkContainers: (HTMLDivElement | undefined)[]
}>();

const { colorMode } = useTheme();
const vtkRenderer = useVtkRender();

function onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (!file) {
      return;
    }

    const worker = new Worker(new URL('../../../../workers/reader.js', import.meta.url), { type: 'module' });
    worker.onmessage = (event: MessageEvent<VolumePayload>) => {
      if (!props.vtkContainers || props.vtkContainers.length === 0) {
        return;
      }

      props.vtkContainers.forEach(container => {
        if (container) {
          vtkRenderer.renderVolume(
            container,
            event.data,
            {
              background: colorMode.value === 'dark' ? [0, 0, 0] : [1, 1, 1],
            }
          );
        }
      })
    };

    worker.postMessage(file);
  }
</script>

<template>
  <Sidebar side="right">
    <SidebarHeader>
      <div class="flex justify-between">
        <div class="flex items-center gap-y-2">
          <ClairLogo />
          <div class="flex flex-col gap-0.5 leading-none text-xs">
            <span class="font-semibold">clair</span>
          </div>
        </div>
        <ThemeToggler />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>
         <PanelLabel :icon="ARCHIVE" label="Data source" />
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <input type="file" @change="onFileChange" />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
</template>
