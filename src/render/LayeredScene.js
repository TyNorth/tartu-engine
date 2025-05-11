/**

@file render/LayeredScene.js
@description Manages rendering layers in a scene (e.g., background, midground, foreground, UI).
*/

import { Renderer } from './Renderer.js'
export class LayeredScene {
  constructor() {
    /** @type {Object<string, Renderer[]>} */
    this.layers = {
      background: [],
      midground: [],
      foreground: [],
      ui: [],
    }
  }
  /**

Add a drawable to a specific layer.
@param {string} layer - One of 'background', 'midground', 'foreground', 'ui'.
@param {Renderer} drawable
*/
  addToLayer(layer, drawable) {
    if (!this.layers[layer]) {
      console.warn(`[LayeredScene] Unknown layer: ${layer}`)
      return
    }
    this.layers[layer].push(drawable)
  }

  /**

Clears all drawables in all layers.
*/
  clear() {
    for (const key in this.layers) {
      this.layers[key] = []
    }
  }

  /**

Draw all layers in the correct order.
@param {CanvasRenderingContext2D} ctx
@param {number} dt - Delta time
*/
  draw(ctx, dt) {
    for (const key of ['background', 'midground', 'foreground', 'ui']) {
      for (const drawable of this.layers[key]) {
        drawable.draw?.(ctx, dt)
      }
    }
  }

  /**

Optional update step if the scene manages per-frame logic.
@param {number} dt - Delta time
*/
  update(dt) {
    for (const key in this.layers) {
      for (const drawable of this.layers[key]) {
        drawable.update?.(dt)
      }
    }
  }
}
