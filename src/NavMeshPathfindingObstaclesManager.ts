/*
GDevelop - NavMesh Pathfinding Behavior Extension
 */

import NavMesh, { Point } from "./lib/NavMesh";
import { NavMeshPathfindingObstacleBehavior } from "./NavMeshPathfindingObstacleBehavior";
import { NavMeshPathfindingObstaclesManagerConfiguration } from "./NavMeshPathfindingObstaclesManagerConfiguration";
import NavMeshGenerator from "./lib/NavMeshGenerator";

/**
 * PathfindingObstaclesManager manages the common objects shared by objects having a
 * pathfinding behavior: In particular, the obstacles behaviors are required to declare
 * themselves (see `PathfindingObstaclesManager.addObstacle`) to the manager of their associated scene
 * (see `gdjs.NavMeshPathfindingRuntimeBehavior.obstaclesManagers`).
 */
export class NavMeshPathfindingObstaclesManager {
  configuration: NavMeshPathfindingObstaclesManagerConfiguration;

  private _obstacles: Set<gdjs.RuntimeObject>;

  private _polygonIterableAdapter: PolygonIterableAdapter;
  private _navMeshGenerator: NavMeshGenerator;

  /**
   * The navigation meshes by moving object size
   * (rounded on _cellSize)
   */
  private _navMeshes: Map<integer, NavMesh> = new Map();
  /**
   * Used while NavMeshes update is disabled to remember to do the update
   * when it's enable back.
   */
  private _navMeshesAreUpToDate = true;
  /**
   * This allows to continue finding paths with the old NavMeshes while
   * moving obstacles.
   */
  private _navMeshesUpdateIsEnabled = true;

  constructor(
    instanceContainer: gdjs.RuntimeInstanceContainer,
    configuration: NavMeshPathfindingObstaclesManagerConfiguration
  ) {
    const viewpoint = configuration._getViewpoint();
    if (viewpoint === "Isometry 2:1 (26.565°)") {
      configuration._setIsometricRatio(2);
    } else if (viewpoint === "True Isometry (30°)") {
      configuration._setIsometricRatio(Math.sqrt(3));
    } else {
      configuration._setIsometricRatio(1);
    }
    if (configuration._getCellSize() <= 0) {
      configuration._setCellSize(10);
    }
    if (
      configuration._getAreaLeftBound() === 0 &&
      configuration._getAreaTopBound() === 0 &&
      configuration._getAreaRightBound() === 0 &&
      configuration._getAreaBottomBound() === 0
    ) {
      const game = instanceContainer.getGame();
      configuration._setAreaLeftBound(0);
      configuration._setAreaTopBound(0);
      configuration._setAreaRightBound(game.getGameResolutionWidth());
      configuration._setAreaBottomBound(game.getGameResolutionHeight());
    }

    this.configuration = configuration;
    this._obstacles = new Set();
    this._polygonIterableAdapter = new PolygonIterableAdapter();
    this._navMeshGenerator = new NavMeshGenerator(
      configuration._getAreaLeftBound(),
      configuration._getAreaTopBound(),
      configuration._getAreaRightBound(),
      configuration._getAreaBottomBound(),
      configuration._getCellSize(),
      // make cells square in the world
      configuration._getIsometricRatio()
    );
  }

  /**
   * Get the obstacles manager of a scene.
   */
  static getManager(
    instanceContainer: gdjs.RuntimeInstanceContainer
  ): NavMeshPathfindingObstaclesManager | null {
    // @ts-ignore
    return instanceContainer.navMeshPathfindingObstaclesManager;
  }

  static getManagerOrCreate(
    instanceContainer: gdjs.RuntimeInstanceContainer,
    configuration: NavMeshPathfindingObstaclesManagerConfiguration
  ): NavMeshPathfindingObstaclesManager {
    // @ts-ignore
    if (!instanceContainer.navMeshPathfindingObstaclesManager) {
      // Create the shared manager if necessary.
      // @ts-ignore
      instanceContainer.navMeshPathfindingObstaclesManager = new NavMeshPathfindingObstaclesManager(
        instanceContainer,
        configuration
      );
    }
    // @ts-ignore
    return instanceContainer.navMeshPathfindingObstaclesManager;
  }

  public setNavMeshesUpdateEnabled(navMeshesUpdateIsEnabled: boolean) {
    this._navMeshesUpdateIsEnabled = navMeshesUpdateIsEnabled;
    if (navMeshesUpdateIsEnabled && !this._navMeshesAreUpToDate) {
      this._navMeshes.clear();
      this._navMeshesAreUpToDate = true;
    }
  }

