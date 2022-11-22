export default abstract class GridNode {
  weight: number;
  h: number = 0;
  g: number = 0;
  f: number = 0;
  closed: boolean = false;
  visited: boolean = false;
  parent: GridNode | null = null;

  constructor(weight: number) {
    this.weight = weight;
  }

  abstract getCost(fromNeighbor: GridNode): number;

  isWall(): boolean {
    return this.weight === 0;
  }

  clean() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
  }
}
