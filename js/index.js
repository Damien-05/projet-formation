document.addEventListener('DOMContentLoaded', function() {
  // --- Menu burger ---
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }

  // --- Slider ---
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

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index, 10));
      stopAutoplay();
      startAutoplay();
    });
  });

  if (slidesEl) {
    goToSlide(0);
    startAutoplay();
  }

  // --- Actualités ---
  let url = "http://localhost:3000/articles";
  let actualitesContainer = document.getElementById("actualites");
  if (actualitesContainer) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.forEach(article => {
          let articleDiv = document.createElement("div");
          articleDiv.classList.add("element1");

          let p1 = document.createElement("p");
          p1.innerHTML = article.title;

          let p2 = document.createElement("p");
          p2.innerHTML = new Date(article.publicationDate).toLocaleDateString();

          let p3 = document.createElement("p");
          p3.innerHTML = article.description;

          let p4 = document.createElement("p");
          p4.innerHTML = article.content;
          articleDiv.appendChild(p1);
          articleDiv.appendChild(p2);
          articleDiv.appendChild(p3);
          articleDiv.appendChild(p4);
          actualitesContainer.appendChild(articleDiv);
        });
      })
      .catch(error => console.error('Error:', error));
  }
});