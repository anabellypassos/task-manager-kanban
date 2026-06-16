let tasks = Storage.getTasks();
let modalAction = null;

// Elementos
const modal = {
    overlay: document.getElementById('modalOverlay'),
    title: document.getElementById('modalTitle'),
    input: document.getElementById('modalInput'),
    desc: document.getElementById('modalDesc'),
    confirm: document.getElementById('modalConfirmBtn'),
    cancel: document.getElementById('modalCancelBtn')
};

// --- Funções de Renderização ---
function render() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const filter = document.getElementById('filterSelect').value;

    document.querySelectorAll('.task-list').forEach(list => list.innerHTML = '');

    tasks.forEach(task => {
        const matchesSearch = task.content.toLowerCase().includes(search);
        const matchesFilter = filter === 'all' || 
            (filter === 'active' && task.status !== 'done') ||
            (filter === 'completed' && task.status === 'done');

        if (matchesSearch && matchesFilter) {
            const el = createTaskElement(task);
            document.querySelector(`.column[data-status="${task.status}"] .task-list`).appendChild(el);
        }
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.draggable = true;
    div.dataset.id = task.id;
    div.innerHTML = `
        <span class="task-text">${Utils.escapeHTML(task.content)}</span>
        <button class="delete-btn">&times;</button>
    `;

    div.addEventListener('dblclick', () => openTaskModal('edit', task));
    div.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openTaskModal('delete', task);
    });
    return div;
}

// --- Funções do Modal ---
function openTaskModal(type, task = null) {
    modalAction = { type, task };
    modal.input.classList.remove('hidden');
    modal.desc.textContent = '';

    if (type === 'add') {
        modal.title.textContent = i18n.getText('add_task');
        modal.input.value = '';
        modal.input.placeholder = i18n.getText('prompt_new_task');
    } else if (type === 'edit') {
        modal.title.textContent = i18n.getText('prompt_edit_task');
        modal.input.value = task.content;
    } else if (type === 'delete') {
        modal.title.textContent = i18n.getText('confirm_delete');
        modal.input.classList.add('hidden');
        modal.desc.textContent = task.content;
    }

    modal.overlay.classList.remove('hidden');
    if (!modal.input.classList.contains('hidden')) modal.input.focus();
}

modal.confirm.addEventListener('click', () => {
    const { type, task } = modalAction;
    const value = modal.input.value.trim();

    if (type === 'add' && value) {
        tasks.push({ id: Utils.generateId(), content: value, status: 'todo' });
    } else if (type === 'edit' && value) {
        task.content = value;
    } else if (type === 'delete') {
        tasks = tasks.filter(t => t.id !== task.id);
    }

    closeModal();
    saveAndRender();
});

function closeModal() { modal.overlay.classList.add('hidden'); }
modal.cancel.addEventListener('click', closeModal);

// --- Inicialização ---
function saveAndRender() {
    Storage.saveTasks(tasks);
    render();
}

document.getElementById('langSelect').addEventListener('change', (e) => {
    i18n.setLanguage(e.target.value);
    render();
});

document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal('add'));
document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('filterSelect').addEventListener('change', render);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('langSelect').value = i18n.currentLang;
    i18n.apply();
    initDragAndDrop((id, status) => {
        const task = tasks.find(t => t.id === id);
        if (task) { task.status = status; saveAndRender(); }
    });
    render();
});