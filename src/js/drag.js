// src/js/drag.js

let draggedItem = null;

function clearGlobalHighlights() {
    const allZones = document.querySelectorAll('.tier-content.drag-over, .image-bank.drag-over');
    allZones.forEach(zone => zone.classList.remove('drag-over'));
}

// 🔥 NUEVA FUNCIÓN EXPORTADA: Activa un item individual (imagen)
export function makeItemDraggable(item) {
    item.setAttribute('draggable', 'true');

    item.addEventListener('dragstart', () => {
        draggedItem = item;
        setTimeout(() => {
            item.style.opacity = '0.5';
        }, 0);
    });

    item.addEventListener('dragend', () => {
        setTimeout(() => {
            item.style.opacity = '1';
            draggedItem = null;
            clearGlobalHighlights();
        }, 0);
    });
}

export function enableDropZone(zone) {
    if (zone.dataset.dropEnabled === "true") return;
    zone.dataset.dropEnabled = "true";

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        clearGlobalHighlights();
        if (draggedItem && zone !== draggedItem.parentNode) {
            zone.appendChild(draggedItem);
        }
    });
}

export function setupDragAndDrop() {
    const items = document.querySelectorAll('.item-card');
    const dropZones = document.querySelectorAll('.tier-content, .image-bank');

    // Usamos nuestra nueva función para los items iniciales
    items.forEach(item => makeItemDraggable(item));

    // Configuramos las zonas
    dropZones.forEach(zone => enableDropZone(zone));
}   