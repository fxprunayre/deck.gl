import {DeviceLimits} from '@luma.gl/core';

export class DummyDeviceLimits extends DeviceLimits {
  get maxTextureDimension1D() {
    return 0;
  }
  get maxTextureDimension2D() {
    return 2048;
  }
  get maxTextureDimension3D() {
    return 256;
  }
  get maxTextureArrayLayers() {
    return 256;
  }
  get maxBindGroups() {
    return 0;
  }
  get maxDynamicUniformBuffersPerPipelineLayout() {
    return 0;
  }
  get maxDynamicStorageBuffersPerPipelineLayout() {
    return 0;
  }
  get maxSampledTexturesPerShaderStage() {
    return 8;
  }
  get maxSamplersPerShaderStage() {
    return 16;
  }
  get maxStorageBuffersPerShaderStage() {
    return 0;
  }
  get maxStorageTexturesPerShaderStage() {
    return 0;
  }
  get maxUniformBuffersPerShaderStage() {
    return 20;
  }
  get maxUniformBufferBindingSize() {
    return 16384;
  }
  get maxStorageBufferBindingSize() {
    return 0;
  }
  get minUniformBufferOffsetAlignment() {
    return 0;
  }
  get minStorageBufferOffsetAlignment() {
    return 0;
  }
  get maxVertexBuffers() {
    return 16;
  }
  get maxVertexAttributes() {
    return 16;
  }
  get maxVertexBufferArrayStride() {
    return 2048;
  }
  get maxInterStageShaderComponents() {
    return 60;
  }
  get maxComputeWorkgroupStorageSize() {
    return 0;
  }
  get maxComputeInvocationsPerWorkgroup() {
    return 0;
  }
  get maxComputeWorkgroupSizeX() {
    return 0;
  }
  get maxComputeWorkgroupSizeY() {
    return 0;
  }
  get maxComputeWorkgroupSizeZ() {
    return 0;
  }
  get maxComputeWorkgroupsPerDimension() {
    return 0;
  }
}
