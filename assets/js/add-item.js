document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-item-form');
    const alertBox = document.getElementById('alert');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('label', document.getElementById('label').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('price', document.getElementById('price').value);
        formData.append('image', document.getElementById('image').files[0]);

        try {
            const response = await fetch('https://back-end-web-development-final-project.onrender.com/items', {
                method: 'POST',
                headers: {
                    'Authorization': `${JSON.parse(localStorage.getItem('user')).token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add new item');
            }

            const newItem = await response.json();

            alertBox.textContent = 'Item added successfully!';
            alertBox.className = 'alert alert-success';
            alertBox.style.display = 'block';

            form.reset();
        } catch (error) {
            alertBox.textContent = `Error: ${error.message}`;
            alertBox.className = 'alert alert-danger';
            alertBox.style.display = 'block';
        }
    });
});
