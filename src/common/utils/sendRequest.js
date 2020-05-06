export default function sendRequest(requestType) {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: requestType }, response => {
        resolve(response);
      });
    });
  }).catch(err => {
    console.error(err);
  });
}
