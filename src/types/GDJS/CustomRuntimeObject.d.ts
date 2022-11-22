declare namespace gdjs {
    type ObjectConfiguration = {
        content: any;
    };
    type CustomObjectConfiguration = ObjectConfiguration & {
        childrenContent: {
            [objectName: string]: ObjectConfiguration & any;
        };
    };
    /**
     * An object that contains other object.
     *
     * This is the base class for objects generated from EventsBasedObject.
     *
     * @see gdjs.CustomRuntimeObjectInstanceContainer
     */
    class CustomRuntimeObject extends gdjs.RuntimeObject {
        /** It contains the children of this object. */
        _instanceContainer: gdjs.CustomRuntimeObjectInstanceContainer;
        _isUntransformedHitBoxesDirty: boolean;
        /** It contains shallow copies of the children hitboxes */
        _untransformedHitBoxes: gdjs.Polygon[];
        /** The dimension of this object is calculated from its children AABBs. */
        _unrotatedAABB: AABB;
        _scaleX: number;
        _scaleY: number;
        _flippedX: boolean;
        _flippedY: boolean;
        opacity: float;
        _objectData: ObjectData & CustomObjectConfiguration;
        /**
         * @param parent The container the object belongs to
         * @param objectData The object data used to initialize the object
         */
        constructor(parent: gdjs.RuntimeInstanceContainer, objectData: ObjectData & CustomObjectConfiguration);
        reinitialize(objectData: ObjectData & CustomObjectConfiguration): void;
        updateFromObjectData(oldObjectData: ObjectData & CustomObjectConfiguration, newObjectData: ObjectData & CustomObjectConfiguration): boolean;
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onDestroyFromScene(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        update(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called when the preview is being hot-reloaded.
         */
        onHotReloading(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called each tick after events are done.
         * @param instanceContainer The instanceContainer owning the object
         */
        doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * This method is called when the object is being removed from its parent
         * container and is about to be destroyed/reused later.
         */
        onDestroy(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        updatePreRender(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getRendererObject(): any;
        getRenderer(): CustomObjectPixiRenderer;
        onChildrenLocationChanged(): void;
        updateHitBoxes(): void;
        /**
         * Merge the hitboxes of the children.
         */
        _updateUntransformedHitBoxes(): void;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in parent coordinate coordinates (as opposed to the object local coordinates).
         *
         * All transformations (flipping, scale, rotation) are supported.
         *
         * @param x The X position of the point, in object coordinates.
         * @param y The Y position of the point, in object coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in parent coordinates).
         */
        applyObjectTransformation(x: float, y: float, result: number[]): void;
        /**
         * Return an array containing the coordinates of the point passed as parameter
         * in object local coordinates (as opposed to the parent coordinate coordinates).
         *
         * All transformations (flipping, scale, rotation) are supported.
         *
         * @param x The X position of the point, in parent coordinates.
         * @param y The Y position of the point, in parent coordinates.
         * @param result Array that will be updated with the result
         * (x and y position of the point in object coordinates).
         */
        applyObjectInverseTransformation(x: float, y: float, result: number[]): void;
        getDrawableX(): float;
        getDrawableY(): float;
        /**
         * @return the internal width of the object according to its children.
         */
        getUnscaledWidth(): float;
        /**
         * @return the internal height of the object according to its children.
         */
        getUnscaledHeight(): float;
        /**
         * @returns the center X from the local origin (0;0).
         */
        getUnscaledCenterX(): float;
        /**
         * @returns the center Y from the local origin (0;0).
         */
        getUnscaledCenterY(): float;
        getWidth(): float;
        getHeight(): float;
        setWidth(newWidth: float): void;
        setHeight(newHeight: float): void;
        /**
         * Change the size of the object.
         *
         * @param newWidth The new width of the object, in pixels.
         * @param newHeight The new height of the object, in pixels.
         */
        setSize(newWidth: float, newHeight: float): void;
        setX(x: float): void;
        setY(y: float): void;
        setAngle(angle: float): void;
        /**
         * Change the scale on X and Y axis of the object.
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScale(newScale: number): void;
        /**
         * Change the scale on X axis of the object (changing its width).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleX(newScale: number): void;
        /**
         * Change the scale on Y axis of the object (changing its height).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleY(newScale: number): void;
        /**
         * Get the scale of the object (or the average of the X and Y scale in case
         * they are different).
         *
         * @return the scale of the object (or the average of the X and Y scale in
         * case they are different).
         */
        getScale(): number;
        /**
         * Get the scale of the object on Y axis.
         *
         * @return the scale of the object on Y axis
         */
        getScaleY(): float;
        /**
         * Get the scale of the object on X axis.
         *
         * @return the scale of the object on X axis
         */
        getScaleX(): float;
        /**
         * Change the transparency of the object.
         * @param opacity The new opacity, between 0 (transparent) and 255 (opaque).
         */
        setOpacity(opacity: float): void;
        /**
         * Get the transparency of the object.
         * @return The opacity, between 0 (transparent) and 255 (opaque).
         */
        getOpacity(): number;
        /**
         * Hide (or show) the object
         * @param enable true to hide the object, false to show it again.
         */
        hide(enable: boolean): void;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
    }
}
