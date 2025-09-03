document.addEventListener('DOMContentLoaded', function() {
    loadLinks();
    setupForm();
    setupFilters();
});

function setupForm() {
    const form = document.getElementById('link-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const url = document.getElementById('link-url').value;
        const title = document.getElementById('link-title').value;
        const description = document.getElementById('link-description').value;
        const category = document.getElementById('link-category').value;
        
        if (url && title && description && category) {
            const link = {
                id: Date.now(),
                url: url,
                title: title,
                description: description,
                category: category,
                date: new Date().toISOString()
            };
            
            saveLink(link);
            displayLink(link);
            form.reset();
            
            // Show success message
            alert('Link submitted successfully!');
        }
    });
}

function saveLink(link) {
    let links = getLinks();
    links.push(link);
    localStorage.setItem('techHubLinks', JSON.stringify(links));
}

function getLinks() {
    const links = localStorage.getItem('techHubLinks');
    return links ? JSON.parse(links) : [];
}

function loadLinks() {
    const links = getLinks();
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    links.forEach(link => {
        displayLink(link);
    });
}

function displayLink(link) {
    const container = document.getElementById('links-container');
    
    const linkCard = document.createElement('div');
    linkCard.className = 'link-card';
    linkCard.setAttribute('data-category', link.category);
    
    linkCard.innerHTML = `
        <h3>${link.title}</h3>
        <p>${link.description}</p>
        <span class="category">${capitalizeFirstLetter(link.category)}</span>
        <a href="${link.url}" target="_blank" rel="noopener noreferrer">Visit Link</a>
        <button class="delete-btn" data-id="${link.id}">Delete</button>
    `;
    
    container.appendChild(linkCard);

    // Add event listener for delete button
    const deleteBtn = linkCard.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        deleteLink(link.id);
    });
}

function deleteLink(id) {
    let links = getLinks();
    links = links.filter(link => link.id !== id);
    localStorage.setItem('techHubLinks', JSON.stringify(links));
    // Remove from DOM
    const container = document.getElementById('links-container');
    const linkCards = container.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        const btn = card.querySelector('.delete-btn');
        if (btn && btn.getAttribute('data-id') == id) {
            container.removeChild(card);
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterLinks(category);
        });
    });
}

function filterLinks(category) {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
