//Profile Settings

const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("fileInput");
const preview = document.querySelectorAll("#profile-photo");


document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user")
  const username = localStorage.getItem("username").toUpperCase();
  if (user && username){
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`
    const profileIcon = document.querySelectorAll("#profile-photo");
    profileIcon.forEach((profileIcon) => {
    profileIcon.src = avatarUrl;
    });
  }
});

// Open file picker when button is clicked
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

// upload profile photo
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const user = JSON.parse(localStorage.getItem("user"));

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const profileImage = e.target.result
      const key = `profileImage_${user.email}`;

      localStorage.setItem(key, profileImage);

      preview.forEach((img) => {
        img.src = profileImage;
      })
    };

    reader.readAsDataURL(file);
  }
});
// load profile photo and use initials as callbacks
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // const userInitials = localStorage.getItem("user");
  const username = localStorage.getItem("username").toUpperCase();
  if (user){
    const key = `profileImage_${user.email}`;
    const savedProfilePhoto = localStorage.getItem(key);
    if (savedProfilePhoto){
  preview.forEach((preview) => {
    preview.src = savedProfilePhoto
  })
}
  } else if (user && username){
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`
    const profileIcon = document.querySelectorAll("#profile-photo");
    profileIcon.forEach((profileIcon) => {
    profileIcon.src = avatarUrl;
    });
  }

  });
