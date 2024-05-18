document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const user = JSON.parse(localStorage.getItem('user'));

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!user || !user.isLoggedIn) {
            alert('You must be logged in to send a message.');
            return;
        }

        const messageData = {
            content: document.getElementById('message-content').value,
        };

        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            },
            body: JSON.stringify(messageData)
        })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Error sending message.');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Error sending message.');
        });
    });
});
