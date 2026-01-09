import { setupDragAndDrop } from './drag.js';
import { initRowManager } from './rows.js';
import { initImageUploader } from './images.js';
import { initExportSystem } from './export.js'; // <--- Nuevo

console.log('⚡ CuchiOps Tier List App: Inicializando...');

document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    initRowManager();
    initImageUploader();
    initExportSystem(); // <--- Activamos la cámara
    
    console.log('✅ Sistema Totalmente Operativo 🚀');
});