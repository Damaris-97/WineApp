document.addEventListener('DOMContentLoaded', function() {
    const eventosDia = document.getElementById('eventos-dia');
    const eventosMes = document.getElementById('eventos-mes');

    fetch('/get_events')
        .then(response => response.json())
        .then(eventos => {
            const hoy = new Date();
            const mesActual = hoy.getMonth();
            const anioActual = hoy.getFullYear();

            eventos.forEach(evento => {
                const fechaEvento = new Date(evento.fecha);
                const li = document.createElement('li');
                li.innerHTML = `<strong>${evento.titulo}</strong><br>${evento.fecha}<br>${evento.descripcion}`;

                if (fechaEvento.toDateString() === hoy.toDateString()) {
                    eventosDia.appendChild(li);
                }

                if (fechaEvento.getMonth() === mesActual && fechaEvento.getFullYear() === anioActual) {
                    eventosMes.appendChild(li);
                }
            });
        });
});
