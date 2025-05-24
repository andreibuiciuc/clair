import { readImage } from '@itk-wasm/image-io';

self.onmessage = async function (event: MessageEvent<File>) {
  try {
    const { image } = await readImage(event.data);
  
    if (!image.data) {
      return;
    }
  
    const volumeBuffer = image.data.buffer;
    const size = image.size;
    const spacing = image.spacing;
  
    console.log('worker - reader: image read successfully, posting to main thread ...');
    self.postMessage({
      volumeBuffer,
      size,
      spacing,
    }, [volumeBuffer]);
  } catch (error) {
    console.error('error', error);
  }
} 