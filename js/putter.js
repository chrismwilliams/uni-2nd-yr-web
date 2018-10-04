/* eslint-env jquery */

// Store all image tabs in variable
const tabs = document.querySelectorAll(".img_tabs img");

// Function to change main image on page with the tab image clicked
function tabClicked() {
  // Set a var to the src of tab clicked
  let imgSrc = this.getAttribute("src");
  // Update src of main image
  $(this)
    .parent()
    .prev(".main_img")
    .find("img")
    .attr("src", imgSrc);
}

// Click event listener for each image tab
tabs.forEach(tab => tab.addEventListener("click", tabClicked));
