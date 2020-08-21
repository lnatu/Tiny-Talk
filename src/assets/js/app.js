document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.querySelectorAll('.dropdown-button');
  const dropdownMenu = document.querySelectorAll('.dropdown-menu');
  const modalToggle = [...document.querySelectorAll('.modal-toggle')];
  const modalClose = [...document.querySelectorAll('.modal-close')];

  if (dropdownBtn.length === 0 || dropdownMenu.length === 0) {
    return;
  }

  dropdownBtn.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (hasClass(this.nextSibling, 'show')) {
        this.nextSibling.classList.remove('show');
        return;
      }
      removeDropdownMenu();
      this.nextSibling.classList.add('show');
    });
  });

  const removeDropdownMenu = function() {
    dropdownMenu.forEach(drm => {
      drm.classList.remove('show');
    });
  };

  const mediaPopupCTA = document.querySelector('.media-options__cta');
  if (mediaPopupCTA) {
    mediaPopupCTA.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.media-popup').classList.toggle('show');
    });
  }

  modalToggle.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetToggle = this.dataset.toggle;
      document.getElementById(targetToggle).classList.toggle('show');
    });
  });

  modalClose.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetToggle = this.dataset.close;
      document.getElementById(targetToggle).classList.remove('show');
    });
  });
});

function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}
