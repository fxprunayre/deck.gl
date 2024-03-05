import {TextureProps, Sampler, SamplerProps, SamplerParameters} from '@luma.gl/core';
import {Texture, assert, loadImage} from '@luma.gl/core';
import {DummyDevice} from '../dummy-device';
import {DummySampler} from './dummy-sampler';
import {DummyTextureView} from './dummy-texture-view';

export class DummyTexture extends Texture<TextureProps> {
  readonly device: DummyDevice;

  sampler!: DummySampler;
  view!: DummyTextureView;

  constructor(device: DummyDevice, props: TextureProps) {
    super(device, props);

    this.device = device;

    // Signature: new Texture2D(gl, {data: url})
    if (typeof this.props?.data === 'string') {
      Object.assign(this.props, {data: loadImage(this.props.data)});
    }

    this.initialize(this.props);

    Object.seal(this);
  }

  override destroy(): void {
    if (!this.destroyed) {
      super.destroy();
      this.trackDeallocatedMemory('Texture');
    }
  }

  override toString(): string {
    return `Texture(${this.id},${this.width}x${this.height})`;
  }

  initialize(props: TextureProps = {}): this {
    const data = props.data;

    if (data instanceof Promise) {
      data.then(resolvedImageData =>
        this.initialize(
          Object.assign({}, props, {
            pixels: resolvedImageData,
            data: resolvedImageData
          })
        )
      );
      return this;
    }

    this.setImageData(props);

    this.setSampler(props.sampler);

    this.view = new DummyTextureView(this.device, {
      ...props,
      texture: this,
      mipLevelCount: 1,
      arrayLayerCount: 1
    });

    return this;
  }

  setSampler(sampler: Sampler | SamplerProps = {}): this {
    if (sampler instanceof DummySampler) {
      this.sampler = sampler;
    } else {
      this.sampler = new DummySampler(this.device, sampler);
    }

    return this;
  }

  resize(options: {height: number; width: number; mipmaps?: boolean}): this {
    const {height, width, mipmaps = false} = options;
    if (width !== this.width || height !== this.height) {
      return this.initialize({
        width,
        height,
        mipmaps
      });
    }
    return this;
  }

  setImageData(options: {data?: any; width?: number; height?: number}) {
    this.trackDeallocatedMemory('Texture');

    const {data} = options;

    if (data && data.byteLength) {
      this.trackAllocatedMemory(data.byteLength, 'Texture');
    } else {
      const bytesPerPixel = 4;
      this.trackAllocatedMemory(this.width * this.height * bytesPerPixel, 'Texture');
    }

    const width = options.width ?? (data as ImageBitmap).width;
    const height = options.height ?? (data as ImageBitmap).height;

    this.width = width;
    this.height = height;

    return this;
  }

  setSubImageData(options: {data: any; width?: number; height?: number; x?: number; y?: number}) {
    const {data, x = 0, y = 0} = options;
    const width = options.width ?? (data as ImageBitmap).width;
    const height = options.height ?? (data as ImageBitmap).height;
    assert(width + x <= this.width && height + y <= this.height);
  }
}
