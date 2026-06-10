/* =========================================================
   1. ESTADO GLOBAL DO APLICATIVO (Simulando Banco de Dados)
   ========================================================= */
// Metas diárias do plano do usuário
const dailyGoalCal = 1800;
const goalMacros = { carb: 200, fat: 60, prot: 120 };

// Consumo atual (iniciando com o que já foi consumido no dia)
let currentCal = 900;
let currentMacros = { carb: 90, fat: 22, prot: 56 };

/* =========================================================
   2. SELEÇÃO DE ELEMENTOS DO DOM (Interface)
   ========================================================= */
// Textos e Barras
const displayCurrentCal = document.getElementById('display-current-cal');
const remainingTextElement = document.querySelector('.remaining');
const unifiedBar = document.querySelector('.unified-bar');

const carboFill = document.querySelector('.carbo-fill');
const gordFill = document.querySelector('.gord-fill');
const protFill = document.querySelector('.prot-fill');

// Textos de Macros na Interface
const macroLabels = document.querySelectorAll('.macro-label span');
const macrosSummary = document.querySelectorAll('.macros-summary strong');

// Alertas de Meta
const goalCongrats = document.getElementById('goal-congrats');
const goalAdjustment = document.getElementById('goal-adjustment');

/* =========================================================
   3. FUNÇÃO PRINCIPAL: ATUALIZAR INTERFACE E BARRAS
   ========================================================= */
function updateDashboardUI() {
    // 1. Atualiza as Calorias
    displayCurrentCal.innerText = currentCal;
    let remaining = dailyGoalCal - currentCal;
    
    if (remaining > 0) {
        remainingTextElement.innerText = `${remaining} kcal restantes`;
        goalCongrats.classList.add('hidden');
        goalAdjustment.classList.add('hidden');
    } else if (remaining === 0) {
        remainingTextElement.innerText = `Meta batida perfeitamente!`;
        goalCongrats.classList.remove('hidden');
        goalAdjustment.classList.add('hidden');
    } else {
        remainingTextElement.innerText = `${Math.abs(remaining)} kcal ultrapassadas`;
        goalCongrats.classList.add('hidden');
        goalAdjustment.classList.remove('hidden'); // Mostra aviso de ajuste para amanhã
    }

    // 2. Atualiza os Textos Resumidos (Card Verde)
    macrosSummary[0].innerText = `${currentMacros.carb}g`;
    macrosSummary[1].innerText = `${currentMacros.fat}g`;
    macrosSummary[2].innerText = `${currentMacros.prot}g`;

    // 3. Atualiza as Barras Individuais e Textos
    const carboPct = Math.min((currentMacros.carb / goalMacros.carb) * 100, 100);
    const fatPct = Math.min((currentMacros.fat / goalMacros.fat) * 100, 100);
    const protPct = Math.min((currentMacros.prot / goalMacros.prot) * 100, 100);

    carboFill.style.width = `${carboPct}%`;
    gordFill.style.width = `${fatPct}%`;
    protFill.style.width = `${protPct}%`;

    macroLabels[0].innerHTML = `<strong>${currentMacros.carb}</strong>/${goalMacros.carb}g`;
    macroLabels[1].innerHTML = `<strong>${currentMacros.fat}</strong>/${goalMacros.fat}g`;
    macroLabels[2].innerHTML = `<strong>${currentMacros.prot}</strong>/${goalMacros.prot}g`;

    // 4. ATUALIZA A BARRA UNIFICADA (Gráfico Circular 4 em 1)
    updateUnifiedBar();
}

function updateUnifiedBar() {
    // Calcula a porcentagem geral de calorias
    let totalPct = Math.min((currentCal / dailyGoalCal) * 100, 100);
    document.querySelector('.percentage').innerText = `${Math.round(totalPct)}%`;

    // Para o gráfico circular, dividimos o preenchimento proporcionalmente aos macros consumidos
    let totalMacrosGrams = currentMacros.carb + currentMacros.fat + currentMacros.prot;
    
    if (totalMacrosGrams === 0) {
        unifiedBar.style.background = `conic-gradient(rgba(255,255,255,0.2) 100%, transparent 0)`;
        return;
    }

    // Proporção de cada macro dentro do que JÁ FOI consumido, ajustado pelo totalPct
    // Transformamos a porcentagem (0 a 100) em graus (0 a 360)
    let degreesTotal = (totalPct / 100) * 360;
    
    let carbDeg = (currentMacros.carb / totalMacrosGrams) * degreesTotal;
    let fatDeg = (currentMacros.fat / totalMacrosGrams) * degreesTotal;
    let protDeg = (currentMacros.prot / totalMacrosGrams) * degreesTotal;

    // Monta o gradiente (Azul = Carbo, Amarelo = Gordura, Vermelho = Proteína, Fundo = Restante)
    unifiedBar.style.background = `conic-gradient(
        #3b82f6 0deg ${carbDeg}deg, 
        #eab308 ${carbDeg}deg ${carbDeg + fatDeg}deg, 
        #ef4444 ${carbDeg + fatDeg}deg ${carbDeg + fatDeg + protDeg}deg, 
        rgba(255,255,255,0.2) ${carbDeg + fatDeg + protDeg}deg 360deg
    )`;
}

