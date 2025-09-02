document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const projects = document.querySelectorAll('.project');
  const submitForm = document.getElementById('submit-form');
  const submitModal = document.getElementById('submit-modal');
  const closeButtons = document.querySelectorAll('.close');
  const submitProjectBtn = document.getElementById('submit-project');
  const viewMoreButtons = document.querySelectorAll('.view-more');

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

  // Show submit modal when submit project button is clicked
  submitProjectBtn.addEventListener('click', function(e) {
    e.preventDefault();
    submitModal.style.display = 'block';
  });

  // Handle form submission
  submitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Project submitted successfully!');
    submitForm.reset();
    submitModal.style.display = 'none';
  });

  // Handle closing of modals and view more sections
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Handle View More functionality
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectFullContent = this.previousElementSibling;
      projectFullContent.style.display = 'block';
      this.textContent = 'Close';
    });
  });

  // Handle closing of view more sections
  document.querySelectorAll('.close-content').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
      const projectFullContent = this.parentElement;
      projectFullContent.style.display = 'none';
      const viewMoreButton = projectFullContent.nextElementSibling;
      if (viewMoreButton && viewMoreButton.classList.contains('view-more')) {
        viewMoreButton.textContent = 'View More';
      }
    });
  });
});
