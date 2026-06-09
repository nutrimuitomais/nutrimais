const dbRefeicoesMetabolicas = {
    "cafe": {
        titulo: "Café da Manhã de Alta Performance",
        kcal: 390, proteinas: 28, carboidratos: 35, gorduras: 12,
        itens: [
            { nome: "Ovos Mexidos Inteiros", qtd: "3 unidades" },
            { nome: "Pão Integral de Forma", qtd: "60g" },
            { nome: "Mamão Formosa Fresco", qtd: "150g" }
        ]
    },
    "almoco": {
        titulo: "Almoço Funcional Batendo Macros",
        kcal: 980, proteinas: 95, carboidratos: 78, gorduras: 18,
        itens: [
            { nome: "Filé de Frango Grelhado", qtd: "500g" },
            { nome: "Arroz Integral Cozido", qtd: "200g" },
            { nome: "Salada Verde Mix", qtd: "À vontade" }
        ]
    },
    "tarde": {
        titulo: "Lanche da Tarde Sacietógeno",
        kcal: 310, proteinas: 22, carboidratos: 30, gorduras: 6,
        itens: [
            { nome: "Iogurte Natural Proteico", qtd: "200g" },
            { nome: "Aveia em Flocos Inteiros", qtd: "30g" },
            { nome: "Morangos Picados", qtd: "100g" }
        ]
    },
    "janta": {
        titulo: "Janta Anabólica & Completa",
        kcal: 520, proteinas: 42, carboidratos: 45, gorduras: 14,
        itens: [
            { nome: "Patinho Moído Grelhado", qtd: "200g" },
            { nome: "Mandioca Cozida Salteada", qtd: "150g" },
            { nome: "Brócolis Americano", qtd: "80g" }
        ]
    }
};

const metaDiariaGlobal = { kcal: 2200, proteinas: 160, carboidratos: 220, gorduras: 70 };

// CONTROLE DO BANNER POP-UP (2 VEZES POR DIA)
function evaluateInterstitialMarketingPopup() {
    const storageKeyDate = 'nutri_interstitial_date';
    const storageKeyCount = 'nutri_interstitial_count';
    const hoje = new Date().toDateString();
    const dataRegistrada = localStorage.getItem(storageKeyDate);
    let contagemVisualizacoes = parseInt(localStorage.getItem(storageKeyCount) || "0");

    if (dataRegistrada !== hoje) {
        localStorage.setItem(storageKeyDate, hoje);
        localStorage.setItem(storageKeyCount, "1");
        triggerInterstitialDisplay();
    } else if (contagemVisualizacoes < 2) {
        localStorage.setItem(storageKeyCount, (contagemVisualizacoes + 1).toString());
        triggerInterstitialDisplay();
    }
}

function triggerInterstitialDisplay() {
    setTimeout(() => {
        const portalPopup = document.getElementById('interstitial-marketing-portal');
        if (portalPopup) portalPopup.classList.remove('hidden');
    }, 1000);
}

function dismissInterstitialHub() {
    const portalPopup = document.getElementById('interstitial-marketing-portal');
    if (portalPopup) portalPopup.classList.add('hidden');
}

