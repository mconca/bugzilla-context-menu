function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.contextMenus.create({
  id: "log-selection",
  title: "Search Bugzilla",
  contexts: ["selection"]
}, onCreated);

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "log-selection") {
      var selectedText = info.selectionText.trim();
      console.log(selectedText);

      var url = "https://bugzilla.mozilla.org/";

      // Serach by ID (verify only contains digits 0-9)
      if (/^\d+$/.test(selectedText)) {
        url = url + "show_bug.cgi?id=" + encodeURIComponent(selectedText);
      }
      // Search by string
      else {
        url = url + "buglist.cgi?quicksearch=" + encodeURIComponent(selectedText);
      }

      console.log(url);
      browser.tabs.create({url: url});
  }
});
