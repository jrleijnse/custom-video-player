const videoScreen = document.querySelector(".viewer");

const progress = document.querySelector(".progress");

const progressBar = document.querySelector(".progress__filled");
const media = document.querySelector("video");
const playBtn = document.querySelector(".player__button.toggle");
const rewindBtn = document.querySelector('.player__button[data-skip="-10"]');
const forwardBtn = document.querySelector('.player__button[data-skip="25"]');
const volume = document.querySelector('.player__slider[name="volume"]');
const playbackRate = document.querySelector(
  '.player__slider[name="playbackRate"]'
);

const playVideo = function () {
  if (media.paused) {
    media.play();
  } else {
    media.pause();
  }
};

const playVideoSpace = function (e) {
  if (e.code === "Space") {
    if (media.paused) {
      media.play();
    } else {
      media.pause();
    }
  }
};

const updateButton = function () {
  this.paused ? (playBtn.textContent = "►") : (playBtn.textContent = "❚ ❚");
};

const forward = function () {
  media.currentTime += +this.getAttribute("data-skip", "25");
};

const rewind = function () {
  media.currentTime += +this.getAttribute("data-skip", "-10");
};

const arrowDuration = function (e) {
  if (e.key === "ArrowLeft") {
    media.currentTime += +rewindBtn.getAttribute("data-skip", "-10");
  }

  if (e.key === "ArrowRight") {
    media.currentTime += +forwardBtn.getAttribute("data-skip", "25");
  }
};

const handleProgress = function () {
  progressBar.style.flexBasis = `${(100 / media.duration) * this.currentTime}%`;
};

volume.addEventListener("input", function (e) {
  media.volume = e.currentTarget.value;
});
playbackRate.addEventListener("input", function (e) {
  media.playbackRate = e.currentTarget.value;
});

window.addEventListener("keyup", playVideoSpace);
window.addEventListener("keydown", arrowDuration);
videoScreen.addEventListener("click", playVideo);
playBtn.addEventListener("click", playVideo);
videoScreen.addEventListener("play", updateButton);
videoScreen.addEventListener("pause", updateButton);

forwardBtn.addEventListener("click", forward);
rewindBtn.addEventListener("click", rewind);
videoScreen.addEventListener("timeupdate", handleProgress);
