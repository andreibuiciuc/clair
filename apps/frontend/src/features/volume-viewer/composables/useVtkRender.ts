import "@kitware/vtk.js/Rendering/Profiles/Geometry";
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/Rendering/Profiles/All';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeProperty from '@kitware/vtk.js/Rendering/Core/VolumeProperty';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkImageData from '@kitware/vtk.js/Common/DataModel/ImageData';
import vtkDataArray from '@kitware/vtk.js/Common/Core/DataArray';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import { colorTransferRegistry, opacityTransferRegistry } from "../config/transferFunctionRegistry";
import { defaultColorPreset, defaultOpacityPreset } from "../config/transferFunctionPresets";
import type { ColorPoint, ColorTransferOpts, OpacityPoint, OpacityTransferOpts, VolumeOpts } from "../types";
import type { VolumePayload } from "@/shared/types";

export function useVtkRender() {

  function getImageFromBuffer(buffer: ArrayBufferLike, dims: number[], spacing: number[]) {
    if (buffer.byteLength === 0) {
      throw new Error('Buffer must be a non-empty array.');
    }

    if (!Array.isArray(dims) || dims.length !== 3) {
      throw new Error('Size must be an array of three numbers.');
    }

    if (!Array.isArray(spacing) || spacing.length !== 3) {
      throw new Error('Spacing must be an array of three numbers.');
    }

    const imageData = vtkImageData.newInstance();
    imageData.setDimensions(dims);
    imageData.setSpacing(spacing);
    imageData.getPointData().setScalars(
      vtkDataArray.newInstance({
        numberOfComponents: 1,
        values: new Uint8Array(buffer),
      })
    );

    return imageData;
  }

  function getFallbackColorTransferFn() {
    const transferFn = vtkColorTransferFunction.newInstance();
    const { encoding, points } = defaultColorPreset;
    const pointApplicator = colorTransferRegistry[encoding];
    points.forEach(point => pointApplicator(transferFn, point as ColorPoint));
    return transferFn;
  }

  function getColorTransferFn(opts?: ColorTransferOpts): vtkColorTransferFunction {
    if (!opts) {
      return getFallbackColorTransferFn();
    }
    
    const transferFn = vtkColorTransferFunction.newInstance();
    const pointApplicator = colorTransferRegistry[opts.encoding];

    if (!pointApplicator) {
      throw new Error(`Unsupported color encoding: ${opts.encoding}`); 
    }

    if (!Array.isArray(opts.colorPoints) || opts.colorPoints.length === 0) {
      throw new Error('Color points must be a supported array of color points.');
    }

    opts.colorPoints.forEach(point => pointApplicator(transferFn, point));
    return transferFn;
  }

  function getFallbackOpacityTransferFn() {
    const opacityFn = vtkPiecewiseFunction.newInstance();
    const { encoding, points } = defaultOpacityPreset;
    const pointApplicator = opacityTransferRegistry[encoding];
    points.forEach(point => pointApplicator(opacityFn, point as OpacityPoint));
    return opacityFn;
  }

  function getOpacityTransferFn(opts?: OpacityTransferOpts): vtkPiecewiseFunction {
    if (!opts) {
      return getFallbackOpacityTransferFn();
    }

    const opacityFn = vtkPiecewiseFunction.newInstance();
    const pointApplicator = opacityTransferRegistry[opts.encoding];

    if (!pointApplicator) {
      throw new Error(`Unsupported opacity encoding: ${opts.encoding}`);
    }

    if (!Array.isArray(opts.opacityPoints) || opts.opacityPoints.length === 0) {
      throw new Error('Opacity points must be a supported array of opacity points.');
    }

    opts.opacityPoints.forEach(point => pointApplicator(opacityFn, point));
    return opacityFn;
  }

  function getVolume(payload: VolumePayload, opts?: VolumeOpts) {
    const volumeProperty = vtkVolumeProperty.newInstance();
    
    const imageData = getImageFromBuffer(payload.buffer, payload.dims, payload.spacing);
    const colorTransferFunction = getColorTransferFn(opts?.colorTransferOpts);
    const opacityFunction = getOpacityTransferFn(opts?.opacityTransferFn);
    
    volumeProperty.setRGBTransferFunction(0, colorTransferFunction);
    volumeProperty.setScalarOpacity(0, opacityFunction);
    volumeProperty.setInterpolationTypeToLinear();
    volumeProperty.setShade(true);
    volumeProperty.setAmbient(0.1);
    volumeProperty.setDiffuse(0.9);
    volumeProperty.setSpecular(0.2);

    const mapper = vtkVolumeMapper.newInstance();
    mapper.setInputData(imageData);
    mapper.setBlendModeToComposite();

    const volume = vtkVolume.newInstance();
    volume.setMapper(mapper);
    volume.setProperty(volumeProperty);

    return volume;
  }

  function renderVolume(container: HTMLElement, payload: VolumePayload, options?: VolumeOpts) {
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
      container: container,
      background: [0, 0, 0]
    });

    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();
    const volume = getVolume(payload, options);

    renderer.resetCameraClippingRange();
    renderer.addVolume(volume);
    renderer.resetCamera();
    renderWindow.render();
  }

  return {
    renderVolume
  }
};