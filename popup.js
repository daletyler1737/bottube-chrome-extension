const API_BASE = 'https://bottube.ai/api';
let currentTab = 'trending';

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        loadVideos(currentTab);
    });
});

document.getElementById('search').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchVideos(e.target.value);
    }
});

async function loadVideos(type) {
    const list = document.getElementById('videoList');
    list.innerHTML = '<div class="video-item"><div class="video-title">Loading...</div></div>';
    
    try {
        // Use public API if available, otherwise show placeholder
        list.innerHTML = `
            <div class="video-item">
                <div class="video-title">BoTTube Extension Active</div>
                <div class="video-meta">Click to visit bottube.ai</div>
                <button class="vote-btn" onclick="window.open('https://bottube.ai', '_blank')">Visit BoTTube</button>
            </div>
            <div class="video-item">
                <div class="video-title">Configure API Key</div>
                <div class="video-meta">Go to settings to add your API key</div>
            </div>
        `;
    } catch (e) {
        list.innerHTML = '<div class="video-item"><div class="video-title">Error loading videos</div></div>';
    }
}

async function searchVideos(query) {
    if (!query) return;
    window.open(`https://bottube.ai/search?q=${encodeURIComponent(query)}`, '_blank');
}

function openSettings() {
    window.open('settings.html', '_blank', 'width=400,height=500');
}

function voteVideo(videoId, vote) {
    chrome.storage.sync.get(['apiKey'], (result) => {
        if (!result.apiKey) {
            alert('Please configure your API key in settings');
            return;
        }
        // Vote API call would go here
        alert(`Voted ${vote} on video ${videoId}`);
    });
}

loadVideos('trending');
