document.addEventListener('DOMContentLoaded', function() {
    const wineId = window.location.pathname.split('/').pop();

    // Fetch wine details
    fetch(`/wine/${wineId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('wine-name').innerText = data.wine.nombre;
            document.getElementById('wine-type').innerText = data.wine.tipo;
            document.getElementById('wine-price').innerText = data.wine.precio + ' €';
            document.getElementById('wine-description').innerText = data.wine.descripcion;

            let opinionesList = document.getElementById('opiniones-list');
            opinionesList.innerHTML = '';
            data.opiniones.forEach(opinion => {
                let li = document.createElement('li');
                li.innerHTML = `<strong>${opinion.usuario_id}</strong>: ${opinion.comentario} (${opinion.puntuacion} estrellas)`;
                opinionesList.appendChild(li);
            });
        });

    // Handle form submission
    const opinionForm = document.getElementById('opinionForm');
    opinionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const comentario = document.getElementById('comentario').value;

        if (usuario && comentario) {
            const opinionItem = document.createElement('li');
            opinionItem.innerHTML = `<strong>${usuario}</strong>: ${comentario}`;
            document.getElementById('opiniones-list').appendChild(opinionItem);

            // Optionally, send the new opinion to the server
            fetch(`/add_opinion/${wineId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, comentario })
            });

            // Clear the form
            opinionForm.reset();
        }
    });
});
