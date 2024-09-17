document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Handle registration
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://localhost:3022/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Handle login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:3022/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        // Kontrollera om token finns
        if (data.token) {
            sessionStorage.setItem('token', data.token);
            window.location.replace('protected.html');
        } else if (data.error) {
            // Om error finns, visa det
            alert(data.error);
        } else {
            // Om inget token eller error finns
            alert('Unknown response from server');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
});