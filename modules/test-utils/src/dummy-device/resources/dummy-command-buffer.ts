import {CommandEncoder, CommandEncoderProps} from '@luma.gl/core';
import type {
  CopyBufferToBufferOptions,
  CopyBufferToTextureOptions,
  CopyTextureToBufferOptions,
  CopyTextureToTextureOptions,
  QuerySet,
  Buffer
} from '@luma.gl/core';
import type {DummyDevice} from '../dummy-device';

export class DummyCommandEncoder extends CommandEncoder {
  device: DummyDevice;

  constructor(device: DummyDevice, props: CommandEncoderProps) {
    super(device, props);
    this.device = device;
  }

  finish(): void {}

  copyBufferToBuffer(options: CopyBufferToBufferOptions): void {}

  copyBufferToTexture(options: CopyBufferToTextureOptions) {}

  copyTextureToBuffer(options: CopyTextureToBufferOptions): void {}

  copyTextureToTexture(options: CopyTextureToTextureOptions): void {}

  pushDebugGroup(groupLabel: string): void {}
  popDebugGroup() {}

  insertDebugMarker(markerLabel: string): void {}
  resolveQuerySet(querySet: QuerySet): void {}
}
