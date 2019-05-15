import { Point } from "./point";

export class Character {

  private static _instance: Character;

  position: Point;
  height: number;
  width: number;

  constructor(position: Point, h: number, w: number) {
    this.position = position;
    this.height = h;
    this.width = w;
  }

  static getInstance() {
    if (!Character._instance) {
      Character._instance = new Character(new Point(0, 0), 0, 0);
    }
    return Character._instance;
  }

}