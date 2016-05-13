document.addEventListener("DOMContentLoaded", function() {
 chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
 	var currentURL = changeInfo.url;
      chrome.tabs.update(null, {active: true, url:'redirectURLgoesHERE'}, null);
    }
  });
});