import { Constants } from './constants';

import { Point } from './point';
import { rand as Random } from './utils';
import { Character } from './character';
import { Canvas } from './canvas';

export class Rain {
  
  radius = 1;
  path: any[];
  position: Point;
  velocity: Point;
  hit: boolean;

  constructor() {
    this.reset();
  }

  step(): void {
    this.hit = false;
    this.path.unshift([this.position.x, this.position.y]);

    if (this.path.length > Constants.rainPath) {
      this.path.pop();
    }

    this.velocity.y += Constants.gravity;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.isOutOfBounds()) {
      this.reset();
    }

    this.checkCharacterHit();
  }

  draw(): void {
    const ctx = Canvas.getInstance().ctx;
    ctx.beginPath();
    ctx.moveTo(this.position.x, ~~this.position.y);
    
    for (let i = 0, length = this.path.length; i < length; i++ ) {
      const point = this.path[i];
      ctx.lineTo(point[0], ~~point[1]);
    }

    ctx.strokeStyle = 'hsla( 97, 2%, 60%, 1)';
    // ctx.strokeStyle = 'hsla( 255, 0%, 0%, 1)';
    ctx.stroke();
  }

  isOutOfBounds(): boolean {
    if (this.position.y > Constants.windowHeight + 10) {
      return true;
    }
    return false;
  }

  checkCharacterHit(): void {
    const character = Character.getInstance();
    if (this.position.distanceFrom(character.position) < this.radius + character.width) {
      this.velocity.x = -(character.position.x - this.position.x) * Random(0.01, 0.03);
      this.velocity.y = -(character.position.y - this.position.y) * Random(0.01, 0.03); 
      this.hit = true;
    }
  }

  reset(): void {
    this.path = [];
    this.path.length = 0;
    const randX = Random(0, Constants.windowWidth)
    this.position = new Point(randX, 0);
    this.velocity = new Point(0, 0);
    this.hit = false;
  }
}