
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const ebookContainer = document.getElementById('ebook-container');
    const ebookCards = ebookContainer.getElementsByClassName('ebook-card');

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();

        Array.from(ebookCards).forEach(card => {
            const title = card.getElementsByTagName('h3')[0].textContent.toLowerCase();
            const author = card.getElementsByTagName('p')[0].textContent.toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
