import { Canvas } from "./canvas";
import { Constants } from "./constants";
import { Rain } from "./rain";

window.onload = init;

function init(): void {
  document.body.appendChild(new Canvas().canvasElement);
  loop();
}

function loop(): void {
  requestAnimationFrame(loop);
  step();
  draw();
}

function step(): void {
  const rainArr = Constants.rain;
  if (rainArr.length < Constants.rainCount) {
    rainArr.push(new Rain());
  }

  let rain = rainArr.length;
  while(rain--) {
    rainArr[rain].step();
  }
}

function draw(): void {
  const ctx = Canvas.getInstance().ctx;
  ctx.fillStyle = 'hsla(255, 2%, 40%, 0.4)';
  // ctx.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
  ctx.fillRect(0, 0, Constants.windowWidth, Constants.windowHeight);

  ctx.globalCompositeOperation = 'lighter';
  
  const rainArr = Constants.rain;
  let rain = rainArr.length;
  while(rain--) {
    rainArr[rain].draw();
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgb(211, 211, 211)';
}