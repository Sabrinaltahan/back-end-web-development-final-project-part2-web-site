document.addEventListener('DOMContentLoaded', () => {
    const ordersTable = document.querySelector('.table tbody');

    // Fetch user's orders
    fetch('https://back-end-web-development-final-project.onrender.com/orders/my-orders', {
        headers: {
            'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
        }
    })
    .then(response => response.json())
    .then(orders => {
        orders.forEach(order => {
            const row = document.createElement('tr');

            // const idCell = document.createElement('td');
            // idCell.textContent = order._id;

            const itemCell = document.createElement('td');
            itemCell.textContent = order.item;

            const priceCell = document.createElement('td');
            priceCell.textContent = order.price + " $";

            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(order.date).toLocaleDateString();

            const statusCell = document.createElement('td');
            statusCell.textContent = order.status;

            const actionCell = document.createElement('td');
            const actionButton = document.createElement('button');
            actionButton.classList.add('btn', 'btn-danger');

            if (order.status === 'pending') {
                actionButton.textContent = 'Cancel';
                actionButton.addEventListener('click', () => {
                    // Handle order cancellation
                    fetch(`https://back-end-web-development-final-project.onrender.com/orders/${order._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            row.remove(); // Remove the row from the table
                            console.log('Order deleted successfully');
                        } else {
                            return response.json().then(data => { throw new Error(data.message); });
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting order:', error);
                        alert('Failed to cancel the order');
                    });
                });
            } else {
                actionButton.textContent = 'Cancel';
                actionButton.disabled = true; // Disable the button for non-pending orders
            }

            actionCell.appendChild(actionButton);

            // row.appendChild(idCell);
            row.appendChild(itemCell);
            row.appendChild(priceCell);
            row.appendChild(dateCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);

            ordersTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
        // Display an error message to the user
    });
});
