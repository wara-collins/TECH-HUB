
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const roadmapCards = document.querySelectorAll('.roadmap-card');

    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();

        roadmapCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
