// Show all sections and content
function showAllContent() {
  var elements = document.querySelectorAll('section, .content, .container, .section-content');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.opacity = '1';
    elements[i].style.visibility = 'visible';
    elements[i].style.transform = 'none';
  }
}

// Run on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showAllContent);
} else {
  showAllContent();
}
