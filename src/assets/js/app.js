document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.querySelectorAll('.dropdown-button');

  dropdownBtn.forEach(btn => {
    btn.addEventListener('click', function() {
      this.nextSibling.classList.toggle('show');
    });
  });
});
