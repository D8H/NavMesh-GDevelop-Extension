import { almostEqual, angleDifference, areCollinear } from "./Utils";
import Line from "./Math/Line";

const line = (x1: number, y1: number, x2: number, y2: number) => new Line(x1, y1, x2, y2);

describe("almostEqual", () => {
  it("should be false for numbers with a significant difference", () => {
    expect(almostEqual(1, 2)).to.be(false);
    expect(almostEqual(-1, -0.95)).to.be(false);
  });
  it("should be true for numbers that are within floating point error margin", () => {
    expect(almostEqual(1, 1.00001)).to.be(true);
    expect(almostEqual(1 / 3, 0.33333)).to.be(true);
  });
});

describe("areCollinear", () => {
  it("should return false for non-collinear lines", () => {
    expect(areCollinear(line(-5, 0, 5, 0), line(-5, 10, 5, 10))).to.be(false); // Parallel
    expect(areCollinear(line(0, 0, 10, 10), line(0, 0, 0, 10))).to.be(false); // Intersecting
  });
  it("should return true for collinear lines", () => {
    expect(areCollinear(line(10, 10, 0, 0), line(10, 10, 0, 0))).to.be(true); // Same
    expect(areCollinear(line(0, 0, 10, 10), line(10, 10, 0, 0))).to.be(true); // Reversed
  });
});

describe("angleDifference", () => {
  it("should return the difference between angles in radians", () => {
    expect(angleDifference(Math.PI, Math.PI / 2)).to.be(Math.PI / 2);
    expect(angleDifference(1, -2)).to.be(3);
  });
  it("should wrap angles to calculate minimum angular distance", () => {
    expect(angleDifference(4 * Math.PI, Math.PI / 2)).to.be(-Math.PI / 2);
    expect(angleDifference(-3 * Math.PI, 0)).to.be(-Math.PI);
  });
});

// TODO: triarea2