  /**
   * Add a obstacle to the list of existing obstacles.
   */
  addObstacle(pathfindingObstacleBehavior: NavMeshPathfindingObstacleBehavior) {
    this._obstacles.add(pathfindingObstacleBehavior.behavior.owner);
    this.invalidateNavMesh();
  }

  /**
   * Remove a obstacle from the list of existing obstacles. Be sure that the obstacle was
   * added before.
   */
  removeObstacle(
    pathfindingObstacleBehavior: NavMeshPathfindingObstacleBehavior
  ) {
    this._obstacles.delete(pathfindingObstacleBehavior.behavior.owner);
    this.invalidateNavMesh();
  }

  invalidateNavMesh() {
    if (this._navMeshesUpdateIsEnabled) {
      this._navMeshes.clear();
      this._navMeshesAreUpToDate = true;
    } else {
      this._navMeshesAreUpToDate = false;
    }
  }

  getNavMesh(obstacleCellPadding: integer): NavMesh {
    let navMesh = this._navMeshes.get(obstacleCellPadding);
    if (!navMesh) {
      const navMeshPolygons = this._navMeshGenerator.buildNavMesh(
        this._getVerticesIterable(this._obstacles),
        obstacleCellPadding
      );
      navMesh = new NavMesh(navMeshPolygons);
      this._navMeshes.set(obstacleCellPadding, navMesh);
    }
    return navMesh;
  }

  _getVerticesIterable(
    objects: Set<gdjs.RuntimeObject>
  ): Iterable<Iterable<Point>> {
    this._polygonIterableAdapter.set(objects);
    return this._polygonIterableAdapter;
  }
}

/**
 * Iterable that adapts `RuntimeObject` to `Iterable<{x: float y: float}>`.
 *
 * This is an allocation free iterable
 * that can only do one iteration at a time.
 */
class PolygonIterableAdapter implements Iterable<Iterable<Point>> {
  objects: Iterable<gdjs.RuntimeObject>;
  objectsItr: Iterator<gdjs.RuntimeObject>;
  polygonsItr: IterableIterator<gdjs.Polygon>;
  result: IteratorResult<Iterable<Point>, any>;
  pointIterableAdapter: PointIterableAdapter;

  constructor() {
    this.objects = [];
    this.objectsItr = this.objects[Symbol.iterator]();
    this.polygonsItr = [][Symbol.iterator]();
    this.pointIterableAdapter = new PointIterableAdapter();
    this.result = {
      value: this.pointIterableAdapter,
      done: false,
    };
  }

  set(objects: Set<gdjs.RuntimeObject>) {
    this.objects = objects;
  }

  [Symbol.iterator]() {
    this.objectsItr = this.objects[Symbol.iterator]();
    this.polygonsItr = [][Symbol.iterator]();
    return this;
  }

  next() {
    let polygonNext = this.polygonsItr.next();
    while (polygonNext.done) {
      const objectNext = this.objectsItr.next();
      if (objectNext.done) {
        // IteratorReturnResult<gdjs.RuntimeObject> require a defined value
        // even though the spec state otherwise.
        // So, this class can't be typed as an iterable.
        this.result.value = undefined;
        this.result.done = true;
        return this.result;
      }
      this.polygonsItr = objectNext.value.getHitBoxes().values();
      polygonNext = this.polygonsItr.next();
    }
    this.pointIterableAdapter.set(polygonNext.value.vertices);
    this.result.value = this.pointIterableAdapter;
    this.result.done = false;
    return this.result;
  }
}

/**
 * Iterable that adapts coordinates from `[int, int]` to `{x: int, y: int}`.
 *
 * This is an allocation free iterable
 * that can only do one iteration at a time.
 */
class PointIterableAdapter implements Iterable<Point> {
  vertices: Iterable<FloatPoint>;
  verticesItr: Iterator<FloatPoint>;
  result: IteratorResult<Point, any>;

  constructor() {
    this.vertices = [];
    this.verticesItr = this.vertices[Symbol.iterator]();
    this.result = {
      value: { x: 0, y: 0 },
      done: false,
    };
  }

  set(vertices: Iterable<FloatPoint>) {
    this.vertices = vertices;
  }

  [Symbol.iterator]() {
    this.verticesItr = this.vertices[Symbol.iterator]();
    return this;
  }

  next() {
    const next = this.verticesItr.next();
    if (next.done) {
      return next;
    }
    this.result.value.x = next.value[0];
    this.result.value.y = next.value[1];
    return this.result;
  }
}
