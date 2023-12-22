const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d"); // gives access to all 2D drawing functions

var screen, starArr;

var params = { speed: 0.5, count: 400, life: 5 };

setup();
update();

window.onresize = function () {
  setup();
};

function Star() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.z = Math.random() * canvas.width;
  // move function will move the stars in the canvas
  this.move = function () {
    this.z -= params.speed;

    // if stars move out of the screen, we send them back
    if (this.z <= 0) {
      this.z = canvas.width;
    }
  };

  // show function to display the stars
  this.show = function () {
    let x, y, radius, opacity;

    radius = canvas.width / (5*this.z);

    x = (this.x - screen.c[0]) * radius;
    x = x + screen.c[0];

    y = (this.y - screen.c[1]) * radius;
    y = y + screen.c[1];

    opacity = radius > params.life ? (2 - radius / params.life) * 1.5 : 1;

    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255," + opacity + ")"; // Missing comma and PI correction

    ctx.arc(x, y, radius, 0, Math.PI * 2); // Missing comma

    ctx.fill();
  };
}

function setup() {
  screen = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  };

  cancelAnimationFrame(update);

  canvas.width = screen.w;
  canvas.height = screen.h;

  starArr = [];

  for (var i = 0; i < params.count; i++) {
    starArr[i] = new Star();
  }
}

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  starArr.forEach(function (s) {
    s.show();
    s.move();
  });

  requestAnimationFrame(update);
}
