/* ==========================================================================
   BANCO DE DADOS DE REFEIÇÕES & ALVO DE METAS
   ========================================================================== */
const db = {
    "cafe": { 
        titulo: "Café Performance", 
        kcal: 390, pro: 28, car: 35, fat: 12, 
        foto: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400" 
    },
    "almoco": { 
        titulo: "Almoço Elite", 
        kcal: 980, pro: 95, car: 78, fat: 18, 
        foto: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" 
    },
    "tarde": { 
        titulo: "Lanche da Tarde", 
        kcal: 310, pro: 22, car: 30, fat: 6, 
        foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" 
    },
    "janta": { 
        titulo: "Janta Anabólica", 
        kcal: 520, pro: 42, car: 45, fat: 14, 
        foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" 
    }
};

const metaDiaria = { kcal: 2200, pro: 160, car: 220, fat: 70 };
let currentSlide = 0;

/* ==========================================================================
   MOTOR DE CÁLCULO DE METAS E FEEDBACK DINÂMICO
   ========================================================================== */
function updateEngine() {
    let acumulado = { kcal: 0, pro: 0, car: 0, fat: 0 };
    const chkIds = ["cafe", "almoco", "tarde", "janta"];

    // 1. Varre os checkboxes e soma os macronutrientes consumidos
    chkIds.forEach(id => {
        const checkbox = document.getElementById(`chk-${id}`);
        const cardRefeicao = document.getElementById(`meal-${id}`);
        
        if (checkbox && checkbox.checked) {
            acumulado.kcal += db[id].kcal;
            acumulado.pro += db[id].pro;
            acumulado.car += db[id].car;
            acumulado.fat += db[id].fat;
            cardRefeicao.classList.add('concluido');
        } else if (cardRefeicao) {
            cardRefeicao.classList.remove('concluido');
        }
    });

    // 2. Atualiza os contadores numéricos de calorias na tela
    document.getElementById('sum-kcal').textContent = acumulado.kcal;
    
    // 3. Calcula a porcentagem e preenche a barra de progresso principal
    const pctKcal = Math.min((acumulado.kcal / metaDiaria.kcal) * 100, 100);
    document.getElementById('bar-kcal').style.width = pctKcal + "%";

    // 4. LÓGICA DO CONTADOR INTELIGENTE (INFORMAR QUANTO FALTA OU PARABENIZAR)
    const feedbackText = document.getElementById('kcal-feedback');
    const kcalRestantes = metaDiaria.kcal - acumulado.kcal;

    if (pctKcal >= 100) {
        feedbackText.innerHTML = "🏆 <span style='color: #3CA36A; font-weight: 700;'>Parabéns, Vinicius! Você completou 100% da sua meta de hoje!</span>";
    } else if (acumulado.kcal === 0) {
        feedbackText.textContent = `Restam ${metaDiaria.kcal} kcal para fechar o plano diário.`;
    } else {
        feedbackText.innerHTML = `Faltam <strong>${kcalRestantes} kcal</strong> para completar os 100%.`;
    }

    // 5. Atualiza os gráficos circulares (SVGs) dos macros
    updateMacroRing('ring-pro', 'txt-pro', (acumulado.pro / metaDiaria.pro) * 100);
    updateMacroRing('ring-car', 'txt-car', (acumulado.car / metaDiaria.car) * 100);
    updateMacroRing('ring-fat', 'txt-fat', (acumulado.fat / metaDiaria.fat) * 100);
}

// Controla o preenchimento gradual da borda do SVG circular
function updateMacroRing(ringId, textId, porcentagem) {
    const p = Math.min(Math.round(porcentagem), 100);
    const ringEl = document.getElementById(ringId);
    const textEl = document.getElementById(textId);
    
    if (ringEl) {
        ringEl.setAttribute("stroke-dasharray", `${p}, 100`);
    }
    if (textEl) {
        textEl.textContent = p + "%";
    }
}

/* ==========================================================================
   ROTAÇÃO AUTOMÁTICA DO CARROSSEL (3 PUBLICAÇÕES - 5 SEGUNDOS)
   ========================================================================== */
function initSlider() {
    const sliderWrapper = document.getElementById('main-slider');
    const dots = document.querySelectorAll('.s-dot');
    const totalSlides = 3;

    if (!sliderWrapper) return;

    setInterval(() => {
        // Avança o slide e reinicia ao chegar no fim
        currentSlide = (currentSlide + 1) % totalSlides;
        
        // Desloca o wrapper horizontalmente usando porcentagem (100% por slide)
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Atualiza a bolinha/pill indicadora ativa
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }, 5000); // 5000 milissegundos = 5 segundos
}

/* ==========================================================================
   INTERAÇÕES DE INTERFACE (MODAIS, COMENTÁRIOS E UPLOAD)
   ========================================================================== */
function submitAppComment() {
    const input = document.getElementById('user-comment-input');
    if (!input || !input.value.trim()) return;
    
    alert("Obrigado pelo seu feedback! Seu comentário foi publicado na comunidade.");
    input.value = "";
}

function triggerPremium() {
    alert("Abrindo ferramenta ou gerando documento solicitado... (Ação vinculada ao seu plano MAX)");
}

function toggleNotifHub() {
    alert("Central de alertas e notificações em desenvolvimento.");
}

function triggerAvatarUpload() {
    document.getElementById('file-input').click();
}

// Captura a troca de foto de perfil e exibe imediatamente no topo do app
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
   DISPARO INICIAL AO CARREGAR A PÁGINA
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    updateEngine(); // Executa o cálculo inicial (tudo zerado)
    initSlider();   // Inicializa o temporizador do carrossel de publicações
});
