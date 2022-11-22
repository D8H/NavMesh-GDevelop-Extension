declare namespace gdjs {
  import PIXI = GlobalPIXIModule.PIXI;
  /**
   * The renderer for a gdjs.RuntimeScene using Pixi.js.
   */
  class RuntimeScenePixiRenderer
    implements gdjs.RuntimeInstanceContainerPixiRenderer {
    _pixiRenderer: PIXI.Renderer | null;
    _runtimeScene: gdjs.RuntimeScene;
    _pixiContainer: PIXI.Container;
    _profilerText: PIXI.Text | null;
    _showCursorAtNextRender: boolean;
    constructor(
      runtimeScene: gdjs.RuntimeScene,
      runtimeGameRenderer: gdjs.RuntimeGamePixiRenderer | null
    );
    onGameResolutionResized(): void;
    onSceneUnloaded(): void;
    render(): void;
    _renderProfileText(): void;
    hideCursor(): void;
    showCursor(): void;
    getPIXIContainer(): PIXI.Container;
    getRendererObject(): PIXI.Container;
    getPIXIRenderer(): PIXI.Renderer | null;
    setLayerIndex(layer: gdjs.Layer, index: float): void;
  }
  type RuntimeSceneRenderer = gdjs.RuntimeScenePixiRenderer;
  const RuntimeSceneRenderer: typeof RuntimeScenePixiRenderer;
}
