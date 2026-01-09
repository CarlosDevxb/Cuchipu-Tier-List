// src/js/rows.js
import { enableDropZone } from './drag.js';

// CONFIGURACIÓN MAESTRA
// Definimos explícitamente qué letra y color toca según la posición de la fila
const TIER_PRESETS = [
    { label: 'S', color: '#ff7f7f' },
    { label: 'A', color: '#ffbf7f' },
    { label: 'B', color: '#ffdf7f' }, // Índice 2
    { label: 'C', color: '#ffff7f' },
    { label: 'D', color: '#bfff7f' },
    { label: 'E', color: '#7fbf7f' },
    { label: 'F', color: '#7fffff' },
    { label: 'G', color: '#7f7fff' }  // Índice 7 (Total 8 filas)
];

const MAX_ROWS = TIER_PRESETS.length; // 8

export function initRowManager() {
    const addBtn = document.getElementById('add-row-btn');
    const container = document.getElementById('rows-container');
    const countDisplay = document.getElementById('row-count-display');

    // Función para actualizar UI
    const updateUI = () => {
        const currentRows = container.children.length;
        countDisplay.textContent = `${currentRows} / ${MAX_ROWS} Filas`;
        
        // Manejo de estado del botón
        if (currentRows >= MAX_ROWS) {
            addBtn.disabled = true;
            addBtn.innerText = "Límite Alcanzado";
        } else {
            addBtn.disabled = false;
            addBtn.innerText = "+ Agregar Fila";
        }

        // Opcional: Mostrar mensaje si no hay filas
        if (currentRows === 0) {
            countDisplay.textContent = "Sin filas (¡Agrega una!)";
        }
    };

    // Inicializar lógica de borrado para las filas que ya existen en el HTML (S, A, B)
    // Esto asegura que los botones 'X' iniciales funcionen
    container.querySelectorAll('.delete-row-btn').forEach(btn => {
        // Clonamos el nodo para eliminar listeners viejos si los hubiera y poner uno limpio
        // (O usamos delegación de eventos como abajo, que es más limpio)
    });

    // ESCUCHADOR GLOBAL: Delegación de eventos para borrar
    // (Esto maneja tanto las filas viejas como las nuevas)
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-row-btn')) {
            const row = e.target.closest('.tier-row');
            if (row) {
                row.remove();
                updateUI(); // Actualizamos contador al borrar
            }
        }
    });

    // ESCUCHADOR: Agregar Fila
    addBtn.addEventListener('click', () => {
        const currentCount = container.children.length;

        if (currentCount >= MAX_ROWS) return;

        // LÓGICA CORREGIDA:
        // Usamos el número actual de filas como índice directo.
        // Si hay 0 filas, toma el preset 0 (S). Si hay 2 filas, toma el preset 2 (B).
        const preset = TIER_PRESETS[currentCount] || { label: '?', color: '#ccc' };

        const newRow = document.createElement('div');
        newRow.classList.add('tier-row');
        
        newRow.innerHTML = `
            <div class="tier-label" contenteditable="true" style="background-color: ${preset.color};">
                ${preset.label}
            </div>
            <div class="tier-content"></div>
            <div class="tier-settings">
                <button class="btn-icon delete-row-btn" title="Eliminar fila">✕</button>
                <div class="handle">⋮⋮</div>
            </div>
        `;

        container.appendChild(newRow);

        // Activar Drag & Drop en la nueva zona
        const newDropZone = newRow.querySelector('.tier-content');
        enableDropZone(newDropZone);

        updateUI();
    });

    // Correr actualización inicial
    updateUI();
}