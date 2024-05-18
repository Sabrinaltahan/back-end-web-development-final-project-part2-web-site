document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginNavItem = document.querySelector('a[href="login.html"]').parentElement;
    const registerNavItem = document.querySelector('a[href="register.html"]').parentElement;
    const logoutNavItem = document.createElement('li');
    logoutNavItem.classList.add('nav-item');
    logoutNavItem.innerHTML = '<a class="nav-link" href="#" id="logout">Logout</a>';
    
    const dashboardNavItem = document.querySelector('a[href="dashboard.html"]').parentElement;
    const myOrdersNavItem = document.querySelector('a[href="my-orders.html"]').parentElement;

    if (user && user.isLoggedIn) {
        loginNavItem.style.display = 'none';
        registerNavItem.style.display = 'none';
        document.querySelector('.navbar-nav').appendChild(logoutNavItem);

        if (user.role === 'admin') {
        dashboardNavItem.style.display = 'block';
        myOrdersNavItem.style.display = 'none';
        } else if (user.role === 'user') {
        dashboardNavItem.style.display = 'none';
        myOrdersNavItem.style.display = 'block';
        }

        document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html'; // Redirect to index.html after logout
        });
    } else {
        dashboardNavItem.style.display = 'none';
        myOrdersNavItem.style.display = 'none';
    }
    });
