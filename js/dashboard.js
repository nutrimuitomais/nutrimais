// CONTROLE DE FLUXO DE ANAMNESE (MUDAR PARA FALSE PARA TESTAR O AVISO DE ERRO)
const usuarioCompletouAnamnese = true;

// BANCO DE DADOS INTEGRADO COM FOTOS REAIS DOS ALIMENTOS (FOTO 4 PERFORMANCE)
const dbRefeicoesMetabolicas = {
    "cafe": {
        titulo: "Café da Manhã de Alta Performance",
        kcal: 390, proteinas: 28, carboidratos: 35, gorduras: 12,
        foto: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600",
        itens: [
            { nome: "Ovos Mexidos Inteiros", qtd: "3 unidades" },
            { nome: "Pão Integral de Forma", qtd: "60g" },
            { nome: "Mamão Formosa Fresco", qtd: "150g" }
        ]
    },
    "almoco": {
        titulo: "Almoço Funcional Batendo Macros",
        kcal: 980, proteinas: 95, carboidratos: 78, gorduras: 18,
        foto: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600",
        itens: [
            { nome: "Filé de Frango Grelhado", qtd: "500g" },
            { nome: "Arroz Integral Cozido", qtd: "200g" },
            { nome: "Salada Verde Mix", qtd: "À vontade" }
        ]
    },
    "tarde": {
        titulo: "Lanche da Tarde Sacietógeno",
        kcal: 310, proteinas: 22, carboidratos: 30, gorduras: 6,
        foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
        itens: [
            { nome: "Iogurte Natural Proteico", qtd: "200g" },
            { nome: "Aveia em Flocos Inteiros", qtd: "30g" },
            { nome: "Morangos Picados", qtd: "100g" }
        ]
    },
    "janta": {
        titulo: "Janta Anabólica & Completa",
        kcal: 520, proteinas: 42, carboidratos: 45, gorduras: 14,
        foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
        itens: [
            { nome: "Patinho Moído Grelhado", qtd: "200g" },
            { nome: "Mandioca Cozida Salteada", qtd: "150g" },
            { nome: "Brócolis Americano", qtd: "80g" }
        ]
    }
};

const metaDiariaGlobal = { kcal: 2200, proteinas: 160, carboidratos: 220, gorduras: 70 };

// ENGINE DE CÁLCULO DINÂMICO
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
        msgAuxiliar.innerHTML = "🎉 <strong>100% Batido!</strong> Meta diária consolidada com sucesso.";
    } else {
        msgAuxiliar.textContent = `Faltam ${metaDiariaGlobal.kcal - somas.kcal} kcal para fechar o dia.`;
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

// CARROSSEL ROTATIVO DE PUBLICIDADE DE UPSELL
let slideIndex = 0;
function rotateMarketingSlides() {
    const slides = document.querySelectorAll('.upsell-slide-card');
    const dots = document.querySelectorAll('.slider-dots-indicator .dot');
    if(slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    setTimeout(rotateMarketingSlides, 5000); // Rotaciona a cada 5 segundos
}

// LOGICA CONDICIONAL DE VISUALIZAÇÃO DE RECEITAS (AVISO SE FALTAR ESCOLHA DE ALIMENTOS)
function openRecipePanel(chaveRefeicao) {
    const modal = document.getElementById('recipe-modal-viewport');
    const viewConteudo = document.getElementById('recipe-content-loaded-view');
    const viewErro = document.getElementById('recipe-error-view');

    if (!usuarioCompletouAnamnese) {
        viewConteudo.classList.add('hidden');
        viewErro.classList.remove('hidden');
        modal.classList.remove('hidden');
        return;
    }

    const dados = dbRefeicoesMetabolicas[chaveRefeicao];
    if (!dados) return;

    viewErro.classList.add('hidden');
    viewConteudo.classList.remove('hidden');

    document.getElementById('recipe-title-render').textContent = dados.titulo;
    document.getElementById('recipe-kcal').textContent = dados.kcal;
    document.getElementById('recipe-prot').textContent = `${dados.proteinas}g`;
    document.getElementById('recipe-carb').textContent = `${dados.carboidratos}g`;
    document.getElementById('recipe-banner-image-bg').style.backgroundImage = `url('${dados.foto}')`;

    const boxAlvo = document.getElementById('ingredients-target-box');
    boxAlvo.innerHTML = "";

    dados.itens.forEach(item => {
        boxAlvo.innerHTML += `
            <div class="ingredient-row-premium">
                <h4>${item.nome}</h4>
                <span>${item.qtd}</span>
            </div>
        `;
    });

    modal.classList.remove('hidden');
}

function closeRecipePanel() {
    document.getElementById('recipe-modal-viewport').classList.add('hidden');
}

// BLOQUEIO DE SEGURANÇA SE NÃO ESTIVER NO PLANO MAX OU SUPER
function triggerAIVoiceEngine() {
    const planoAtual = "MAX NUTRI"; // Simulação de backend
    if(planoAtual === "MAX NUTRI" || planoAtual === "SUPER NUTRI") {
        alert("Nutri AI Ativada! Analisando balanço hidroeletrolítico e cruzando dados de treino...");
    } else {
        alert("Função Exclusiva para assinantes MAX ou SUPER. Faça o upgrade no painel.");
    }
}

// NOTIFICAÇÕES ATIVAS INTERATIVAS DIÁRIAS
function triggerNotificationPush() {
    alert("Notificação Nutri+: 'Vinicius, você consumiu apenas 25% das proteínas necessárias para manter sua massa magra hoje. Agilize o check no seu Almoço!'");
}

// SCRIPT DE FILE SELECTION NATIVO (CELULAR E NOTEBOOK)
const fileInput = document.getElementById('avatar-file-input');
const avatarImg = document.getElementById('user-avatar-target');

function triggerAvatarUpload() { fileInput.click(); }
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) { avatarImg.src = event.target.result; };
        reader.readAsDataURL(file);
    }
    toggleProfileSubmenu();
});

const profileDrawer = document.getElementById('profile-drawer-overlay');
function toggleProfileSubmenu() { profileDrawer.classList.toggle('hidden'); }

window.addEventListener('DOMContentLoaded', () => {
    calculateMacrosEngine();
    rotateMarketingSlides();
});
