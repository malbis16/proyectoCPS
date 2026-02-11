document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('personalForm');
    const btn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que la página se recargue

        // Capturamos el valor del nombre para el saludo
        const nombreInput = document.getElementById('nombre');
        const nombre = nombreInput.value;

        // Guardamos el texto original del botón
        const originalText = btn.innerText;

        // Simulamos un estado de "Cargando..." o "Guardado"
        btn.innerText = "¡Guardado con éxito!";
        btn.style.backgroundColor = "var(--success)"; // Cambia a verde
        btn.style.transform = "scale(0.98)";

        // Mostramos la alerta después de una pequeña pausa
        setTimeout(() => {
            alert(`¡Hola ${nombre}! Tus datos han sido procesados correctamente.`);

            // Restauramos el botón a su estado original
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.style.transform = "";

            // Opcional: Limpiar el formulario
            form.reset();
        }, 500);
    });
});