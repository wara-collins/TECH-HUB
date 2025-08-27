
document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    const projectModal = document.getElementById('project-modal');
    const submitModal = document.getElementById('submit-modal');
    const submitProjectBtn = document.getElementById('submit-project');
    const submitForm = document.getElementById('submit-form');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // View More functionality
    projectsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-more')) {
            const project = e.target.closest('.project');
            const title = project.querySelector('h2').textContent;
            const description = project.querySelector('p').textContent;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            projectModal.style.display = 'block';
        }
    });

    // Submit Project button
    submitProjectBtn.addEventListener('click', function() {
        submitModal.style.display = 'block';
    });

    // Form submission
    submitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Project submitted successfully!');
        submitModal.style.display = 'none';
        submitForm.reset();
    });

    // Close modals
    document.querySelectorAll('.close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            projectModal.style.display = 'none';
            submitModal.style.display = 'none';
        });
    });

    // Category filtering
    categoryButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.project').forEach(function(project) {
                if (category === 'all' || project.dataset.category === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === projectModal || e.target === submitModal) {
            projectModal.style.display = 'none';
            submitModal.style.display = 'none';
        }
    });
});
