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