// Function to handle sign in
function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;
  
    // Here, you can perform login validation and any other necessary actions.
    // For this example, we'll just log the input values and the "Remember Me" status.
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  
    // Save email and password to local storage if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem("savedEmail", email);
      localStorage.setItem("savedPassword", password);
    } else {
      // If "Remember Me" is not checked, remove any previously saved data
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  
    // Password validation
    const passwordInput = document.getElementById("password");
    const messageElement = document.createElement("div");
    messageElement.className = "password-message";
  
    if (password.length < 3) {
      passwordInput.classList.add("weak-password");
      messageElement.textContent = "Your password is very weak!";
    } else if (password.length < 6 || !/\d/.test(password)) {
      passwordInput.classList.add("medium-password");
      messageElement.textContent = "Your password is weak!";
    } else {
      passwordInput.classList.remove("weak-password", "medium-password");
    }
  
    // Remove previous messages
    const previousMessage = passwordInput.parentElement.querySelector(".password-message");
    if (previousMessage) {
      previousMessage.remove();
    }
  
    // Add message element if applicable
    if (messageElement.textContent) {
      passwordInput.parentElement.appendChild(messageElement);
    }
  }
  
  // Function to retrieve saved email and password on page load
  function retrieveSavedCredentials() {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
  
    // Check if any saved email and password are present
    if (savedEmail && savedPassword) {
      const emailField = document.getElementById("email");
      const passwordField = document.getElementById("password");
      const rememberMeCheckbox = document.getElementById("rememberMe");
  
      emailField.value = savedEmail;
      passwordField.value = savedPassword;
      rememberMeCheckbox.checked = true; // Check the "Remember Me" checkbox
    }
  }
  
  // Call the function to retrieve saved credentials on page load
  retrieveSavedCredentials();
  
  // Function to toggle password visibility
  function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("showPassword");
  
    if (showPasswordCheckbox.checked) {
      passwordField.setAttribute("type", "text");
    } else {
      passwordField.setAttribute("type", "password");
    }
  }
  