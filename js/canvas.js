
$(document).ready(function(){
  "use strict";
  $(window).resize(resizeThrottle);

  let resizeTimeout;
  function resizeThrottle() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        drawBackground();
      }, 66);
    }
  }

  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");
  const hue = 220;
  const sat = 55;
  const light = 25;

  function drawBackground() {
    // Resize the canvas to fill the entire background
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate number and size of individual lines
    const cw = canvas.width,
        ch = canvas.height;
    const size = 20;
    const cols = cw / size;
    const rows = ch / size;

    // draw the flat background color
    ctx.fillStyle = makeColor(hue, 100, 100);
    ctx.fillRect(0, 0, cw, ch);

    // draw the lines ala "10 PRINT CHR$(205.5+RND(1)); : GOTO 10"

    // Line styles
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = makeColor(hue, sat, light + 40);

    // draw the lines row by row
    for (let y = 0; y < rows; y++) {
      // each row is a closed path, maybe draw each line individually instead of entire rows
      ctx.beginPath();
      ctx.strokeStyle = makeColor(hue + 3 * (y - rows / 2), sat - 20 * y / rows, light + 20 + 10 * y / rows);
      for (let x = 0; x < cols; x++) {
        drawLine(x * size, y * size, size, Math.random());
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  function makeColor(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)"
  }

  function drawLine(x, y, size, dir) {
    if (dir > 0.5) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y + size);
    } else {
      ctx.moveTo(x, y + size);
      ctx.lineTo(x + size, y);
    }
  }

  drawBackground();
});