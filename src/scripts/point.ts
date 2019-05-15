export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceFrom(point: Point) {
    const dx = this.x - point.x
    const dy = this.y - point.y;
    
    return Math.sqrt(dx * dx + dy * dy);
  }
}
