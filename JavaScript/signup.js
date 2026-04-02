// Eye icon toggle - Password
const baseUrl = "https://my-application-tracker.onrender.com";
const signupForm = document.getElementById("signupForm");
const signupButton = signupForm.querySelector('button[type="submit"]');
const defaultButtonLabel = signupButton.textContent;
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
  signupButton.disabled = isLoading;
  signupButton.classList.toggle("is-loading", isLoading);
  signupButton.textContent = isLoading
    ? "Creating account..."
    : defaultButtonLabel;
}

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    } else {
      input.type = "password";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    }
  });

// Eye icon toggle - Confirm Password
document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    const input = document.getElementById("confirmPassword");
    if (input.type === "password") {
      input.type = "text";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    } else {
      input.type = "password";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    }
  });

// Form validation and register request on submit
signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  clearFormMessage();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const terms = document.getElementById("terms").checked;

  if (!fullName || !email || !password || !confirmPassword) {
    showFormMessage("error", "Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    showFormMessage("error", "Passwords do not match.");
    return;
  }

  if (!terms) {
    showFormMessage("error", "Please accept the terms.");
    return;
  }

  setLoadingState(true);

  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      showFormMessage(
        "error",
        data.message || "Registration failed. Please try again.",
      );
      return;
    }

    showFormMessage("success", data.message || "Registration successful!");
    setTimeout(() => {
      window.location.href = "log-in.html";
    }, 1200);
  } catch (error) {
    showFormMessage(
      "error",
      "Unable to register right now. Please check your connection and try again.",
    );
  } finally {
    setLoadingState(false);
  }
});
