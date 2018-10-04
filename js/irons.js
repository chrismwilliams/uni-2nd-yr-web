// Audio element selectors
const audio = document.querySelector("audio");
const sliders = document.querySelectorAll("input[type = range]");
const ctrl_btn = document.querySelector(".control");

// Icon
const icon = document.querySelector(".control i");

// Volume buttons
const volume_btns = document.querySelectorAll(".volume_btn");

// Function to update the range element called seek to current audio position
function updateSeek() {
  let currentPos = (audio.currentTime / audio.duration) * 100;
  sliders[0].value = currentPos;
}

// Update the icon depending on state of audio
function updateIcon() {
  icon.classList.toggle("fa-pause");
  icon.classList.toggle("fa-play");
}

// Function to toggle playing/pausing audio
function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Function called by both range elements to set the audio to
function sliderChange() {
  let newVal = this.value;

  // If name is equal to currentTime
  if (this.name == "currentTime") {
    // Set the newVal var to represent duration of track
    newVal = audio.duration * (this.value / 100);
  }
  // Access audio properties and assign value
  audio[this.name] = newVal;
}

// Function called by the volume buttons
function updateVolume() {
  let vol_value = this.dataset.range;
  audio.volume = vol_value;
  // Update volume slider to reflect change
  sliders[1].value = vol_value;
}

// Audio event listeners
audio.addEventListener("timeupdate", updateSeek);
audio.addEventListener("play", updateIcon);
audio.addEventListener("pause", updateIcon);

// Button event listeners
ctrl_btn.addEventListener("click", playPause);
volume_btns.forEach(btn => btn.addEventListener("click", updateVolume));

// Slider event listeners
sliders.forEach(slider => slider.addEventListener("change", sliderChange));
sliders[0].addEventListener("mousedown", function() {
  audio.pause();
});
sliders[0].addEventListener("mouseup", function() {
  audio.play();
});
