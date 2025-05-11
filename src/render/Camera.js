/**
 * @file tartu-engine/render/Camera.js
 * @description Provides a basic 2D camera system for panning and clamping.
 */

export class Camera {
  /**
   * @param {number} viewportWidth
   * @param {number} viewportHeight
   */
  constructor(viewportWidth, viewportHeight) {
    this.x = 0
    this.y = 0
    this.viewportWidth = viewportWidth
    this.viewportHeight = viewportHeight
    this.bounds = null // { x: number, y: number, width: number, height: number }
    this.smooth = 0.1
  }

  /**
   * Instantly center on a point.
   * @param {number} x
   * @param {number} y
   */
  centerOn(x, y) {
    this.x = x - this.viewportWidth / 2
    this.y = y - this.viewportHeight / 2
    this.clampToBounds()
  }

  /**
   * Smoothly follow a point.
   * @param {number} targetX
   * @param {number} targetY
   */
  follow(targetX, targetY) {
    const desiredX = targetX - this.viewportWidth / 2
    const desiredY = targetY - this.viewportHeight / 2

    this.x += (desiredX - this.x) * this.smooth
    this.y += (desiredY - this.y) * this.smooth
    this.clampToBounds()
  }

  /**
   * Optionally set map bounds.
   * @param {object} bounds
   * @param {number} bounds.x
   * @param {number} bounds.y
   * @param {number} bounds.width
   * @param {number} bounds.height
   */
  setBounds(bounds) {
    this.bounds = bounds
  }

  /**
   * Clamp camera position within the defined bounds.
   */
  clampToBounds() {
    if (!this.bounds) return

    const maxX = this.bounds.x + this.bounds.width - this.viewportWidth
    const maxY = this.bounds.y + this.bounds.height - this.viewportHeight

    this.x = Math.max(this.bounds.x, Math.min(this.x, maxX))
    this.y = Math.max(this.bounds.y, Math.min(this.y, maxY))
  }

  /**
   * Get the current camera offset.
   * @returns {{ x: number, y: number }}
   */
  getOffset() {
    return { x: Math.floor(this.x), y: Math.floor(this.y) }
  }
}
