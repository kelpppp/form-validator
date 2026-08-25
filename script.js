// get elements from HTML
const form = document.getElementById("registrationForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword")
const submitButton = document.getElementById("submitButton");

let isFormValid = false;

// event listeners: input field and submit

form.addEventListener("focusout", (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
        toggleClass(submitButton, "error", "success");
    } else {
        toggleClass(submitButton, "success", "error");
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    
    if (isFormValid) {
        alert("Registration successful!");
        form.reset();
        document.querySelectorAll(".form-group").forEach((group) => {
            group.className = "form-group";
        });
    }
});

// function to validate form by calling check functions on each input

function validateForm() {
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

    if (!isRequiredValid) { return false; }

    const isUsernameValid = checkName(username);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 20);
    const isPasswordMatch = checkPasswordMatch(password, confirmPassword);
    
    return isUsernameValid && isEmailValid && isPasswordValid && isPasswordMatch;
};

// Check functions used in validateForm()

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `Passwords do not match`);
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
};

function checkName(username) {
    const nameParts = username.value.trim("").split(/\s+/);
    if (nameParts.length >= 2 && nameParts.every(part => part.length > 0)) {
        showSuccess(username);
        return true;
    } else {
        showError(username, `Please enter your full name.`);
        return false;
    }
};

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, `Email is not valid`);
        return false;
    }
};

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
};

function checkRequired(inputArray) {
    let isValid = true;
    inputArray.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `This field is required.`);
            isValid = false;
        } else {
            showSuccess(input);
            isValid = true;
        }
    });

    return isValid;

};

// Change DOM: show error or show success

function showError(input, message) {
    const formGroup = input.parentElement;
    toggleClass(formGroup, "success", "error");
    const errorSpan = formGroup.querySelector("span");
    errorSpan.textContent = message;
};

function showSuccess(input) {
    const formGroup = input.parentElement;
    toggleClass(formGroup, "error", "success");
};

// Helper functions

function toggleClass(element, classToRemove, classToAdd) {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
};

function formatFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
