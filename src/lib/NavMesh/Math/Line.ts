import Vector2 from "./Vector2";

/**
 * Stripped down version of Phaser's Line with just the functionality needed for navmeshes.
 *
 * @export
 * @class Line
 */
export default class Line {
  public start: Vector2;
  public end: Vector2;
  public left: number;
  public right: number;
  public top: number;
  public bottom: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.start = new Vector2(x1, y1);
    this.end = new Vector2(x2, y2);

    this.left = Math.min(x1, x2);
    this.right = Math.max(x1, x2);
    this.top = Math.min(y1, y2);
    this.bottom = Math.max(y1, y2);
  }

  public pointOnSegment(x: number, y: number) {
    return (
      x >= this.left &&
      x <= this.right &&
      y >= this.top &&
      y <= this.bottom &&
      this.pointOnLine(x, y)
    );
  }

  pointOnLine(x: number, y: number) {
    // Compare slope of line start -> xy to line start -> line end
    return (
      (x - this.left) * (this.bottom - this.top) ===
      (this.right - this.left) * (y - this.top)
    );
  }
}
