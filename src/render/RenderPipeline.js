/**
 * RenderPipeline.js
 *
 * Coordinates layered rendering passes in a modular pipeline.
 * Each layer should implement a `draw(ctx)` method.
 */

export class RenderPipeline {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.ctx = ctx
    /** @type {Array<{ name: string, layer: object }>} */
    this.layers = []
  }

  /**
   * Register a rendering layer.
   * @param {string} name
   * @param {object} layer Must implement `draw(ctx)`
   */
  addLayer(name, layer) {
    this.layers.push({ name, layer })
  }

  /**
   * Remove a rendering layer by name.
   * @param {string} name
   */
  removeLayer(name) {
    this.layers = this.layers.filter((l) => l.name !== name)
  }

  /**
   * Clear all layers.
   */
  reset() {
    this.layers = []
  }

  /**
   * Draw all layers in order.
   */
  draw() {
    for (const { layer } of this.layers) {
      if (typeof layer.draw === 'function') {
        layer.draw(this.ctx)
      }
    }
  }
}
