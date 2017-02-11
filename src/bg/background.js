// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

chrome.storage.sync.get('id_token', function(result){
  if (result.id_token === undefined) {
    sendResponse({'authenticated': false});
  } else {
    sendResponse({'authenticated': true, 'id_token': result.id_token});
  }
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.id_token){
    chrome.storage.sync.set({'id_token': request.id_token}, function() {
      console.log('id_token saved in storage');
    });
  }
});
