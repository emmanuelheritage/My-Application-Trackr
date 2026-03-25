const baseUrl = "https://my-application-tracker.onrender.com";
const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const form = document.getElementById("loginForm");
const loginButton = form.querySelector('button[type="submit"]');
const defaultButtonHTML = loginButton.innerHTML;
const formMessage = document.getElementById("formMessage");

function showFormMessage(type, message) {
  formMessage.textContent = message;
  formMessage.classList.remove("error", "success");
  formMessage.classList.add("is-visible", type);
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.classList.remove("is-visible", "error", "success");
}

function setLoadingState(isLoading) {
  loginButton.disabled = isLoading;
  loginButton.innerHTML = isLoading ? "Logging in..." : defaultButtonHTML;
}

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
});

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page refresh
  clearFormMessage();

  const email = document.getElementById("emailInput").value.trim();
  const password = passwordInput.value.trim();

  // simple validation
  if (email === "" || password === "") {
    showFormMessage("error", "Please fill in all fields.");
    return;
  }

  setLoadingState(true);

  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      showFormMessage(
        "error",
        data.message || "Login failed. Please try again.",
      );
      return;
    }

    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    showFormMessage("success", data.message || "Login successful!");
    setTimeout(() => {
      window.location.href = "mainboard.html";
    }, 900);
  } catch (error) {
    showFormMessage(
      "error",
      "Unable to login right now. Please check your connection and try again.",
    );
  } finally {
    setLoadingState(false);
  }
});
