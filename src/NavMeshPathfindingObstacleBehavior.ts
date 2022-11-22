/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */

import { NavMeshPathfindingObstaclesManager } from "./NavMeshPathfindingObstaclesManager";

/**
 * NavMeshPathfindingObstacleRuntimeBehavior represents a behavior allowing objects to be
 * considered as a obstacle by objects having Pathfinding Behavior.
 */
export class NavMeshPathfindingObstacleBehavior {
  behavior: gdjs.RuntimeBehavior;
  private _oldX: float = 0;
  private _oldY: float = 0;
  private _oldWidth: float = 0;
  private _oldHeight: float = 0;
  private _manager: NavMeshPathfindingObstaclesManager;
  private _registeredInManager: boolean = false;

  constructor(
    instanceContainer: gdjs.RuntimeInstanceContainer,
    behavior: gdjs.RuntimeBehavior
  ) {
    this.behavior = behavior;
    this._manager = NavMeshPathfindingObstaclesManager.getManagerOrCreate(
      instanceContainer,
      // @ts-ignore
      behavior._sharedData
    );

    //Note that we can't use getX(), getWidth()... of owner here:
    //The owner is not yet fully constructed.
  }

  onDestroy() {
    if (this._manager && this._registeredInManager) {
      this._manager.removeObstacle(this);
    }
  }

  doStepPreEvents(instanceContainer: gdjs.RuntimeInstanceContainer) {
    const owner = this.behavior.owner;

    //Make sure the obstacle is or is not in the obstacles manager.
    if (!this.behavior.activated() && this._registeredInManager) {
      this._manager.removeObstacle(this);
      this._registeredInManager = false;
    } else {
      if (this.behavior.activated() && !this._registeredInManager) {
        this._manager.addObstacle(this);
        this._registeredInManager = true;
      }
    }

    //Track changes in size or position
    if (
      this._oldX !== owner.getX() ||
      this._oldY !== owner.getY() ||
      this._oldWidth !== owner.getWidth() ||
      this._oldHeight !== owner.getHeight()
    ) {
      if (this._registeredInManager) {
        this._manager.removeObstacle(this);
        this._manager.addObstacle(this);
      }
      this._oldX = owner.getX();
      this._oldY = owner.getY();
      this._oldWidth = owner.getWidth();
      this._oldHeight = owner.getHeight();
    }
  }

  doStepPostEvents(instanceContainer: gdjs.RuntimeInstanceContainer) {}

  onActivate() {
    if (this._registeredInManager) {
      return;
    }
    this._manager.addObstacle(this);
    this._registeredInManager = true;
  }

  onDeActivate() {
    if (!this._registeredInManager) {
      return;
    }
    this._manager.removeObstacle(this);
    this._registeredInManager = false;
  }
}
