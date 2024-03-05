import {RenderPass, RenderPassProps, NumberArray, RenderPassParameters} from '@luma.gl/core';
import {DummyDevice} from '../dummy-device';

export class DummyRenderPass extends RenderPass {
  readonly device: DummyDevice;

  constructor(device: DummyDevice, props: RenderPassProps) {
    super(device, props);
    this.device = device;
  }

  end(): void {}

  pushDebugGroup(groupLabel: string): void {}
  popDebugGroup(): void {}
  insertDebugMarker(markerLabel: string): void {}

  setParameters(parameters: RenderPassParameters = {}): void {}

  beginOcclusionQuery(queryIndex: number): void {}
  endOcclusionQuery(): void {}
}
