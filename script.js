let videos = [
  { id: 1, title: "HTML Basics", url: " https://youtu.be/kUMe1FH4CHE?si=IKqBYV-q6s-rUb83" },
  { id: 2, title: "CSS Fundamentals", url: "https://www.youtube.com/embed/OXGznpKZ_sA" },
  { id: 3, title: "JavaScript Essentials", url: "https://youtu.be/FtaQSdrl7YA?si=-mUduZCXVYOanH6c" }
];

function displayVideos(videosToShow) {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = '';

  videosToShow.forEach(video => {
    const videoElement = document.createElement('div');
    videoElement.className = 'video-item';
    
    // Check if URL is valid for embedding
    const embedUrl = convertToEmbedUrl(video.url);
    
    if (embedUrl) {
      videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <iframe width="360" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
        <button class="delete-btn" data-id="${video.id}">Delete</button>
      `;
    } else {
      videoElement.innerHTML = `
        <h3>${video.title}</h3>
        <p style="color: red;">Invalid video URL: ${video.url}</p>
        <button class="delete-btn" data-id="${video.id}">Delete</button>
      `;
    }
    
    videoList.appendChild(videoElement);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteVideo);
  });
}

function convertToEmbedUrl(url) {
  // Remove any trailing spaces
  url = url.trim();
  
  // Handle YouTube URLs
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Convert youtu.be to youtube.com/embed
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Convert watch URLs to embed URLs
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed')) {
      return url;
    }
  }
  
  // Return null for unsupported URLs
  return null;
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
  const url = prompt("Enter video URL (YouTube only):");
  
  if (title && url) {
    const embedUrl = convertToEmbedUrl(url);
    if (embedUrl) {
      const newVideo = { 
        id: Date.now(), // Use timestamp for unique ID
        title, 
        url: embedUrl 
      };
      videos.push(newVideo);
      displayVideos(videos);
      alert("Video added successfully!");
    } else {
      alert("Invalid YouTube URL. Please enter a valid YouTube video URL.");
    }
  } else {
    alert("Please provide both title and URL.");
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
