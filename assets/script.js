document.addEventListener('DOMContentLoaded', function() {
            // Progreso circular
            const circularBar = document.querySelector('.circular-bar');
            const circularBg = document.querySelector('.circular-bg');
            const circularSVG = document.querySelector('.circular-progress');
            const circularContainer = document.querySelector('.circular-progress-container');
            // Definir gradiente para el SVG
            if (circularSVG) {
                const svgNS = 'http://www.w3.org/2000/svg';
                const defs = document.createElementNS(svgNS, 'defs');
                const grad = document.createElementNS(svgNS, 'linearGradient');
                grad.setAttribute('id', 'progress-gradient');
                grad.setAttribute('x1', '0%');
                grad.setAttribute('y1', '0%');
                grad.setAttribute('x2', '100%');
                grad.setAttribute('y2', '0%');
                const stop1 = document.createElementNS(svgNS, 'stop');
                stop1.setAttribute('offset', '0%');
                stop1.setAttribute('stop-color', '#a8edea');
                const stop2 = document.createElementNS(svgNS, 'stop');
                stop2.setAttribute('offset', '100%');
                stop2.setAttribute('stop-color', '#6c63ff');
                grad.appendChild(stop1);
                grad.appendChild(stop2);
                defs.appendChild(grad);
                circularSVG.insertBefore(defs, circularSVG.firstChild);
            }
            // Configuración inicial del círculo
            if (circularBar && circularBg) {
                const radius = 28;
                const circumference = 2 * Math.PI * radius;
                circularBar.style.strokeDasharray = `${circumference}`;
                circularBar.style.strokeDashoffset = `${circumference}`;
                circularBg.style.strokeDasharray = `${circumference}`;
                circularBg.style.strokeDashoffset = 0;
            }
        // Música de fondo
        const bgMusic = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');
        const musicIcon = document.getElementById('music-icon');
        let musicPlaying = false;

        // Iniciar en pausa para evitar reproducción automática
        bgMusic.volume = 0.5;
        bgMusic.pause();
        musicIcon.classList.remove('fa-volume-mute');
        musicIcon.classList.add('fa-volume-up');

        musicToggle.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            } else {
                bgMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            }
        });

        // Opcional: pausar música al salir de la pestaña
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && !bgMusic.paused) {
                bgMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            }
        });

    // Pantalla de bienvenida
    const welcome = document.getElementById('welcome');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    const welcomeSound = document.getElementById('welcome-sound');

    enterBtn.addEventListener('click', function() {
            // Mostrar el círculo de progreso
            if (circularContainer) circularContainer.style.display = 'flex';
        // Reproducir sonido de bienvenida
        welcomeSound.currentTime = 0;
        welcomeSound.play();
        enterBtn.disabled = true;
        // Animación circular de progreso
        if (circularBar) {
            const radius = 28;
            const circumference = 2 * Math.PI * radius;
            let start;
            let duration = welcomeSound.duration;
            // Si el audio aún no está cargado
            if (!duration || isNaN(duration) || duration === Infinity) {
                welcomeSound.onloadedmetadata = function() {
                    duration = welcomeSound.duration;
                    animateProgress(duration);
                };
            } else {
                animateProgress(duration);
            }
            function animateProgress(total) {
                circularBar.style.strokeDashoffset = `${circumference}`;
                start = null;
                function step(ts) {
                    if (!start) start = ts;
                    const elapsed = (ts - start) / 1000;
                    const progress = Math.min(elapsed / total, 1);
                    circularBar.style.strokeDashoffset = `${circumference * (1 - progress)}`;
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                requestAnimationFrame(step);
            }
        }
        // Cuando termine el audio, mostrar el contenido principal
        welcomeSound.onended = function() {
                        // Ocultar el círculo de progreso
                        if (circularContainer) circularContainer.style.display = 'none';
            welcome.classList.add('hidden');
            mainContent.classList.remove('hidden');
            enterBtn.disabled = false;
            // Resetear progreso
            if (circularBar) {
                const radius = 28;
                const circumference = 2 * Math.PI * radius;
                circularBar.style.strokeDashoffset = `${circumference}`;
            }
            // Iniciar música de fondo automáticamente
            if (bgMusic.paused) {
                bgMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        };
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
