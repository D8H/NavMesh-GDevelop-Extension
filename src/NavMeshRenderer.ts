/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */
import { NavMeshPathfindingObstaclesManager } from "./NavMeshPathfindingObstaclesManager";

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
export class NavMeshRenderer {
  /** Used to draw traces for debugging */
  private _lastUsedObstacleCellPadding: float | null = null;

  constructor() {
  }

  setLastUsedObstacleCellPadding(lastUsedObstacleCellPadding: float) {
    this._lastUsedObstacleCellPadding = lastUsedObstacleCellPadding;
  }

  render(instanceContainer: gdjs.RuntimeInstanceContainer, shapePainter: gdjs.ShapePainterRuntimeObject): void {
    if (this._lastUsedObstacleCellPadding === null) {
      return;
    }
    const manager = NavMeshPathfindingObstaclesManager.getManager(
      instanceContainer
    );
    if (!manager) {
      return;
    }
    const isometricRatio = manager.configuration._getIsometricRatio();

    // TODO find a way to rebuild drawing only when necessary.

    // Draw the navigation mesh on a shape painter object for debugging purpose
    const navMesh = manager.getNavMesh(
      this._lastUsedObstacleCellPadding
    );
    for (const navPoly of navMesh.getPolygons()) {
      const polygon = navPoly.getPoints();
      if (polygon.length === 0) continue;
      for (let index = 1; index < polygon.length; index++) {
        // It helps to spot vertices with 180° between edges.
        shapePainter.drawCircle(
          polygon[index].x,
          polygon[index].y / isometricRatio, 3);
      }
    }
    for (const navPoly of navMesh.getPolygons()) {
      const polygon = navPoly.getPoints();
      if (polygon.length === 0) continue;
      const randColor = Math.floor(256 * Math.random())  + ";" + Math.floor(256 * Math.random())  + ";" + Math.floor(256 * Math.random());
      shapePainter.setOutlineColor(randColor);
      shapePainter.setFillColor(randColor);
      shapePainter.beginFillPath(
        polygon[0].x,
        polygon[0].y / isometricRatio);
      for (let index = 1; index < polygon.length; index++) {
        shapePainter.drawPathLineTo(
          polygon[index].x,
          polygon[index].y / isometricRatio,);
      }
      shapePainter.closePath();
      shapePainter.endFillPath();
    }
  }
}