// CALCULADORA DE MACROS COM COR CONDICIONAL VERDE CLARO NOS CARDS
function calculateMacrosEngine() {
    let somas = { kcal: 0, proteinas: 0, carboidratos: 0, gorduras: 0 };

    const refeicoes = ["cafe", "almoco", "tarde", "janta"];

    refeicoes.forEach(chave => {
        const checkbox = document.getElementById(`check-${chave}`);
        const cardContainer = document.getElementById(`card-meal-${chave}`);
        
        if (checkbox && checkbox.checked) {
            somas.kcal += dbRefeicoesMetabolicas[chave].kcal;
            somas.proteinas += dbRefeicoesMetabolicas[chave].proteinas;
            somas.carboidratos += dbRefeicoesMetabolicas[chave].carboidratos;
            somas.gorduras += dbRefeicoesMetabolicas[chave].gorduras;
            
            // Ativa o fundo verde claro caso concluído
            if(cardContainer) cardContainer.classList.add('concluido');
        } else {
            // Remove o fundo se desmarcado
            if(cardContainer) cardContainer.classList.remove('concluido');
        }
    });

    const pctKcal = Math.min(Math.round((somas.kcal / metaDiariaGlobal.kcal) * 100), 100);
    const pctPro = Math.min(Math.round((somas.proteinas / metaDiariaGlobal.proteinas) * 100), 100);
    const pctCarb = Math.min(Math.round((somas.carboidratos / metaDiariaGlobal.carboidratos) * 100), 100);
    const pctFat = Math.min(Math.round((somas.gorduras / metaDiariaGlobal.gorduras) * 100), 100);

    document.getElementById('current-kcal-sum').textContent = somas.kcal;
    document.getElementById('calories-progress-line').style.width = `${pctKcal}%`;
    
    const msgAuxiliar = document.getElementById('calories-remainder-msg');
    if (pctKcal >= 100) {
        msgAuxiliar.innerHTML = "🎉 <strong>Meta batida!</strong> Cronograma consolidado.";
    } else {
        msgAuxiliar.textContent = `Faltam ${metaDiariaGlobal.kcal - somas.kcal} kcal para fechar o dia.`;
    }

    updateCircularRing('ring-protein', 'pct-protein', pctPro);
    updateCircularRing('ring-carbs', 'pct-carbs', pctCarb);
    updateCircularRing('ring-fats', 'pct-fats', pctFat);

    document.getElementById('weight-protein').textContent = `${somas.proteinas}g / ${metaDiariaGlobal.proteinas}g`;
    document.getElementById('weight-carbs').textContent = `${somas.carboidratos}g / ${metaDiariaGlobal.carbs || metaDiariaGlobal.carboidratos}g`;
    document.getElementById('weight-fats').textContent = `${somas.gorduras}g / ${metaDiariaGlobal.gorduras}g`;
}

function updateCircularRing(ringId, textId, percentage) {
    const ring = document.getElementById(ringId);
    if(ring) ring.setAttribute("stroke-dasharray", `${percentage}, 100`);
    const text = document.getElementById(textId);
    if(text) text.textContent = `${percentage}%`;
}

// ROTATIVIDADE DO CARROSSEL DE UPSELL
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

    setTimeout(rotateMarketingSlides, 5000);
}

// GAVETA DE NOTIFICAÇÕES (ESTILO IFOOD)
function openIfoodNotificationsHub() {
    const notifyPanel = document.getElementById('ifood-notifications-overlay');
    if (notifyPanel) notifyPanel.classList.remove('hidden');
}

function closeIfoodNotificationsHub() {
    const notifyPanel = document.getElementById('ifood-notifications-overlay');
    if (notifyPanel) notifyPanel.classList.add('hidden');
}

// DETALHAMENTO DE RECEITAS
function openRecipePanel(chaveRefeicao) {
    const modal = document.getElementById('recipe-modal-viewport');
    const dados = dbRefeicoesMetabolicas[chaveRefeicao];
    if (!dados) return;

    document.getElementById('recipe-title-render').textContent = dados.titulo;
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

    if(modal) modal.classList.remove('hidden');
}

function closeRecipePanel() {
    document.getElementById('recipe-modal-viewport').classList.add('hidden');
}

function triggerPremiumModule() {
    alert("Redirecionando para o canal direto da sua área do assinante...");
}

// PROFILE UPLOAD LOGIC
const fileInput = document.getElementById('avatar-file-input');
const avatarImg = document.getElementById('user-avatar-target');

function triggerAvatarUpload() { fileInput.click(); }
if(fileInput) {
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) { avatarImg.src = event.target.result; };
            reader.readAsDataURL(file);
        }
    });
}

const profileDrawer = document.getElementById('profile-drawer-overlay');
function toggleProfileSubmenu() { if(profileDrawer) profileDrawer.classList.toggle('hidden'); }

window.addEventListener('DOMContentLoaded', () => {
    calculateMacrosEngine();
    rotateMarketingSlides();
    evaluateInterstitialMarketingPopup();
});
