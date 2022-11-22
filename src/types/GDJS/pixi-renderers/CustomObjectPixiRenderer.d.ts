declare namespace gdjs {
  import PIXI = GlobalPIXIModule.PIXI;
  /**
   * The renderer for a {@link gdjs.CustomRuntimeObject} using Pixi.js.
   */
  class CustomObjectPixiRenderer
    implements gdjs.RuntimeInstanceContainerPixiRenderer {
    _object: gdjs.CustomRuntimeObject;
    _instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer;
    _pixiContainer: PIXI.Container;
    _isContainerDirty: boolean;
    _debugDraw: PIXI.Graphics | null;
    _debugDrawContainer: PIXI.Container | null;
    _debugDrawRenderedObjectsPoints: Record<
      number,
      {
        wasRendered: boolean;
        points: Record<string, PIXI.Text>;
      }
    >;
    constructor(
      object: gdjs.CustomRuntimeObject,
      instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer,
      parent: gdjs.RuntimeInstanceContainer
    );
    reinitialize(
      object: gdjs.CustomRuntimeObject,
      parent: gdjs.RuntimeInstanceContainer
    ): void;
    getRendererObject(): PIXI.Container;
    /**
     * Update the internal PIXI.Container position, angle...
     */
    _updatePIXIContainer(): void;
    /**
     * Call this to make sure the sprite is ready to be rendered.
     */
    ensureUpToDate(): void;
    update(): void;
    updateX(): void;
    updateY(): void;
    updateAngle(): void;
    updateOpacity(): void;
    updateVisibility(): void;
    getPIXIContainer(): PIXI.Container;
    getPIXIRenderer(): null;
    setLayerIndex(layer: gdjs.Layer, index: float): void;
  }
  type CustomObjectRenderer = gdjs.CustomObjectPixiRenderer;
  const CustomObjectRenderer: typeof CustomObjectPixiRenderer;
}
