document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SISTEMA DE FOGOS DE ARTIFÍCIO (BOAS-VINDAS)
    // ==========================================================================
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('welcome-fireworks-overlay');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#d4af37', '#10b981', '#3b82f6', '#ffffff'];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.friction = 0.98;
            this.gravity = 0.05;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.draw();
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= 0.015;
        }
    }

    // Dispara fogos no centro e nas laterais
    function createFirework(x, y) {
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
    }

    createFirework(canvas.width / 2, canvas.height / 3);
    setTimeout(() => createFirework(canvas.width / 4, canvas.height / 2), 400);
    setTimeout(() => createFirework((canvas.width / 4) * 3, canvas.height / 2), 800);

    function animateFireworks() {
        requestAnimationFrame(animateFireworks);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
            } else {
                particles.splice(index, 1);
            }
        });
    }
    
    animateFireworks();

    // Some com o overlay após 2.5 segundos
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 600); // Remove do DOM após fade
    }, 2500);


    // ==========================================================================
    // 2. BANNER INTERSTITIAL (TELA CHEIA) - FECHAMENTO AQUI!
    // ==========================================================================
    const interstitialModal = document.getElementById('interstitial-promo-modal');
    const closeInterstitialBtn = document.getElementById('close-interstitial-btn');

    if (closeInterstitialBtn && interstitialModal) {
        closeInterstitialBtn.addEventListener('click', () => {
            interstitialModal.classList.remove('active');
        });
    }

    // ==========================================================================
    // 3. PERSISTÊNCIA DE DADOS (LOCAL STORAGE) - FOTO DE PERFIL E STREAK
    // ==========================================================================
    const avatarInput = document.getElementById('global-avatar-upload');
    const desktopAvatarTrigger = document.getElementById('desktop-avatar-modify-trigger');
    const mobileAvatarTrigger = document.getElementById('drawer-action-avatar');
    
    const desktopAvatarImg = document.getElementById('user-global-avatar-desktop');
    const mobileAvatarImg = document.getElementById('user-global-avatar-mobile');

    // Carrega a foto salva ao entrar no app
    const savedAvatar = localStorage.getItem('nutri_premium_avatar');
    if (savedAvatar) {
        desktopAvatarImg.src = savedAvatar;
        mobileAvatarImg.src = savedAvatar;
    }

    // Função para abrir o seletor de arquivos
    const triggerAvatarUpload = () => avatarInput.click();
    
    if (desktopAvatarTrigger) desktopAvatarTrigger.addEventListener('click', triggerAvatarUpload);
    if (mobileAvatarTrigger) mobileAvatarTrigger.addEventListener('click', triggerAvatarUpload);

    // Processa o upload da imagem e salva no LocalStorage
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                // Salva fixo no navegador
                localStorage.setItem('nutri_premium_avatar', base64String);
                // Atualiza as imagens na tela
                desktopAvatarImg.src = base64String;
                mobileAvatarImg.src = base64String;
                
                // Se o drawer mobile estiver aberto, fecha ele
                document.getElementById('mobile-profile-context-drawer').classList.remove('active');
            };
            reader.readAsDataURL(file);
        }
    });

    // Simulação de persistência de Dias Consecutivos (Streak)
    let userStreak = localStorage.getItem('nutri_user_streak') || 14; // Puxa 14 dias como base
    document.getElementById('sidebar-streak-count').textContent = userStreak;
    document.getElementById('gamification-streak-number').textContent = userStreak;


    // ==========================================================================
    // 4. LÓGICA DE MACRONUTRIENTES E ANÉIS SVG
    // ==========================================================================
    const mealCheckboxes = document.querySelectorAll('.meal-functional-checkbox');
    const totalKcalDisplay = document.getElementById('sum-kcal-value-display');
    const kcalProgressBar = document.getElementById('bar-kcal-progress-fill');
    
    // Metas Corporativas Fixas
    const targets = { kcal: 2200, protein: 160, carb: 220, fat: 65 };
    const ringCircumference = 213.6; // Comprimento total do stroke no SVG

    function updateMetabolicDashboard() {
        let currentMacros = { kcal: 0, protein: 0, carb: 0, fat: 0 };

        mealCheckboxes.forEach(box => {
            if (box.checked) {
                const container = box.closest('.meal-row-card-container');
                currentMacros.kcal += parseInt(container.getAttribute('data-kcal'));
                currentMacros.protein += parseInt(container.getAttribute('data-protein'));
                currentMacros.carb += parseInt(container.getAttribute('data-carb'));
                currentMacros.fat += parseInt(container.getAttribute('data-fat'));
            }
        });

        // Atualiza Calorias e Barra de Progresso
        totalKcalDisplay.textContent = currentMacros.kcal;
        let kcalPercentage = (currentMacros.kcal / targets.kcal) * 100;
        kcalProgressBar.style.width = `${Math.min(kcalPercentage, 100)}%`;

        // Função auxiliar para atualizar anéis SVG
        const updateRing = (type, value, target) => {
            const percentage = Math.min((value / target) * 100, 100);
            const offset = ringCircumference - (percentage / 100) * ringCircumference;
            
            let ringElement, textElement;
            if (type === 'protein') {
                ringElement = document.getElementById('ring-protein-progress-fill');
                textElement = document.getElementById('percentage-protein-label');
            } else if (type === 'carb') {
                ringElement = document.getElementById('ring-carbohydrate-progress-fill');
                textElement = document.getElementById('percentage-carbohydrate-label');
            } else if (type === 'fat') {
                ringElement = document.getElementById('ring-lipids-progress-fill');
                textElement = document.getElementById('percentage-lipids-label');
            }

            ringElement.style.strokeDashoffset = offset;
            textElement.textContent = `${Math.round(percentage)}%`;
        };

        updateRing('protein', currentMacros.protein, targets.protein);
        updateRing('carb', currentMacros.carb, targets.carb);
        updateRing('fat', currentMacros.fat, targets.fat);
    }

    mealCheckboxes.forEach(box => {
        box.addEventListener('change', updateMetabolicDashboard);
    });


    // ==========================================================================
    // 5. CARROSSEL SUPERIOR ROTATIVO
    // ==========================================================================
    const topSlides = document.querySelectorAll('.top-carousel-slide');
    const topDots = document.querySelectorAll('.top-dot');
    let currentSlideIndex = 0;

    function showSlide(index) {
        topSlides.forEach(slide => slide.classList.remove('active'));
        topDots.forEach(dot => dot.classList.remove('active'));
        
        topSlides[index].classList.add('active');
        topDots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % topSlides.length;
        showSlide(currentSlideIndex);
    }

    // Rotaciona a cada 5 segundos
    let slideInterval = setInterval(nextSlide, 5000);

    topDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            clearInterval(slideInterval);
            currentSlideIndex = parseInt(e.target.getAttribute('data-go-to'));
            showSlide(currentSlideIndex);
            slideInterval = setInterval(nextSlide, 5000); // Reseta o timer
        });
    });


    // ==========================================================================
    // 6. DRAWER MOBILE (MENU INFERIOR DO PERFIL)
    // ==========================================================================
    const profileDrawerTrigger = document.getElementById('mobile-profile-menu-drawer-trigger');
    const mobileDrawer = document.getElementById('mobile-profile-context-drawer');
    const closeDrawerBtn = document.getElementById('close-profile-drawer-btn');

    if (profileDrawerTrigger && mobileDrawer) {
        profileDrawerTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDrawer.classList.add('active');
        });

        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });

        // Fecha clicando fora da caixa
        mobileDrawer.addEventListener('click', (e) => {
            if (e.target === mobileDrawer) {
                mobileDrawer.classList.remove('active');
            }
        });
    }


    // ==========================================================================
    // 7. MODAL DE RECEITAS CORPORATIVO
    // ==========================================================================
    const recipeModal = document.getElementById('global-recipe-display-modal');
    const closeRecipeBtn = document.getElementById('global-close-recipe-modal-btn');
    const openRecipeBtns = document.querySelectorAll('.btn-open-recipe-modal-trigger');

    openRecipeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.meal-row-card-container');
            
            // Popula os dados do modal com os atributos do HTML
            document.getElementById('modal-target-macro-kcal').textContent = card.getAttribute('data-kcal');
            document.getElementById('modal-target-macro-protein').textContent = card.getAttribute('data-protein') + 'g';
            document.getElementById('modal-target-macro-carb').textContent = card.getAttribute('data-carb') + 'g';
            document.getElementById('modal-target-macro-fat').textContent = card.getAttribute('data-fat') + 'g';
            
            document.getElementById('modal-target-recipe-ingredients-paragraph').textContent = card.getAttribute('data-recipe-ingredients');
            document.getElementById('modal-target-recipe-steps-paragraph').textContent = card.getAttribute('data-recipe-steps');
            
            recipeModal.classList.add('active');
        });
    });

    if (closeRecipeBtn) {
        closeRecipeBtn.addEventListener('click', () => {
            recipeModal.classList.remove('active');
        });
    }


    // ==========================================================================
    // 8. NOTIFICAÇÕES (DROPDOWN)
    // ==========================================================================
    const bellBtn = document.getElementById('notification-bell-btn');
    const notifPanel = document.getElementById('corporate-notification-panel');
    const notifTabs = document.querySelectorAll('.notif-tab-toggle');
    const notifPanes = document.querySelectorAll('.notif-tab-pane');

    if (bellBtn && notifPanel) {
        bellBtn.addEventListener('click', () => {
            notifPanel.classList.toggle('active');
        });

        // Sistema de Abas dentro das notificações
        notifTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                notifTabs.forEach(t => t.classList.remove('active'));
                notifPanes.forEach(p => p.classList.remove('active'));
                
                e.target.classList.add('active');
                const targetPane = document.getElementById('pane-' + e.target.getAttribute('data-tab-target'));
                if(targetPane) targetPane.classList.add('active');
            });
        });
    }

});
