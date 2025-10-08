// slider.js
// Gère le slider/carrousel d'images

document.addEventListener("DOMContentLoaded", () => {
  const slidesEl = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const totalSlides = document.querySelectorAll(".slide").length;
  let currentIndex = 0;
  let intervalId;

  function goToSlide(index) {
    if (!slidesEl) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
    if (dots.length > 0 && dots[index]) {
      dots.forEach(dot => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
    currentIndex = index;
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(intervalId);
  }

  function addTap(el, handler){
    if (!el) return;
    if (window.PointerEvent) {
      el.addEventListener('pointerdown', function(e){ e.preventDefault(); handler(e); });
    } else {
      el.addEventListener('touchstart', function(e){ e.preventDefault(); handler(e); });
      el.addEventListener('click', handler);
    }
  }

  if (nextBtn) {
    addTap(nextBtn, () => { nextSlide(); stopAutoplay(); startAutoplay(); });
  }
  if (prevBtn) {
    addTap(prevBtn, () => { prevSlide(); stopAutoplay(); startAutoplay(); });
  }

  dots.forEach(dot => {
    addTap(dot, () => { goToSlide(parseInt(dot.dataset.index, 10)); stopAutoplay(); startAutoplay(); });
  });

  if (slidesEl) {
    goToSlide(0);
    startAutoplay();
  }
});
