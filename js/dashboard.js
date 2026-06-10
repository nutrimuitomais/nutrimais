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
                x: (Math.random() - 0.5) * 8,document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ANÚNCIO INTERSTITIAL (FECHAMENTO)
    // ==========================================================================
    const interstitialModal = document.getElementById('interstitial-promo-modal');
    const closeInterstitialBtn = document.getElementById('close-interstitial-btn');

    if (closeInterstitialBtn && interstitialModal) {
        closeInterstitialBtn.addEventListener('click', () => {
            interstitialModal.classList.remove('active');
        });
    }

    // ==========================================================================
    // 2. FOGOS DE ARTIFÍCIO (WELCOME)
    // ==========================================================================
    const canvas = document.getElementById('fireworks-canvas');
    const overlay = document.getElementById('welcome-fireworks-overlay');
    
    if (canvas && overlay) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particles = [];
        const colors = ['#8bc34a', '#2d5a27', '#dcedc8', '#ffffff'];

        class Particle {
            constructor(x, y, color) {
                this.x = x; this.y = y; this.color = color;
                this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
                this.alpha = 1; this.friction = 0.98; this.gravity = 0.05;
            }
            draw() {
                ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
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

        function createFirework(x, y) {
            for (let i = 0; i < 40; i++) {
                particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
            }
        }

        createFirework(canvas.width / 2, canvas.height / 3);
        
        function animate() {
            requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(45, 90, 39, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, idx) => {
                if (p.alpha > 0) p.update();
                else particles.splice(idx, 1);
            });
        }
        animate();

        setTimeout(() => {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 600);
        }, 2500);
    }

    // ==========================================================================
    // 3. PERFIL E FOTO
    // ==========================================================================
    const avatarImg = document.getElementById('user-avatar');
    const avatarInput = document.getElementById('avatar-upload');
    const profileTrigger = document.getElementById('profile-trigger');

    if (localStorage.getItem('savedProfileAvatar')) {
        avatarImg.src = localStorage.getItem('savedProfileAvatar');
    }

    profileTrigger?.addEventListener('click', () => avatarInput.click());
    
    avatarInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarImg.src = event.target.result;
                localStorage.setItem('savedProfileAvatar', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // ==========================================================================
    // 4. CÁLCULO DE MACROS (CHECKBOXES)
    // ==========================================================================
    const checkboxes = document.querySelectorAll('.meal-check');
    const currentKcalDisplay = document.getElementById('current-kcal');
    const kcalBar = document.getElementById('kcal-bar');
    const labelP = document.getElementById('tracker-p');
    const labelC = document.getElementById('tracker-c');
    const labelF = document.getElementById('tracker-f');

    function updateMetabolism() {
        let kcal = 0, p = 0, c = 0, f = 0;
        checkboxes.forEach(box => {
            if (box.checked) {
                const card = box.closest('.meal-card');
                kcal += parseInt(card.getAttribute('data-kcal') || 0);
                p += parseInt(card.getAttribute('data-protein') || 0);
                c += parseInt(card.getAttribute('data-carb') || 0);
                f += parseInt(card.getAttribute('data-fat') || 0);
            }
        });

        currentKcalDisplay.textContent = kcal;
        labelP.textContent = `${p}g`;
        labelC.textContent = `${c}g`;
        labelF.textContent = `${f}g`;

        const percentage = (kcal / 2200) * 100;
        kcalBar.style.width = `${Math.min(percentage, 100)}%`;
    }

    checkboxes.forEach(box => box.addEventListener('change', updateMetabolism));

    // ==========================================================================
    // 5. CARROSSEL SUPERIOR
    // ==========================================================================
    const slides = document.querySelectorAll('.top-carousel-slide');
    const dots = document.querySelectorAll('.top-dot');
    let currentSlide = 0;

    function changeSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        changeSlide(next);
    }, 5000);

    dots.forEach((d, i) => d.addEventListener('click', () => changeSlide(i)));

    // ==========================================================================
    // 6. NOTIFICAÇÕES (DROPDOWN + ABAS)
    // ==========================================================================
    const bell = document.getElementById('notification-bell-btn');
    const panel = document.getElementById('corporate-notification-panel');
    const tabToggles = document.querySelectorAll('.notif-tab-toggle');
    const tabPanes = document.querySelectorAll('.notif-tab-pane');

    bell?.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('active');
    });

    document.addEventListener('click', () => panel?.classList.remove('active'));
    panel?.addEventListener('click', (e) => e.stopPropagation());

    tabToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            tabToggles.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            document.getElementById(`pane-${e.target.getAttribute('data-tab-target')}`).classList.add('active');
        });
    });

    // ==========================================================================
    // 7. MODAL DE RECEITA (LÓGICA GLOBAL)
    // ==========================================================================
    const closeModal = document.getElementById('close-modal');
    closeModal?.addEventListener('click', () => {
        document.getElementById('recipe-modal').classList.remove('active');
    });

    window.openRecipe = (title, imgSrc, fat, carb, kcal, protein, ingredientsStr) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-img').src = imgSrc;
        document.getElementById('modal-fat').textContent = fat;
        document.getElementById('modal-carb').textContent = carb;
        document.getElementById('modal-kcal').textContent = kcal;
        document.getElementById('modal-protein').textContent = protein;

        const list = document.getElementById('modal-ingredients');
        list.innerHTML = '';
        
        ingredientsStr.split(',').forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-solid fa-check" style="color:var(--primary-light); margin-right:10px;"></i> ${item.trim()}`;
            list.appendChild(li);
        });

        document.getElementById('recipe-modal').classList.add('active');
    };
});
