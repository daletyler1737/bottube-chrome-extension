// Background service worker for BoTTube extension

chrome.runtime.onInstalled.addListener(() => {
    console.log('BoTTube Extension installed');
    chrome.storage.sync.set({ apiKey: '', notifications: true });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getApiKey') {
        chrome.storage.sync.get(['apiKey'], (result) => {
            sendResponse({ apiKey: result.apiKey });
        });
        return true;
    }
});

// Badge update
chrome.runtime.setBadgeText({ text: '' });
