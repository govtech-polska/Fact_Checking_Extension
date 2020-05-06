import { EXTENSION_ICON } from "./consts";

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!tab.url || !tab.url.startsWith("http")) return;
});

chrome.runtime.onMessage.addListener(function (request, sender, response) {
  if (request.type == "SET_TRUSTED_ICON") {
    chrome.browserAction.setIcon({
      path: EXTENSION_ICON.TRUSTED,
    });
  }
  if (request.type == "SET_UNSUPPORTED_ICON") {
    chrome.browserAction.setIcon({
      path: EXTENSION_ICON.UNSUPORTED,
    });
  }
  if (request.type == "SET_BLOCKED_ICON") {
    chrome.browserAction.setIcon({
      path: EXTENSION_ICON.BLOCKED,
    });
  }

  response();
});

chrome.tabs.onUpdated.addListener(function (tabid, changeInfo, tab) {
  const url = tab.url;
  if (!url || ["chrome://", "about://"].some((p) => url.startsWith(p))) {
    return chrome.browserAction.setIcon({
      path: EXTENSION_ICON.BLOCKED,
    });
  } else {
    chrome.tabs.sendMessage(tabid, { type: "SET_ICON" });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    if (!url || ["chrome://", "about://"].some((p) => url.startsWith(p))) {
      return chrome.browserAction.setIcon({
        path: EXTENSION_ICON.BLOCKED,
      });
    }
    if (!tabs[0].active) return;
    chrome.tabs.sendMessage(tabs[0].id, { type: "SET_ICON" });
  });
});
