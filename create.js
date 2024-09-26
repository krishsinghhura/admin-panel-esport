// Function to generate a unique ID
function getUniqueId() {
    function generateRandomCode() {
        return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
    }

    // Add an event listener to the create button
    document.getElementById('createButton').addEventListener('click', function() {
        const uniqueCode = generateRandomCode(); // Generate unique code
        const uniqueCodeDisplay = document.getElementById('uniqueCode');
        uniqueCodeDisplay.textContent = uniqueCode; // Display the unique random code

        // Redirect to the final file after a short delay with the unique code in the URL
        setTimeout(() => {
            window.location.href = `final.html?uniqueId=${uniqueCode}`; // Pass the unique ID in the URL
        }, 1000); // Redirect after 1 second
    });

    return generateRandomCode();
}

// Call the function to attach the event listener
getUniqueId();
