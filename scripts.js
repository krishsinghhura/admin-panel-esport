document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const mainContainer = document.querySelector('.main-container');

    setTimeout(() => {
        preloader.style.display = 'none'; // Hide preloader
        mainContainer.style.display = 'block'; // Show main content
    }, 2000); // Adjust the timeout duration as needed

    // MetaMask Login Logic
    const metamaskButton = document.getElementById('metamaskLogin');

    metamaskButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Check if accounts were returned
                if (accounts.length > 0) {
                    alert(`Logged in with address: ${accounts[0]}`);
                    // Add your logic for successful login here
                } else {
                    alert('No accounts found. Please connect your MetaMask wallet.');
                }
            } catch (error) {
                console.error('Error logging in with MetaMask:', error);
                alert('Login failed. Please ensure MetaMask is connected.');
            }
        } else {
            alert('Please install MetaMask to login.');
            // Optionally redirect users to the MetaMask download page
            window.open('https://metamask.io/download.html', '_blank');
        }
    });
});
