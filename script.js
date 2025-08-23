
let videos = [
  { id: 1, title: "HTML Basics", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "CSS Fundamentals", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 3, title: "JavaScript Essentials", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
];

function displayVideos(videosToShow) {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = '';

  videosToShow.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video-item';
    videoElement.innerHTML = `
      <h3>${video.title}</h3>
      <iframe width="560" height="315" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      <button class="delete-btn" data-id="${video.id}">Delete</button>
    `;
    videoList.appendChild(videoElement);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteVideo);
  });
}

function searchVideos() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm)
  );
  displayVideos(filteredVideos);
}

function addVideo() {
  const title = prompt("Enter video title:");
  const url = prompt("Enter video URL:");
  if (title && url) {
    const newVideo = { id: videos.length + 1, title, url };
    videos.push(newVideo);
    displayVideos(videos);
  }
}

function deleteVideo(e) {
  const id = parseInt(e.target.getAttribute('data-id'));
  videos = videos.filter(video => video.id !== id);
  displayVideos(videos);
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', searchVideos);
document.getElementById('add-video-btn').addEventListener('click', addVideo);

// Initial display
displayVideos(videos);
