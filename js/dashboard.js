/* ==========================================================================
   BANCO DE DADOS DE REFEIÇÕES, PLANOS E RECEITAS
   ========================================================================== */
const db = {
    "cafe": { 
        titulo: "Café Performance Premium", 
        kcal: 390, pro: 28, car: 35, fat: 12, 
        foto: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500" 
    },
    "almoco": { 
        titulo: "Almoço Altamente Anabólico", 
        kcal: 980, pro: 95, car: 78, fat: 18, 
        foto: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500" 
    },
    "tarde": { 
        titulo: "Lanche Termogênico Ativo", 
        kcal: 310, pro: 22, car: 30, fat: 6, 
        foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500" 
    },
    "janta": { 
        titulo: "Janta Regeneradora Ultra", 
        kcal: 520, pro: 42, car: 45, fat: 14, 
        foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" 
    }
};

const metaDiaria = { kcal: 2200, pro: 160, car: 220, fat: 70 };
let currentSlide = 0;
let selectedRating = 0; // Armazena a nota por estrelas selecionada

// Definição do Perfil atual do Usuário (Pode ser alterado para testar limites)
const usuarioAtual = {
    nome: "Vinicius",
    plano: "MAX" // Opções: "Nutri Inteligente", "MAX", "SUPER"
};

/* ==========================================================================
   SISTEMA DE MODAL DE RECEITAS COM LOGICA DE LIMITE POR PLANO
   ========================================================================== */
function openRecipe(mealKey) {
    const modal = document.getElementById('recipe-modal');
    const refeicao = db[mealKey];
    
    if (!modal || !refeicao) return;

    // 1. Define o limite de receitas com base nas regras de negócio do plano
    let limiteReceitas = 1;
    if (usuarioAtual.plano === "MAX") limiteReceitas = 50;
    if (usuarioAtual.plano === "SUPER") limiteReceitas = 100;

    // 2. Injeta os dados dinâmicos da refeição selecionada no Modal
    document.getElementById('modal-recipe-title').textContent = refeicao.titulo;
    document.getElementById('modal-recipe-img').src = refeicao.foto;
    document.getElementById('modal-recipe-plan-badge').textContent = `PLANO ${usuarioAtual.plano.toUpperCase()}`;
    
    // Injeta os macros exatos calculados
    document.getElementById('m-kcal').textContent = refeicao.kcal;
    document.getElementById('m-pro').textContent = refeicao.pro + "g";
    document.getElementById('m-car').textContent = refeicao.car + "g";
    document.getElementById('m-fat').textContent = refeicao.fat + "g";

    // Exibe texto informando sobre o limite de variação inteligente
    document.getElementById('modal-plan-text').innerHTML = 
        `Seu plano <strong>${usuarioAtual.plano}</strong> com base na anamnese e escolhas alimentares gera até <strong>${limiteReceitas} receitas exclusivas</strong> para esta refeição.`;

    // Revela o modal removendo a classe hidden
    modal.classList.remove('hidden');
}

function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (modal) modal.classList.add('hidden');
}

/* ==========================================================================
   FILTRO INTELIGENTE E GERENCIADOR DA COMUNIDADE (ESTRELAS)
   ========================================================================== */
function initStarsSelector() {
    const stars = document.querySelectorAll('.star-clickable');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            
            // Acende as estrelas até a clicada e apaga as posteriores
            stars.forEach(s => {
                const val = parseInt(s.getAttribute('data-value'));
                if (val <= selectedRating) {
                    s.textContent = "★";
                    s.classList.add('selected');
                } else {
                    s.textContent = "☆";
                    s.classList.remove('selected');
                }
            });
        });
    });
}

