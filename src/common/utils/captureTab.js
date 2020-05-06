import dataUriToBlob from "./dataUriToBlob";
import detectBrowser from "./detectBrowser";

export default function captureTab() {
  const browser = detectBrowser();
  return new Promise((resolve) => {
    if (process.env.BROWSER === "chrome") {
      const options = { format: "jpeg", quality: 15 };
      chrome.tabs.captureVisibleTab(options, (imageUri) => {
        resolve(dataUriToBlob(imageUri));
      });
    } else {
      const capturing = browser.tabs.captureVisibleTab();
      capturing.then(
        (imgUrl) => {
          resolve(dataURItoBlob(imgUrl));
        },
        (error) => console.error(error)
      );
    }
  }).catch((err) => {
    throw err;
  });
}
