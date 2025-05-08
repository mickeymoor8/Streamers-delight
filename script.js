document.addEventListener('DOMContentLoaded', function() {
   const supportForm = document.getElementById('support-form');
   const formMessage = document.getElementById('form-message');
 

   supportForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
 

    // Basic form validation (you can add more robust validation)
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
 

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
     formMessage.textContent = 'Please fill in all fields.';
     formMessage.classList.add('error');
     return;
    }
 

    fetch('/send-email', {
       method: 'POST',
       body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      }),
       headers: {
        'Content-Type': 'application/json'
       }
     })
     .then(response => response.json())
     .then(data => {
       if (data.success) {
        formMessage.textContent = 'Thank you! We will be in touch soon.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        supportForm.reset();
       } else {
        formMessage.textContent = data.message; // Use the message from the server
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
       }
     })
     .catch(error => {
       formMessage.textContent = 'Sorry, there was an error submitting your message. Please try again.';
       formMessage.classList.remove('success');
       formMessage.classList.add('error');
       console.error('Error:', error);
     });
   });

    const form = document.getElementById('create-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the form values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate the form values
        let isValid = true;

        if (username.length < 7 || username.length > 17) {
            displayError('username', 'Username must be between 7 and 17 characters.');
            isValid = false;
        } else {
            clearError('username');
        }

        if (!isValidEmail(email)) {
            displayError('email', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError('email');
        }

        if (password.length < 8) {
            displayError('password', 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError('password');
        }

        if (password !== confirmPassword) {
            displayError('confirm-password', 'Passwords do not match.');
            isValid = false;
        } else {
            clearError('confirm-password');
        }

        if (isValid) {
            // If the form is valid, you can submit it to the server
            // form.submit();
            alert('Form is valid! You can now submit it to the server.'); // Replace with your actual submission logic
        }
    });

    function displayError(fieldId, message) {
        const errorElement = document.querySelector(`#${fieldId} + .form-error`);
        errorElement.textContent = message;
    }

    function clearError(fieldId) {
        const errorElement = document.querySelector(`#${fieldId} + .form-error`);
        errorElement.textContent = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});