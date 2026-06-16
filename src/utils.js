const Utils = {
    generateId: () => 'task-' + Date.now() + Math.random().toString(36).substr(2, 5),
    escapeHTML: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};