/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
export interface NavMeshPathfindingConfiguration {
  _getAcceleration(): float;
  _getMaxSpeed(): float;
  _getAngularMaxSpeed(): float;
  _getRotateObject(): boolean;
  _getAngleOffset(): float;
  _getCollisionShape(): string;
  _getExtraBorder(): float;
}
