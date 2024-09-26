document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector('.main-container');
    const preloader = document.getElementById('preloader');

    // Mock data for pending approvals and ongoing tournaments
    const pendingTournaments = [
        { name: "Tournament A", entryFee: "$15", startDate: "2024-10-01" },
        { name: "Tournament B", entryFee: "$10", startDate: "2024-10-05" }
    ];

    const ongoingTournaments = [
        { name: "Bgmi Clashers", entryFee: "$20", participants: "8/16", status: "In Progress" },
        { name: "Valos", entryFee: "$5", participants: "1/6", status: "In Progress" }
    ];

    const tournamentHistory = []; // To keep track of approved tournaments

    // Function to populate pending tournaments
    function populatePendingTournaments() {
        const pendingTableBody = document.getElementById('pending-table-body');
        pendingTableBody.innerHTML = ''; // Clear existing content
        pendingTournaments.forEach((tournament, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tournament.name}</td>
                <td>${tournament.entryFee}</td>
                <td>${tournament.startDate}</td>
                <td>
                    <button class="approve-btn" data-index="${index}">Approve</button>
                    <button class="decline-btn" data-index="${index}">Decline</button>
                </td>
            `;
            pendingTableBody.appendChild(row);
        });
    }

    // Function to populate ongoing tournaments
    function populateOngoingTournaments() {
        const ongoingTableBody = document.getElementById('ongoing-table-body');
        ongoingTableBody.innerHTML = ''; // Clear existing content
        ongoingTournaments.forEach(tournament => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tournament.name}</td>
                <td>${tournament.entryFee}</td>
                <td>${tournament.participants}</td>
                <td>${tournament.status}</td>
            `;
            ongoingTableBody.appendChild(row);
        });
    }

    // Function to handle approve button click
    function handleApprove(index) {
        const approvedTournament = pendingTournaments.splice(index, 1)[0]; // Remove from pending
        ongoingTournaments.push({ 
            name: approvedTournament.name, 
            entryFee: approvedTournament.entryFee, 
            participants: "0/16", // Assuming starting participants is 0
            status: "In Progress" 
        });
        tournamentHistory.push(approvedTournament); // Add to history
        updateCounts();
        populatePendingTournaments(); // Refresh pending tournaments
        populateOngoingTournaments(); // Refresh ongoing tournaments
    }

    // Function to handle decline button click
    function handleDecline(index) {
        pendingTournaments.splice(index, 1); // Remove from pending
        updateCounts();
        populatePendingTournaments(); // Refresh pending tournaments
    }

    // Function to update counts in the overview
    function updateCounts() {
        document.getElementById('pending-approvals-count').innerText = pendingTournaments.length;
        document.getElementById('ongoing-tournaments-count').innerText = ongoingTournaments.length;
        document.getElementById('total-tournaments-count').innerText = tournamentHistory.length + ongoingTournaments.length;
    }

    // Event delegation for approve and decline buttons
    document.getElementById('pending-table-body').addEventListener('click', function (event) {
        if (event.target.classList.contains('approve-btn')) {
            handleApprove(event.target.dataset.index);
        } else if (event.target.classList.contains('decline-btn')) {
            handleDecline(event.target.dataset.index);
        }
    });

    // Simulate loading time for the preloader
    setTimeout(function () {
        preloader.style.display = 'none'; // Hide preloader
        mainContainer.style.display = 'block'; // Show main container
        checkScrollVisibility(); // Check visibility for fade-in elements

        // Populate tables after loading
        populatePendingTournaments();
        populateOngoingTournaments();
    }, 2000); // 2 seconds for the preloader

    // Function to check scroll position and reveal elements
    function checkScrollVisibility() {
        const fadeInElements = document.querySelectorAll('.fade-in');
        const revealPoint = window.innerHeight - 100; // Change as needed

        // Toggle visibility based on scroll position
        function toggleVisibility() {
            fadeInElements.forEach((element) => {
                const elementRect = element.getBoundingClientRect();
                if (elementRect.top < revealPoint) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
        }

        // Initial check on page load
        toggleVisibility();

        // Add scroll event listener
        window.addEventListener('scroll', toggleVisibility);
    }

    // Sample Chart.js setup for the tournament chart
    const ctx = document.getElementById('tournamentChart').getContext('2d');
    const tournamentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Tournaments Hosted',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(0, 255, 204, 0.2)',
                borderColor: 'rgba(0, 255, 204, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
