/**
 * @file tartu-engine/core/SceneManager.js
 * @description Manages the active scene and transitions between scenes.
 */

export class SceneManager {
  constructor() {
    /** @type {object|null} */
    this.current = null
  }

  /**
   * Set the active scene. Will call `.onEnter()` and `.onExit()` if available.
   * @param {object} scene
   */
  set(scene) {
    if (this.current?.onExit) this.current.onExit()
    this.current = scene
    if (this.current?.onEnter) this.current.onEnter()
  }

  /**
   * Forward input event to current scene.
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    this.current?.handleKeyDown?.(e)
  }

  /**
   * Forward input event to current scene.
   * @param {KeyboardEvent} e
   */
  handleKeyUp(e) {
    this.current?.handleKeyUp?.(e)
  }

  /**
   * Call update on active scene.
   * @param {number} dt
   */
  update(dt) {
    this.current?.update?.(dt)
  }

  /**
   * Call draw on active scene.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.current?.draw?.(ctx)
  }
}