// Inicia a interface ao carregar a página
document.addEventListener('DOMContentLoaded', updateDashboardUI);

/* =========================================================
   4. INTERATIVIDADE DE MENUS E TEMA
   ========================================================= */
const sidebar = document.getElementById('sidebar-menu');
const openMenuBtn = document.getElementById('open-mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');
const darkModeToggle = document.getElementById('toggle-dark-mode');

// Abrir e Fechar Menu Mobile
openMenuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});
closeMenuBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Lógica do Modo Escuro
darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    // Altera o ícone do botão
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

/* =========================================================
   5. LÓGICA DOS MODAIS (IA Scanner e Receitas)
   ========================================================= */
const scannerModal = document.getElementById('scanner-modal');
const recipeModal = document.getElementById('recipe-detail-modal');
const aiCameraBtns = [document.getElementById('ai-camera-btn'), document.getElementById('mobile-cam-btn')];
const closeBtns = document.querySelectorAll('.close-modal');

// Abrir Scanner de IA (Desktop e Mobile)
aiCameraBtns.forEach(btn => {
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            scannerModal.classList.add('active');
            
            // Simula o processamento da IA após 2 segundos
            const confirmBtn = document.getElementById('confirm-scan-btn');
            confirmBtn.classList.add('hidden');
            const icon = scannerModal.querySelector('.camera-icon');
            icon.classList.add('ai-scanning');
            
            setTimeout(() => {
                icon.classList.remove('ai-scanning');
                confirmBtn.classList.remove('hidden'); // Exibe o botão de confirmar e somar
            }, 2000);
        });
    }
});

// Fechar Modais
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        scannerModal.classList.remove('active');
        recipeModal.classList.remove('active');
    });
});

// Fechar clicando fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === scannerModal) scannerModal.classList.remove('active');
    if (e.target === recipeModal) recipeModal.classList.remove('active');
});

/* =========================================================
   6. LÓGICA DE CONSUMO (Somar Macros e Atualizar Tela)
   ========================================================= */
// Função global chamada pelo HTML nos botões "Ver Receita"
let currentSelectedMeal = ""; // Guarda qual refeição está aberta no modal

window.openRecipeModal = function(mealName) {
    currentSelectedMeal = mealName;
    document.getElementById('modal-recipe-title').innerText = mealName;
    
    // Aqui no futuro você puxará os dados do banco. Por enquanto, valores fixos para demonstração.
    recipeModal.classList.add('active');
};

// Botão de Confirmar Consumo da Receita (Prato Flutuante)
const confirmConsumeBtn = document.getElementById('confirm-consume-btn');
confirmConsumeBtn.addEventListener('click', () => {
    // 1. Simula a adição dos macros da refeição consumida
    // (Valores hipotéticos de um prato. No app real virão da variável da receita)
    const mealCals = 355;
    const mealMacros = { carb: 40, fat: 15, prot: 20 };

    currentCal += mealCals;
    currentMacros.carb += mealMacros.carb;
    currentMacros.fat += mealMacros.fat;
    currentMacros.prot += mealMacros.prot;

    // 2. Atualiza toda a Interface com os novos dados
    updateDashboardUI();

    // 3. Efeito visual: altera o botão da refeição na lista para "Consumido"
    if(currentSelectedMeal === 'Café da Manhã') markMealAsConsumed('meal-breakfast');
    if(currentSelectedMeal === 'Almoço') markMealAsConsumed('meal-lunch');
    if(currentSelectedMeal === 'Lanche da Tarde') markMealAsConsumed('meal-snack');
    if(currentSelectedMeal === 'Jantar') markMealAsConsumed('meal-dinner');

    // 4. Fecha o modal
    recipeModal.classList.remove('active');
});

// Botão de Confirmar Consumo do Scanner da IA
const confirmScanBtn = document.getElementById('confirm-scan-btn');
confirmScanBtn.addEventListener('click', () => {
    // A IA simulou encontrar uma maçã e um iogurte, por exemplo
    currentCal += 150;
    currentMacros.carb += 25;
    currentMacros.fat += 2;
    currentMacros.prot += 8;

    updateDashboardUI();
    scannerModal.classList.remove('active');
});

// Função auxiliar para marcar a refeição como consumida na listagem (Visual)
function markMealAsConsumed(mealElementId) {
    const mealCard = document.getElementById(mealElementId);
    if(mealCard) {
        mealCard.style.opacity = '0.6';
        const btn = mealCard.querySelector('.view-recipe-btn');
        if(btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Consumido';
            btn.style.backgroundColor = 'var(--primary-green)';
            btn.style.color = 'white';
        }
    }
}
