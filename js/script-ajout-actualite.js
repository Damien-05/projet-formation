// Script pour gérer l'ajout d'une actualité via l'API

document.addEventListener('DOMContentLoaded', async function() {
  const form = document.querySelector('.ajout-actualite-form form');
  if (!form) return;

  // Récupère l'id de l'URL si présent (édition)
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');

  // Si édition, pré-remplir le formulaire
  if (articleId) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour modifier une actualité.');
      window.location.href = 'connexion.html';
      return;
    }
    try{
      const data = await window.API.getArticle(articleId);
      if (data) {
        document.getElementById('titre').value = data.title || '';
        document.getElementById('description').value = data.description || '';
        document.getElementById('contenu').value = data.content || '';
        document.querySelector('.ajout-titre').textContent = 'Modifier une actualité';
        form.querySelector('.ajout-btn').textContent = 'Mettre à jour';
      }
    }catch(e){
      alert('Erreur lors du chargement de l\'actualité.');
    }
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const titre = document.getElementById('titre').value.trim();
    const description = document.getElementById('description').value.trim();
    const contenu = document.getElementById('contenu').value.trim();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter ou modifier une actualité.');
      return;
    }
    try {
      try{
        if (articleId) {
          await window.API.updateArticle(articleId, { title: titre, description, content: contenu });
        } else {
          await window.API.createArticle({ title: titre, description, content: contenu });
        }
        alert(articleId ? 'Actualité modifiée !' : 'Actualité ajoutée !');
        window.location.href = 'actualite.html';
      }catch(e){
        alert(articleId ? "Erreur lors de l'édition de l'actualité." : "Erreur lors de l'ajout de l'actualité.");
      }
    } catch (err) {
      alert('Erreur réseau.');
    }
  });
});
