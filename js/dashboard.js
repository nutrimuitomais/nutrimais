/* ==========================================================================
   BANCO DE DADOS DAS REFEIÇÕES & ALVO DE METAS
   ========================================================================== */
const db = {
    "cafe": { kcal: 390, pro: 28, car: 35, fat: 12 },
    "almoco": { kcal: 980, pro: 95, car: 78, fat: 18 },
    "tarde": { kcal: 310, pro: 22, car: 30, fat: 6 },
    "janta": { kcal: 520, pro: 42, car: 45, fat: 14 }
};

const metaDiaria = { kcal: 2200, pro: 160, car: 220, fat: 70 };
let currentSlide = 0;

/* ==========================================================================
   MOTOR DE CÁLCULO DE METAS E FEEDBACK EM TEMPO REAL
   ========================================================================== */
function updateEngine() {
    let acumulado = { kcal: 0, pro: 0, car: 0, fat: 0 };
    const chkIds = ["cafe", "almoco", "tarde", "janta"];

    // 1. Soma os macronutrientes com base nas refeições checadas
    chkIds.forEach(id => {
        const checkbox = document.getElementById(`chk-${id}`);
        const cardRefeicao = checkbox ? checkbox.closest('.meal-card') : null;
        
        if (checkbox && checkbox.checked) {
            acumulado.kcal += db[id].kcal;
            acumulado.pro += db[id].pro;
            acumulado.car += db[id].car;
            acumulado.fat += db[id].fat;
            if (cardRefeicao) cardRefeicao.classList.add('concluido');
        } else {
            if (cardRefeicao) cardRefeicao.classList.remove('concluido');
        }
    });

    // 2. Atualiza o contador de calorias do topo do card
    document.getElementById('sum-kcal').textContent = acumulado.kcal;
    
    // 3. Atualiza a barra de progresso horizontal
    const pctKcal = Math.min((acumulado.kcal / metaDiaria.kcal) * 100, 100);
    document.getElementById('bar-kcal').style.width = pctKcal + "%";

    // 4. Texto de Feedback Inteligente
    const feedbackText = document.getElementById('kcal-feedback');
    const kcalRestantes = metaDiaria.kcal - acumulado.kcal;

    if (pctKcal >= 100) {
        feedbackText.innerHTML = "🏆 <span style='color: #3CA36A; font-weight: 700;'>Parabéns, Vinicius! Você completou 100% da meta hoje!</span>";
    } else if (acumulado.kcal === 0) {
        feedbackText.textContent = `Restam ${metaDiaria.kcal} kcal para fechar o plano diário.`;
    } else {
        feedbackText.innerHTML = `Faltam <strong>${kcalRestantes} kcal</strong> para completar os 100%.`;
    }

    // 5. Atualiza os gráficos de rosca (Anéis SVG)
    updateMacroRing('ring-pro', 'txt-pro', (acumulado.pro / metaDiaria.pro) * 100);
    updateMacroRing('ring-car', 'txt-car', (acumulado.car / metaDiaria.car) * 100);
    updateMacroRing('ring-fat', 'txt-fat', (acumulado.fat / metaDiaria.fat) * 100);
}

function updateMacroRing(ringId, textId, porcentagem) {
    const p = Math.min(Math.round(porcentagem), 100);
    const ringEl = document.getElementById(ringId);
    const textEl = document.getElementById(textId);
    
    if (ringEl) ringEl.setAttribute("stroke-dasharray", `${p}, 100`);
    if (textEl) textEl.textContent = p + "%";
}

/* ==========================================================================
   CARROSSEL AUTOMÁTICO (3 PUBLICAÇÕES - 5 SEGUNDOS)
   ========================================================================== */
function initSlider() {
    const sliderWrapper = document.getElementById('main-slider');
    const dots = document.querySelectorAll('.s-dot');
    const totalSlides = 3;

    if (!sliderWrapper || dots.length === 0) return;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Move o bloco horizontalmente de 100% em 100%
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza as bolinhas indicadoras
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }, 5000);
}

/* ==========================================================================
   NAVEGAÇÃO MOBILE DO APP (TROCA DE ESTADO ATIVO)
   ========================================================================== */
function initMobileNav() {
    const navItems = document.querySelectorAll('.mobile-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Se tiver onclick nativo (como o link VIP), deixa o evento original rodar
            if (this.getAttribute('onclick')) return;

            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/* ==========================================================================
   AÇÕES EXTRA & AUXILIARES
   ========================================================================== */
function openRecipe(mealKey) {
    alert(`Carregando passo a passo e modo de preparo completo para: ${mealKey.toUpperCase()}`);
}

function triggerPremium() {
    alert("Recurso Exclusivo! Esta ferramenta está disponível no seu plano Premium.");
}

function toggleNotifHub() {
    alert("Você não tem novas notificações no momento.");
}

function triggerAvatarUpload() {
    document.getElementById('file-input').click();
}

// Upload dinâmico de foto de perfil
document.getElementById('file-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('user-avatar').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

/* ==========================================================================
   INICIALIZAÇÃO GLOBAL
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    updateEngine();   // Renderiza os valores atuais
    initSlider();     // Inicia o carrossel rotativo
    initMobileNav();  // Liga os cliques da barra inferior mobile
});
