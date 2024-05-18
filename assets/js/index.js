document.addEventListener('DOMContentLoaded', () => {
    const menuItemsWrapper = document.getElementById('menu-items-wrapper');
    const orderSelect = document.querySelector('#book-table select');
    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch menu items and populate the menu section
    fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                // Populate the menu items section
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item', 'col-md-3');

                const image = document.createElement('img');
                image.src = `http://localhost:3000${item.image}`;
                image.alt = `Image of ${item.label}`;

                const title = document.createElement('h4');
                title.textContent = item.label;

                const price = document.createElement('h5');
                price.textContent = `Price: ${item.price} $`;

                const description = document.createElement('p');
                description.textContent = item.description;

                menuItem.appendChild(image);
                menuItem.appendChild(title);
                menuItem.appendChild(price);
                menuItem.appendChild(description);

                menuItemsWrapper.appendChild(menuItem);

                // Populate the select dropdown
                const option = document.createElement('option');
                option.value = item.label;
                option.textContent = item.label;
                orderSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
        });

    // Handle order form submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!user || !user.isLoggedIn) {
            alert('You must be logged in to place an order.');
            return;
        }

        const orderData = {
            useremail: document.getElementById('order-email').value,
            item: document.getElementById('order-item').value,
            date: document.getElementById('order-date').value
        };

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'pending') {
                alert('Order placed successfully!');
                window.location.href = 'my-orders.html';
            } else {
                alert('Error placing order.');
            }
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Error placing order.');
        });
    });
});
