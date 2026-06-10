/* ==========================================================================
   BANCO DE DADOS DE RECEITAS INTELIGENTES (VALORES MOLECULARES)
   ========================================================================== */
const recipeDatabase = {
    cafe: {
        title: "Café da Manhã Anabólico",
        img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500",
        kcal: 390,
        pro: 32,
        car: 40,
        fat: 11,
        plan: "PLANO MAX: Distribuição molecular calculada para o pico de cortisol matinal."
    },
    almoco: {
        title: "Almoço Funcional Termogênico",
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        kcal: 980,
        pro: 85,
        car: 110,
        fat: 22,
        plan: "PLANO MAX: Alta concentração proteica ideal para manutenção do balanço nitrogenado positivo."
    },
    tarde: {
        title: "Lanche de Recuperação Enzimática",
        img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500",
        kcal: 310,
        pro: 24,
        car: 38,
        fat: 6,
        plan: "PLANO MAX: Absorção otimizada com carboidratos de baixo índice glicêmico."
    },
    janta: {
        title: "Janta Anabólica de Baixo Impacto Glicêmico",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
        kcal: 520,
        pro: 52,
        car: 45,
        fat: 14,
        plan: "PLANO MAX: Nutrição noturna focada na liberação gradual de aminoácidos durante o sono."
    }
};

/* ==========================================================================
   SISTEMA DE METAS, MACROS E ATUALIZAÇÃO EM TEMPO REAL (ENGINE)
   ========================================================================== */
const METAS_DIARIAS = { kcal: 2200, pro: 193, car: 233, fat: 53 };

function updateEngine() {
    let currentKcal = 0;
    let currentPro = 0;
    let currentCar = 0;
    let currentFat = 0;

    // Varre as refeições checadas e soma os nutrientes
    if (document.getElementById('chk-cafe').checked) {
        currentKcal += recipeDatabase.cafe.kcal;
        currentPro += recipeDatabase.cafe.pro;
        currentCar += recipeDatabase.cafe.car;
        currentFat += recipeDatabase.cafe.fat;
    }
    if (document.getElementById('chk-almoco').checked) {
        currentKcal += recipeDatabase.almoco.kcal;
        currentPro += recipeDatabase.almoco.pro;
        currentCar += recipeDatabase.almoco.car;
        currentFat += recipeDatabase.almoco.fat;
    }
    if (document.getElementById('chk-tarde').checked) {
        currentKcal += recipeDatabase.tarde.kcal;
        currentPro += recipeDatabase.tarde.pro;
        currentCar += recipeDatabase.tarde.car;
        currentFat += recipeDatabase.tarde.fat;
    }
    if (document.getElementById('chk-janta').checked) {
        currentKcal += recipeDatabase.janta.kcal;
        currentPro += recipeDatabase.janta.pro;
        currentCar += recipeDatabase.janta.car;
        currentFat += recipeDatabase.janta.fat;
    }

    // Altera as classes visuais dos cards baseando-se no checkbox
    const meals = ['cafe', 'almoco', 'tarde', 'janta'];
    meals.forEach(meal => {
        const chk = document.getElementById(`chk-${meal}`);
        const card = chk.closest('.meal-card');
        if (chk.checked) {
            card.classList.add('concluido');
        } else {
            card.classList.remove('concluido');
        }
    });

    // 1. Atualiza a Barra de Calorias Principais
    document.getElementById('sum-kcal').innerText = currentKcal;
    let kcalPercent = Math.min((currentKcal / METAS_DIARIAS.kcal) * 100, 100);
    document.getElementById('bar-kcal').style.width = `${kcalPercent}%`;

    // Mensagem de feedback dinâmico
    const feedback = document.getElementById('kcal-feedback');
    if (currentKcal >= METAS_DIARIAS.kcal) {
        feedback.innerHTML = "🏆 <strong>Parabéns, Vinicius!</strong> Você completou 100% da meta hoje!";
        feedback.style.color = "#3CA36A";
    } else {
        feedback.innerText = `Restam ${METAS_DIARIAS.kcal - currentKcal} kcal para fechar o plano diário.`;
        feedback.style.color = "";
    }

    // 2. Atualiza os Anéis de Macronutrientes Graficamente
    updateMacroRing('pro', currentPro, METAS_DIARIAS.pro, 'txt-pro');
    updateMacroRing('car', currentCar, METAS_DIARIAS.car, 'txt-car');
    updateMacroRing('fat', currentFat, METAS_DIARIAS.fat, 'txt-fat');
}

function updateMacroRing(id, atual, meta, textId) {
    let percent = Math.min((atual / meta) * 100, 100);
    document.getElementById(textId).innerText = `${Math.round(percent)}%`;
    
    // Perímetro do círculo matemático baseado no raio r=30 (2 * PI * r) = ~188.4
    let strokeDash = (percent / 100) * 188.4;
    document.getElementById(`ring-${id}`).style.strokeDasharray = `${strokeDash}, 188.4`;
}

/* ==========================================================================
   CARROSSEL DE DESTAQUES INFINITO AUTOMÁTICO & MANUAL
   ========================================================================== */
let activeSlideIndex = 0;
const slides = document.querySelectorAll('.slide-item');
const dots = document.querySelectorAll('.s-dot');
let sliderInterval;

