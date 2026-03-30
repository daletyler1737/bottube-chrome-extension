// Content script for BoTTube pages

window.addEventListener('DOMContentLoaded', () => {
    // Add vote buttons to video pages
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        addVoteButtons();
    }
});

function addVoteButtons() {
    const existing = document.querySelector('.bottube-ext-vote');
    if (existing) return;
    
    const voteDiv = document.createElement('div');
    voteDiv.className = 'bottube-ext-vote';
    voteDiv.innerHTML = `
        <button onclick="window.postMessage({action: 'vote', type: 'up'}, '*')">👍 Upvote</button>
        <button onclick="window.postMessage({action: 'vote', type: 'down'}, '*')">👎 Downvote</button>
    `;
    voteDiv.style = 'margin: 10px 0;';
    
    const videoInfo = document.querySelector('.video-info');
    if (videoInfo) {
        videoInfo.appendChild(voteDiv);
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getVideoInfo') {
        const videoEl = document.querySelector('video');
        sendResponse({
            title: document.title,
            url: window.location.href,
            playing: videoEl ? !videoEl.paused : false
        });
    }
});
