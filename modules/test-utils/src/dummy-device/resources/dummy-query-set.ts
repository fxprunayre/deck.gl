import {QuerySet, QuerySetProps} from '@luma.gl/core';
import {DummyDevice} from '../dummy-device';

export class DummyQuerySet extends QuerySet {
  device: DummyDevice;

  override get [Symbol.toStringTag](): string {
    return 'Query';
  }

  // Create a query class
  constructor(device: DummyDevice, props: QuerySetProps) {
    super(device, props);
    this.device = device;
  }
}
