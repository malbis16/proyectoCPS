// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidad para el botón "Ver más comandos"
    const showMoreBtn = document.getElementById('showMoreCommands');
    const moreCommandsDiv = document.getElementById('moreCommands');
    
    if (showMoreBtn && moreCommandsDiv) {
        showMoreBtn.addEventListener('click', function() {
            if (moreCommandsDiv.classList.contains('hidden')) {
                moreCommandsDiv.classList.remove('hidden');
                showMoreBtn.textContent = 'Ver menos comandos';
                
                // Animación suave al mostrar
                moreCommandsDiv.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                moreCommandsDiv.classList.add('hidden');
                showMoreBtn.textContent = 'Ver más comandos';
            }
        });
    }
    
    // Navegación suave al hacer clic en los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando el nav fijo
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Resaltar temporalmente la sección
                highlightSection(targetSection);
            }
        });
    });
    
    // Función para resaltar una sección temporalmente
    function highlightSection(section) {
        section.style.transition = 'box-shadow 0.3s ease';
        section.style.boxShadow = '0 0 20px rgba(240, 80, 50, 0.5)';
        
        setTimeout(() => {
            section.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }, 1500);
    }
    
    // Efecto de hover en las tarjetas de importancia
    const importanceCards = document.querySelectorAll('.importance-card');
    
    importanceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Copiar comando al hacer clic en el código
    const commandCodes = document.querySelectorAll('.command-item code');
    
    commandCodes.forEach(code => {
        code.style.cursor = 'pointer';
        code.setAttribute('title', 'Haz clic para copiar');
        
        code.addEventListener('click', function() {
            const commandText = this.textContent;
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(commandText).then(() => {
                // Feedback visual
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = '#4af626';
                this.style.color = '#2c3e50';
                
                // Crear mensaje temporal
                const message = document.createElement('span');
                message.textContent = ' ✓ Copiado';
                message.style.color = '#4af626';
                message.style.marginLeft = '10px';
                message.style.fontSize = '0.9rem';
                message.style.fontWeight = 'bold';
                this.parentElement.appendChild(message);
                
                // Restaurar después de 1 segundo
                setTimeout(() => {
                    this.style.backgroundColor = originalBg;
                    this.style.color = '#4af626';
                    message.remove();
                }, 1000);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });
    
    // Animación de entrada para las secciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Resaltar el enlace de navegación activo al hacer scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.backgroundColor = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.backgroundColor = 'rgba(240, 80, 50, 0.8)';
            }
        });
    });
    
    // Efecto parallax suave en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrolled = window.scrollY;
        
        if (scrolled < 300) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 500);
        }
    });
    });