document.addEventListener('DOMContentLoaded', () => {
    const menuItemsTable = document.querySelector('#menu-items-table');
    const ordersTable = document.querySelector('#orders-table');

    // Fetch and populate menu items
    const fetchMenuItems = () => {
        fetch('https://back-end-web-development-final-project.onrender.com/items')
            .then(response => response.json())
            .then(items => {
                items.forEach(item => {
                    const row = document.createElement('tr');

                    const idCell = document.createElement('td');
                    idCell.textContent = item._id;

                    const labelCell = document.createElement('td');
                    labelCell.textContent = item.label;

                    const priceCell = document.createElement('td');
                    priceCell.textContent = item.price + ' $';

                    const imageCell = document.createElement('td');
                    const img = document.createElement('img');
                    img.src = `https://back-end-web-development-final-project.onrender.com${item.image}`;
                    img.alt = item.label;
                    img.style.maxWidth = '50px';
                    imageCell.appendChild(img);

                    const descriptionCell = document.createElement('td');
                    descriptionCell.textContent = item.description;

                    const actionCell = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        fetch(`https://back-end-web-development-final-project.onrender.com/items/${item._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                row.remove();
                            } else {
                                return response.json().then(data => { throw new Error(data.message); });
                            }
                        })
                        .catch(error => {
                            console.error('Error deleting item:', error);
                            alert('Failed to delete the item');
                        });
                    });
                    actionCell.appendChild(deleteButton);

                    row.appendChild(idCell);
                    row.appendChild(labelCell);
                    row.appendChild(priceCell);
                    row.appendChild(imageCell);
                    row.appendChild(descriptionCell);
                    row.appendChild(actionCell);

                    menuItemsTable.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
                // Display an error message to the user
            });
    };

    // Fetch and populate orders
    const fetchOrders = () => {
        fetch('https://back-end-web-development-final-project.onrender.com/orders', {
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
        .then(response => response.json())
        .then(orders => {
            orders.forEach(order => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = order._id;

                const emailCell = document.createElement('td');
                emailCell.textContent = order.useremail;

                const itemCell = document.createElement('td');
                itemCell.textContent = order.item;

                const priceCell = document.createElement('td');
                priceCell.textContent = order.price + ' $';

                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(order.date).toLocaleDateString();

                const statusCell = document.createElement('td');
                statusCell.textContent = order.status;

                const actionCell = document.createElement('td');
                const acceptButton = document.createElement('button');
                acceptButton.classList.add('btn', 'btn-success');
                acceptButton.textContent = 'Accept';
                acceptButton.addEventListener('click', () => {
                    fetch(`https://back-end-web-development-final-project.onrender.com/orders/accept/${order._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
                        },
                        body: JSON.stringify({ status: 'Accepted' })
                    })
                    .then(response => {
                        if (response.ok) {
                            statusCell.textContent = 'Accepted';
                            acceptButton.disabled = true;
                            cancelButton.disabled = true;
                        } else {
                            return response.json().then(data => { throw new Error(data.message); });
                        }
                    })
                    .catch(error => {
                        console.error('Error accepting order:', error);
                        alert('Failed to accept the order');
                    });
                });

                const cancelButton = document.createElement('button');
                cancelButton.classList.add('btn', 'btn-danger');
                cancelButton.textContent = 'Cancel';
                cancelButton.addEventListener('click', () => {
                    fetch(`https://back-end-web-development-final-project.onrender.com/orders/${order._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            row.remove();
                        } else {
                            return response.json().then(data => { throw new Error(data.message); });
                        }
                    })
                    .catch(error => {
                        console.error('Error cancelling order:', error);
                        alert('Failed to cancel the order');
                    });
                });

                // Disable buttons based on status
                if (order.status !== 'pending') {
                    acceptButton.disabled = true;
                    cancelButton.disabled = true;
                }

                actionCell.appendChild(acceptButton);
                actionCell.appendChild(cancelButton);

                row.appendChild(idCell);
                row.appendChild(emailCell);
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
    };


    // Fetch and display messages
    const fetchMessages = () => {
        fetch('https://back-end-web-development-final-project.onrender.com/messages', {
            headers: {
                'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
        .then(response => response.json())
        .then(messages => {
            const messagesTable = document.getElementById('messages-table');
            messages.forEach(message => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${message._id}</td>
                    <td>${message.useremail}</td>
                    <td>${message.content}</td>
                    <td>${new Date(message.date).toLocaleDateString()}</td>
                `;
                messagesTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching messages:', error));
    };

    // Fetch data on page load
    fetchMenuItems();
    fetchOrders();
    fetchMessages();
});
