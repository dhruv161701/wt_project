document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Get all form elements
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const birthdateInput = document.getElementById('birthdate');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Get all error elements
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const birthdateError = document.getElementById('birthdateError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Set max date for birthdate (today)
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.setAttribute('max', today);

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Toggle confirm password visibility
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Email validation function with the provided regex
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    // Username validation function
    function validateUsername(username) {
        return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
    }

    // Birthdate validation function
    function validateBirthdate(birthdate) {
        if (!birthdate) return false;
        const selectedDate = new Date(birthdate);
        const today = new Date();
        
        // Check if date is not in future and person is at least 13 years old
        const age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
            age--;
        }
        
        return selectedDate <= today && age >= 13;
    }
    
    // Phone validation function
    function validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    
    // Password validation function
    function validatePassword(password) {
        // Password must be at least 8 characters long and contain at least one uppercase letter,
        // one lowercase letter, one number, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            emailError.textContent = 'Email is required';
        } else if (!validateEmail(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });

    // Real-time username validation
    usernameInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            usernameError.textContent = 'Username is required';
        } else if (!validateUsername(this.value)) {
            usernameError.textContent = 'Username must be at least 3 characters long and contain only letters, numbers, and underscores';
        } else {
            usernameError.textContent = '';
        }
    });

    // Real-time birthdate validation
    birthdateInput.addEventListener('change', function() {
        if (!this.value) {
            birthdateError.textContent = 'Birth date is required';
        } else if (!validateBirthdate(this.value)) {
            birthdateError.textContent = 'Invalid birth date. You must be at least 13 years old';
        } else {
            birthdateError.textContent = '';
        }
    });
    
    // Real-time phone validation
    phoneInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
        } else if (!validatePhone(this.value)) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
        } else {
            phoneError.textContent = '';
        }
    });
    
    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            passwordError.textContent = 'Password is required';
        } else if (!validatePassword(this.value)) {
            passwordError.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        } else {
            passwordError.textContent = '';
        }
        // Check confirm password match if it has a value
        if (confirmPasswordInput.value) {
            if (confirmPasswordInput.value !== this.value) {
                confirmPasswordError.textContent = 'Passwords do not match';
            } else {
                confirmPasswordError.textContent = '';
            }
        }
    });

    // Real-time confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
        } else if (this.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all error messages
        emailError.textContent = '';
        usernameError.textContent = '';
        birthdateError.textContent = '';
        phoneError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        
        let isValid = true;
        
        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        // Validate username
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username is required';
            isValid = false;
        } else if (!validateUsername(usernameInput.value)) {
            usernameError.textContent = 'Username must be at least 3 characters long and contain only letters, numbers, and underscores';
            isValid = false;
        }

        // Validate birthdate
        if (!birthdateInput.value) {
            birthdateError.textContent = 'Birth date is required';
            isValid = false;
        } else if (!validateBirthdate(birthdateInput.value)) {
            birthdateError.textContent = 'Invalid birth date. You must be at least 13 years old';
            isValid = false;
        }
        
        // Validate phone
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            phoneError.textContent = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
            isValid = false;
        }

        // Validate confirm password
        if (confirmPasswordInput.value.trim() === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
        
        // If form is valid, you can submit it
        if (isValid) {
            // Here you would typically send the form data to a server
            console.log('Form is valid, submitting...');
            // loginForm.submit(); // Uncomment this line when ready to submit
        }
    });
});