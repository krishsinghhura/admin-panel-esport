// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector('.main-container');
    const preloader = document.getElementById('preloader');

    // Simulate loading time for the preloader
    setTimeout(function () {
        preloader.style.display = 'none'; // Hide preloader
        mainContainer.style.display = 'block'; // Show main container
    }, 2000); // 2 seconds for the preloader
});