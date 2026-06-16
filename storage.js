const Storage = {
    saveTasks(tasks) {
        localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
    },
    getTasks() {
        return JSON.parse(localStorage.getItem('kanban_tasks')) || [];
    },
    saveLang(lang) {
        localStorage.setItem('kanban_lang', lang);
    },
    getLang() {
        return localStorage.getItem('kanban_lang') || 'pt-BR';
    }
};