function showSlide(index) {
    if (index >= slides.length) activeSlideIndex = 0;
    else if (index < 0) activeSlideIndex = slides.length - 1;
    else activeSlideIndex = index;

    const wrapper = document.getElementById('main-slider');
    if (wrapper) {
        wrapper.style.transform = `translateX(-${activeSlideIndex * 100}%)`;
    }

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeSlideIndex);
    });
}

function startSliderTimeline() {
    sliderInterval = setInterval(() => {
        showSlide(activeSlideIndex + 1);
    }, 5000); // Passa a cada 5 segundos
}

// Vincula cliques manuais nos pontinhos refletores
dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        clearInterval(sliderInterval);
        showSlide(idx);
        startSliderTimeline();
    });
});

/* ==========================================================================
   GERENCIADOR DE MODAIS (RECEITAS E RECURSOS DA CONTA)
   ========================================================================== */
function openRecipe(mealKey) {
    const recipe = recipeDatabase[mealKey];
    if (!recipe) return;

    // Injeta os dados da receita no Modal Corrigido
    document.getElementById('modal-recipe-title').innerText = recipe.title;
    document.getElementById('modal-recipe-img').src = recipe.img;
    document.getElementById('m-kcal').innerText = recipe.kcal;
    document.getElementById('m-pro').innerText = `${recipe.pro}g`;
    document.getElementById('m-car').innerText = `${recipe.car}g`;
    document.getElementById('m-fat').innerText = `${recipe.fat}g`;
    document.getElementById('modal-plan-text').innerText = recipe.plan;

    // Torna visível removendo a trava oculta
    document.getElementById('recipe-modal').classList.remove('hidden');
}

function closeRecipeModal() {
    document.getElementById('recipe-modal').classList.add('hidden');
}

function toggleMenuConta() {
    const modalConta = document.getElementById('account-modal');
    if (modalConta) {
        modalConta.classList.toggle('hidden');
    }
}

/* ==========================================================================
   SISTEMA DE INTERAÇÃO DA COMUNIDADE (ESTRELAS & REVIEWS)
   ========================================================================== */
let selectedRatingValue = 0;
const starElements = document.querySelectorAll('.star-clickable');

starElements.forEach(star => {
    star.addEventListener('click', function() {
        selectedRatingValue = parseInt(this.getAttribute('data-value'));
        starElements.forEach((s, idx) => {
            if (idx < selectedRatingValue) {
                s.innerHTML = '★';
                s.classList.add('selected');
            } else {
                s.innerHTML = '☆';
                s.classList.remove('selected');
            }
        });
    });
});

function submitAppComment() {
    const commentText = document.getElementById('user-comment-input').value.trim();
    if (!commentText) {
        alert("Por favor, digite um comentário antes de enviar.");
        return;
    }
    if (selectedRatingValue === 0) {
        alert("Por favor, selecione uma nota clicando nas estrelas.");
        return;
    }

    // Cria visualmente a nova publicação na pilha da comunidade
    const container = document.getElementById('app-feedbacks-container');
    const newFeedback = document.createElement('div');
    newFeedback.className = 'feedback-item';
    
    let stringEstrelas = '★'.repeat(selectedRatingValue) + '☆'.repeat(5 - selectedRatingValue);

    newFeedback.innerHTML = `
        <div class="feedback-user-row">
            <div class="user-avatar-placeholder">👤</div>
            <div>
                <h4>Vinicius (Você)</h4>
                <div class="stars" style="color: #F5A623;">${stringEstrelas}</div>
            </div>
        </div>
        <p class="feedback-text">"${commentText}"</p>
    `;

    container.prepend(newFeedback);

    // Limpa os campos da interface
    document.getElementById('user-comment-input').value = '';
    selectedRatingValue = 0;
    starElements.forEach(s => { s.innerHTML = '☆'; s.classList.remove('selected'); });

    alert("Obrigado pelo seu comentário na Comunidade NUTRI+!");
}

/* ==========================================================================
   UPLOAD DE AVATAR INTEGRADO (MUDAR EM TODOS OS LOCAIS)
   ========================================================================== */
function triggerAvatarUpload() {
    document.getElementById('file-input').click();
}

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Atualiza a foto do Top Bar (Desktop/Geral)
            document.getElementById('user-avatar').src = e.target.result;
            // Atualiza a foto incorporada no Menu Inferior Mobile
            const mobileAvatar = document.querySelector('.mobile-user-avatar');
            if (mobileAvatar) {
                mobileAvatar.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
});

/* ==========================================================================
   GATILHOS E SISTEMA DE NOTIFICAÇÃO DO PROJETO
   ========================================================================== */
function toggleNotifHub() {
    alert("Central de Notificações:\n\n🔔 Novas atualizações de receitas foram aplicadas ao plano MAX.");
}

function triggerIA() {
    alert("✨ Assistente IA Nutri Inteligente ✨\n\nEssa função exclusiva está processando os dados da sua anamnese molecular em tempo real. Preparando insights!");
}

function triggerPremium() {
    alert("🔒 Upgrade de Assinatura\n\nVocê já é um membro com acesso ao PLANO MAX. Para upgrades corporativos ou adicionais exclusivos, contate o administrador.");
}

/* ==========================================================================
   INICIALIZAÇÃO AUTOMÁTICA DA APLICAÇÃO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    updateEngine(); // Executa o motor limpando os dados (tudo inicia desmarcado)
    startSliderTimeline(); // Inicia o carrossel automático
});
