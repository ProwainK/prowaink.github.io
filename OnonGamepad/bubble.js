/* ------ */
// bubble.js

var canvas = document.getElementById('sfx_bubble');
var ctx = canvas.getContext('2d');

// 字體 - 莫大毛筆字體
var my_font_family = 'Bakudai';

var bubble_list = [];

class Bubble {
  constructor(say) {
    this.say = say;
    this.size = 1;
    this.x = Math.floor(Math.random() * ($(document).width() - 50)) + 50;
    this.y = Math.floor(Math.random() * ($(document).height() - 50)) + 50;
  }
}

function createNewBubble(say) {
  var temp_say = say;
  var temp_bubble = new Bubble(temp_say);
  bubble_list.push(temp_bubble);
}

setInterval(function() {
  drawText();
}, 20);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawText() {

  resizeCanvas();

  // [Debug] bubble_list
  //ctx.fillText(bubble_list.length, 20, 20);

  for (var i = 0; i < bubble_list.length; i++) {

    if (bubble_list[i].size >= 70) {
      bubble_list.splice(i, 1);
      i = -1;
    }
    else {
      ctx.textAlign = 'center';
      ctx.font = bubble_list[i].size + 'px ' + my_font_family;
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(bubble_list[i].say, bubble_list[i].x, bubble_list[i].y);
      bubble_list[i].size += 3;
    }

  }

}

/* ------ */
