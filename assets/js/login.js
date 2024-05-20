document.addEventListener('DOMContentLoaded', () => {
const loginForm = document.getElementById('login-form');
const alertContainer = document.getElementById('alert-container');

loginForm.addEventListener('submit', async (event) => {
event.preventDefault();

// Clear previous alerts
alertContainer.innerHTML = '';

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

try {
    const response = await fetch('https://back-end-web-development-final-project.onrender.com/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
    // Save user information in local storage
    localStorage.setItem('user', JSON.stringify({
        isLoggedIn: true,
        role: result.role,
        token: result.token,
    }));

    // Show success alert
    alertContainer.innerHTML = `
        <div class="alert alert-success" role="alert">
        Login successful! Redirecting...
        </div>
    `;
    // Redirect to the index page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
    } else {
    // Show error alert
    alertContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
        ${result.message || 'Login failed. Please try again.'}
        </div>
    `;
    }
} catch (error) {
    console.error('Error during login:', error);
    // Show error alert
    alertContainer.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Server error. Please try again later.
    </div>
    `;
}
});
});
