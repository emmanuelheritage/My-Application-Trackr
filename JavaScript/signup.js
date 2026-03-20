// Eye icon toggle - Password
document.getElementById('togglePassword').addEventListener('click', function() {
  const input = document.getElementById('password');
  if (input.type === 'password') {
    input.type = 'text';
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
  } else {
    input.type = 'password';
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
  }
});

// Eye icon toggle - Confirm Password
document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
  const input = document.getElementById('confirmPassword');
  if (input.type === 'password') {
    input.type = 'text';
    this.classList.remove('fa-eye-slash');
    this.classList.add('fa-eye');
  } else {
    input.type = 'password';
    this.classList.remove('fa-eye');
    this.classList.add('fa-eye-slash');
  }
});

// Form validation on submit
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const terms = document.getElementById('terms').checked;

  if (!fullName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (!terms) {
    alert('Please accept the terms!');
    return;
  }

  window.location.href = 'mainboard.html';
});