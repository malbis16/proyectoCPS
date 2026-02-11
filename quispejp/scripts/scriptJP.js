document.addEventListener('DOMContentLoaded', () => {

    // Referencias al DOM
    const form = document.getElementById('personalForm');
    const submitBtn = document.getElementById('submitBtn');
    const exportBtn = document.getElementById('exportBtn');
    const contadorSpan = document.getElementById('contador');

    // Almacén temporal de datos (Array)
    let listaDatos = [];

    // --- FUNCIÓN 1: GUARDAR DATOS EN MEMORIA ---
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Capturar valores
        const nuevoRegistro = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            fecha: document.getElementById('fecha').value,
            telefono: document.getElementById('telefono').value,
            // Quitamos saltos de línea y comillas dobles de la bio para no romper el CSV
            bio: document.getElementById('bio').value.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, '""')
        };

        // 2. Agregar al array
        listaDatos.push(nuevoRegistro);

        // 3. Feedback visual y limpieza
        actualizarContador();
        form.reset();

        // Animación pequeña en el botón
        const textoOriginal = submitBtn.innerText;
        submitBtn.innerText = "¡Agregado!";
        setTimeout(() => {
            submitBtn.innerText = textoOriginal;
        }, 1000);
    });

    // --- FUNCIÓN 2: EXPORTAR TODO A CSV ---
    exportBtn.addEventListener('click', function () {

        if (listaDatos.length === 0) {
            alert("No hay datos para exportar. Guarda al menos un registro.");
            return;
        }

        // 1. Crear cabecera del CSV
        let csvContent = "Nombre,Email,Fecha Nacimiento,Telefono,Bio\n";

        // 2. Recorrer el array y convertir cada objeto a una fila de texto
        listaDatos.forEach(fila => {
            // Usamos comillas para asegurar que si hay comas en el texto, no se rompa la columna
            let filaString = `"${fila.nombre}","${fila.email}","${fila.fecha}","${fila.telefono}","${fila.bio}"`;
            csvContent += filaString + "\n";
        });

        // 3. Crear y descargar el archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "base_datos_completa.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert(`¡Éxito! Se han exportado ${listaDatos.length} registros.`);
    });

    // Función auxiliar para actualizar el texto del contador
    function actualizarContador() {
        contadorSpan.innerText = `Registros guardados temporalmente: ${listaDatos.length}`;
        // Cambiar color del contador si hay datos
        contadorSpan.style.color = listaDatos.length > 0 ? "var(--success)" : "var(--text-muted)";
    }
});