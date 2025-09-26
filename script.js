// Script menu burger responsive

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }
});
