import Graph from "./AStar/Graph";
import NavPoly from "./NavPoly";

/**
 * Graph for javascript-astar. It implements the functionality for astar. See GPS test from astar
 * repo for structure: https://github.com/bgrins/javascript-astar/blob/master/test/tests.js
 *
 * @class NavGraph
 * @private
 */
 export default class NavGraph extends Graph<NavPoly> {
  constructor(navPolygons: NavPoly[]) {
    super(navPolygons);
    this.nodes = navPolygons;
    this.init();
  }

  neighbors(navPolygon: NavPoly) {
    return navPolygon.neighbors;
  }

  navHeuristic(navPolygon1: NavPoly, navPolygon2: NavPoly) {
    return navPolygon1.centroidDistance(navPolygon2);
  }

  destroy() {
    this.cleanDirty();
    this.nodes = [];
  }
}
