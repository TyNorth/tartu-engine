/**
 * drawTilemap.js
 *
 * Draws a tile-based map from a tile layer and tileset image.
 * Designed to handle Tiled-style maps (orthogonal).
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} options
 * @param {HTMLImageElement} options.tileset
 * @param {number[]} options.data - 1D array of tile GIDs
 * @param {number} options.columns - number of columns in the map layer
 * @param {number} options.rows - number of rows in the map layer
 * @param {number} options.tileWidth
 * @param {number} options.tileHeight
 * @param {number} options.tilesetCols - columns in the tileset sheet
 * @param {number} options.offsetX - camera X offset
 * @param {number} options.offsetY - camera Y offset
 */
export function drawTilemap(
  ctx,
  { tileset, data, columns, rows, tileWidth, tileHeight, tilesetCols, offsetX, offsetY },
) {
  if (!tileset || !tileset.complete) return

  for (let i = 0; i < data.length; i++) {
    const gid = data[i]
    if (gid === 0) continue

    const sx = ((gid - 1) % tilesetCols) * tileWidth
    const sy = Math.floor((gid - 1) / tilesetCols) * tileHeight
    const dx = (i % columns) * tileWidth - offsetX
    const dy = Math.floor(i / columns) * tileHeight - offsetY

    ctx.drawImage(tileset, sx, sy, tileWidth, tileHeight, dx, dy, tileWidth, tileHeight)
  }
}
