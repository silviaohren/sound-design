
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        });
        
        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Elementi interattivi con il cursore
        const links = document.querySelectorAll('a, button, .play-button, .project-card');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'white';
                cursor.style.backgroundColor = 'rgba(142, 68, 173, 0.2)';
            });
            
            link.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (header && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Aggiorna link attivo in base alla sezione visibile
            let current = '';
            
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Menu toggle per mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Chiudi menu quando si clicca su un link (mobile)
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }
    
    // Audio player functionality
    const audioPlayer = document.querySelector('.audio-player');
    const trackTitle = document.querySelector('.track-title');
    const progressBar = document.querySelector('.progress-bar');
    const stopBtn = document.getElementById('player-stop');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (audioPlayer && trackTitle && progressBar && stopBtn && projectCards.length > 0) {
        let audio = new Audio();
        let currentProject = null;
        
        // Funzione per riprodurre l'audio
        function playAudio(audioSrc, title) {
            // Ferma l'audio corrente se in riproduzione
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
            
            // Imposta e riproduci il nuovo audio
            audio.src = audioSrc;
            audio.play();
            trackTitle.textContent = title;
            audioPlayer.classList.add('playing');
            
            // Aggiorna la barra di progresso durante la riproduzione
            audio.addEventListener('timeupdate', updateProgress);
            
            // Quando l'audio finisce
            audio.addEventListener('ended', function() {
                audioPlayer.classList.remove('playing');
                progressBar.style.width = '0%';
                currentProject.classList.remove('playing');
                currentProject = null;
            });
        }
        
        // Aggiorna la barra di progresso
        function updateProgress() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
        
        // Gestisci il click sui progetti per riprodurre l'audio
        projectCards.forEach(card => {
            const playButton = card.querySelector('.play-button');
            
            if (playButton) {
                playButton.addEventListener('click', function() {
                    const audioSrc = card.getAttribute('data-audio');
                    const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Audio';
                    
                    // Se questo progetto è già in riproduzione, metti in pausa
                    if (currentProject === card && !audio.paused) {
                        audio.pause();
                        card.classList.remove('playing');
                        audioPlayer.classList.remove('playing');
                        currentProject = null;
                        return;
                    }
                    
                    // Rimuovi la classe playing da tutti i progetti
                    projectCards.forEach(p => p.classList.remove('playing'));
                    
                    // Aggiungi la classe playing al progetto corrente
                    card.classList.add('playing');
                    currentProject = card;
                    
                    // Riproduci l'audio
                    playAudio(audioSrc, title);
                });
            }
        });
        
        // Pulsante stop
        stopBtn.addEventListener('click', function() {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                audioPlayer.classList.remove('playing');
                if (currentProject) {
                    currentProject.classList.remove('playing');
                    currentProject = null;
                }
            }
        });
    }
    
    // Gestione del form di contatto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulazione invio form
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Invio in corso...';
                submitBtn.disabled = true;
                
                // Simulazione di una richiesta AJAX
                setTimeout(function() {
                    submitBtn.textContent = 'Messaggio Inviato!';
                    
                    // Reset del form
                    contactForm.reset();
                    
                    // Ripristina il testo originale del pulsante dopo 3 secondi
                    setTimeout(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Animazione per le skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    
    if (skillBars.length > 0) {
        // Funzione per animare le skill bars quando sono visibili
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (barPosition < screenPosition) {
                    bar.style.width = bar.style.width;
                } else {
                    bar.style.width = '0';
                }
            });
        }
        
        // Controlla le skill bars all'avvio e durante lo scroll
        window.addEventListener('scroll', animateSkillBars);
        animateSkillBars();
    }
    
    // Animazione per gli elementi quando entrano nel viewport
    const fadeElements = document.querySelectorAll('.project-card, .service-card, .about-image, .about-text');
    
    if (fadeElements.length > 0) {
        function checkFade() {
            fadeElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('fade-in');
                }
            });
        }
        
        window.addEventListener('scroll', checkFade);
        checkFade();
        
        // Aggiungi la classe CSS necessaria per l'animazione fade-in
        const style = document.createElement('style');
        style.textContent = `
            .project-card, .service-card, .about-image, .about-text {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-card:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .project-card:nth-child(3) {
                transition-delay: 0.4s;
            }
            
            .service-card:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .service-card:nth-child(3) {
                transition-delay: 0.4s;
            }
            
            .service-card:nth-child(4) {
                transition-delay: 0.6s;
            }
        `;
        document.head.appendChild(style);
    }
});
