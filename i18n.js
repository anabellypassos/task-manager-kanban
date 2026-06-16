const translations = {
    'pt-BR': {
        title: "Kanban Board",
        add_task: "+ Add Task",
        search_placeholder: "Pesquisar tarefas...",
        todo: "A Fazer",
        inprogress: "Em Andamento",
        done: "Concluído",
        filter_all: "Todos",
        filter_active: "Ativos",
        filter_completed: "Concluídos",
        prompt_new_task: "O que precisa ser feito?",
        prompt_edit_task: "Editar tarefa:",
        confirm_delete: "Deseja excluir esta tarefa?",
        modal_confirm: "Confirmar",
        modal_cancel: "Cancelar"
    },
    'en-US': {
        title: "Kanban Board",
        add_task: "+ Add Task",
        search_placeholder: "Search tasks...",
        todo: "To Do",
        inprogress: "In Progress",
        done: "Done",
        filter_all: "All",
        filter_active: "Active",
        filter_completed: "Completed",
        prompt_new_task: "What needs to be done?",
        prompt_edit_task: "Edit task:",
        confirm_delete: "Delete this task?",
        modal_confirm: "Confirm",
        modal_cancel: "Cancel"
    }
};

const i18n = {
    currentLang: Storage.getLang(),
    setLanguage(lang) {
        this.currentLang = lang;
        Storage.saveLang(lang);
        this.apply();
    },
    getText(key) {
        return translations[this.currentLang][key] || key;
    },
    apply() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT') el.placeholder = this.getText(key);
            else el.textContent = this.getText(key);
        });
    }
};