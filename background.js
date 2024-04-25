chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery === "fetchUrl") {
      // Construct the URL correctly to include the 'url' query parameter
      const fetchUrl = new URL('http://127.0.0.1:5000/');
      fetchUrl.searchParams.append('url', encodeURIComponent(request.url));
      // let headers = new Headers();
      // headers.append('Access-Control-Allow-Origin', '*')
      // fetchUrl.origin.append('Access-Control-Allow-Origin', '*')
      // Perform the fetch operation
      // console.log(fetchUrl)
      fetch(fetchUrl)
        .then(response => {
            // Check if the response is ok, which means HTTP status 200-299
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse JSON data from the response
        })
        .then(data => {
            // console.log('Data fetched successfully:', data["response"]);
            sendResponse({status: 'success', data: data["response"]});
        })
        .catch(error => {
            // console.error('Failed to fetch data:', error);
            sendResponse({status: 'error', error: error.toString()});
        });

      return true; // Return true to indicate you wish to send a response asynchronously
    }
  }
);