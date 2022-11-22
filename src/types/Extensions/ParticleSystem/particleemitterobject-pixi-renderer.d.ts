declare namespace gdjs {
    class ParticleEmitterObjectPixiRenderer {
        renderer: any;
        emitter: any;
        started: boolean;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, runtimeObject: gdjs.RuntimeObject, objectData: any);
        getRendererObject(): any;
        update(delta: float): void;
        setPosition(x: number, y: number): void;
        setAngle(angle1: float, angle2: float): void;
        setForce(min: float, max: float): void;
        setZoneRadius(radius: float): void;
        setLifeTime(min: float, max: float): void;
        setGravity(x: float, y: float): void;
        setColor(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): void;
        setSize(size1: float, size2: float): void;
        setParticleRotationSpeed(min: float, max: float): void;
        setMaxParticlesCount(count: float): void;
        setAdditiveRendering(enabled: boolean): void;
        setAlpha(alpha1: number, alpha2: number): void;
        setFlow(flow: number, tank: number): void;
        resetEmission(flow: number, tank: number): void;
        isTextureNameValid(texture: string, instanceContainer: gdjs.RuntimeInstanceContainer): boolean;
        setTextureName(texture: string, instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getParticleCount(): integer;
        stop(): void;
        start(): void;
        recreate(): void;
        destroy(): void;
        hasStarted(): boolean;
        static computeLifetime(flow: number, tank: number): float;
    }
    const ParticleEmitterObjectRenderer: typeof ParticleEmitterObjectPixiRenderer;
    type ParticleEmitterObjectRenderer = ParticleEmitterObjectPixiRenderer;
}
