import type {UniformValue, RenderPipelineProps, ShaderLayout, Binding} from '@luma.gl/core';
import type {RenderPass, VertexArray} from '@luma.gl/core';
import {RenderPipeline, cast, assert} from '@luma.gl/core';

import type {DummyDevice} from '../dummy-device';
import {DummyShader} from './dummy-shader';

/** Creates a new render pipeline */
export class DummyRenderPipeline extends RenderPipeline {
  device: DummyDevice;
  vs: DummyShader;
  fs: DummyShader;

  shaderLayout: ShaderLayout;
  uniforms: Record<string, UniformValue> = {};
  bindings: Record<string, Binding> = {};

  constructor(device: DummyDevice, props: RenderPipelineProps) {
    super(device, props);
    this.device = device;

    this.vs = cast<DummyShader>(props.vs);
    this.fs = cast<DummyShader>(props.fs);

    this.shaderLayout = props.shaderLayout || {
      attributes: [],
      bindings: [],
      uniforms: []
    };
  }

  setBindings(bindings: Record<string, Binding>): void {
    for (const [name, value] of Object.entries(bindings)) {
      this.bindings[name] = value;
    }
  }

  setUniformsWebGL(uniforms: Record<string, UniformValue>): void {
    Object.assign(this.uniforms, uniforms);
  }

  draw(options: {
    renderPass: RenderPass;
    /** vertex attributes */
    vertexArray: VertexArray;
    vertexCount?: number;
    indexCount?: number;
    instanceCount?: number;
    firstVertex?: number;
    firstIndex?: number;
    firstInstance?: number;
    baseVertex?: number;
  }): boolean {
    const {renderPass, vertexArray, vertexCount = 0, instanceCount = 0} = options;

    const isIndexed: boolean = Boolean(vertexArray.indexBuffer);
    const isInstanced: boolean = Number(instanceCount) > 0;

    vertexArray.bindBeforeRender(renderPass);

    // TODO - verify buffer size

    vertexArray.unbindAfterRender(renderPass);

    return true;
  }
}
