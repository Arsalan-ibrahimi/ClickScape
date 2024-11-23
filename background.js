chrome.tabs.onCreated.addListener(function(tab) {
    if (tab.url === 'chrome://newtab/') {
      console.log("New tab opened!");
  
      // Your script or function to run when a new tab is opened
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']  // script you want to run on new tab
      });
    }
  });