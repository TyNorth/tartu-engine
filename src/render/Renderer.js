/**
 * @file tartu-engine/render/Renderer.js
 * @description Provides core rendering utilities and high-level drawing commands.
 */

export class Renderer {
  /**
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context to draw with.
   */
  constructor(ctx) {
    this.ctx = ctx
    this.width = ctx.canvas.width
    this.height = ctx.canvas.height
  }

  /**
   * Clear the canvas.
   * @param {string} [color='#000']
   */
  clear(color = '#000') {
    this.ctx.fillStyle = color
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  /**
   * Draw an image.
   * @param {HTMLImageElement} img
   * @param {number} x
   * @param {number} y
   * @param {number} [w]
   * @param {number} [h]
   */
  drawImage(img, x, y, w = img.width, h = img.height) {
    this.ctx.drawImage(img, x, y, w, h)
  }

  /**
   * Draw a sprite frame from a sprite sheet.
   * @param {HTMLImageElement} spriteSheet
   * @param {number} frameX
   * @param {number} frameY
   * @param {number} frameWidth
   * @param {number} frameHeight
   * @param {number} dx
   * @param {number} dy
   * @param {number} [scale=1]
   */
  drawFrame(spriteSheet, frameX, frameY, frameWidth, frameHeight, dx, dy, scale = 1) {
    this.ctx.drawImage(
      spriteSheet,
      frameX * frameWidth,
      frameY * frameHeight,
      frameWidth,
      frameHeight,
      dx,
      dy,
      frameWidth * scale,
      frameHeight * scale,
    )
  }

  /**
   * Draw text with optional alignment and color.
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {object} [opts]
   */
  drawText(text, x, y, opts = {}) {
    const {
      color = 'white',
      font = '12px monospace',
      align = 'left',
      baseline = 'top',
      shadow = false,
    } = opts

    this.ctx.font = font
    this.ctx.fillStyle = color
    this.ctx.textAlign = align
    this.ctx.textBaseline = baseline

    if (shadow) {
      this.ctx.shadowColor = 'black'
      this.ctx.shadowBlur = 2
    } else {
      this.ctx.shadowBlur = 0
    }

    this.ctx.fillText(text, x, y)
  }

  /**
   * Draw a rectangular panel.
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} [color='rgba(0,0,0,0.7)']
   */
  drawPanel(x, y, w, h, color = 'rgba(0,0,0,0.7)') {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
    this.ctx.strokeStyle = 'white'
    this.ctx.strokeRect(x, y, w, h)
  }

  /**
   * Draw a shadow ellipse under a character or object.
   * @param {number} x
   * @param {number} y
   * @param {number} rx
   * @param {number} ry
   */
  drawShadow(x, y, rx, ry) {
    this.ctx.fillStyle = 'rgba(0,0,0,0.25)'
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
