document.addEventListener('DOMContentLoaded', function() {
    // Effetto terminale di scrittura per i titoli
    function typeWriterEffect() {
        const elements = document.querySelectorAll('.typewriter');
        
        elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.display = 'block';
            
            let i = 0;
            const speed = 50; // velocità di scrittura
            
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Aggiungi cursore lampeggiante alla fine
                    element.insertAdjacentHTML('beforeend', '<span class="blink">_</span>');
                }
            }
            
            typeWriter();
        });
    }
    
    // Aggiungi classe typewriter a elementi selezionati
    document.querySelectorAll('.hero h1, .about h2, .services h2, .contact h2').forEach(el => {
        el.classList.add('typewriter');
    });
    
    // Esegui effetto typewriter
    typeWriterEffect();
    
    // Effetto scanline
    const scanlineEffect = document.createElement('div');
    scanlineEffect.classList.add('scanlines');
    document.body.appendChild(scanlineEffect);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        // Modifica il cursore per renderlo più "retro"
        cursor.style.display = 'block';
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.border = '2px solid #be033e';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.mixBlendMode = 'difference';
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            cursor.style.backgroundColor = 'rgba(190, 3, 62, 0.5)';
        });
        
        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
        
        // Elementi interattivi con il cursore
        const links = document.querySelectorAll('a, button, .play-button, .project-card');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#ffffff';
                cursor.style.backgroundColor = 'rgba(190, 3, 62, 0.2)';
                // Aggiungi effetto "hover" retro
                this.style.textShadow = '0 0 5px #be033e';
            });
            
            link.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#be033e';
                cursor.style.backgroundColor = 'transparent';
                // Rimuovi effetto "hover"
                this.style.textShadow = 'none';
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
                // Aggiungi effetto "glitch" quando si scorre
                header.classList.add('glitch-effect');
                setTimeout(() => {
                    header.classList.remove('glitch-effect');
                }, 500);
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
                    
                    // Aggiungi effetto "terminale" quando si entra in una nuova sezione
                    if (!section.classList.contains('visited')) {
                        section.classList.add('visited');
                        const sectionTitle = section.querySelector('h2');
                        if (sectionTitle) {
                            sectionTitle.insertAdjacentHTML('beforebegin', 
                                '<div class="terminal-line">$ loading section ' + current + '...</div>' +
                                '<div class="terminal-line">$ access granted</div>'
                            );
                        }
                    }
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                    // Aggiungi effetto "terminale" al link attivo
                    link.innerHTML = link.innerHTML.replace('[', '[<span class="active-indicator">*</span>');
                } else {
                    link.innerHTML = link.innerHTML.replace('<span class="active-indicator">*</span>', '');
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
            
            // Aggiungi effetto "glitch" quando si apre/chiude il menu
            navMenu.classList.add('glitch-effect');
            setTimeout(() => {
                navMenu.classList.remove('glitch-effect');
            }, 500);
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
            trackTitle.innerHTML = '> PLAYING: ' + title + ' <span class="blink">_</span>';
            audioPlayer.classList.add('playing');
            
            // Aggiungi effetto "terminale" al player
            audioPlayer.classList.add('terminal-effect');
            setTimeout(() => {
                audioPlayer.classList.remove('terminal-effect');
            }, 500);
            
            // Aggiorna la barra di progresso durante la riproduzione
            audio.addEventListener('timeupdate', updateProgress);
            
            // Quando l'audio finisce
            audio.addEventListener('ended', function() {
                audioPlayer.classList.remove('playing');
                progressBar.style.width = '0%';
                currentProject.classList.remove('playing');
                currentProject = null;
                trackTitle.innerHTML = '> AUDIO TERMINATED <span class="blink">_</span>';
                
                // Aggiungi effetto "terminale" quando l'audio finisce
                audioPlayer.classList.add('terminal-effect');
                setTimeout(() => {
                    audioPlayer.classList.remove('terminal-effect');
                }, 500);
            });
        }
        
        // Aggiorna la barra di progresso
        function updateProgress() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        }
        
        // Gestisci il click sui progetti per riprodurre l'audio
        projectCards.forEach((card, index) => {
            const playButton = card.querySelector('.play-button');
            
            // Aggiungi numero di file al progetto
            const projectInfo = card.querySelector('.project-info');
            if (projectInfo) {
                const fileNumber = document.createElement('div');
                fileNumber.classList.add('file-number');
                fileNumber.textContent = 'FILE_' + (index + 1).toString().padStart(3, '0');
                projectInfo.prepend(fileNumber);
            }
            
            if (playButton) {
                playButton.addEventListener('click', function() {
                    const audioSrc = card.getAttribute('data-audio');
                    const title = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Audio';
                    
                    // Se questo progetto è già in riproduzione, metti in pausa
                    if (currentProject === card && !audio.paused) {
                        audio.pause();
                        card.classList.remove('playing');
                        audioPlayer.classList.remove('playing');
                        trackTitle.innerHTML = '> PAUSED: ' + title + ' <span class="blink">_</span>';
                        currentProject = null;
                        return;
                    }
                    
                    // Rimuovi la classe playing da tutti i progetti
                    projectCards.forEach(p => p.classList.remove('playing'));
                    
                    // Aggiungi la classe playing al progetto corrente
                    card.classList.add('playing');
                    currentProject = card;
                    
                    // Aggiungi effetto "glitch" quando si clicca play
                    card.classList.add('glitch-effect');
                    setTimeout(() => {
                        card.classList.remove('glitch-effect');
                    }, 500);
                    
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
                trackTitle.innerHTML = '> AUDIO STOPPED <span class="blink">_</span>';
                
                if (currentProject) {
                    currentProject.classList.remove('playing');
                    currentProject = null;
                }
                
                // Aggiungi effetto "terminale" quando si ferma l'audio
                audioPlayer.classList.add('terminal-effect');
                setTimeout(() => {
                    audioPlayer.classList.remove('terminal-effect');
                }, 500);
            }
        });
    }
    
    // Gestione del form di contatto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulazione invio form con effetto "terminale"
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                
                submitBtn.innerHTML = 'SENDING... <span class="blink">_</span>';
                submitBtn.disabled = true;
                
                // Aggiungi effetto "terminale" al form
                contactForm.classList.add('terminal-effect');
                
                // Simulazione di una richiesta AJAX
                setTimeout(function() {
                    submitBtn.innerHTML = 'MESSAGE SENT <span class="blink">_</span>';
                    
                    // Aggiungi messaggio di conferma in stile terminale
                    const confirmationMsg = document.createElement('div');
                    confirmationMsg.classList.add('terminal-message');
                    confirmationMsg.innerHTML = '> MESSAGE TRANSMITTED SUCCESSFULLY <span class="blink">_</span>';
                    contactForm.appendChild(confirmationMsg);
                    
                    // Reset del form
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.classList.remove('terminal-effect');
                        
                        // Ripristina il testo originale del pulsante dopo 3 secondi
                        setTimeout(function() {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            confirmationMsg.remove();
                        }, 3000);
                    }, 1000);
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
                    
                    // Aggiungi effetto "caricamento" in stile retro
                    const skillParent = bar.parentElement.parentElement;
                    const skillName = skillParent.querySelector('span').textContent;
                    const percentage = bar.style.width;
                    
                    if (!skillParent.querySelector('.skill-percentage')) {
                        const percentageEl = document.createElement('div');
                        percentageEl.classList.add('skill-percentage');
                        percentageEl.textContent = percentage;
                        skillParent.appendChild(percentageEl);
                    }
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
                    
                    // Aggiungi effetto "glitch" quando gli elementi appaiono
                    element.classList.add('glitch-effect');
                    setTimeout(() => {
                        element.classList.remove('glitch-effect');
                    }, 500);
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
            
            /* Effetti retro aggiuntivi */
            .terminal-effect {
                animation: terminal-flicker 0.3s ease;
            }
            
            .glitch-effect {
                animation: glitch 0.3s ease;
            }
            
            .terminal-line {
                color: #be033e;
                font-family: monospace;
                margin-bottom: 5px;
                opacity: 0.7;
            }
            
            .terminal-message {
                color: #be033e;
                font-family: monospace;
                margin-top: 15px;
                padding: 10px;
                border: 1px solid #be033e;
            }
            
            .file-number {
                position: absolute;
                top: -10px;
                right: 10px;
                color: #be033e;
                font-size: 0.8rem;
                font-family: monospace;
                background-color: #000;
                padding: 0 5px;
            }
            
            .skill-percentage {
                position: absolute;
                right: 10px;
                top: 0;
                color: #be033e;
                font-family: monospace;
            }
            
            .active-indicator {
                color: #ffffff;
                animation: blink 1s infinite;
            }
            
            @keyframes terminal-flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
            }
            
            @keyframes blink {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Aggiungi effetto "rumore" di fondo
    const noiseEffect = document.createElement('div');
    noiseEffect.classList.add('noise-effect');
    document.body.appendChild(noiseEffect);
    
    // Aggiungi stile per l'effetto rumore
    const noiseStyle = document.createElement('style');
    noiseStyle.textContent = `
        .noise-effect {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAB
