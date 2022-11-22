declare namespace gdjs {
  import PIXI = GlobalPIXIModule.PIXI;
  class TiledSpriteRuntimeObjectPixiRenderer {
    _object: gdjs.TiledSpriteRuntimeObject;
    _tiledSprite: PIXI.TilingSprite;
    constructor(
      runtimeObject: gdjs.TiledSpriteRuntimeObject,
      instanceContainer: gdjs.RuntimeInstanceContainer,
      textureName: string
    );
    getRendererObject(): PIXI.TilingSprite;
    updateOpacity(): void;
    updatePosition(): void;
    setTexture(
      textureName: string,
      instanceContainer: RuntimeInstanceContainer
    ): void;
    updateAngle(): void;
    getWidth(): float;
    getHeight(): float;
    setWidth(width: float): void;
    setHeight(height: float): void;
    updateXOffset(): void;
    updateYOffset(): void;
    setColor(rgbColor: string): void;
    getColor(): string;
    getTextureWidth(): number;
    getTextureHeight(): number;
  }
  export const TiledSpriteRuntimeObjectRenderer: typeof TiledSpriteRuntimeObjectPixiRenderer;
  export type TiledSpriteRuntimeObjectRenderer = TiledSpriteRuntimeObjectPixiRenderer;
  export {};
}
