document.addEventListener('DOMContentLoaded', function() {
    // Pantalla de bienvenida
    const welcome = document.getElementById('welcome');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    enterBtn.addEventListener('click', function() {
        welcome.classList.add('hidden');
        mainContent.classList.remove('hidden');
    });

    // Dropdowns
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = btn.parentElement;
            parent.classList.toggle('active');
        });
    });

    // Formulario de contacto
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje!');
        form.reset();
    });

    // Animación de fondo: transición suave entre dos imágenes
    const bg1 = document.getElementById('bg1');
    const bg2 = document.getElementById('bg2');
    const images = [
        "linear-gradient(120deg, #a8edea99 0%, #fed6e399 100%), url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh2ZMlrQ20KQaPPmK61gzE20KMF9Vuds_0gfEbsWKNZxp2XimU3F4ltRToi4jSurEEpuKeUQnecpd5EgnynvUCXRUUeghwNLiepV0FtxTiW7ZN7PuOzN3Ldv-Xyj0HmVaBfO8fmX2skvvu/w1366-h768-c/mordekaiser-new-splash-art-lol-4K-96.jpg')",
        "linear-gradient(120deg, #a8edea99 0%, #fed6e399 100%), url('https://images3.alphacoders.com/101/thumb-1920-1018651.jpg')"
    ];
    let showing = 0;
    bg1.style.backgroundImage = images[0];
    bg2.style.backgroundImage = images[1];
    function crossfade() {
        if (showing === 0) {
            bg2.classList.add('fade-in');
            bg2.classList.remove('fade-out');
            bg1.classList.add('fade-out');
            bg1.classList.remove('fade-in');
        } else {
            bg1.classList.add('fade-in');
            bg1.classList.remove('fade-out');
            bg2.classList.add('fade-out');
            bg2.classList.remove('fade-in');
        }
        showing = 1 - showing;
    }
    // Inicializar opacidad
    bg1.classList.add('fade-in');
    bg2.classList.add('fade-out');
    setInterval(crossfade, 6000);
});
