import type {Device} from '@luma.gl/core';
import {createTestContext, webglDevice} from '@luma.gl/test-utils';
import {DummyDevice} from '../dummy-device/dummy-device';

/** Test device */
export const device: Device = webglDevice || new DummyDevice({});

/** Test context */
export const gl = createTestContext({
  width: 1,
  height: 1,
  debug: true
  // throwOnFailure: false,
  // throwOnError: false
});

//   // TODO - Seems to be an issue in luma.gl
//   (createContext && createContext(100, 100, {}));
// // console.log('Context', globalThis.glContext);

globalThis.glContext = globalThis.glContext || gl;
