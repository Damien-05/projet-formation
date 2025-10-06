// Redirection bouton 'Ajouter une actualité'
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.Add-button');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            window.location.href = 'ajout-actualite.html';
        });
    }
});
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
        card.setAttribute('data-id', actu.id);
        card.innerHTML = `
            <h3 class="article-title">${actu.title}</h3>
            <p class="desc">${actu.description || ''}</p>
            <p class="content">${actu.content || ''}</p>
            <div class="date-container">
                <a class="date"><strong>Publié le</strong> ${actu.publicationDate || ''}</a>
            </div>
            <div class="actions" style="${connecte ? '' : 'display:none;'}">
                <button class="edit">Modifier</button>
                <button class="delete">Supprimer</button>
            </div>
            <style>
            .news-card .edit-form {
                background: #fff !important;
                color: #222 !important;
                border-radius: 8px;
                padding: 1em;
                margin-top: 1em;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                display: flex;
                flex-direction: column;
                gap: 0.5em;
            }
            .news-card .edit-form input,
            .news-card .edit-form textarea {
                color: #222 !important;
                background: #f7f7f7 !important;
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 0.5em;
                font-size: 1em;
            }
            .news-card .edit-form button {
                margin-top: 0.5em;
                font-size: 1em;
                padding: 0.5em 1em;
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }
            .news-card .edit-form button[type="submit"] {
                background: #36a745;
                color: #fff;
            }
            .news-card .edit-form .cancel-edit {
                background: #ccc;
                color: #222;
            }
            </style>
        `;
        // Navigation vers le détail (sauf si clic sur actions ou sur le formulaire d'édition)
        card.addEventListener('click', function(e) {
            // Si clic sur bouton d'action ou à l'intérieur du formulaire d'édition, ne rien faire
            if (
                e.target.classList.contains('edit') ||
                e.target.classList.contains('delete') ||
                e.target.closest('.edit-form')
            ) return;
            allerAuDetail(actu.id);
        });
        // Action Modifier : redirige vers la page de modification
        card.querySelector('.edit').addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = `modifier-actualite.html?id=${actu.id}`;
        });
        // Action Supprimer
        card.querySelector('.delete').addEventListener('click', async function(e) {
            e.stopPropagation();
            const token = localStorage.getItem('token');
            if (!token) return alert('Non autorisé');
            if (confirm('Supprimer cet article ?')) {
                try {
                    const response = await fetch(`http://localhost:3000/articles/${actu.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    if (response.ok) {
                        card.remove();
                        alert('Article supprimé');
                    } else {
                        alert('Erreur lors de la suppression');
                    }
                } catch (err) {
                    alert('Erreur réseau');
                }
            }
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
    // Désormais, les boutons sont gérés inline lors de l'affichage des actualités (plus de génération ici)
    // On garde juste la gestion du bouton d'ajout
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
                if (document.querySelector('.add-form')) return; // déjà ouvert
                const agenda = document.querySelector('.agenda');
                const form = document.createElement('form');
                form.className = 'add-form';
                form.innerHTML = `
                    <input type="text" name="titre" placeholder="Titre" required>
                    <input type="text" name="description" placeholder="Description" required>
                    <textarea name="content" placeholder="Contenu" required></textarea>
                    <button type="submit">Ajouter</button>
                    <button type="button" class="cancel-add">Annuler</button>
                    <style>
                    .add-form {
                        background: #fff !important;
                        color: #222 !important;
                        border-radius: 8px;
                        padding: 1em;
                        margin-bottom: 1em;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                        display: flex;
                        flex-direction: column;
                        gap: 0.5em;
                        max-width: 600px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .add-form input,
                    .add-form textarea {
                        color: #222 !important;
                        background: #f7f7f7 !important;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        padding: 0.5em;
                        font-size: 1em;
                    }
                    .add-form button {
                        margin-top: 0.5em;
                        font-size: 1em;
                        padding: 0.5em 1em;
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                    }
                    .add-form button[type="submit"] {
                        background: #36a745;
                        color: #fff;
                    }
                    .add-form .cancel-add {
                        background: #ccc;
                        color: #222;
                    }
                    </style>
                `;
                form.addEventListener('submit', async function(ev) {
                    ev.preventDefault();
                    const titre = form.titre.value.trim();
                    const description = form.description.value.trim();
                    const content = form.content.value.trim();
                    const token = localStorage.getItem('token');
                    if (!token) return alert('Non autorisé');
                    try {
                        const response = await fetch('http://localhost:3000/articles', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            },
                            body: JSON.stringify({ title: titre, description, content })
                        });
                        if (response.ok) {
                            const newActu = await response.json();
                            // Ajoute dynamiquement la nouvelle actu en haut
                            const actuObj = {
                                id: newActu.id,
                                title: titre,
                                description: description,
                                content: content,
                                publicationDate: newActu.publicationDate || (new Date()).toLocaleDateString()
                            };
                            // Recharge la liste (ou ajoute dynamiquement)
                            const allActus = await fetchActualites();
                            agenda.innerHTML = '';
                            afficherActualites(allActus);
                            afficherActionsSiConnecte();
                            form.remove();
                            alert('Actualité ajoutée !');
                        } else {
                            alert('Erreur lors de l\'ajout');
                        }
                    } catch (err) {
                        alert('Erreur réseau');
                    }
                });
                form.querySelector('.cancel-add').addEventListener('click', function() {
                    form.remove();
                });
                agenda.parentNode.insertBefore(form, agenda);
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
