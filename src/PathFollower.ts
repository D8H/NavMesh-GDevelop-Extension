/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */
import { PathFollowerConfiguration } from "./PathFollowerConfiguration";

/**
 * NavMeshPathfindingRuntimeBehavior represents a behavior allowing objects to
 * follow a path computed to avoid obstacles.
 */
export class PathFollower {
  configuration: PathFollowerConfiguration;

  // Attributes used for traveling on the path:
  private _path: Array<FloatPoint> = [];
  private _speed: float = 0;
  private _distanceOnSegment: float = 0;
  private _totalSegmentDistance: float = 0;
  private _currentSegment: integer = 0;
  private _movementAngle: float = 0;

  constructor(configuration: PathFollowerConfiguration) {
    this.configuration = configuration;
  }

  setSpeed(speed: float): void {
    this._speed = speed;
  }

  getSpeed() {
    return this._speed;
  }

  getMovementAngle() {
    return this._movementAngle;
  }

  getNodeX(index: integer): float {
    if (0 <= index && index < this._path.length) {
      return this._path[index][0];
    }
    return 0;
  }

  getNodeY(index: integer): float {
    if (0 <= index && index < this._path.length) {
      return this._path[index][1];
    }
    return 0;
  }

  getNextNodeIndex() {
    return Math.min(this._currentSegment + 1, this._path.length - 1);
  }

  getNodeCount(): integer {
    return this._path.length;
  }

  getDestinationX(): float {
    if (this._path.length === 0) {
      return 0;
    }
    return this._path[this._path.length - 1][0];
  }

  getDestinationY(): float {
    if (this._path.length === 0) {
      return 0;
    }
    return (
      this._path[this._path.length - 1][1]
    );
  }

  /**
   * Return true if the object reached its destination.
   */
  destinationReached() {
    return this._currentSegment >= this._path.length - 1;
  }

  /**
   * Compute and move on the path to the specified destination.
   */
  setPath(path: Array<FloatPoint>) {
    this._path = path;
    this._enterSegment(0);
  }

  _enterSegment(segmentNumber: integer) {
    if (this._path.length === 0) {
      return;
    }
    this._currentSegment = segmentNumber;
    if (this._currentSegment < this._path.length - 1) {
      const pathX =
        this._path[this._currentSegment + 1][0] -
        this._path[this._currentSegment][0];
      const pathY =
        this._path[this._currentSegment + 1][1] -
        this._path[this._currentSegment][1];
      this._totalSegmentDistance = Math.sqrt(pathX * pathX + pathY * pathY);
      this._distanceOnSegment = 0;
      this._movementAngle =
        (gdjs.toDegrees(Math.atan2(pathY, pathX)) + 360) % 360;
    } else {
      this._speed = 0;
    }
  }

  isMoving() {
    return !(this._path.length === 0 || this.destinationReached());
  }

  step(timeDelta: float) {
    if (this._path.length === 0 || this.destinationReached()) {
      return;
    }

    // Update the speed of the object
    const previousSpeed = this._speed;
    const maxSpeed = this.configuration._getMaxSpeed();
    if (this._speed !== maxSpeed) {
      this._speed += this.configuration._getAcceleration() * timeDelta;
      if (this._speed > maxSpeed) {
        this._speed = maxSpeed;
      }
    }

    // Update the time on the segment and change segment if needed
    // Use a Verlet integration to be frame rate independent.
    this._distanceOnSegment +=
      ((this._speed + previousSpeed) / 2) * timeDelta;
    const remainingDistanceOnSegment =
      this._totalSegmentDistance - this._distanceOnSegment;
    if (
      remainingDistanceOnSegment <= 0 &&
      this._currentSegment < this._path.length
    ) {
      this._enterSegment(this._currentSegment + 1);
      this._distanceOnSegment = -remainingDistanceOnSegment;
    }
  }
  
  getX() {
    return this._currentSegment < this._path.length - 1 ? gdjs.evtTools.common.lerp(
      this._path[this._currentSegment][0],
      this._path[this._currentSegment + 1][0],
      this._distanceOnSegment / this._totalSegmentDistance
    ) : this._path[this._path.length - 1][0];
  }

  getY() {
    return this._currentSegment < this._path.length - 1 ? gdjs.evtTools.common.lerp(
      this._path[this._currentSegment][1],
      this._path[this._currentSegment + 1][1],
      this._distanceOnSegment / this._totalSegmentDistance
    ) : this._path[this._path.length - 1][1];
  }
}
