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


const users = [
    {
        id: 1,
        email: "john@example.com",
        password: bcrypt.hashSync("password123", 10),
        name: "John Doe",
    },
    {
        id: 2,
        email: "jane@example.com",
        password: bcrypt.hashSync("mypassword", 10),
        name: "Jane Smith",
    },
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const express = require('express');
const app = express();
app.use(express.json());

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
});

document.querySelector('.login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Bienvenue ${data.name} !`);
      // Stocker le token si besoin
      localStorage.setItem('token', data.token);
      window.location.href = 'actualite.html';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Erreur de connexion :', error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
});