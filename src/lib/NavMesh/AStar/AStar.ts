// The following implementation of the A* algorithm is from:
// https://github.com/bgrins/javascript-astar
// and is under MIT license:
// Copyright (c) Brian Grinstead, http://briangrinstead.com

// The implementation was sightly modified to be TypeScript typed.

import Graph from "./Graph";
import BinaryHeap from "./BinaryHeap";
import GridNode from "./GridNode";

export default class AStar<NodeType extends GridNode> {
  /**
     * Perform an A* Search on a graph given a start and end node.
     * @param {Graph} graph
     * @param {GridNode} start
     * @param {GridNode} end
     * @param {Object} [options]
     * @param {bool} [options.closest] Specifies whether to return the
     path to the closest node if the target is unreachable.
     * @param {Function} [options.heuristic] Heuristic function (see
     *          astar.heuristics).
     */
  search(
    graph: Graph<NodeType>,
    start: NodeType,
    end: NodeType,
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    heuristic: (pos0: NodeType, pos1: NodeType) => number,
    closest: boolean = false
  ): Array<NodeType> {
    graph.cleanDirty();

    var openHeap = this.getHeap();
    var closestNode = start; // set the start node to be the closest if required

    start.h = heuristic(start, end);
    graph.markDirty(start);

    openHeap.push(start);

    while (openHeap.size() > 0) {
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();
      // never happen
      if (!currentNode) return [];

      // End case -- result has been found, return the traced path.
      if (currentNode === end) {
        return this.pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighbors(currentNode);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];

        if (neighbor.closed || neighbor.isWall()) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {
          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor, end);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          if (closest) {
            // If the neighbor is closer than the current closestNode or if it's equally close but has
            // a cheaper path than the current closest node then it becomes the closest node
            if (
              neighbor.h < closestNode.h ||
              (neighbor.h === closestNode.h && neighbor.g < closestNode.g)
            ) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    if (closest) {
      return this.pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  }

  private pathTo(node: NodeType): NodeType[] {
    var curr = node;
    var path = new Array<NodeType>();
    while (curr.parent) {
      path.unshift(curr);
      curr = curr.parent as NodeType;
    }
    return path;
  }

  private getHeap(): BinaryHeap<NodeType> {
    return new BinaryHeap(function (node) {
      return node.f;
    });
  }
}
