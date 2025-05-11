/**
 * drawSprite.js
 *
 * Draws a single sprite with optional animation frame control and scale.
 * Can be reused by multiple layers (entities, effects, etc).
 */

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} options
 * @param {HTMLImageElement} options.image The sprite sheet or image
 * @param {number} options.x Position X
 * @param {number} options.y Position Y
 * @param {number} [options.scale=1] Scale factor
 * @param {number} [options.frame=0] Which frame to draw (for sprite sheets)
 * @param {number} [options.frameWidth] Width of a single frame
 * @param {number} [options.frameHeight] Height of a single frame
 */
export function drawSprite(
  ctx,
  { image, x, y, scale = 1, frame = 0, frameWidth = image.width, frameHeight = image.height },
) {
  if (!image || !image.complete) return

  const sx = frame * frameWidth
  const sy = 0

  ctx.drawImage(
    image,
    sx,
    sy,
    frameWidth,
    frameHeight,
    x,
    y,
    frameWidth * scale,
    frameHeight * scale,
  )
}
