import type {BufferProps} from '@luma.gl/core';
import {Buffer, assert} from '@luma.gl/core';
import type {DummyDevice} from '../dummy-device';

export class DummyBuffer extends Buffer {
  device: DummyDevice;

  /** Number of bytes allocated on the GPU for this buffer */
  byteLength: number;
  /** Number of bytes used */
  bytesUsed: number;

  constructor(device: DummyDevice, props: BufferProps = {}) {
    super(device, props);
    this.device = device;

    const byteOffset = props.byteOffset || 0;
    const byteLength = props.byteLength ?? (props.data ? props.data.byteLength + byteOffset : 0);

    assert(byteLength >= 0);

    this.bytesUsed = byteLength;
    this.byteLength = byteLength;
    this.trackAllocatedMemory(byteLength);
  }

  destroy(): void {
    if (!this.destroyed) {
      super.destroy();
      this.trackDeallocatedMemory();
    }
  }

  async readAsync(byteOffset = 0, byteLength?: number): Promise<Uint8Array> {
    byteLength = byteLength ?? this.byteLength - byteOffset;
    return new Uint8Array(byteLength);
  }

  write(data: ArrayBufferView, byteOffset: number = 0): void {
    assert(data.byteLength + byteOffset <= this.byteLength);
  }
}
