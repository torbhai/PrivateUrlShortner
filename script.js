// Get the HTML elements
var urlInput = document.getElementById("url-input");
var shortenButton = document.getElementById("shorten-button");
var result = document.getElementById("result");

// Add an event listener to the shorten button
shortenButton.addEventListener("click", function() {
  // Get the long URL from the input
  var longURL = urlInput.value;

  // Validate the URL
  if (longURL && isValidURL(longURL)) {
    // Generate a random string for the short URL
    var shortURL = generateRandomString();

    // Send the long and short URLs to the server using AJAX
    sendURLs(longURL, shortURL);

    // Display the short URL to the user
    result.innerHTML = "Your short URL is: " + window.location.href + shortURL;
  } else {
    // Display an error message to the user
    result.innerHTML = "Please enter a valid URL";
  }
});

// A function to check if a URL is valid
function isValidURL(url) {
  // Use a regular expression to test the URL format
  var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
}

// A function to generate a random string of 4 characters
function generateRandomString() {
  // Use the characters A-Z, a-z, 0-9
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Initialize an empty string
  var randomString = "";

  // Loop 4 times
  for (var i = 0; i < 4; i++) {
    // Pick a random character from the chars string
    var randomIndex = Math.floor(Math.random() * chars.length);
    var randomChar = chars[randomIndex];

    // Append the random character to the random string
    randomString += randomChar;
  }

  // Return the random string
  return randomString;
}

// A function to send the long and short URLs to the server using AJAX
function sendURLs(longURL, shortURL) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Specify the request method and the URL
  xhr.open("POST", "shorten.php");

  // Set the request header to indicate the content type
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Create a query string with the long and short URLs as parameters
  var params = "longURL=" + encodeURIComponent(longURL) + "&shortURL=" + encodeURIComponent(shortURL);

  // Send the request with the query string
  xhr.send(params);
}
