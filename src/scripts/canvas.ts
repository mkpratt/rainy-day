import { Constants } from "./constants";

export class Canvas {

  private static _instance: Canvas;
  private _canvasElement: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvasElement = document.createElement('canvas');
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasElement.width = Constants.windowWidth;
    this.canvasElement.height = Constants.windowHeight;
    this.ctx.scale(Constants.pixelRatio, Constants.pixelRatio);
    this.ctx.lineWidth = Constants.lineWidth;
    this.ctx.lineCap = Constants.lineCap as CanvasLineCap;
  }

  static getInstance() {
    if (!Canvas._instance) {
      Canvas._instance = new Canvas();
    }
    return Canvas._instance;
  }

  get canvasElement() { return this._canvasElement };
  set canvasElement(newValue: HTMLCanvasElement) {
    if (this._canvasElement != newValue) {
      this._canvasElement = newValue;
    }
  }

  get ctx() { return this._ctx };
  set ctx(newValue: CanvasRenderingContext2D) {
    if (this._ctx != newValue) {
      this._ctx = newValue;
    }
  }

}