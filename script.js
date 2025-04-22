document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    const createForm = document.getElementById('create-form');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.dataset.page;
            showPage(pageId);

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    showPage('home');

    // Client-Side Form Validation
    if (createForm) {
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const formErrors = createForm.querySelectorAll('.form-error');

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validateForm() {
            let isValid = true;

            // Clear previous errors
            formErrors.forEach(error => error.textContent = '');

            if (usernameInput.value.trim() === '') {
                formErrors[0].textContent = 'Username is required.';
                isValid = false;
            } else if (usernameInput.value.length < 3) {
                formErrors[0].textContent = 'Username must be at least 3 characters.';
                isValid = false;
            } else if (usernameInput.value.length > 20) {
                formErrors[0].textContent = 'Username cannot be more than 20 characters.';
                isValid = false;
            }

            if (emailInput.value.trim() === '') {
                formErrors[1].textContent = 'Email is required.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                formErrors[1].textContent = 'Invalid email format.';
                isValid = false;
            }

            if (passwordInput.value.trim() === '') {
                formErrors[2].textContent = 'Password is required.';
                isValid = false;
            } else if (passwordInput.value.length < 8) {
                formErrors[2].textContent = 'Password must be at least 8 characters.';
                isValid = false;
            }

            if (confirmPasswordInput.value.trim() === '') {
                formErrors[3].textContent = 'Confirm Password is required.';
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                formErrors[3].textContent = 'Passwords do not match.';
                isValid = false;
            }

            return isValid;
        }

        createForm.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                // Form is valid, you would normally submit it to the server here
                // For now, let's just log the data to the console
                const formData = {
                    username: usernameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value, // Remember to hash this on the server!
                };
                console.log('Form Data:', formData);
                alert('Registration successful! (Data logged to console)'); // Replace with a better UI message
            }
        });
    }
});