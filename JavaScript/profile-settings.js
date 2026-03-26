//Profile Settings

const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("profilePreview");

// Open file picker when button is clicked
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

// Show preview when image is selected
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
