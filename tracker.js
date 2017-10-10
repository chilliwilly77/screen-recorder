const playbackSpeed = 1000;
const ignoreEls = ['body', 'html'];
const ignoreIds = ['playback-btn'];
const activeStyle = "box-shadow: inset 0px 0px 0px 4px rgba(255, 0, 0, 0.5);";

let recorder;

const setActive = el => new Promise(accept => {
  if (ignoreEls.indexOf(el.localName) < 0 && ignoreIds.indexOf(el.id) < 0)
    setTimeout(() => {
      el.setAttribute("style", activeStyle);
      accept();
    }, playbackSpeed / 10);
  else accept();
});
const setInactive = el => new Promise(accept =>
  setTimeout(() => {
    el.setAttribute("style", "");
    accept();
  }, playbackSpeed * 9 / 10)
);

class Recorder {
  //note deliberate non-use of keyword 'this' to avoid issues with lexical scope bindings with arrow-funcs
  constructor() {
    this.records = [];
    this.isPlaying = false;
    this.playbackBtn = document.getElementById('playback-btn');
  }
  startPlayback(){
    recorder.playbackBtn.disabled = true;
    recorder.isPlaying = true;
  }
  stopPlayback(){
    recorder.playbackBtn.disabled = false;
    recorder.isPlaying = false;
  }
  reset(){
    recorder.records = [];
    recorder.stopPlayback();
  }
  record(event){
    if (!recorder.isPlaying) recorder.records.push(event.target);
  }
  play(){
    recorder.startPlayback();
    let playbackPromiseChain = Promise.resolve();
    recorder.records.forEach(el => {
      playbackPromiseChain = playbackPromiseChain
        .then(setActive.bind(null, el))
        .then(setInactive.bind(null, el));
    });
    playbackPromiseChain
      .then(recorder.reset)
      .catch(recorder.reset);
  }
}

window.onload = () => {
  recorder = new Recorder();
  window.play = recorder.play.bind(recorder);
  document.onclick = recorder.record;
};
