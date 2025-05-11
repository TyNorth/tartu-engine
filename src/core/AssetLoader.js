/**
 * @file tartu-engine/core/AssetLoader.js
 * @description Loads and caches image/audio assets for reuse.
 */

export class AssetLoader {
  constructor() {
    /** @type {Map<string, HTMLImageElement>} */
    this.imageCache = new Map()

    /** @type {Map<string, HTMLAudioElement>} */
    this.audioCache = new Map()
  }

  /**
   * Load and cache an image.
   * @param {string} src
   * @returns {Promise<HTMLImageElement>}
   */
  loadImage(src) {
    if (this.imageCache.has(src)) {
      return Promise.resolve(this.imageCache.get(src))
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.imageCache.set(src, img)
        resolve(img)
      }
      img.onerror = () => reject(`Failed to load image: ${src}`)
      img.src = src
    })
  }

  /**
   * Load and cache audio.
   * @param {string} src
   * @returns {Promise<HTMLAudioElement>}
   */
  loadAudio(src) {
    if (this.audioCache.has(src)) {
      return Promise.resolve(this.audioCache.get(src))
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio(src)
      audio.oncanplaythrough = () => {
        this.audioCache.set(src, audio)
        resolve(audio)
      }
      audio.onerror = () => reject(`Failed to load audio: ${src}`)
    })
  }

  /**
   * Manually clear cached assets.
   */
  clear() {
    this.imageCache.clear()
    this.audioCache.clear()
  }
}
