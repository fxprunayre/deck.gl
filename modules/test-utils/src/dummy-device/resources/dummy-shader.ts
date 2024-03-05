import {Shader, ShaderProps, CompilerMessage} from '@luma.gl/core';
import {DummyDevice} from '../dummy-device';

/**
 * An immutable compiled shader program that execute portions of the GPU Pipeline
 */
export class DummyShader extends Shader {
  readonly device: DummyDevice;
  stage: 'vertex' | 'fragment' | 'compute';
  source: string;

  constructor(device: DummyDevice, props: ShaderProps) {
    super(device, props);
    this.device = device;
    this.stage = props.stage;
    this.source = props.source;
  }

  async getCompilationInfo(): Promise<readonly CompilerMessage[]> {
    return [];
  }
}
