declare namespace gdjs {
  import PIXI = GlobalPIXIModule.PIXI;
  /**
   * A render for instance container.
   *
   * @see gdjs.RuntimeInstanceContainer
   */
  interface RuntimeInstanceContainerPixiRenderer {
    /**
     * Change the position of a layer.
     *
     * @param layer The layer to reorder
     * @param index The new position in the list of layers
     *
     * @see gdjs.RuntimeInstanceContainer.setLayerIndex
     */
    setLayerIndex(layer: gdjs.Layer, index: integer): void;
    getRendererObject(): PIXI.Container;
  }
  type RuntimeInstanceContainerRenderer = gdjs.RuntimeInstanceContainerPixiRenderer;
}
