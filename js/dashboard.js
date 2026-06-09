// BANCO DE DADOS ATUALIZADO (CAFÉ, ALMOÇO, TARDE E JANTA)
const dbRefeicoesMetabolicas = {
    "cafe": {
        titulo: "Café da Manhã de Alta Performance",
        kcal: 390, proteinas: 28, carboidratos: 35, gorduras: 12,
        itens: [
            { nome: "Ovos Mexidos Inteiros", desc: "Preparados sem óleo vegetal", qtd: "3 unidades" },
            { nome: "Pão Integral de Forma", desc: "Carboidrato complexo de baixo IG", qtd: "60g" },
            { nome: "Mamão Formosa Fresco", desc: "Auxílio direto na digestão rápida", qtd: "150g" }
        ]
    },
    "almoco": {
        titulo: "Almoço Funcional Batendo Macros",
        kcal: 980, proteinas: 95, carboidratos: 78, gorduras: 18,
        itens: [
            { nome: "Filé de Frango Grelhado", desc: "Pesar o alimento já grelhado", qtd: "500g" },
            { nome: "Arroz Integral Cozido", desc: "Liberação energética linear", qtd: "200g" },
            { nome: "Mix de Legumes no Vapor", desc: "Brócolis, cenoura e folhas livres", qtd: "100g" }
        ]
    },
    "tarde": {
        titulo: "Lanche da Tarde Sacietógeno",
        kcal: 310, proteinas: 22, carboidratos: 30, gorduras: 6,
        itens: [
            { nome: "Iogurte Natural Proteico", desc: "Rápido aporte proteico", qtd: "200g" },
            { nome: "Aveia em Flocos Inteiros", desc: "Fibras solúveis beta-glucanas", qtd: "30g" },
            { nome: "Morangos Picados Frescos", desc: "Ação antioxidante natural", qtd: "100g" }
        ]
    },
    "janta": {
        titulo: "Janta Econômica & Saudável",
        kcal: 520, proteinas: 42, carboidratos: 45, gorduras: 14,
        itens: [
            { nome: "Patinho Moído Grelhado", desc: "Corte magro de carne vermelha", qtd: "200g" },
            { nome: "Mandioca Cozida", desc: "Excelente fonte de energia limpa", qtd: "150g" },
            { nome: "Brócolis refogado", desc: "Rico em micronutrientes essenciais", qtd: "80g" }
        ]
    }
};

// META GLOBAL PARA O MOTOR DE CÁLCULO
const metaDiariaGlobal = { kcal: 2200, proteinas: 160, carboidratos: 220, gorduras: 70 };

// MOTOR DE ATUALIZAÇÃO DINÂMICA EM TEMPO REAL (INTEGRAÇÃO CHECKS)
function calculateMacrosEngine() {
    let somas = { kcal: 0, proteinas: 0, carboidratos: 0, gorduras: 0 };

    const checks = {
        "cafe": document.getElementById('check-cafe').checked,
        "almoco": document.getElementById('check-almoco').checked,
        "tarde": document.getElementById('check-tarde').checked,
        "janta": document.getElementById('check-janta').checked
    };

    for (let chave in checks) {
        if (checks[chave]) {
            somas.kcal += dbRefeicoesMetabolicas[chave].kcal;
            somas.proteinas += dbRefeicoesMetabolicas[chave].proteinas;
            somas.carboidratos += dbRefeicoesMetabolicas[chave].carboidratos;
            somas.gorduras += dbRefeicoesMetabolicas[chave].gorduras;
        }
    }

    const pctKcal = Math.min(Math.round((somas.kcal / metaDiariaGlobal.kcal) * 100), 100);
    const pctPro = Math.min(Math.round((somas.proteinas / metaDiariaGlobal.proteinas) * 100), 100);
    const pctCarb = Math.min(Math.round((somas.carboidratos / metaDiariaGlobal.carboidratos) * 100), 100);
    const pctFat = Math.min(Math.round((somas.gorduras / metaDiariaGlobal.gorduras) * 100), 100);

    document.getElementById('current-kcal-sum').textContent = somas.kcal;
    document.getElementById('calories-progress-line').style.width = `${pctKcal}%`;
    
    const msgAuxiliar = document.getElementById('calories-remainder-msg');
    if (pctKcal >= 100) {
        msgAuxiliar.innerHTML = "🎉 <strong>Parabéns!</strong> Você alcançou 100% da sua meta de hoje!";
    } else {
        msgAuxiliar.textContent = `Restam ${metaDiariaGlobal.kcal - somas.kcal} kcal para fechar o plano diário.`;
    }

    updateCircularRing('ring-protein', 'pct-protein', pctPro);
    updateCircularRing('ring-carbs', 'pct-carbs', pctCarb);
    updateCircularRing('ring-fats', 'pct-fats', pctFat);

    document.getElementById('weight-protein').textContent = `${somas.proteinas}g / ${metaDiariaGlobal.proteinas}g`;
    document.getElementById('weight-carbs').textContent = `${somas.carboidratos}g / ${metaDiariaGlobal.carboidratos}g`;
    document.getElementById('weight-fats').textContent = `${somas.gorduras}g / ${metaDiariaGlobal.gorduras}g`;
}

