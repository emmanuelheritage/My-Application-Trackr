
// User profile photo
document.addEventListener("DOMContentLoaded", () => {
  // const user = localStorage.getItem("user")
  const user = JSON.parse(localStorage.getItem("user"));
  const savedProfilePhoto = localStorage.getItem(`profileImage_${user.email}`);
  const username = localStorage.getItem("username").toUpperCase();
  const profileIcon = document.getElementById("profile-photo");

  if (savedProfilePhoto){
   profileIcon.src = savedProfilePhoto;
  } else if (user && username){
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`
    profileIcon.src = avatarUrl;
  }
});
