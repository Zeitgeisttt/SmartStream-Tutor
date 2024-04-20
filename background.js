// runs in the background even when browser not active
// handle events, manage data, and perform actions that don’t require direct user interaction.
// Listens for events from DOM and extension

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.contentScriptQuery == "fetchUrl") {
        fetch(`http://127.0.0.1:5000/?url=${encodeURIComponent(request.url)}`)
          .then(response => response.json(), console.log(response))
          .then(data => data["response"], console.log(data))
          .then(data => sendResponse({status: 'success', data: data}), console.log(data))
          .catch(error => sendResponse({status: 'error', error: error.message}));
        return true; // Keep the messaging channel open for the response
      }
    }
  );
  