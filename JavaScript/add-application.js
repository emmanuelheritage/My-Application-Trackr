document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  const cancelBtn = document.getElementById('cancelBtn');

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Application Data Saved:', data);

    alert('Application added successfully!');
    form.reset();
  });

  // Handle Cancel Button
  cancelBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the form?')) {
      form.reset();
    }
  });

  // Calendar Icon
  document.querySelectorAll('.icon-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const dateInput = trigger.previousElementSibling;

      // Highlight the input when icon is clicked
      dateInput.classList.add('active-date');

      
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
      setTimeout(() => dateInput.classList.remove('active-date'), 1000);
    });
  });
});
