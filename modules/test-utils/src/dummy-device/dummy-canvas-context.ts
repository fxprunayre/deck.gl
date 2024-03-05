import type {CanvasContextProps} from '@luma.gl/core';
import {CanvasContext} from '@luma.gl/core';
import type {DummyDevice} from './dummy-device';
import {DummyFramebuffer} from './resources/dummy-framebuffer';

/**
 * A WebGL Canvas Context which manages the canvas and handles drawing buffer resizing etc
 */
export class DummyCanvasContext extends CanvasContext {
  readonly device: DummyDevice;
  presentationSize: [number, number];
  private _framebuffer: DummyFramebuffer | null = null;

  constructor(device: DummyDevice, props: CanvasContextProps) {
    // Note: Base class creates / looks up the canvas (unless under Node.js)
    super(props);
    this.device = device;
    this.presentationSize = [-1, -1];
    this._setAutoCreatedCanvasId(`${this.device.id}-canvas`);
    this.update();
  }

  getCurrentFramebuffer(): DummyFramebuffer {
    this.update();
    // Setting handle to null returns a reference to the default framebuffer
    this._framebuffer = this._framebuffer || new DummyFramebuffer(this.device, {handle: null});
    return this._framebuffer;
  }

  /** Resizes and updates render targets if necessary */
  update() {
    const size = this.getPixelSize();
    const sizeChanged =
      size[0] !== this.presentationSize[0] || size[1] !== this.presentationSize[1];
    if (sizeChanged) {
      this.presentationSize = size;
      this.resize();
    }
  }

  resize(options?: {width?: number; height?: number; useDevicePixels?: boolean | number}): void {
    if (this.canvas) {
      const devicePixelRatio = this.getDevicePixelRatio(options?.useDevicePixels);
      this.setDevicePixelRatio(devicePixelRatio, options);
      return;
    }
  }

  getDrawingBufferSize(): [number, number] {
    return [this.width, this.height];
  }

  commit() {}
}
