/* ------ */
// base.js

var gp_connecting = false;
var gp_connectingcount = 0;
var gp_letsgo = null;
var gp_pressed = null;
var gp_info = document.getElementById('gp_info');

function gpHandler(e, gp_connecting) {
  if (gp_connecting) {
    gp_pressed = new Array(e.gamepad.buttons.length);
    // 目前只能用單支手把 (Index 0)
    gp_letsgo = setInterval(function() { gpPrint(e, 0) }, 1);
  } else {
    clearInterval(gp_letsgo);
    gp_connectingcount = 0;
  }
}

function ononSfx(pressed, index) {
  var audio_index = 'audio_' + index;
  var sound = document.getElementById(audio_index);

  // sound.cloneNode().play();
  sound = sound.cloneNode();
  sound.volume = 0.6;
  sound.play();

  gp_pressed[index] = true;
}

// 監測連接手把
window.addEventListener("gamepadconnected", (e) => {
  console.log('[%d] %s 已連線', e.gamepad.index, e.gamepad.id);
  console.log('按鍵數: %d, Axes: %d', e.gamepad.buttons.length, e.gamepad.axes.length);
  gpHandler(e, true);
});

// 監測手把斷線
window.addEventListener("gamepaddisconnected", (e) => {
  console.log('[%d] %s 已斷線', e.gamepad.index, e.gamepad.id);
  gpHandler(e, false);
});

// 讀取 MP3 放到 audio 元素裡
for (var i = 0; i < my_sfx.length; i++) {

  var temp_audio = document.createElement('AUDIO');
  document.body.appendChild(temp_audio);

  temp_audio.setAttribute('id', 'audio_' + i);

  var temp_audio_src = './sfx/' + my_sfx[i];
  if (temp_audio.canPlayType('audio/mpeg')) {
    temp_audio_src += '.mp3';
  } else {
    temp_audio_src += '.ogg';
  }
  temp_audio.setAttribute('src', temp_audio_src);
  temp_audio.setAttribute('volume', 0);

}

/* ------ */
