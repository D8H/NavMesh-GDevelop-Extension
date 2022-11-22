/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */
import { NavMeshPathfindingConfiguration } from "./NavMeshPathfindingConfiguration";
import { NavMeshPathfindingObstaclesManager } from "./NavMeshPathfindingObstaclesManager";
import { NavMeshRenderer } from "./NavMeshRenderer";
import { PathFollower } from "./PathFollower";

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
export class NavMeshPathfindingBehavior {
  behavior: gdjs.RuntimeBehavior & NavMeshPathfindingConfiguration;
  pathFollower: PathFollower;
  navMeshRenderer: NavMeshRenderer;

  // Attributes used for traveling on the path:
  private _pathFound: boolean = false;


  constructor(
    behavior: gdjs.RuntimeBehavior & NavMeshPathfindingConfiguration,
  ) {
    this.behavior = behavior;
    this.pathFollower = new PathFollower(behavior);
    this.navMeshRenderer = new NavMeshRenderer();
  }

  /**
   * Return true if the latest call to moveTo succeeded.
   */
  pathFound() {
    return this._pathFound;
  }

  /**
   * Compute and move on the path to the specified destination.
   */
  moveTo(instanceContainer: gdjs.RuntimeInstanceContainer, x: float, y: float) {
    const owner = this.behavior.owner;
    const manager = NavMeshPathfindingObstaclesManager.getManager(
      instanceContainer
    );
    if (!manager) {
      this._pathFound = true;
      this.pathFollower.setPath([[owner.getX(), owner.getY()], [x, y]]);
      return;
    }
    const isometricRatio = manager.configuration._getIsometricRatio();
    const cellSize = manager.configuration._getCellSize();

    const collisionShape = this.behavior._getCollisionShape();
    const extraBorder = this.behavior._getExtraBorder();

    let radiusSqMax = 0;
    if (collisionShape !== 'Dot at center') {
      const centerX = owner.getCenterXInScene();
      const centerY = owner.getCenterYInScene();
      for (const hitBox of owner.getHitBoxes()) {
        for (const vertex of hitBox.vertices) {
          const deltaX = vertex[0] - centerX;
          // to have the same unit on x and y
          const deltaY =
            (vertex[1] - centerY) * isometricRatio;
          const radiusSq = deltaX * deltaX + deltaY * deltaY;
          radiusSqMax = Math.max(radiusSq, radiusSqMax);
        }
      }
    }
    // Round to avoid to flicker between 2 NavMesh
    // because of trigonometry rounding errors.
    // Round the padding on cellSize to avoid almost identical NavMesh
    const obstacleCellPadding = Math.max(
      0,
      Math.round(
        (Math.sqrt(radiusSqMax) + extraBorder) / cellSize
      )
    );
    this.navMeshRenderer.setLastUsedObstacleCellPadding(obstacleCellPadding);
    const navMesh = manager.getNavMesh(obstacleCellPadding);

    // TODO avoid the path allocation
    const path = navMesh.findPath(
      {
        x: owner.getX(),
        y: owner.getY() * isometricRatio,
      },
      { x: x, y: y * isometricRatio }
    ) || [];
    this._pathFound = path.length > 0;
    this.pathFollower.setPath(path.map(({ x, y }) => [x, y]));
  }

  doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer) {
    if (this.pathFollower.destinationReached()) {
      return;
    }
    const manager = NavMeshPathfindingObstaclesManager.getManager(
      instanceContainer
    );
    if (!manager) {
      return;
    }
    const isometricRatio = manager.configuration._getIsometricRatio();

    const owner = this.behavior.owner;
    const angleOffset = this.behavior._getAngleOffset();
    const angularMaxSpeed = this.behavior._getMaxSpeed();
    const rotateObject = this.behavior._getRotateObject();


    const timeDelta = owner.getElapsedTime(instanceContainer) / 1000;
    this.pathFollower.step(timeDelta);

    // Position object on the segment and update its angle
    const movementAngle = this.pathFollower.getMovementAngle();
    if (
      rotateObject &&
      owner.getAngle() !== movementAngle + angleOffset
    ) {
      owner.rotateTowardAngle(
        movementAngle + angleOffset,
        angularMaxSpeed,
        instanceContainer
      );
    }
    owner.setX(this.pathFollower.getX());
    // In case of isometry, convert coords back in screen.
    owner.setY(this.pathFollower.getY() / isometricRatio);
  }
}
