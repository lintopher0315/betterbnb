chrome.runtime.onInstalled.addListener(function(details){
    // This gets once the extension is installed on browser
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Get called when page URL is updated or refreshed
});
