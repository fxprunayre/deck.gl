import {Sampler, SamplerProps} from '@luma.gl/core';
import type {DummyDevice} from '../dummy-device';

/**
 * Sampler object -
 * so that they can be set directly on the texture
 * https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/sampler_object.html
 */
export class DummySampler extends Sampler {
  readonly device: DummyDevice;

  constructor(device: DummyDevice, props: SamplerProps) {
    super(device, props);
    this.device = device;
  }
}
