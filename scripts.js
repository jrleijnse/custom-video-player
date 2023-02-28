const videoScreen = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const media = document.querySelector("video");
const playBtn = document.querySelector(".player__button.toggle");
const skipButtons = document.querySelectorAll(".player__button[data-skip]");
// const volume = document.querySelector('.player__slider[name="volume"]');
// const playbackRate = document.querySelector(
//   '.player__slider[name="playbackRate"]'
// );
const ranges = document.querySelectorAll("[type=range]");

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

const skip = function () {
  if (this.dataset.skip === "25") {
    media.currentTime += +this.dataset.skip;
  }
  if (this.dataset.skip === "-10") {
    media.currentTime += +this.dataset.skip;
  }
};

function handleRangeUpdate() {
  media[this.name] = this.value;
}

const handleProgress = function () {
  progressBar.style.flexBasis = `${(100 / this.duration) * this.currentTime}%`;
};

const selectTimestamp = function (e) {
  const timeStamp = (e.offsetX / progress.offsetWidth) * media.duration;
  media.currentTime = timeStamp;
};

const arrowDuration = function (e) {
  if (e.key === "ArrowLeft") {
    media.currentTime += -10;
  }

  if (e.key === "ArrowRight") {
    media.currentTime += 25;
  }
};

window.addEventListener("keydown", playVideoSpace);
window.addEventListener("keydown", arrowDuration);

videoScreen.addEventListener("click", playVideo);
videoScreen.addEventListener("play", updateButton);
videoScreen.addEventListener("pause", updateButton);
videoScreen.addEventListener("timeupdate", handleProgress);

playBtn.addEventListener("click", playVideo);
skipButtons.forEach((button) => button.addEventListener("click", skip));

// volume.addEventListener("input", function (e) {
//   media.volume = e.currentTarget.value;
// });
// playbackRate.addEventListener("input", function (e) {
//   media.playbackRate = e.currentTarget.value;
// });
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", selectTimestamp);
progress.addEventListener("mousemove", (e) => mousedown && selectTimestamp(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
