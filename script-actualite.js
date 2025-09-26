// script pour la page actualite.html
// Ce fichier gère l'affichage dynamique des actualités, la navigation vers le détail, et les actions conditionnelles selon l'authentification.

// 1. Récupération des actualités depuis l'API
async function fetchActualites() {
    // Utilise la bonne route backend
    const response = await fetch('http://localhost:3000/articles');
    if (!response.ok) throw new Error('Erreur lors de la récupération des actualités');
    return await response.json();
}

// 2. Affichage dynamique des actualités dans le DOM
function afficherActualites(actualites) {
    const agenda = document.querySelector('.agenda');
    if (!agenda) return;
    agenda.innerHTML = '';
    const connecte = estConnecte();
    actualites.forEach(actu => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.setAttribute('data-id', actu.id); // Ajout de l'attribut data-id
        // Structure identique à la maquette HTML d'origine
        card.innerHTML = `
            <h3>${actu.title}</h3>
            <p>${actu.description || ''}</p>
            <p>${actu.content || ''}</p>
            <div class="date-container">
                <a class="date"><strong>Publié le</strong> ${actu.publicationDate || ''}</a>
            </div>
            <div class="actions" style="${connecte ? '' : 'display:none;'}">
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </div>
        `;
        card.addEventListener('click', function(e) {
            // Évite le clic sur les boutons d'action
            if (e.target.classList.contains('edit') || e.target.classList.contains('delete')) return;
            allerAuDetail(actu.id);
        });
        agenda.appendChild(card);
    });
}

// 3. Gestion de la navigation vers le détail d'une actualité
function allerAuDetail(id) {
    if (!id) return;
    window.location.href = `detail-actualite.html?id=${id}`;
}

// 4. Vérification de l'authentification (token dans le localStorage)
function estConnecte() {
    return !!localStorage.getItem('token');
}

// 5. Actions conditionnelles (modifier, supprimer, ajouter)
function afficherActionsSiConnecte() {
    const connecte = estConnecte();
    // Bouton d'ajout
    const addBtn = document.querySelector('.Add-button');
    if (addBtn) addBtn.style.display = connecte ? '' : 'none';
    // Actions sur chaque news-card
    document.querySelectorAll('.news-card').forEach(card => {
        let actions = card.querySelector('.actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'actions';
            card.appendChild(actions);
        }
        actions.innerHTML = '';
        if (connecte) {
            actions.style.display = '';
            // Bouton Modifier
            const editBtn = document.createElement('button');
            editBtn.className = 'edit';
            editBtn.textContent = 'Modifier';
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const articleId = getArticleIdFromCard(card);
                if (articleId) {
                    window.location.href = `ajout-actualite.html?id=${articleId}`;
                }
            });
            actions.appendChild(editBtn);
            // Bouton Supprimer
            const delBtn = document.createElement('button');
            delBtn.className = 'delete';
            delBtn.textContent = 'Supprimer';
            delBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const articleId = getArticleIdFromCard(card);
                if (articleId && confirm('Supprimer cet article ?')) {
                    await supprimerArticle(articleId);
                }
            });
            actions.appendChild(delBtn);
        } else {
            actions.style.display = 'none';
        }
    });
}

// Récupérer l'ID de l'article depuis la carte (à adapter selon ta structure)
function getArticleIdFromCard(card) {
    // Si tu ajoutes un attribut data-id sur la carte, ce sera plus simple
    // return card.dataset.id;
    // Sinon, récupère-le depuis le détail ou l'URL
    // Ici, on suppose que l'ID est stocké dans une propriété cachée
    // À adapter selon ton backend !
    const titre = card.querySelector('h3')?.textContent;
    // À remplacer par une vraie correspondance avec l'ID
    // (idéalement, stocke l'id dans data-id sur la div.card)
    return card.dataset.id;
}

// Suppression d'un article avec token
async function supprimerArticle(id) {
    const token = localStorage.getItem('token');
    if (!token) return alert('Non autorisé');
    try {
        const response = await fetch(`http://localhost:3000/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.ok) {
            alert('Article supprimé');
            location.reload();
        } else {
            alert('Erreur lors de la suppression');
        }
    } catch (e) {
        alert('Erreur réseau');
    }
}

// 6. Initialisation au chargement de la page
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const actualites = await fetchActualites();
        afficherActualites(actualites);
        afficherActionsSiConnecte();
        // Ajout gestion bouton d'ajout
        const addBtn = document.querySelector('.Add-button');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                if (!estConnecte()) return alert('Non autorisé');
                window.location.href = 'ajout-actualite.html';
            });
        }

        // Gestion dynamique du bouton login/deconnexion
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            if (estConnecte()) {
                loginBtn.textContent = 'Me déconnecter';
                loginBtn.onclick = function() {
                    localStorage.removeItem('token');
                    location.reload();
                };
            } else {
                loginBtn.textContent = 'Me connecter';
                loginBtn.onclick = function() {
                    window.location.href = 'connexion.html';
                };
            }
        }
    } catch (e) {
        console.error(e);
        const agenda = document.querySelector('.agenda');
        if (agenda) agenda.innerHTML = '<p style="color:red">Erreur lors du chargement des actualités.</p>';
    }
});

// Ajout d'un article avec token
async function ajouterArticle(data) {
    const token = localStorage.getItem('token');
    if (!token) return alert('Non autorisé');
    try {
        const response = await fetch('http://localhost:3000/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Article ajouté');
            location.reload();
        } else {
            alert('Erreur lors de l\'ajout');
        }
    } catch (e) {
        alert('Erreur réseau');
    }
}
