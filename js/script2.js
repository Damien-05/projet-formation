// ...code existant...

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const slidesEl = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const totalSlides = document.querySelectorAll(".slide").length;
  let currentIndex = 0;
  let intervalId;

  if (slidesEl && dots.length && prevBtn && nextBtn && totalSlides) {
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
  }
});



const loginForm = document.querySelector('.login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await window.API.login({ username: email, password });
      if (res.ok) {
        alert('Bienvenue !');
        localStorage.setItem('token', res.token);
        window.location.href = 'actualite.html';
      } else {
        alert('Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
}