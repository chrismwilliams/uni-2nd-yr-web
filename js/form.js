/* eslint-env jquery */

// Store input elements and submit button
const inputs = document.querySelectorAll("input[required]");
const submitBtn = document.querySelector("button");

// Store canvas elements
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let canvasX = canvas.width / 2;
let canvasY = canvas.height / 2;
const ball = {
  x: -10,
  y: canvasY + 40,
  speed: 2,
  holed: false,
  decreaseSpeed: 0.002
};

// Start canvas animation
function startCanvas() {
  // Background
  ctx.fillStyle = "#3A7D44";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cup
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.beginPath();
  ctx.arc(canvasX + 0.5, canvasY + 40, 5, 0, Math.PI * 2);
  ctx.fill();

  // Flag stick
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(canvasX, canvasY - 40, 1, 80);

  // Flag
  ctx.fillStyle = "#FF220C";
  ctx.beginPath();
  ctx.moveTo(canvasX - 10, canvasY - 30);
  ctx.lineTo(canvasX, canvasY - 20);
  ctx.lineTo(canvasX, canvasY - 40);
  ctx.fill();

  // Check if the ball is 'holed'
  if (!ball.holed) {
    // Ball
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 2, 0, Math.PI * 2);
    ctx.fill();

    // Check the position of the ball and decrease speed randomly
    if (ball.x >= canvasX - 300) {
      ball.speed -= Math.random() * 0.0065;
    }

    // If the ball is in the cup, so drawing it and reset it after a random number
    if (ball.x >= canvasX || ball.x < -14) {
      ball.holed = true;
      setTimeout(() => {
        resetBall();
      }, Math.floor(Math.random() * 5000) + 1000);
    }
    // Slowly reduce ball speed
    ball.speed -= ball.decreaseSpeed;

    // Increment ball speed
    ball.x += ball.speed;
  }
  // Continue to request the Animation
  requestAnimationFrame(startCanvas);
}

// Function to reset the ball
function resetBall() {
  ball.x = -10;
  ball.speed = 2;
  ball.holed = false;
}

// Name Expression
const validNameEX = /^[a-zA-Z.' ]{2,25}$/;
// Email Expression
const validEmailEX = /^[\w.\-]+@[\w.\-]+\.[A-Za-z]{2,}$/;

// Function to check the input(s) value is legible
function checkInput(el) {
  // Assign input var with correct element
  let input = el.type == "blur" ? this : el;

  // If param passed it == blur and the value is empty, return and give the user a chance to return to it before showing error
  if (el.type == "blur" && this.value == "") {
    return;
  }

  // Get the value
  let value = input.value.trim();

  // If type is email, run value against validEmailEX regular expression
  if (input.type == "email") {
    if (!validEmailEX.test(value)) {
      // If it failed, call showError and pass the correct message
      showError(input, "Please enter a valid email address");
      return false;
    }
  } else {
    // Run value against the validNameEX regular expression
    if (!validNameEX.test(value)) {
      // If failed, call showError with element and message
      showError(input, "Please enter a valid name between 2 - 20 characters");
      return false;
    }
  }
  return true;
}

// Function to clear the error on the correct input focus
function clearError() {
  $(this)
    .next()
    .text("");
}

// Function to display the error message under correct input
function showError(el, message) {
  $(el)
    .next()
    .text(message);
}

// Function to display a pop-up and a relevant message
function displayToast(txt) {
  // Create a div with a class of toast for styling
  let $toast = $("<div>", { class: "toast" });

  // Put txt param into div
  $toast.text(txt);
  // Add to the body
  $toast.appendTo($("body"));

  // Fade the popup in, wait 4000s, then fade out and remove
  $toast.fadeIn("slow", function() {
    $(this)
      .delay(4000)
      .fadeOut("slow", function() {
        $(this).remove();
      });
  });
}

// Function to check the form inputs and returns true or false if any input fails
function checkForm() {
  let result = [];
  // Check inputs again and add result to result array
  inputs.forEach(input => {
    result.push(checkInput(input));
    result.push(input.value != "");
  });
  // Check if any are false
  return !result.includes(false);
}

// Function to check the form on submitting, if values aren't correct return and show message(s) otherwise POST values
function formSubmit(e) {
  // Prevent default with the page reloading
  e.preventDefault();

  // Check input values again
  if (!checkForm()) {
    // If any are false return and don't POST
    return;
  }

  // POST the form via ajax
  $.ajax({
    url: "http://www.alade.zjnucomputing.com/mailing.php",
    type: "POST",
    dataType: "html",
    cache: false,
    data: {
      firstname: inputs[0].value.trim(),
      lastname: inputs[1].value.trim(),
      emailaddress: inputs[2].value.trim()
    },
    // Error on POST
    error: function(err) {
      // console.log(err)
      // Display error to user
      displayToast("Oops something went wrong");
    },
    success: function(data) {
      // Clear form
      inputs.forEach(input => (input.value = ""));
      // Display success toast
      displayToast(data);
    }
  });
}

$(function() {
  startCanvas();
});

// Event listeners
// Add blur and focus listeners to each input
inputs.forEach(input => input.addEventListener("blur", checkInput));
inputs.forEach(input => input.addEventListener("focus", clearError));

// Click event on button
submitBtn.addEventListener("click", formSubmit);
