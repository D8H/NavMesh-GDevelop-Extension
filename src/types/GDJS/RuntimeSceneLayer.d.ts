declare namespace gdjs {
    /**
     * Represents a layer of a scene, used to display objects.
     *
     * Viewports and multiple cameras are not supported.
     *
     * It does some optimizations but works exactly the same as
     * {@link gdjs.Layer}.
     */
    class RuntimeSceneLayer extends gdjs.Layer {
        /**
         * @param layerData The data used to initialize the layer
         * @param scene The scene in which the layer is used
         */
        constructor(layerData: LayerData, scene: gdjs.RuntimeScene);
        convertCoords(x: float, y: float, cameraId: number | undefined, result: FloatPoint): FloatPoint;
        convertInverseCoords(x: float, y: float, cameraId: number | undefined, result: FloatPoint): FloatPoint;
    }
}
