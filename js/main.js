/* eslint-env jquery */

// Store the mobile button/nav and header elements. Nav menu shown when screen is < 500px
const mobileBtn = document.querySelector(".mobile_menu");
const headerEl = document.querySelector("header");
const navUl = headerEl.querySelector("nav ul");

// Store the accessibility options users can click on
const textChangeEl = document.querySelectorAll(".selectFont p");
const colourChangeEl = document.querySelectorAll(".colour div");

// Function to change the header font size to the value passed
function changeTxtSize(fontSize) {
  headerEl.style.fontSize = fontSize;
  // Set the selected font in local storage
  localStorage.setItem("font-size", fontSize);
}

// Function to change the colour of the header to the value passed
function changeColour(colour) {
  // Get the current class of the header
  let currentColour = headerEl.classList[0];
  // If it's already the same return
  if (currentColour == colour) {
    return;
  } else {
    // Toggle the class and set the preference in local  storage
    headerEl.classList.toggle("light");
    headerEl.classList.toggle("dark");
    localStorage.setItem("colourPref", colour);
  }
}

// Function to toggle the nav class of open to display/not
function toggleMenu() {
  navUl.classList.toggle("open");
}

// Document ready function
$(function() {
  // Get the value of font-size in local storage if set, otherwise set to 16px
  let size = localStorage.getItem("font-size") || "16px";
  // Call the function changeTxtSize with size var
  changeTxtSize(size);

  // Get the value of the colour preference in local storage if set, otherwise set to light
  let colour = localStorage.getItem("colourPref") || "light";
  // Call the changeColour function with the colour var
  changeColour(colour);

  // Add the class active to the current anchor in the header depending on the current path
  let path = location.pathname.substring(1);
  // Get all the header a elements
  let headerA = document.querySelectorAll("header a");
  // For each anchor check the href and compare with path var
  headerA.forEach(a => {
    if (path.includes(a.getAttribute("href"))) {
      // Match found so add active class
      a.classList.add("active");
      return;
    }
  });
});

// Mobile menu button click listener to call toggleMenu function
mobileBtn.addEventListener("click", toggleMenu);

// Event listeners for each accessibility button change text size
textChangeEl.forEach(el =>
  el.addEventListener("click", function() {
    changeTxtSize(this.dataset.fontsize + "px");
  })
);
// Event listeners for each accessibility button change header colour
colourChangeEl.forEach(el =>
  el.addEventListener("click", function() {
    changeColour(this.classList[0]);
  })
);
