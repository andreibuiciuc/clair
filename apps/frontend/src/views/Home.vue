<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useVtkRender } from '@/features/volume-viewer/composables/useVtkRender';
import type { VolumePayload } from '@/shared/types';

const vtkRenderer = useVtkRender();
const vtkContainer: Ref<HTMLDivElement | null> = ref(null);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  
  if (!file) {
    return;
  }

  const worker = new Worker(new URL('../workers/reader.js', import.meta.url), { type: 'module' });
  worker.onmessage = (event: MessageEvent<VolumePayload>) => {
    if (!vtkContainer.value) {
      return;
    }
    vtkRenderer.renderVolume(
      vtkContainer.value,
      event.data,
    );
  };

  worker.postMessage(file);
}
</script>

<template>
  <input type="file" @change="onFileChange" />
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin-inline: auto;">
    <div ref="vtkContainer" style="width: 512px; height: 512px;"></div>
  </div>
</template>