import type {FramebufferProps} from '@luma.gl/core';
import {Framebuffer} from '@luma.gl/core';
import type {DummyDevice} from '../dummy-device';

export class DummyFramebuffer extends Framebuffer {
  device: DummyDevice;

  constructor(device: DummyDevice, props: FramebufferProps) {
    super(device, props);
    this.device = device;
  }
}
