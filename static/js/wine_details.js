document.addEventListener('DOMContentLoaded', function() {
    const wineId = window.location.pathname.split('/').pop();

    fetch(`/wine/${wineId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('wine-name').innerText = data.wine.nombre;
            document.getElementById('wine-type').innerText = data.wine.tipo;
            document.getElementById('wine-price').innerText = data.wine.precio + ' €';

            let opinionesList = document.getElementById('opiniones-list');
            opinionesList.innerHTML = '';
            data.opiniones.forEach(opinion => {
                let li = document.createElement('li');
                li.innerHTML = `<strong>${opinion.usuario_id}</strong>: ${opinion.comentario} (${opinion.puntuacion} estrellas)`;
                opinionesList.appendChild(li);
            });

            document.getElementById('add-opinion-link').href = `/add_opinion/${wineId}`;
        });
});
