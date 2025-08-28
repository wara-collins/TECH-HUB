
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projects = document.querySelectorAll('.project');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;

            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projects.forEach(project => {
                if (category === 'all' || project.dataset.category === category) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});
