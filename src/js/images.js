// src/js/images.js
import { makeItemDraggable } from './drag.js';

export function initImageUploader() {
    const imageInput = document.getElementById('image-upload');
    const imageBank = document.getElementById('bank');

    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);

        // Limpiamos el input para permitir subir la misma imagen dos veces si se quiere
        imageInput.value = '';

        if (files.length === 0) return;

        // Procesamos cada archivo seleccionado
        files.forEach(file => {
            // Validación simple: ¿Es una imagen?
            if (!file.type.startsWith('image/')) {
                console.warn('Archivo ignorado, no es una imagen:', file.name);
                return;
            }

            const reader = new FileReader();

            // Evento: Cuando el lector termina de leer el archivo
            reader.onload = (event) => {
                const imageUrl = event.target.result; // Esto es una cadena Base64 larga

                // Crear el elemento visual
                const newCard = document.createElement('div');
                newCard.classList.add('item-card');
                newCard.style.backgroundImage = `url(${imageUrl})`;

                // 🔥 MAGIA: Le damos vida con Drag & Drop
                makeItemDraggable(newCard);

                // Lo agregamos al banco
                imageBank.appendChild(newCard);
            };

            // Ordenamos leer el archivo como Data URL
            reader.readAsDataURL(file);
        });
    });
}