function submitAppComment() {
    const textInput = document.getElementById('user-comment-input');
    const container = document.getElementById('app-feedbacks-container');
    
    if (!textInput || !textInput.value.trim()) {
        alert("Por favor, digite um comentário antes de enviar.");
        return;
    }

    if (selectedRating === 0) {
        alert("Por favor, selecione uma nota de 1 a 5 estrelas clicando nos símbolos.");
        return;
    }

    const textoComentario = textInput.value.trim();

    // FILTRO INTELIGENTE DE REGRAS DE NEGÓCIO:
    // Se a avaliação for de 1 a 3 estrelas (ruim/regular), não publica direto no app.
    if (selectedRating <= 3) {
        alert("Obrigado pelo feedback! O seu comentário foi enviado para a moderação interna privada dos administradores e desenvolvedores.");
    } else {
        // Se for bom (4 ou 5 estrelas), cria o elemento e joga no topo do feed público
        const novoFeedback = document.createElement('div');
        novoFeedback.className = 'feedback-item';
        
        let estrelasMontadas = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);

        novoFeedback.innerHTML = `
            <div class="feedback-user-row">
                <div class="user-avatar-placeholder">👤</div>
                <div>
                    <h4>${usuarioAtual.nome} (Você)</h4>
                    <div class="stars" style="color: #F5A623;">${estrelasMontadas}</div>
                </div>
            </div>
            <p class="feedback-text">"${textoComentario}"</p>
        `;

        // Coloca no início da lista de comentários da comunidade
        container.insertBefore(novoFeedback, container.firstChild);
        alert("Sucesso! O seu depoimento positivo foi aprovado automaticamente e publicado na comunidade NUTRI+!");
    }

    // Limpa o formulário de envio para o padrão original
    textInput.value = "";
    selectedRating = 0;
    document.querySelectorAll('.star-clickable').forEach(s => {
        s.textContent = "☆";
        s.classList.remove('selected');
    });
}

/* ==========================================================================
   MOTOR PRINCIPAL DE CÁLCULO DE CALORIAS E MACROS
   ========================================================================== */
function updateEngine() {
    let acumulado = { kcal: 0, pro: 0, car: 0, fat: 0 };
    const chkIds = ["cafe", "almoco", "tarde", "janta"];

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

    document.getElementById('sum-kcal').textContent = acumulado.kcal;
    
    const pctKcal = Math.min((acumulado.kcal / metaDiaria.kcal) * 100, 100);
    document.getElementById('bar-kcal').style.width = pctKcal + "%";

    const feedbackText = document.getElementById('kcal-feedback');
    const kcalRestantes = metaDiaria.kcal - acumulado.kcal;

    if (pctKcal >= 100) {
        feedbackText.innerHTML = "🏆 <span style='color: #3CA36A; font-weight: 700;'>Parabéns, Vinicius! Você completou 100% da meta hoje!</span>";
    } else if (acumulado.kcal === 0) {
        feedbackText.textContent = `Restam ${metaDiaria.kcal} kcal para fechar o plano diário.`;
    } else {
        feedbackText.innerHTML = `Faltam <strong>${kcalRestantes} kcal</strong> para completar os 100%.`;
    }

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
   CARROSSEL E AUXILIARES DO MENU SUPERIOR/INFERIOR
   ========================================================================== */
function initSlider() {
    const sliderWrapper = document.getElementById('main-slider');
    const dots = document.querySelectorAll('.s-dot');
    const totalSlides = 3;

    if (!sliderWrapper || dots.length === 0) return;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }, 5000);
}

function initMobileNav() {
    const navItems = document.querySelectorAll('.mobile-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('onclick')) return;
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function triggerPremium() { alert("Ação do plano executada com sucesso!"); }
function toggleNotifHub() { alert("Você não possui novos alertas no painel."); }
function triggerAvatarUpload() { document.getElementById('file-input').click(); }

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

// Fecha o modal caso o usuário clique fora da caixa branca central
window.onclick = function(event) {
    const modal = document.getElementById('recipe-modal');
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
}

/* ==========================================================================
   INICIALIZAÇÃO GLOBAL
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    updateEngine();        // Carrega o contador de calorias baseado nos checks
    initSlider();          // Ativa o temporizador de anúncios de 5s
    initMobileNav();       // Ativa o controle por toque do app móvel
    initStarsSelector();   // Inicializa o seletor clicável de estrelas
});
