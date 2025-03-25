function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    if (!ev.target.classList.contains("droppable")) {
        return;
    }
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    if (draggedElement) {
        ev.target.appendChild(draggedElement);
    } else {
        console.error(`Element with ID "${data}" not found.`);
    }
}

let draggedItem = null;

resultUIContent.addEventListener('dragstart', (event) => {
    if (event.target.classList.contains('result-item-container')) {
        draggedItem = event.target;
        event.target.classList.add('dragging');
    }
});

resultUIContent.addEventListener('dragend', (event) => {
    if (draggedItem) {
        draggedItem.classList.remove('dragging');
        draggedItem = null;
    }
    const placeholder = document.querySelector('.placeholder');
    if (placeholder) placeholder.remove();
});

resultUIContent.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(resultUIContent, event.clientY);
    const placeholder = document.querySelector('.placeholder');
    if (placeholder) placeholder.remove();

    if (afterElement == null && draggedItem) {
        const newPlaceholder = createPlaceholder();
        resultUIContent.appendChild(newPlaceholder);
    } else if (draggedItem) {
        const newPlaceholder = createPlaceholder();
        resultUIContent.insertBefore(newPlaceholder, afterElement);
    }
});

resultUIContent.addEventListener('drop', (event) => {
    event.preventDefault();
    const placeholder = document.querySelector('.placeholder');
    if (placeholder && draggedItem) {
        resultUIContent.insertBefore(draggedItem, placeholder);
        placeholder.remove();
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.result-item-container:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.style.pointerEvents = 'none';
    return placeholder;
}