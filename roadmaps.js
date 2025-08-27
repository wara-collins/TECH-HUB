
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const roadmapCards = document.querySelectorAll('.roadmap-card');

    // Search functionality
    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        roadmapCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Open button functionality
    document.querySelectorAll('.open-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const roadmapId = this.getAttribute('data-id');
            openRoadmap(roadmapId);
        });
    });

    function openRoadmap(roadmapId) {
        // This function should be implemented to open the roadmap details
        // For now, we'll just show an alert
        alert(`Opening roadmap: ${roadmapId}`);
        // You can implement a modal or redirect to a new page with roadmap details
    }
});
