document.addEventListener('DOMContentLoaded', () => {
const registerForm = document.getElementById('register-form');
const alertContainer = document.getElementById('alert-container');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Clear previous alerts
    alertContainer.innerHTML = '';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, email, password })
    });

    const result = await response.json();

    if (response.ok) {
        // Show success alert
        alertContainer.innerHTML = `
        <div class="alert alert-success" role="alert">
            ${result.message + " Redirecting..."}
        </div>
        `;
        registerForm.reset();
        // Redirect to the login or another page
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        // Show error alert
        alertContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${result.message || 'Registration failed. Please try again.'}
        </div>
        `;
    }
    } catch (error) {
    console.error('Error during registration:', error);
    // Show error alert
    alertContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Server error. Please try again later.
        </div>
    `;
    }
});
});