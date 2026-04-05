const container = document.querySelector(".div-container");
const cancelBtn = document.getElementById("cancelBtn");
const logoutBtn = document.getElementById("logoutBtn");

// show popup when page loads (optional)
window.onload = () => {
  container.style.display = "flex";
};

// cancel button closes popup
cancelBtn.addEventListener("click", () =>{
  container.style.display = "none";
});

// logout button action
logoutBtn.addEventListener("click", () =>{
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    localStorage.removeItem(`profileImage_${user.email}`);
  }
  alert("you have been logged out!");

  // Example redirect (optional)
  window.location.href = "Login.html";
});

// Close when clicking outside popup
window.addEventListener("click", (e) => {
  if (e.target === container) {
    container.style.display = "none";
  }
});