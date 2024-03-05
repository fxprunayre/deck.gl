import type {
  DeviceProps,
  DeviceInfo,
  CanvasContextProps,
  TextureFormat,
  VertexArray,
  VertexArrayProps
} from '@luma.gl/core';
import {Device, CanvasContext, log, uid, DeviceFeatures} from '@luma.gl/core';

// WebGL classes
import type {
  BufferProps,
  ShaderProps,
  // Sampler,
  SamplerProps,
  TextureProps,
  ExternalTexture,
  ExternalTextureProps,
  FramebufferProps,
  // RenderPipeline,
  RenderPipelineProps,
  ComputePipeline,
  ComputePipelineProps,
  // RenderPass,
  RenderPassProps,
  ComputePass,
  ComputePassProps,
  // CommandEncoder,
  CommandEncoderProps,
  TransformFeedbackProps,
  QuerySetProps
} from '@luma.gl/core';

import {DummyDeviceLimits} from './dummy-device-features';
import {DummyCanvasContext} from './dummy-canvas-context';
import {DummyBuffer} from './resources/dummy-buffer';
import {DummyFramebuffer} from './resources/dummy-framebuffer';
import {DummyShader} from './resources/dummy-shader';
import {DummyCommandEncoder} from './resources/dummy-command-buffer';
import {DummySampler} from './resources/dummy-sampler';
import {DummyTexture} from './resources/dummy-texture';
import {DummyRenderPass} from './resources/dummy-render-pass';
import {DummyRenderPipeline} from './resources/dummy-render-pipeline';
import {DummyVertexArray} from './resources/dummy-vertex-array';
import {DummyTransformFeedback} from './resources/dummy-transform-feedback';
import {DummyQuerySet} from './resources/dummy-query-set';

const LOG_LEVEL = 1;

/** WebGPU style Device API for a WebGL context */
export class DummyDevice extends Device {
  //
  // Public `Device` API
  //

  static type: string = 'webgl';

  static isSupported(): boolean {
    return true;
  }

  features: DeviceFeatures = new DeviceFeatures();
  limits: DummyDeviceLimits = new DummyDeviceLimits();

  readonly info: DeviceInfo = {
    type: 'webgl',
    gpu: 'software',
    gpuType: 'unknown',
    gpuBackend: 'unknown',
    vendor: '',
    renderer: '',
    version: '1.0',
    shadingLanguage: 'glsl',
    shadingLanguageVersion: 300
  };
  readonly canvasContext: DummyCanvasContext;
  readonly lost: Promise<{reason: 'destroyed'; message: string}>;

  static async create(props: DeviceProps = {}): Promise<DummyDevice> {
    // Wait for page to load: if canvas is a string we need to query the DOM for the canvas element.
    // We only wait when props.canvas is string to avoids setting the global page onload callback unless necessary.
    if (typeof props.canvas === 'string') {
      await CanvasContext.pageLoaded;
      log.probe(LOG_LEVEL + 1, 'DOM is loaded')();
    }

    return new DummyDevice(props);
  }

  constructor(props: DeviceProps) {
    super({...props, id: props.id || uid('dummy-device')});

    this.canvasContext = new DummyCanvasContext(this, props);
    this.lost = new Promise(resolve => {});
    this.canvasContext.resize();
  }

  /**
   * Destroys the context
   * @note Has no effect for WebGL browser contexts, there is no browser API for destroying contexts
   */
  destroy(): void {}

  get isLost(): boolean {
    return false;
  }

  getSize(): [number, number] {
    return [this.canvasContext.width, this.canvasContext.height];
  }

  isTextureFormatSupported(format: TextureFormat): boolean {
    return true;
  }

  isTextureFormatFilterable(format: TextureFormat): boolean {
    return true;
  }

  isTextureFormatRenderable(format: TextureFormat): boolean {
    return true;
  }

  // IMPLEMENTATION OF ABSTRACT DEVICE

  createCanvasContext(props: CanvasContextProps): DummyCanvasContext {
    return new DummyCanvasContext(this, props);
  }

  createBuffer(props: BufferProps | ArrayBuffer | ArrayBufferView): DummyBuffer {
    const newProps = this._getBufferProps(props);
    return new DummyBuffer(this, newProps);
  }

  getDefaultRenderPass(): DummyRenderPass {
    return new DummyRenderPass(this, {});
  }

  _createTexture(props: TextureProps): DummyTexture {
    return new DummyTexture(this, props);
  }

  createExternalTexture(props: ExternalTextureProps): ExternalTexture {
    throw new Error('createExternalTexture() not implemented'); // return new Program(props);
  }

  createSampler(props: SamplerProps): DummySampler {
    return new DummySampler(this, props);
  }

  createShader(props: ShaderProps): DummyShader {
    return new DummyShader(this, props);
  }

  createFramebuffer(props: FramebufferProps): DummyFramebuffer {
    return new DummyFramebuffer(this, props);
  }

  createVertexArray(props: VertexArrayProps): VertexArray {
    return new DummyVertexArray(this, props);
  }

  createTransformFeedback(props: TransformFeedbackProps): DummyTransformFeedback {
    return new DummyTransformFeedback(this, props);
  }

  createQuerySet(props: QuerySetProps): DummyQuerySet {
    return new DummyQuerySet(this, props);
  }

  createRenderPipeline(props: RenderPipelineProps): DummyRenderPipeline {
    return new DummyRenderPipeline(this, props);
  }

  beginRenderPass(props: RenderPassProps): DummyRenderPass {
    return new DummyRenderPass(this, props);
  }

  createComputePipeline(props?: ComputePipelineProps): ComputePipeline {
    throw new Error('ComputePipeline not supported in WebGL');
  }

  beginComputePass(props: ComputePassProps): ComputePass {
    throw new Error('ComputePass not supported in WebGL');
  }

  createCommandEncoder(props: CommandEncoderProps = {}): DummyCommandEncoder {
    return new DummyCommandEncoder(this, props);
  }

  submit(): void {}

  setParametersWebGL(parameters: any): void {}

  getParametersWebGL(parameters: any): any {}

  withParametersWebGL(parameters: any, func: any): any {
    const {nocatch = true} = parameters;
    let value: any;
    if (nocatch) {
      // Avoid try catch to minimize stack size impact for safe execution paths
      return func();
    }
    // Wrap in a try-catch to ensure that parameters are restored on exceptions
    try {
      value = func();
    } catch {
      // ignore
    }
    return value;
  }
}
