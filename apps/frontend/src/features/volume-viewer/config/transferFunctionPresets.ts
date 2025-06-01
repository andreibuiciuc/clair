import type { DeepReadonly } from "vue";
import type { ColorTransferPreset, OpacityTransferPreset } from "../types";

// TODO: Research real world presets
const _defaultColorPreset: ColorTransferPreset = {
  encoding: 'rgb',
  points: [
    [0, 0, 0, 0],
    [40, 0.1, 0.1, 0.2],
    [100, 0.6, 0.6, 0.8],
    [180, 0.9, 0.9, 1.0],
    [255, 1, 1, 1]
  ]
};

// TODO: Research real world presets
const _defaultOpacityPreset: OpacityTransferPreset = {
  encoding: 'point',
  points: [
    [0, 0],
    [40, 0.1],
    [100, 0.6],
    [180, 0.9],
    [255, 1]
  ]
};

export const defaultColorPreset: DeepReadonly<typeof _defaultColorPreset> = _defaultColorPreset;
export const defaultOpacityPreset: DeepReadonly<typeof _defaultOpacityPreset> = _defaultOpacityPreset;
