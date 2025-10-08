// menu.js
// Gère le menu burger responsive

document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  function addTapListener(el, handler) {
    if (!el) return;
    if (window.PointerEvent) {
      el.addEventListener('pointerdown', function(e){ e.preventDefault(); handler(e); });
    } else {
      el.addEventListener('touchstart', function(e){ e.preventDefault(); handler(e); });
      el.addEventListener('click', handler);
    }
  }

  if (burger && menu) {
    addTapListener(burger, function() {
      menu.classList.toggle('active');
    });
  }
});
