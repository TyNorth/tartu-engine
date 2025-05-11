/**
 * @file tartu-engine/core/InputRouter.js
 * @description Routes input events to registered handlers.
 */

export class InputRouter {
  constructor() {
    /** @type {function[]} */
    this.keyDownHandlers = []
    /** @type {function[]} */
    this.keyUpHandlers = []
  }

  /**
   * Add a keydown handler.
   * @param {function} fn
   */
  onKeyDown(fn) {
    this.keyDownHandlers.push(fn)
  }

  /**
   * Add a keyup handler.
   * @param {function} fn
   */
  onKeyUp(fn) {
    this.keyUpHandlers.push(fn)
  }

  /**
   * Handle a keydown event.
   * @param {KeyboardEvent} e
   */
  triggerKeyDown(e) {
    this.keyDownHandlers.forEach((fn) => fn(e))
  }

  /**
   * Handle a keyup event.
   * @param {KeyboardEvent} e
   */
  triggerKeyUp(e) {
    this.keyUpHandlers.forEach((fn) => fn(e))
  }

  /**
   * Remove all handlers (for cleanup or switching scenes).
   */
  reset() {
    this.keyDownHandlers = []
    this.keyUpHandlers = []
  }
}
