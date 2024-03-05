import type {PrimitiveTopology, ShaderLayout, TransformFeedbackProps} from '@luma.gl/core';
import {TransformFeedback, Buffer, BufferRange} from '@luma.gl/core';
import type {DummyDevice} from '../dummy-device';
import {DummyBuffer} from './dummy-buffer';

export class DummyTransformFeedback extends TransformFeedback {
  readonly device: DummyDevice;

  readonly layout: ShaderLayout;
  buffers: Record<string, BufferRange> = {};

  constructor(device: DummyDevice, props: TransformFeedbackProps) {
    super(device, props);
    this.device = device;
    this.layout = this.props.layout;

    if (props.buffers) {
      this.setBuffers(props.buffers);
    }

    Object.seal(this);
  }

  begin(topology: PrimitiveTopology = 'point-list'): void {}

  end(): void {}

  setBuffers(buffers: Record<string, Buffer | BufferRange>): void {
    this.buffers = {};

    for (const bufferName in buffers) {
      this.setBuffer(bufferName, buffers[bufferName]);
    }
  }

  setBuffer(locationOrName: string | number, bufferOrRange: Buffer | BufferRange): void {
    if (bufferOrRange instanceof DummyBuffer) {
      this.buffers[locationOrName] = {
        buffer: bufferOrRange,
        byteOffset: 0,
        byteLength: bufferOrRange.byteLength
      };
    } else {
      this.buffers[locationOrName] = bufferOrRange as BufferRange;
    }
  }

  getBuffer(locationOrName: string | number): Buffer | BufferRange | null {
    return this.buffers[locationOrName] || null;
  }
}
