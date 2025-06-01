import type { DeepReadonly } from "vue";
import type { ColorTransferRegistry, HsvColorPoint, OpacityTransferRegistry, RgbColorPoint } from "../types";

const _colorTransferRegistry: ColorTransferRegistry = {
  rgb: (fn, point) => fn.addRGBPoint(...point as RgbColorPoint),
  hsv: (fn, point) => fn.addHSVPoint(...point as HsvColorPoint),
} as const;

const _opacityTransferRegistry: OpacityTransferRegistry = {
  point: (fn, point) => fn.addPoint(...point),
} as const;

export const colorTransferRegistry: DeepReadonly<typeof _colorTransferRegistry> = _colorTransferRegistry;
export const opacityTransferRegistry: DeepReadonly<typeof _opacityTransferRegistry> = _opacityTransferRegistry;
