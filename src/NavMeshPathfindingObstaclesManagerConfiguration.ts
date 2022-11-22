/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */

export interface NavMeshPathfindingObstaclesManagerConfiguration {
  _getViewpoint(): string;

  _getIsometricRatio(): float;
  _getCellSize(): float;
  _getAreaLeftBound(): integer;
  _getAreaTopBound(): integer;
  _getAreaRightBound(): integer;
  _getAreaBottomBound(): integer;

  _setIsometricRatio(value: float): void;
  _setCellSize(value: float): void;
  _setAreaLeftBound(value: float): void;
  _setAreaTopBound(value: float): void;
  _setAreaRightBound(value: float): void;
  _setAreaBottomBound(value: float): void;
}
