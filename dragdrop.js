let draggedTaskId = null;

function initDragAndDrop(onDropCallback) {
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('task-card')) {
            draggedTaskId = e.target.dataset.id;
            e.target.classList.add('dragging');
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('task-card')) {
            e.target.classList.remove('dragging');
        }
    });

    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('dragover', (e) => e.preventDefault());
        column.addEventListener('drop', (e) => {
            e.preventDefault();
            const status = column.dataset.status;
            onDropCallback(draggedTaskId, status);
        });
    });
}