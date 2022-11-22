/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */

export interface PathFollowerConfiguration {
  _getAcceleration(): float;
  _getMaxSpeed(): float;
  _getAngularMaxSpeed(): float;
  _getAngleOffset(): float;
}
