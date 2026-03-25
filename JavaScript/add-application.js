document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://my-application-tracker.onrender.com";
  const form = document.getElementById("applicationForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = form.querySelector('button[type="submit"]');
  const defaultButtonLabel = submitBtn.textContent;
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
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? "Adding..." : defaultButtonLabel;
  }

  // Handle Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearFormMessage();

    const token = localStorage.getItem("authToken");
    if (!token) {
      showFormMessage(
        "error",
        "Your session has expired. Please log in again.",
      );
      return;
    }

    const company = document.getElementById("company").value.trim();
    const position = document.getElementById("position").value.trim();
    const status = document.getElementById("status").value;
    const followUpDate = document.getElementById("followUpDate").value;
    const allowedStatuses = ["pending", "accepted", "rejected"];

    if (!company || !position || !status || !followUpDate) {
      showFormMessage("error", "Please fill in all required fields.");
      return;
    }

    if (!allowedStatuses.includes(status)) {
      showFormMessage(
        "error",
        "Status must be pending, accepted, or rejected.",
      );
      return;
    }

    const payload = {
      company,
      position,
      status,
      followUpDate,
    };

    setLoadingState(true);

    try {
      const response = await fetch(`${baseUrl}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          showFormMessage(
            "error",
            "You are not authorized. Please log in again.",
          );
          setTimeout(() => {
            window.location.href = "log-in.html";
          }, 1200);
          return;
        }

        const validationMessage =
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors.map((err) => err.msg).join(" ")
            : null;

        showFormMessage(
          "error",
          validationMessage ||
            data.message ||
            "Failed to add application. Please try again.",
        );
        return;
      }

      showFormMessage(
        "success",
        data.message || "Application added successfully.",
      );
      form.reset();
    } catch (error) {
      showFormMessage(
        "error",
        "Unable to save right now. Please check your connection and try again.",
      );
    } finally {
      setLoadingState(false);
    }
  });

  // Handle Cancel Button
  cancelBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the form?")) {
      form.reset();
    }
  });

  // Calendar Icon
  document.querySelectorAll(".icon-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const dateInput = trigger.previousElementSibling;

      // Highlight the input when icon is clicked
      dateInput.classList.add("active-date");

      // Try to open native date picker
      if (dateInput.showPicker) {
        dateInput.showPicker();
      } else {
        // Fallback for browsers without showPicker
        dateInput.focus();
        // Optionally simulate a click to open some custom picker
        dateInput.click();
      }

      // Remove highlight after short delay
      setTimeout(() => dateInput.classList.remove("active-date"), 1000);
    });
  });
});
