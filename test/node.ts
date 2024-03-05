// Polyfill for loaders
import '@loaders.gl/polyfills';

// Polyfill with JSDOM
import {JSDOM} from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html>');
// These globals are required by @jupyter-widgets/base
const _global: any = globalThis;

/** global setTimeout, clearTimeout */
_global.window = dom.window;
_global.navigator = dom.window.navigator;
_global.document = dom.window.document;
_global.Element = dom.window.Element;
_global.__JSDOM__ = true;
_global.HTMLCanvasElement = dom.window.HTMLCanvasElement;
_global.HTMLVideoElement = dom.window.HTMLVideoElement;
_global.requestAnimationFrame = cb => setTimeout(cb, 0);
_global.cancelAnimationFrame = t => clearTimeout(t);

import {device} from '@deck.gl/test-utils';
import {mockCanvasApi} from './utils/mock-canvas-api';

// Mock Canvas/Context2D calls
mockCanvasApi(dom.window.HTMLCanvasElement);

const canvas = globalThis.document.createElement('canvas');
canvas.width = device.canvasContext!.width;
canvas.height = device.canvasContext!.height;
// Deck class uses client width/height to calculate viewport sizes
Object.defineProperty(canvas, 'clientWidth', {
  value: canvas.width
});
Object.defineProperty(canvas, 'clientHeight', {
  value: canvas.height
});
// @ts-expect-error overwriting readonly property
device.canvasContext.canvas = canvas;

import './modules';
