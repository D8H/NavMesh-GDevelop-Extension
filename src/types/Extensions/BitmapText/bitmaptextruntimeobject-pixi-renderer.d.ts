declare namespace gdjs {
    import PIXI = GlobalPIXIModule.PIXI;
    /**
     * The PIXI.js renderer for the Bitmap Text runtime object.
     */
    class BitmapTextRuntimeObjectPixiRenderer {
        _object: gdjs.BitmapTextRuntimeObject;
        _pixiObject: PIXI.BitmapText;
        /**
         * @param runtimeObject The object to render
         * @param instanceContainer The container in which the object is
         */
        constructor(runtimeObject: gdjs.BitmapTextRuntimeObject, instanceContainer: gdjs.RuntimeInstanceContainer);
        getRendererObject(): PIXI.BitmapText;
        onDestroy(): void;
        getFontSize(): number;
        updateFont(): void;
        updateTint(): void;
        /**
         * Get the tint of the bitmap object as a "R;G;B" string.
         * @returns the tint of bitmap object in "R;G;B" format.
         */
        getTint(): string;
        updateScale(): void;
        getScale(): number;
        updateWrappingWidth(): void;
        updateTextContent(): void;
        updateAlignment(): void;
        updatePosition(): void;
        updateAngle(): void;
        updateOpacity(): void;
        getWidth(): float;
        getHeight(): float;
    }
    const BitmapTextRuntimeObjectRenderer: typeof BitmapTextRuntimeObjectPixiRenderer;
}
