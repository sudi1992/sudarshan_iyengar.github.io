// Simple initialization
(function() {
  var loadingScreen = document.getElementById('loading');
  if (!loadingScreen) return;
  loadingScreen.classList.add('hidden');
  setTimeout(function() { loadingScreen.remove(); }, 500);
})();
