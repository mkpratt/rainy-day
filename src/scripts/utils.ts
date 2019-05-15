export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function distance(a, b) {
  let dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt( dx * dx + dy * dy );
}