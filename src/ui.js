/**
 * Module : ui.js
 * Rôle   : gestion du rendu DOM et des interactions utilisateur.
 *
 * 📘 Documentation :
 * https://github.com/Byakoren/TaskForge/blob/main/docs/modules/ui.md
 *
 * Ce module s’occupe uniquement de l’affichage et des actions de l’utilisateur :
 * - construction dynamique des listes de tâches
 * - gestion des clics (ajout, toggle, déplacement, renommage, suppression)
 * - remontée des événements vers main.js via des callbacks
 */

const S = {
    form: "#task-form",
    input: "#task-input",
    todo: "#list-todo",
    doing: "#list-doing",
    done: "#list-done",
};

// Références DOM
let $form, $input, $todo, $doing, $done;

// Callbacks reçus de main.js
let onAddCb = null, onToggleCb = null, onMoveCb = null, onRenameCb = null, onDeleteCb = null;

// ID de la tâche dont le menu est actuellement ouvert
let openMenuFor = null; 

/**
 * Initialise l’interface utilisateur :
 * - stocke les références DOM
 * - enregistre les callbacks transmis depuis main.js
 * - attache les écouteurs d’événements
 */
export function initUI({ onAdd, onToggle, onMove, onRename, onDelete } = {}) {
    // Sélection des éléments principaux
    $form = qs(S.form);
    $input = qs(S.input);
    $todo = qs(S.todo);
    $doing = qs(S.doing);
    $done = qs(S.done);

    // Sécurisation des callbacks
    onAddCb = fn(onAdd);
    onToggleCb = fn(onToggle);
    onMoveCb = fn(onMove);
    onRenameCb = fn(onRename);
    onDeleteCb = fn(onDelete);

    // Événement d’ajout de tâche
    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = $input.value.trim();
        if (!title) return;
        onAddCb?.(title);
        $input.value = "";
        $input.focus();
    });

    // Gestion des clics dans les trois listes
    [$todo, $doing, $done].forEach(($list) => {
        $list.addEventListener("click", onListClick);
    });

    // Ferme les menus si clic en dehors d’une tâche
    document.addEventListener("click", (e) => {
        const target = /** @type {HTMLElement} */ (e.target);
        if (!target.closest(".task-item")) closeAnyMenu();
    });

    // Ferme les menus avec la touche Échap
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAnyMenu();
    });
}

/**
 * Gère tous les clics dans les listes de tâches via délégation d’événements.
 */
function onListClick(e) {
    const el = /** @type {HTMLElement} */ (e.target);
    const li = el.closest("li[data-id]");
    if (!li) return;
    const id = li.dataset.id;

    // Toggle terminé / non terminé
    if (el.closest("[data-action='toggle']")) {
        onToggleCb?.(id);
        return;
    }

    // Ouvre ou ferme le menu contextuel
    if (el.closest("[data-action='menu']")) {
        toggleMenuFor(li, id);
        return;
    }

    // Déplacement de la tâche (changement d’état)
    const moveBtn = el.closest("[data-menu='move']");
    if (moveBtn) {
        const to = moveBtn.getAttribute("data-to");
        if (to) onMoveCb?.(id, to);
        closeAnyMenu();
        return;
    }

    // Renommage de la tâche
    if (el.closest("[data-menu='rename']")) {
        const current = li.querySelector(".task-title")?.textContent ?? "";
        const newTitle = prompt("Nouveau titre de la tâche :", current);
        if (newTitle && newTitle.trim()) onRenameCb?.(id, newTitle.trim());
        closeAnyMenu();
        return;
    }

    // Suppression de la tâche
    if (el.closest("[data-menu='delete']")) {
        const ok = confirm("Supprimer cette tâche ?");
        if (ok) onDeleteCb?.(id);
        closeAnyMenu();
        return;
    }
}

/**
 * Ouvre ou ferme le menu d’un élément spécifique.
 * Ferme d’abord tout autre menu déjà ouvert.
 */
function toggleMenuFor(li, id) {
    if (openMenuFor && openMenuFor !== id) closeAnyMenu();

    const menu = li.querySelector(".menu");
    if (!menu) return;

    const isHidden = menu.hasAttribute("hidden");
    if (isHidden) {
        menu.removeAttribute("hidden");
        openMenuFor = id;
    } else {
        menu.setAttribute("hidden", "");
        openMenuFor = null;
    }
}

/**
 * Ferme le menu actuellement ouvert (s’il existe).
 */
function closeAnyMenu() {
    if (!openMenuFor) return;
    const open = document.querySelector(`li[data-id="${openMenuFor}"] .menu`);
    if (open) open.setAttribute("hidden", "");
    openMenuFor = null;
}

/**
 * Construit et affiche le contenu des trois colonnes (todo / doing / done).
 * Utilise des fragments pour limiter les reflows et accélérer le rendu.
 */
export function render(tasks = []) {
    // Réinitialisation des listes
    $todo.innerHTML = "";
    $doing.innerHTML = "";
    $done.innerHTML = "";

    // Fragments temporaires
    const frags = { todo: docFrag(), doing: docFrag(), done: docFrag() };

    // Création des items
    for (const t of tasks) {
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = String(t.id);

        li.innerHTML = `
        <div class="task-meta">
            <label class="task-check" data-action="toggle" title="Basculer terminé">
                <input type="checkbox" ${t.done ? "checked" : ""} />
            </label>
            <span class="task-title ${t.done ? "is-done" : ""}">${escapeHTML(t.title)}</span>
        </div>
        <div class="task-actions">
            <button class="btn-kebab" data-action="menu" aria-haspopup="menu" aria-label="Actions">
                ⋯
            </button>
        </div>

        <div class="menu" hidden role="menu" aria-label="Actions de tâche">
            <h4>Changer d’état</h4>
            <button data-menu="move" data-to="todo">À faire</button>
            <button data-menu="move" data-to="doing">En cours</button>
            <button data-menu="move" data-to="done">Terminé</button>
            <h4>Autres</h4>
            <button data-menu="rename">Renommer</button>
            <button class="danger" data-menu="delete">Supprimer</button>
        </div>
        `;

        frags[t.status || "todo"].appendChild(li);
    }

    // Montage final
    $todo.appendChild(frags.todo);
    $doing.appendChild(frags.doing);
    $done.appendChild(frags.done);
}

/**
 * Active ou désactive les contrôles du formulaire pendant un chargement.
 */
export function setLoading(is) {
    $form.querySelector("button[type='submit']").disabled = !!is;
    $input.disabled = !!is;
}

/**
 * Sélecteur DOM sécurisé : lève une erreur si l’élément est introuvable.
 */
function qs(s) {
    const el = document.querySelector(s);
    if (!el) throw new Error(`[ui] ${s} introuvable`);
    return el;
}

/**
 * Retourne la fonction passée si valide, sinon null.
 */
function fn(f) {
    return typeof f === "function" ? f : null;
}

/**
 * Crée un fragment de document pour limiter les reflows DOM.
 */
function docFrag() {
    return document.createDocumentFragment();
}

/**
 * Protège le rendu HTML contre les caractères spéciaux.
 */
function escapeHTML(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
