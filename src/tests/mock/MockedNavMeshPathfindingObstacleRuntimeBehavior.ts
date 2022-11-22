import { MockedRuntimeBehavior } from "./MockedRuntimeBehavior";
import { MockedRuntimeObject } from "./MockedRuntimeObject";

export type MockedNavMeshPathfindingObstacleRuntimeBehaviorConfiguration = {
    viewpoint: 'Top-Down' | 'Isometry 2:1 (26.565°)' | 'True Isometry (30°)',
    areaLeftBound: float,
    areaTopBound: float,
    areaRightBound: float,
    areaBottomBound: float,
    cellSize: float,
}

class SharedData {
    private configuration: MockedNavMeshPathfindingObstacleRuntimeBehaviorConfiguration;
    private isometricRatio: float;

    constructor(configuration: MockedNavMeshPathfindingObstacleRuntimeBehaviorConfiguration) {
        this.configuration = configuration;
    }

    _getViewpoint(): string {
        return this.configuration.viewpoint;
    }
  
    _getIsometricRatio(): float{
        return this.isometricRatio;
    }
    _getCellSize(): float{
        return this.configuration.cellSize;
    }
    _getAreaLeftBound(): integer{
        return this.configuration.areaLeftBound;
    }
    _getAreaTopBound(): integer{
        return this.configuration.areaTopBound;
    }
    _getAreaRightBound(): integer{
        return this.configuration.areaRightBound;
    }
    _getAreaBottomBound(): integer{
        return this.configuration.areaBottomBound;
    }
  
    _setIsometricRatio(value: float): void{
        this.isometricRatio = value;
    }
    _setCellSize(value: float): void{
        this.configuration.cellSize = value;
    }
    _setAreaLeftBound(value: float): void{
        this.configuration.areaLeftBound = value;
    }
    _setAreaTopBound(value: float): void{
        this.configuration.areaTopBound = value;
    }
    _setAreaRightBound(value: float): void{
        this.configuration.areaRightBound = value;
    }
    _setAreaBottomBound(value: float): void{
        this.configuration.areaBottomBound = value;
    }
}

export class MockedNavMeshPathfindingObstacleRuntimeBehavior extends MockedRuntimeBehavior {
    _sharedData: SharedData
  
    constructor(owner: MockedRuntimeObject, configuration: MockedNavMeshPathfindingObstacleRuntimeBehaviorConfiguration) {
        super(owner);
        this._sharedData = new SharedData(configuration);
    }
}