import { MockedRuntimeBehavior } from "./MockedRuntimeBehavior";
import { MockedRuntimeObject } from "./MockedRuntimeObject";

export type MockedNavMeshPathfindingRuntimeBehaviorConfiguration = {
    acceleration: float,
    maxSpeed: float,
    angularMaxSpeed: float,
    rotateObject: boolean,
    angleOffset: float,
    extraBorder: float,
    collisionShape: 'Bounding disk' | 'Dot at center',
}

export class MockedNavMeshPathfindingRuntimeBehavior extends MockedRuntimeBehavior {
    private configuration: MockedNavMeshPathfindingRuntimeBehaviorConfiguration;
  
    constructor(owner: MockedRuntimeObject, configuration: MockedNavMeshPathfindingRuntimeBehaviorConfiguration) {
        super(owner);
        this.configuration = configuration;
    }

    _getAcceleration(): float {
        return this.configuration.acceleration;
    }
    _getMaxSpeed(): float {
        return this.configuration.maxSpeed;
    }
    _getAngularMaxSpeed(): float {
        return this.configuration.angularMaxSpeed;
    }
    _getAngleOffset(): float {
        return this.configuration.angleOffset;
    }
    _getCollisionShape(): string {
        return this.configuration.collisionShape;
    }
    _getExtraBorder(): float {
        return this.configuration.extraBorder;
    }
    _getRotateObject(): boolean {
        return this.configuration.rotateObject;
    }
}