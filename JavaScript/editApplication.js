const submitForm = document.querySelector('form');
const companyName = document.getElementById('company-name');
const jobTitle = document.getElementById('job-title');
const dateApplied = document.getElementById('date-applied');
const applicationType = document.getElementById('application-type');
const errorMessages = document.querySelectorAll('.error-message');


submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        window.location.href = 'followUp.html';
    };
});
function validateForm() {
    let errors = [];

    if (companyName.value === '' ) {
        errors.push('Company name is required');
        errorMessages[0].textContent = errors[0];
        companyName.classList.add("input-error")
    } else {
        companyName.classList.add("input-success")
    }
    if (jobTitle.value === '' ) {
        errors.push('Job title is required');
        errorMessages[1].textContent = errors[1];
        jobTitle.classList.add("input-error")
    } else {
        jobTitle.classList.add("input-success")
    }
    if (dateApplied.value === '' ) {
        errors.push('Date applied is required');
        errorMessages[2].textContent = errors[2];
        dateApplied.classList.add("input-error")
    } else {
        dateApplied.classList.add("input-success")
    }
    if (applicationType.value === '' ) {
        errors.push('Application type is required');
        errorMessages[3].textContent = errors[3];
        applicationType.classList.add("input-error");
    } else {
        applicationType.classList.add("input-success")
    }
    return errors.length === 0;
}

const focusableElements = [companyName, jobTitle, dateApplied, applicationType];

focusableElements.forEach(input => {
    input.addEventListener('input', () => {
        if (input.classList.contains("input-error")) {
            input.classList.remove("input-error");
            errorMessages.forEach(error => {
               error.textContent = '';
            });
        }
    });
});
