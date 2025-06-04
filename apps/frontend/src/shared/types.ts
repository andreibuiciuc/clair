import type { FloatTypes, IntTypes } from "itk-wasm";

export type ColorMode = 'light' | 'dark';

export type VolumePayload = {
  buffer: ArrayBufferLike;
  dims: number[];
  spacing: number[];
  componentType: VtkComponentType;
}

export type VtkComponentType = 
  | typeof IntTypes[keyof typeof IntTypes] 
  | typeof FloatTypes[keyof typeof FloatTypes]