function updateCircularRing(ringId, textId, percentage) {
    document.getElementById(ringId).setAttribute("stroke-dasharray", `${percentage}, 100`);
    document.getElementById(textId).textContent = `${percentage}%`;
}

// FECHAMENTO DA PUBLICIDADE / BANNER DE UPSELL
function closeUpsellBanner() {
    document.getElementById('upsell-marketing-banner').classList.add('hidden');
}

// ABERTURA DE RECEITAS ESTILO CAPA (Foto 4)
const recipeModal = document.getElementById('recipe-modal-viewport');

function openRecipePanel(chaveRefeicao) {
    const dados = dbRefeicoesMetabolicas[chaveRefeicao];
    if (!dados) return;

    document.getElementById('recipe-title-render').textContent = dados.titulo;
    document.getElementById('recipe-kcal').textContent = dados.kcal;
    document.getElementById('recipe-prot').textContent = `${dados.proteinas}g`;
    document.getElementById('recipe-carb').textContent = `${dados.carboidratos}g`;
    document.getElementById('recipe-items-count').textContent = `${dados.itens.length} itens estruturados`;

    const boxAlvo = document.getElementById('ingredients-target-box');
    boxAlvo.innerHTML = "";

    dados.itens.forEach(item => {
        boxAlvo.innerHTML += `
            <div class="ingredient-row-premium">
                <div class="ing-primary-meta">
                    <h4>${item.nome}</h4>
                    <p>${item.desc}</p>
                </div>
                <span class="ing-measured-val">${item.qtd}</span>
            </div>
        `;
    });

    recipeModal.classList.remove('hidden');
}

function closeRecipePanel() {
    recipeModal.classList.add('hidden');
}

// BOTÃO INTERATIVO DA INTELIGÊNCIA ARTIFICIAL (PLANOS PREMIUM)
function triggerAIVoiceEngine() {
    alert("Nutri AI iniciada! Analisando os macros do seu dia para sugerir otimizações...");
}

// SELETOR EXCLUSIVO DE FOTOS DA BIBLIOTECA / GALERIA NATIVA
const fileInput = document.getElementById('avatar-file-input');
const avatarImg = document.getElementById('user-avatar-target');

function triggerAvatarUpload() {
    fileInput.click();
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            avatarImg.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
    profileDrawer.classList.add('hidden');
});

// SUBMENU DO PERFIL (GAVETA FLUTUANTE)
const profileDrawer = document.getElementById('profile-drawer-overlay');
function toggleProfileSubmenu() {
    profileDrawer.classList.toggle('hidden');
}

// INICIALIZAÇÃO DO ESTADO PADRÃO
window.addEventListener('DOMContentLoaded', () => {
    calculateMacrosEngine();
});
