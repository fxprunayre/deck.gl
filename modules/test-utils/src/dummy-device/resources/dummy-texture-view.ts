import type {TextureViewProps} from '@luma.gl/core';
import {TextureView, Texture} from '@luma.gl/core';

import type {DummyDevice} from '../dummy-device';
import type {DummyTexture} from './dummy-texture';

export class DummyTextureView extends TextureView {
  readonly device: DummyDevice;
  readonly texture: DummyTexture;

  constructor(device: DummyDevice, props: TextureViewProps & {texture: DummyTexture}) {
    super(device, {...Texture.defaultProps, ...props});

    this.device = device;
    this.texture = props.texture;
  }
}
