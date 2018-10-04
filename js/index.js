// Get both adverts with the data-ad attribute
let articleAds = document.querySelectorAll("article[data-ad]");

// Function to set the right ad on the page
function setAdvert(adID) {
  // Change the ad to another
  let ad = adID == 0 ? 1 : 0;

  // Access the articleAds variable with the ad var and set the display to block
  articleAds[ad].style.display = "block";

  // Store the ad into local storage
  localStorage.setItem("lastAd", ad.toString());
}

// Event listener fire once the dom is loaded
$(function() {
  // Get the last advert or set to 1 & call function setAdvert
  let advertID = parseInt(localStorage.getItem("lastAd") || "1");
  setAdvert(advertID);
});
