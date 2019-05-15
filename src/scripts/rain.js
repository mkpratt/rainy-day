let mouse = {
  x: 0,
  y: 0,
  width: 100
};

document.addEventListener('mousemove', (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

let c = document.createElement( 'canvas' ),
  ctx = c.getContext( '2d' ),
  dpr = window.devicePixelRatio,
  w = window.innerWidth,
  h = window.innerHeight,
  particles = [],
  particleCount = 1500,
  particlePath = 4,
  hue = 0,
  hueRange = 0,
  hueChange = 0,
  gravity = 0.15,
  lineWidth = 1.1,
  lineCap = 'butt',
  PI = Math.PI,
  TWO_PI = PI * 2;

c.width = w * dpr;
c.height = h * dpr;
ctx.scale(dpr, dpr);

function rand( min, max ) {
  return Math.random() * ( max - min ) + min;
}

function distance( a, b ) {
  let dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt( dx * dx + dy * dy );
}

function Particle( opt ) {
  this.path = [];
  this.reset();
}

Particle.prototype.reset = function() {
  this.radius = 1;
  this.x = rand( 0, w );
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.hit = 0;
  this.path.length = 0;
};

Particle.prototype.step = function() {
  this.hit = 0;

  this.path.unshift( [ this.x, this.y ] );
  if( this.path.length > particlePath ) {
    this.path.pop();
  }

  this.vy += gravity;

  this.x += this.vx;
  this.y += this.vy;

  if( this.y > h + 10 ) {
    this.reset();
  }

  if (distance(this, mouse) < this.radius + mouse.width) {
    this.vx = -( mouse.x - this.x ) * rand( 0.01, 0.03 );
    this.vy = -( mouse.y - this.y ) * rand( 0.01, 0.03 );
    this.hit = 1;
  }
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo( this.x, ~~this.y );
  for( var i = 0, length = this.path.length; i < length; i++ ) {
    var point = this.path[ i ];
    ctx.lineTo( point[ 0 ], ~~point[ 1 ] );
  }
  ctx.strokeStyle = 'hsla( 97, 2%, 60%, 1)';
  // ctx.strokeStyle = 'hsla( 255, 0%, 0%, 1)';
  ctx.stroke();

  // if( this.hit ) {
  //   ctx.beginPath();
  //   ctx.arc( this.x, this.y , rand( 1, 25 ), 0, TWO_PI );
  //   ctx.strokeStyle = 'hsla( 97, 2%, 60%, 1)';
  //   ctx.fill();
  // }
};

function Pillar() {
  this.reset();
}

Pillar.prototype.reset = function(){
  this.radius = rand( 50, 100 );
  this.renderRadius = 100;
  this.x = rand( 0, w );
  this.y = rand( h / 2 - h / 4, h );
  this.active = 0;
};

Pillar.prototype.step = function() {
  if( this.active ) {
    if( this.radius <= 1 ) {
      this.reset();
    } else {
      this.renderRadius = this.radius;
    }
  } else {
    if( this.renderRadius < this.radius ) {
      this.renderRadius += 0.5;
    } else {
      this.active = 1;
    }
  }
};

Pillar.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.renderRadius, 0, TWO_PI, false );
  ctx.fill();
};

function step() {
  // hue += hueChange;

  if( particles.length < particleCount ) {
    particles.push( new Particle() );
  }

  var i = particles.length;
  while( i-- ) {
    particles[ i ].step();
  }
}

function draw() {
  // ctx.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
  ctx.fillStyle = 'hsla(255, 2%, 40%, 0.4)';
  ctx.fillRect( 0, 0, w, h );

  ctx.globalCompositeOperation = 'lighter';
  var i = particles.length;
  while( i-- ) {
    particles[ i ].draw();
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgb(211, 211, 211)';
}

function loop() {
  requestAnimationFrame( loop );
  step();
  draw();
}

init();

function init() {
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;

  document.querySelector('#scene').appendChild( c );
  loop();
}