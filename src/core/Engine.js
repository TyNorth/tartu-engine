/**
 * @file tartu-engine/core/Engine.js
 * @description Main game engine loop and runtime controller.
 */

import { Ticker } from './Ticker.js'
import { SceneManager } from './SceneManager.js'
import { InputRouter } from './InputRouter.js'

export class Engine {
  /**
   * @param {HTMLCanvasElement} canvas - The canvas to render to.
   * @param {object} config - Configuration for scenes and systems.
   */
  constructor(canvas, config = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = canvas.width
    this.height = canvas.height

    /** @type {SceneManager} */
    this.sceneManager = new SceneManager(this.ctx)

    /** @type {InputRouter} */
    this.input = new InputRouter()

    /** @type {Ticker} */
    this.ticker = new Ticker()

    /** @type {boolean} */
    this.running = false

    this._bindInputEvents()
    this._initConfig(config)
  }

  /**
   * Attach keyboard and input events to forward to active scene.
   * @private
   */
  _bindInputEvents() {
    document.addEventListener('keydown', (e) => {
      this.input.handleKeyDown(e)
      this.sceneManager.handleKeyDown(e)
    })

    document.addEventListener('keyup', (e) => {
      this.input.handleKeyUp(e)
      this.sceneManager.handleKeyUp(e)
    })
  }

  /**
   * Optional preconfigured systems/scenes.
   * @param {object} config
   * @private
   */
  _initConfig(config) {
    if (config.initialScene) {
      this.sceneManager.setScene(config.initialScene)
    }

    if (Array.isArray(config.systems)) {
      config.systems.forEach((sys) => this.ticker.register(sys))
    }
  }

  /**
   * Starts the engine loop.
   */
  start() {
    if (this.running) return
    this.running = true
    this._loop()
  }

  /**
   * Stops the engine loop.
   */
  stop() {
    this.running = false
  }

  /**
   * Core game loop: update all systems and render the current scene.
   * @private
   */
  _loop() {
    if (!this.running) return

    this.ticker.update()
    this.sceneManager.update()

    this.ctx.clearRect(0, 0, this.width, this.height)
    this.sceneManager.draw()

    requestAnimationFrame(() => this._loop())
  }
}
