import type {Buffer, VertexArrayProps, TypedArray} from '@luma.gl/core';
import {VertexArray} from '@luma.gl/core';

import type {DummyDevice} from '../dummy-device';
import type {DummyBuffer} from './dummy-buffer';

export class DummyVertexArray extends VertexArray {
  override get [Symbol.toStringTag](): string {
    return 'VertexArray';
  }

  readonly device: DummyDevice;

  /** Attribute 0 buffer constant */
  private buffer: DummyBuffer | null = null;

  // Create a VertexArray
  constructor(device: DummyDevice, props: VertexArrayProps) {
    super(device, props);
    this.device = device;
  }

  override destroy(): void {
    super.destroy();
    if (this.buffer) {
      this.buffer?.destroy();
    }
  }

  setIndexBuffer(indexBuffer: Buffer | null): void {
    this.indexBuffer = indexBuffer;
  }

  /** Set a location in vertex attributes array to a buffer, enables the location, sets divisor */
  setBuffer(location: number, attributeBuffer: Buffer): void {
    const attributeInfo = this.attributeInfos[location];
    if (!attributeInfo) {
      throw new Error(`Unknown attribute location ${location}`);
    }
    this.attributes[location] = attributeBuffer;
  }

  bindBeforeRender(): void {}

  unbindAfterRender(): void {}

  setConstantWebGL(location: number, value: TypedArray | null): void {}
}
