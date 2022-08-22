chrome.action.onClicked.addListener(function (tab) {
  const optionsURL = chrome.runtime.getURL("./options/index.html");
  chrome.tabs.create({
    url: optionsURL,
  });
});
