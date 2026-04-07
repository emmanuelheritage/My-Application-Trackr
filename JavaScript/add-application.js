  const user = JSON.parse(localStorage.getItem("user"));
  if (!user){
    window.location.href = "log-in.html"
    alert("You need to log in to add application");
  }

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "https://my-application-tracker.onrender.com";
  const form = document.getElementById("applicationForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const submitBtn = form.querySelector('button[type="submit"]');
  const defaultButtonLabel = submitBtn.textContent;
  const formMessage = document.getElementById("formMessage");
  const user = JSON.parse(localStorage.getItem("user"));
  const savedProfilePhoto = localStorage.getItem(`profileImage_${user.email}`);
  const username = localStorage.getItem("username").toUpperCase();
  const profileIcon = document.getElementById("profile-photo");

//  User profile photo display
  if (savedProfilePhoto){
   profileIcon.src = savedProfilePhoto;
  } else if (user && username){
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`
    profileIcon.src = avatarUrl;
  }


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
    const dateApplied = document.getElementById("dateApplied").value;
    const followUpDate = document.getElementById("followUpDate").value;
    const allowedStatuses = ["Applied", "Interviewing", "Offered", "Rejected"];

    if (!company || !position || !status || !dateApplied || !followUpDate) {
      showFormMessage("error", "Please fill in all required fields.");
      return;
    }

    if (!allowedStatuses.includes(status)) {
      showFormMessage(
        "error",
        "Status must be Applied, Interviewing, Offered  or Rejected.",
      );
      return;
    } 

    const payload = {
      companyName: company,
      position,
      jobTitle: position,
      status,
      dateApplied,
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
      // console.log(data);

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
      window.location.href = "mainboard.html";
    } catch (error) {
      showFormMessage(
        "error",
        "Unable to save right now. Please check your connection and try again.",
      );
    } finally {
      setLoadingState(false);
    }
  });
  
  // const profileIcon = document.getElementById("profile-photo")
  // profileIcon.src =

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
