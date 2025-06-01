import { readImage } from '@itk-wasm/image-io';
import type { FloatTypes, IntTypes } from "itk-wasm";

function castToTypedArray(buffer: ArrayBufferLike, componentType: typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes]): ArrayBufferView | null {
  switch (componentType) {
    case "uint8": return new Uint8Array(buffer);
    case "int8": return new Int8Array(buffer);
    case "uint16": return new Uint16Array(buffer);
    case "int16": return new Int16Array(buffer);
    case "uint32": return new Uint32Array(buffer);
    case "int32": return new Int32Array(buffer);
    case "uint64": return new BigUint64Array(buffer);
    case "int64": return new BigInt64Array(buffer);
    case "float32": return new Float32Array(buffer);
    case "float64": return new Float64Array(buffer);
    default: return null;
  }
}

self.onmessage = async function (event: MessageEvent<File>) {
  try {
    const { image } = await readImage(event.data);
    if (!image.data) {
      postMessage({ error: 'No image data found' });
      return;
    }
    
    const { data, size, spacing, imageType } = image;
    const typedArray = castToTypedArray(data.buffer, imageType.componentType);
    if (!typedArray) {
      postMessage({ error: "Unsupported component type" });
      return;
    }

    postMessage({
      buffer: typedArray.buffer,
      dims: size,
      spacing: spacing,
      componentType: imageType.componentType,
    }, [typedArray.buffer]);

  } catch (error) {
    console.error('error', error);
  }
} 