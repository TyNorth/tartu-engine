/**
 * @file tartu-engine/core/Ticker.js
 * @description Manages update loops for registered systems (game state, timers, etc).
 */

export class Ticker {
  constructor() {
    /** @type {Set<{ update: (dt: number) => void }>} */
    this.systems = new Set()

    /** @type {number} */
    this.lastTime = performance.now()
  }

  /**
   * Registers a system with an `update(dt)` method.
   * @param {object} system
   */
  register(system) {
    if (system?.update && typeof system.update === 'function') {
      this.systems.add(system)
    } else {
      console.warn('Ticker.register: System missing update(dt) method.')
    }
  }

  /**
   * Removes a system from the update loop.
   * @param {object} system
   */
  unregister(system) {
    this.systems.delete(system)
  }

  /**
   * Calls update on all registered systems.
   */
  update() {
    const now = performance.now()
    const dt = (now - this.lastTime) / 1000 // seconds
    this.lastTime = now

    for (const system of this.systems) {
      system.update(dt)
    }
  }
}
