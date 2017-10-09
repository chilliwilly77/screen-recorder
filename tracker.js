let recorder = [];
const playbackSpeed = 1000;
const ignoreEls = ['body', 'html'];

document.onclick = event => {
  recorder.push(event.target);
};

window.play = () => {
  const playbackBtnEl = document.getElementById('playback-btn');
  playbackBtnEl.disabled = true;
  let index = -1;
  function playNext() {
    return new Promise(resolve => {
      index++;
      playbackBtnEl.disabled = true;
      if (index < recorder.length) {
        const el = recorder[index];
        if (el && ignoreEls.indexOf(el.localName) < 0 ) {
          recorder[index].setAttribute("style", "background-color: red;");
          setTimeout((el => {
            el.setAttribute("style", "");
            setTimeout(playNext, playbackSpeed / 10);
          }).bind(this, recorder[index]), playbackSpeed * 9 / 10);
        } else {
          playNext();
        }
      } else {
        resolve();
      }
    });
  }
  playNext()
    .then(() => playbackBtnEl.disabled = false);
};
