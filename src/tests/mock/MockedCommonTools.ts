
      /**
       * Runs a linear interpolation between a and b.
       * @param a Start value.
       * @param b End value.
       * @param x The interpolation value between 0 and 1.
       * @returns The interpolated value, now between a and b.
       */
      const lerp = function (a: number, b: integer, x: float): number {
        return a + (b - a) * x;
      };

      const toDegrees = function (angleInRadians: float): float {
        return (angleInRadians * 180) / Math.PI;
      };

//@ts-ignore
gdjs = {toDegrees: toDegrees, evtTools: {common: {lerp}}};


