import type vtkPiecewiseFunction from "@kitware/vtk.js/Common/DataModel/PiecewiseFunction";
import type vtkColorTransferFunction from "@kitware/vtk.js/Rendering/Core/ColorTransferFunction";

export type RgbColorPoint = [x: number, r: number, g: number, b: number];
export type HsvColorPoint = [x: number, h: number, s: number, v: number];
export type ColorPoint = RgbColorPoint | HsvColorPoint;

export type OpacityPoint = [number, number];

export type ColorEncoding = 'rgb' | 'hsv';
export type OpacityEncoding = 'point';

export type ColorTransferOpts = {
  encoding: ColorEncoding;
  colorPoints: ColorPoint[];
}

export type OpacityTransferOpts = {
  encoding: OpacityEncoding;
  opacityPoints: OpacityPoint[];
}

export type ColorTransferPreset = {
  encoding: ColorEncoding;
  points: ColorPoint[];
}

export type OpacityTransferPreset = {
  encoding: OpacityEncoding;
  points: OpacityPoint[];
}

export type VolumeOpts = {
  background?: [number, number, number];
  colorTransferOpts?: ColorTransferOpts;
  opacityTransferFn?: OpacityTransferOpts;
}

export type TransferFunctionApplicator<TFunc, TPoint, TResult> = (fn: TFunc, point: TPoint) => TResult;
export type TransferFunctionRegistry<TKey extends string, TransferFunctionApplicator> = Record<TKey, TransferFunctionApplicator>;

export type ColorTransferRegistry = TransferFunctionRegistry<ColorEncoding, TransferFunctionApplicator<vtkColorTransferFunction, ColorPoint, number>>;
export type OpacityTransferRegistry = TransferFunctionRegistry<OpacityEncoding, TransferFunctionApplicator<vtkPiecewiseFunction, OpacityPoint, void>>;
