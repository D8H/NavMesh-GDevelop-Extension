declare namespace gdjs {
  type ParticleEmitterObjectDataType = {
    /**
     * @deprecated Data not used
     */
    emitterAngleA: number;
    emitterForceMin: number;
    /**
     * Cone spray angle (degrees)
     */
    emitterAngleB: number;
    zoneRadius: number;
    emitterForceMax: number;
    particleLifeTimeMax: number;
    particleLifeTimeMin: number;
    particleGravityY: number;
    particleGravityX: number;
    particleRed2: number;
    particleRed1: number;
    particleGreen2: number;
    particleGreen1: number;
    particleBlue2: number;
    particleBlue1: number;
    particleSize2: number;
    particleSize1: number;
    /**
     * Particle max rotation speed (degrees/second)
     */
    particleAngle2: number;
    /**
     * Particle min rotation speed (degrees/second)
     */
    particleAngle1: number;
    particleAlpha1: number;
    rendererType: string;
    particleAlpha2: number;
    rendererParam2: number;
    rendererParam1: number;
    particleSizeRandomness1: number;
    particleSizeRandomness2: number;
    maxParticleNb: number;
    additive: boolean;
    /** Resource name for image in particle */
    textureParticleName: string;
    tank: number;
    flow: number;
    /** Destroy the object when there is no particles? */
    destroyWhenNoParticles: boolean;
  };
  type ParticleEmitterObjectData = ObjectData & ParticleEmitterObjectDataType;
  /**
   * Displays particles.
   */
  class ParticleEmitterObject extends gdjs.RuntimeObject {
    /**
     * @deprecated Data not used
     */
    angleA: number;
    angleB: number;
    forceMin: number;
    forceMax: float;
    zoneRadius: number;
    lifeTimeMin: number;
    lifeTimeMax: float;
    gravityX: number;
    gravityY: number;
    colorR1: number;
    colorR2: number;
    colorG1: number;
    colorG2: number;
    colorB1: number;
    colorB2: number;
    size1: number;
    size2: number;
    alpha1: number;
    alpha2: number;
    rendererType: string;
    rendererParam1: number;
    rendererParam2: number;
    texture: string;
    flow: number;
    tank: number;
    destroyWhenNoParticles: boolean;
    particleRotationMinSpeed: number;
    particleRotationMaxSpeed: number;
    maxParticlesCount: number;
    additiveRendering: boolean;
    _posDirty: boolean;
    _angleDirty: boolean;
    _forceDirty: boolean;
    _zoneRadiusDirty: boolean;
    _lifeTimeDirty: boolean;
    _gravityDirty: boolean;
    _colorDirty: boolean;
    _sizeDirty: boolean;
    _alphaDirty: boolean;
    _flowDirty: boolean;
    _tankDirty: boolean;
    _particleRotationSpeedDirty: boolean;
    _maxParticlesCountDirty: boolean;
    _additiveRenderingDirty: boolean;
    _textureDirty: boolean;
    _renderer: gdjs.ParticleEmitterObjectRenderer;
    /**
     * @param instanceContainer the container the object belongs to
     * @param particleObjectData The initial properties of the object
     */
    constructor(
      instanceContainer: gdjs.RuntimeInstanceContainer,
      particleObjectData: ParticleEmitterObjectData
    );
    setX(x: number): void;
    setY(y: number): void;
    setAngle(angle: any): void;
    getRendererObject(): any;
    updateFromObjectData(
      oldObjectData: ParticleEmitterObjectData,
      newObjectData: ParticleEmitterObjectData
    ): boolean;
    update(instanceContainer: gdjs.RuntimeInstanceContainer): void;
    onDestroyFromScene(instanceContainer: gdjs.RuntimeInstanceContainer): void;
    getEmitterForceMin(): number;
    setEmitterForceMin(force: float): void;
    getEmitterForceMax(): number;
    setEmitterForceMax(force: float): void;
    setParticleRotationMinSpeed(speed: number): void;
    getParticleRotationMinSpeed(): number;
    setParticleRotationMaxSpeed(speed: number): void;
    getParticleRotationMaxSpeed(): number;
    setMaxParticlesCount(count: number): void;
    getMaxParticlesCount(): number;
    setAdditiveRendering(enabled: boolean): void;
    getAdditiveRendering(): boolean;
    /**
     * @deprecated Prefer using getAngle
     */
    getEmitterAngle(): float;
    /**
     * @deprecated Prefer using setAngle
     */
    setEmitterAngle(angle: float): void;
    /**
     * @deprecated This function returns data that is not used.
     */
    getEmitterAngleA(): float;
    /**
     * @deprecated This function sets data that is not used.
     */
    setEmitterAngleA(angle: float): void;
    getEmitterAngleB(): float;
    setEmitterAngleB(angle: float): void;
    getConeSprayAngle(): float;
    setConeSprayAngle(angle: float): void;
    getZoneRadius(): float;
    setZoneRadius(radius: float): void;
    getParticleLifeTimeMin(): float;
    setParticleLifeTimeMin(lifeTime: float): void;
    getParticleLifeTimeMax(): float;
    setParticleLifeTimeMax(lifeTime: float): void;
    getParticleGravityX(): float;
    setParticleGravityX(x: float): void;
    getParticleGravityY(): float;
    setParticleGravityY(y: float): void;
    getParticleGravityAngle(): float;
    setParticleGravityAngle(angle: float): void;
    getParticleGravityLength(): float;
    setParticleGravityLength(length: float): void;
    getParticleRed1(): number;
    setParticleRed1(red: number): void;
    getParticleRed2(): number;
    setParticleRed2(red: number): void;
    getParticleGreen1(): number;
    setParticleGreen1(green: number): void;
    getParticleGreen2(): number;
    setParticleGreen2(green: number): void;
    getParticleBlue1(): number;
    setParticleBlue1(blue: number): void;
    getParticleBlue2(): number;
    setParticleBlue2(blue: number): void;
    setParticleColor1(rgbColor: string): void;
    setParticleColor2(rgbColor: string): void;
    getParticleSize1(): float;
    setParticleSize1(size: float): void;
    getParticleSize2(): float;
    setParticleSize2(size: float): void;
    getParticleAlpha1(): number;
    setParticleAlpha1(alpha: number): void;
    getParticleAlpha2(): number;
    setParticleAlpha2(alpha: number): void;
    startEmission(): void;
    stopEmission(): void;
    isEmitting(): boolean;
    noMoreParticles(): boolean;
    recreateParticleSystem(): void;
    getFlow(): number;
    setFlow(flow: number): void;
    getParticleCount(): number;
    getTank(): number;
    setTank(tank: number): void;
    getTexture(): string;
    setTexture(
      texture: string,
      instanceContainer: gdjs.RuntimeInstanceContainer
    ): void;
  }
}
