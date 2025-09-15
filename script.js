const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const slidesEl = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const totalSlides = document.querySelectorAll(".slide").length;
  let currentIndex = 0;
  let intervalId;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
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

  // Événements
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index, 10));
      stopAutoplay();
      startAutoplay();
    });
  });

  // Initialisation
  goToSlide(0);
  startAutoplay();
});
