const videoScreen = document.querySelector(".viewer");
const media = document.querySelector("video");
const playBtn = document.querySelector(".player__button.toggle");
const rewindBtn = document.querySelector('.player__button[data-skip="-10"]');
const forwardBtn = document.querySelector('.player__button[data-skip="25"]');
const volume = document.querySelector('.player__slider[name="volume"]');
const playbackRate = document.querySelector(
  '.player__slider[name="playbackRate"]'
);

const updateButton = function () {
  media.paused ? (playBtn.textContent = "❚ ❚") : (playBtn.textContent = "►");
};

const playVideo = function () {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
};

const forward = function () {
  media.currentTime += +forwardBtn.getAttribute("data-skip", "25");
};

const rewind = function () {
  media.currentTime += +rewindBtn.getAttribute("data-skip", "-10");
};

volume.addEventListener("input", function (e) {
  media.volume = e.currentTarget.value;
});
playbackRate.addEventListener("input", function (e) {
  media.playbackRate = e.currentTarget.value;
});

forwardBtn.addEventListener("click", forward);
rewindBtn.addEventListener("click", rewind);
playBtn.addEventListener("click", playVideo);
videoScreen.addEventListener("click", playVideo);
videoScreen.addEventListener("keyup", playVideo);
videoScreen.addEventListener("play", updateButton);
videoScreen.addEventListener("pause", updateButton);
