const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const form = document.getElementById("loginForm");

// toggle password visibility
togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.classList.remove("ph-eye-slash");
    togglePassword.classList.add("ph-eye");
  } else {
    passwordInput.type = "password";
    togglePassword.classList.remove("ph-eye");
    togglePassword.classList.add("ph-eye-slash");
  }
})

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page refresh

  const email = document.getElementById("emailInput").value;
  const password = passwordInput.value;

  //simple validation
  if (email === "" || password === "") {
    alert ("please fill in all fields");
    return;
  }

  //simulate login success
  alert("Login successful!");

  //Redirect (optional)
  window.location.href = "mainboard.html";
});
