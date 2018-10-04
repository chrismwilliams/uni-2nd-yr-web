/* eslint-env jquery */
// Modal stuff
const modalImgs = document.querySelectorAll(".modal_imgs img");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal_content");
const modalImg = document.querySelector(".modal_content img");
const modalCloseBtn = document.querySelector(".modal_content header div");

// Video stuff
const video = document.querySelector("video");
const sliders = document.querySelectorAll("input[type = range]");
const control = document.querySelector(".control");
const icon = control.querySelector(".control i");
const volume_btns = document.querySelectorAll(".volume_btn");

// Global variables
let interval;
let i = 0;

// Modal function used to set the image and start setInterval function
function modalIN() {
  // Get the src value of the image clicked and set modalImg to it
  let imgSrc = this.getAttribute("src");
  modalImg.src = imgSrc;

  // Set display to block to display modal
  modal.style.display = "block";

  // Call the fadeIn function repeatedly using setInterval
  interval = setInterval(fadeIn, 7);
}

// Function to increment the modalContent's width, height and opacity
function fadeIn() {
  i += 20;
  if (i > 500) {
    // Stop the interval as modal has reached it's max
    modalImg.style.opacity = 1;
    clearInterval(interval);
  } else {
    // Increment the height, width and opacity
    modalContent.style.width = i + "px";
    modalContent.style.height = i + "px";
    modalContent.style.opacity = i / 500;
    modalImg.style.opacity += i / 500;
    console.log(modalImg.style.opacity);
  }
}

// Call the setInterval method to repeatedly call fadeOut function
function modalOut() {
  interval = setInterval(fadeOut, 7);
}

// Function to remove the modal, opposite to fadeIn function
function fadeOut() {
  i -= 20;
  if (i < 0) {
    // Remove modal
    modal.style.display = "none";
    modalImg.style.opacity = 0;
    // Clear interval
    clearInterval(interval);
  } else {
    // Decrement modalContent width, height and opacity
    modalContent.style.width = i + "px";
    modalContent.style.height = i + "px";
    modalContent.style.opacity = i / 500;
    modalImg.style.opacity -= i / 1750;
  }
}

// Function to play and pause video
function playPause() {
  if (video.paused) {
    // Play video
    video.play();
  } else {
    // Pause video
    video.pause();
  }
}

// Update icon depending on state of video playing
function updateIcon() {
  icon.classList.toggle("fa-pause");
  icon.classList.toggle("fa-play");
}

// Update the volume/playback of video depending on the slider that called this function
function sliderChange() {
  // Get the value
  let newVal = this.value;

  // If slider name is currentTime
  if (this.name == "currentTime") {
    // Set newVal to work between duration of video
    newVal = video.duration * (this.value / 100);
  }
  // Assign video with the new values
  video[this.name] = newVal;
}

// Update the range element name seek as the video plays
function updateSeek() {
  let currentPos = (video.currentTime / video.duration) * 100;
  sliders[0].value = currentPos;
}

// Update volume of video depending on the volume button clicked
function updateVolume() {
  let vol_value = this.dataset.range;
  video.volume = vol_value;
  // Update the slider volume range
  sliders[1].value = vol_value;
}

// All event listeners
// Add click event to each modal image
modalImgs.forEach(img => img.addEventListener("click", modalIN));

// Check that when user clicks outside the modal content (on modal not modalContent) the modal closes
$(window).click(function(e) {
  if (e.target == modal) {
    modalOut();
  }
});

// Event listener when button or element clicked
modalCloseBtn.addEventListener("click", modalOut);

// Video event listeners
video.addEventListener("click", playPause);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
video.addEventListener("timeupdate", updateSeek);

// Main button listener
control.addEventListener("click", playPause);

// Slider change event
sliders.forEach(slider => slider.addEventListener("change", sliderChange));

// First slider events play/pause video
sliders[0].addEventListener("mousedown", function() {
  video.pause();
});
sliders[0].addEventListener("mouseup", function() {
  video.play();
});

// Click event of volume buttons
volume_btns.forEach(btn => btn.addEventListener("click", updateVolume));
