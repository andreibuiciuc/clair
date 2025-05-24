<script setup lang="ts">

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  
  if (!file) return;
   
  const worker = new Worker(new URL('../workers/reader.js', import.meta.url), { type: 'module' });

  worker.onmessage = (event) => {
    const { volumeBuffer, size, spacing } = event.data;
    console.log('volume data: ', volumeBuffer, size, spacing);
  };
  
  worker.postMessage(file);
}
</script>

<template>
  <div>
    <input type="file" @change="onFileChange" />
  </div>
</template>