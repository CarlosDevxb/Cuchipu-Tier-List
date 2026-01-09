// src/js/export.js

export function initExportSystem() {
    const saveBtn = document.getElementById('save-btn'); // El botón flotante 💾
    const boardToCapture = document.querySelector('.tier-board');

    saveBtn.addEventListener('click', () => {
        
        // 1. PREPARACIÓN VISUAL
        // Añadimos la clase que oculta botones feos
        document.body.classList.add('taking-screenshot');
        
        // Feedback visual para el usuario (cambiamos el emoji del botón)
        const originalText = saveBtn.innerText;
        saveBtn.innerText = '📸';

        // 2. TOMAR LA FOTO
        // html2canvas es una variable global gracias al script del CDN
        html2canvas(boardToCapture, {
            backgroundColor: '#1b1d22', // Forzamos el color de fondo oscuro (mismo que --panel-bg)
            scale: 2, // Mejora la resolución (2x para pantallas Retina/celulares)
            useCORS: true, // Ayuda con imágenes externas si las hubiera
            logging: false
        }).then(canvas => {
            
            // 3. DESCARGAR LA IMAGEN
            // Convertimos el canvas a una URL de imagen
            const imageURL = canvas.toDataURL('image/png');

            // Creamos un link invisible temporal
            const downloadLink = document.createElement('a');
            downloadLink.href = imageURL;
            downloadLink.download = 'mi-tier-list.png'; // Nombre del archivo
            
            // Lo clickeamos programáticamente
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // 4. LIMPIEZA
            document.body.classList.remove('taking-screenshot');
            saveBtn.innerText = originalText;
        }).catch(err => {
            console.error("Error al exportar:", err);
            alert("Hubo un error al generar la imagen.");
            document.body.classList.remove('taking-screenshot');
            saveBtn.innerText = originalText;
        });
    });
}