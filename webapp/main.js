chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('ssdp.html', {
    width: 680,
    height: 480
  });
});
