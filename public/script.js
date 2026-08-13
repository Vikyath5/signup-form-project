const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".step");

const nextBtn = document.getElementById("nextBtn");
const nextBtn2 = document.getElementById("nextBtn2");
const backBtn = document.getElementById("backBtn");
const backBtn2 = document.getElementById("backBtn2");

let currentStep = 1;


// Show the current step
function showStep(stepNumber) {
    steps.forEach((step) => {
        step.classList.remove("active");
    });

    steps[stepNumber - 1].classList.add("active");

    progressSteps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });

    currentStep = stepNumber;
    localStorage.setItem("currentStep", stepNumber);
}


// Step 1 validation
function validateStep1() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    let valid = true;

    if (name.value.trim() === "") {
        document.getElementById("nameError").textContent =
            "Full Name is required. Please enter your name.";
        valid = false;
    } else {
        document.getElementById("nameError").textContent = "";
    }

    if (email.value.trim() === "") {
        document.getElementById("emailError").textContent =
            "Email Address is required. Please enter your email.";
        valid = false;
    } else if (!email.validity.valid) {
        document.getElementById("emailError").textContent =
            "Email Address is invalid. Please enter a valid email address.";
        valid = false;
    } else {
        document.getElementById("emailError").textContent = "";
    }

    return valid;
}


// Step 2 validation
function validateStep2() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let valid = true;

    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumber = /[0-9]/.test(password.value);
    const hasSpecial = /[^A-Za-z0-9]/.test(password.value);

    if (password.value.length < 8) {
        document.getElementById("passwordError").textContent =
            "Password must be at least 8 characters. Please enter a longer password.";
        valid = false;
    } else if (!hasUppercase) {
        document.getElementById("passwordError").textContent =
            "Password must contain an uppercase letter. Please add at least one A-Z character.";
        valid = false;
    } else if (!hasLowercase) {
        document.getElementById("passwordError").textContent =
            "Password must contain a lowercase letter. Please add at least one a-z character.";
        valid = false;
    } else if (!hasNumber) {
        document.getElementById("passwordError").textContent =
            "Password must contain a number. Please add at least one 0-9 character.";
        valid = false;
    } else if (!hasSpecial) {
        document.getElementById("passwordError").textContent =
            "Password must contain a special character. Please add one such as @, #, or $.";
        valid = false;
    } else {
        document.getElementById("passwordError").textContent = "";
    }

    if (confirmPassword.value !== password.value) {
        document.getElementById("confirmPasswordError").textContent =
            "Confirm Password must match your password. Please enter the same password.";
        valid = false;
    } else {
        document.getElementById("confirmPasswordError").textContent = "";
    }

    return valid;
}


// Step 1 → Step 2
nextBtn.addEventListener("click", () => {
    if (validateStep1()) {
        showStep(2);
    }
});


// Step 2 → Step 3
nextBtn2.addEventListener("click", () => {
    if (validateStep2()) {
        updateSummary();
        showStep(3);
    }
});


// Step 2 → Step 1
backBtn.addEventListener("click", () => {
    showStep(1);
});


// Step 3 → Step 2
backBtn2.addEventListener("click", () => {
    showStep(2);
});


// Update summary
function updateSummary() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    document.getElementById("summary").innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;
}



// Validate individual fields when the user leaves them

document.getElementById("name").addEventListener("blur", () => {
    const name = document.getElementById("name");
    const error = document.getElementById("nameError");

    if (name.value.trim() === "") {
        error.textContent =
            "Full Name is required. Please enter your name.";

        name.classList.add("input-error");
        name.setAttribute("aria-invalid", "true");
    } else {
        error.textContent = "";

        name.classList.remove("input-error");
        name.setAttribute("aria-invalid", "false");
    }
});


document.getElementById("email").addEventListener("blur", () => {
    const email = document.getElementById("email");
    const error = document.getElementById("emailError");

    if (email.value.trim() === "") {
        error.textContent =
            "Email Address is required. Please enter your email.";

        email.classList.add("input-error");
        email.setAttribute("aria-invalid", "true");

    } else if (!email.validity.valid) {
        error.textContent =
            "Email Address is invalid. Please enter a valid email address.";

        email.classList.add("input-error");
        email.setAttribute("aria-invalid", "true");

    } else {
        error.textContent = "";

        email.classList.remove("input-error");
        email.setAttribute("aria-invalid", "false");
    }
});


document.getElementById("password").addEventListener("blur", () => {
    const password = document.getElementById("password");
    const error = document.getElementById("passwordError");

    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumber = /[0-9]/.test(password.value);
    const hasSpecial = /[^A-Za-z0-9]/.test(password.value);

    let message = "";

    if (password.value.length < 8) {
        message =
            "Password must be at least 8 characters. Please enter a longer password.";
    } else if (!hasUppercase) {
        message =
            "Password must contain an uppercase letter. Please add at least one A-Z character.";
    } else if (!hasLowercase) {
        message =
            "Password must contain a lowercase letter. Please add at least one a-z character.";
    } else if (!hasNumber) {
        message =
            "Password must contain a number. Please add at least one 0-9 character.";
    } else if (!hasSpecial) {
        message =
            "Password must contain a special character. Please add one such as @, #, or $.";
    }

    error.textContent = message;

    if (message) {
        password.classList.add("input-error");
        password.setAttribute("aria-invalid", "true");
    } else {
        password.classList.remove("input-error");
        password.setAttribute("aria-invalid", "false");
    }
});


document.getElementById("confirmPassword").addEventListener("blur", () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword");
    const error = document.getElementById("confirmPasswordError");

    if (confirmPassword.value !== password) {
        error.textContent =
            "Confirm Password must match your password. Please enter the same password.";

        confirmPassword.classList.add("input-error");
        confirmPassword.setAttribute("aria-invalid", "true");
    } else {
        error.textContent = "";

        confirmPassword.classList.remove("input-error");
        confirmPassword.setAttribute("aria-invalid", "false");
    }
});


// Save form data to localStorage
// Save only non-sensitive form data
const formFields = document.querySelectorAll("#signupForm input");

formFields.forEach((field) => {
    field.addEventListener("input", () => {
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        };

        localStorage.setItem("signupDraft", JSON.stringify(formData));
    });
});

// Restore saved form data
// Restore saved non-sensitive form data
const savedDraft = localStorage.getItem("signupDraft");

if (savedDraft) {
    const formData = JSON.parse(savedDraft);

    document.getElementById("name").value = formData.name || "";
    document.getElementById("email").value = formData.email || "";
}

// Restore the user's current step
const savedStep = localStorage.getItem("currentStep");

if (savedStep) {
    showStep(Number(savedStep));
}


// Submit signup form
const signupForm = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Make sure the final step is valid
    if (!validateStep1() || !validateStep2()) {
        return;
    }

    // Disable button to prevent duplicate submissions

    const serverError = document.getElementById("serverError");
serverError.textContent = "";
serverError.classList.remove("show");
    submitBtn.disabled = true;
    submitBtn.textContent = "Creating account...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        // Signup successful
        signupForm.classList.add("hidden");
        successMessage.classList.remove("hidden");

        // Clear saved draft
        localStorage.removeItem("signupDraft");
        localStorage.removeItem("currentStep");

    } catch (error) {
    const serverError = document.getElementById("serverError");

    serverError.textContent = error.message;
    serverError.classList.add("show");
} finally {
        // Enable button again
        submitBtn.disabled = false;
        submitBtn.textContent = "Create Account";
    }
});