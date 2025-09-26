// Script pour gérer l'ajout d'une actualité via l'API

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.ajout-actualite-form form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const contenu = document.getElementById('contenu').value.trim();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter une actualité.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title: titre, description, content: contenu })
      });
      if (response.ok) {
        alert('Actualité ajoutée !');
        window.location.href = 'actualite.html';
      } else {
        alert("Erreur lors de l'ajout de l'actualité.");
      }
    } catch (err) {
      alert('Erreur réseau.');
    }
  });
});
