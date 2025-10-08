// Wrapper API avec fallback sur localStorage pour fonctionnement hors-serveur
const API = (function(){
  const base = 'http://localhost:3000'; // utilisé si serveur disponible
  const storageKey = 'agenceco_articles_v1';
  const idKey = 'agenceco_articles_nextid_v1';

  function _loadLocal(){
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  }
  function _saveLocal(arr){
    localStorage.setItem(storageKey, JSON.stringify(arr));
  }
  function _nextId(){
    let n = parseInt(localStorage.getItem(idKey) || '1', 10);
    localStorage.setItem(idKey, String(n+1));
    return n;
  }

  async function tryFetch(path, opts){
    try{
      const res = await fetch(base + path, opts);
      if (!res.ok) throw new Error('Bad response');
      return { ok: true, json: await res.json() };
    }catch(e){
      return { ok: false, error: e };
    }
  }

  async function getArticles(){
    const r = await tryFetch('/articles');
    if (r.ok) return r.json;
    // fallback local
    return _loadLocal();
  }
  async function getArticle(id){
    const r = await tryFetch(`/articles/${id}`);
    if (r.ok) return r.json;
    const arr = _loadLocal();
    return arr.find(a=>String(a.id) === String(id)) || null;
  }
  async function createArticle(data){
    const r = await tryFetch('/articles', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
    if (r.ok) return r.json;
    // local fallback
    const arr = _loadLocal();
    const id = _nextId();
    const obj = Object.assign({ id, publicationDate: (new Date()).toISOString() }, data);
    arr.unshift(obj);
    _saveLocal(arr);
    return obj;
  }
  async function updateArticle(id, data){
    const r = await tryFetch(`/articles/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
    if (r.ok) return r.json;
    const arr = _loadLocal();
    const idx = arr.findIndex(a=>String(a.id)===String(id));
    if (idx===-1) return null;
    arr[idx] = Object.assign({}, arr[idx], data);
    _saveLocal(arr);
    return arr[idx];
  }
  async function deleteArticle(id){
    const r = await tryFetch(`/articles/${id}`, { method: 'DELETE' });
    if (r.ok) return true;
    let arr = _loadLocal();
    const before = arr.length;
    arr = arr.filter(a=>String(a.id)!==String(id));
    _saveLocal(arr);
    return arr.length < before;
  }

  // Simple login fallback: accept any credentials and store a fake token when server unreachable
  async function login(credentials){
    try{
      const res = await fetch(base + '/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(credentials) });
      if (res.ok){
        const j = await res.json();
        return { ok: true, token: j.token };
      }
    }catch(e){/*ignore*/}
    // fallback: accept if username/password non-empty
    if (credentials.username && credentials.password){
      return { ok: true, token: 'local-fake-token' };
    }
    return { ok: false };
  }

  return { getArticles, getArticle, createArticle, updateArticle, deleteArticle, login };
})();

window.API = API;
