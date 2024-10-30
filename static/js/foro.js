document.addEventListener('DOMContentLoaded', function() {
    const opinionForm = document.getElementById('opinionForm');
    const opinionesList = document.getElementById('opinionesList');

    opinionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const comentario = document.getElementById('comentario').value;

        if (usuario && comentario) {
            const opinionItem = document.createElement('li');
            opinionItem.innerHTML = `<strong>${usuario}</strong>: ${comentario}`;
            opinionesList.appendChild(opinionItem);

            // Limpiar el formulario
            opinionForm.reset();
        }
    });
});
