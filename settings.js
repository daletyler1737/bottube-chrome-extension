document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['apiKey', 'notifications'], (result) => {
        document.getElementById('apiKey').value = result.apiKey || '';
        document.getElementById('notifications').checked = result.notifications !== false;
    });
});

function saveSettings() {
    const apiKey = document.getElementById('apiKey').value;
    const notifications = document.getElementById('notifications').checked;
    
    chrome.storage.sync.set({ apiKey, notifications }, () => {
        document.getElementById('status').textContent = 'Settings saved!';
        setTimeout(() => window.close(), 1000);
    });
}
