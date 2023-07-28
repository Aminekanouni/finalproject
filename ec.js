
/****login code */
// Function to handle the "Log in" button click and redirect to another page
function handleLoginButtonClick() {
  window.location.href = "another-page.html"; // Replace "another-page.html" with the URL of the page you want to open
}

// Add event listener to the "Log in" button
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", handleLoginButtonClick);
