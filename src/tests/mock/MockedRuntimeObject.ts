
export class MockedRuntimeObject {
    x: float = 0;
    y: float = 0;
    centerX: float = 0;
    centerY: float = 0;
    angle: float = 0;
    width: float = 0;
    height: float = 0;
    elapsedTime: number = 1000 / 60;

    constructor() {
    }
    
    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    setCustomCenter(x: number, y: number) {
        this.centerX = x;
        this.centerY = y;
    }

    setCustomWidthAndHeight(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    rotateTowardAngle(angle: float, speed: float, instanceContainer?: gdjs.RuntimeInstanceContainer): void {
        throw new Error("Method not implemented.");
    }
    
    setX(x: float): void {
        this.x = x;
    }

    getX(): float {
        return this.x;
    }

    setY(y: float): void {
        this.y = y;
    }

    getY(): float {
        return this.y;
    }
    
    setWidth(width: float): void {
        this.width = width;
    }
    setHeight(height: float): void {
        this.height = height;
    }
    getWidth(): float {
        return this.width;
    }
    getHeight(): float {
        return this.height;
    }
    setAngle(angle: float): void {
        this.angle = angle;
    }
    getAngle(): float {
        return this.angle;
    }
    getHitBoxes(): gdjs.Polygon[] {
        const minX = this.x;
        const minY = this.y;
        const maxX = this.x + this.width;
        const maxY = this.y + this.height;
        return [{vertices: [[minX, minY],[maxX, minY],[maxX, maxY],[minX, maxY]]}] as gdjs.Polygon[];
    }
    getElapsedTime(): float {
        return this.elapsedTime;
    }
    setElapsedTime(elapsedTime: integer): void {
        this.elapsedTime = elapsedTime;
    }
    getCenterXInScene(): float {
        return this.x + this.centerX;
    }
    getCenterYInScene(): float {
        return this.y + this.centerY;
    }
}