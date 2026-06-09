// BANCO DE DADOS INTEGRADO PARA POPULAR O VISUAL PREMIUM
const refeicoesDiarias = {
    "cafe-da-manha": {
        nome: "Café da Manhã Saudável",
        kcal: "340", proteinas: "22g", carboidratos: "35g",
        contagem: "3 itens selecionados",
        itens: [
            { nome: "Ovos Mexidos", desc: "Preparados sem óleo ou manteiga", qtd: "3 unidades" },
            { nome: "Pão Integral de Fermentação Natural", desc: "Rico em fibras e carbo complexo", qtd: "2 fatias" },
            { nome: "Mamão Formosa picado", desc: "Fonte de vitaminas e digestão limpa", qtd: "150g" }
        ]
    },
    "almoco": {
        nome: "Almoço Funcional Equilibrado",
        kcal: "610", proteinas: "45g", carboidratos: "55g",
        contagem: "4 itens selecionados",
        itens: [
            { nome: "Filé de Frango Grelhado", desc: "Pesar o corte já grelhado", qtd: "150g" },
            { nome: "Arroz Integral Cozido", desc: "Carboidrato de liberação gradual", qtd: "140g" },
            { nome: "Brócolis e Legumes no Vapor", desc: "Ricos em micronutrientes", qtd: "100g" },
            { nome: "Mix de Folhas Verdes", desc: "Livre com fios de azeite extra virgem", qtd: "À vontade" }
        ]
    },
    "cafe-da-tarde": {
        nome: "Lanche da Tarde Prático",
        kcal: "240", proteinas: "19g", carboidratos: "28g",
        contagem: "3 itens selecionados",
        itens: [
            { nome: "Iogurte Natural Whey", desc: "Zero adição de açúcares", qtd: "200g" },
            { nome: "Aveia em Flocos Finos", desc: "Garante saciedade prolongada", qtd: "30g" },
            { nome: "Morangos Frescos", desc: "Antioxidante natural", qtd: "6 unidades" }
        ]
    }
};

// ACIONADORES DO POP-IN DE CONVERSÃO (PROMO)
function dismissPromo() {
    const promoCard = document.getElementById('promo-card');
    promoCard.classList.add('hidden');
}

// CONTROLE E CONEXÃO DINÂMICA DO POP-IN DA DIETA
const modalElement = document.getElementById('meal-details-modal');

function showMealDiet(chaveRefeicao) {
    const dados = refeicoesDiarias[chaveRefeicao];
    if (!dados) return;

    // Atualiza cabeçalhos e macros da refeição clicada
    document.getElementById('diet-modal-title').textContent = dados.nome;
    document.getElementById('diet-modal-kcal').textContent = dados.kcal;
    document.getElementById('diet-modal-pro').textContent = dados.proteinas;
    document.getElementById('diet-modal-carb').textContent = dados.carboidratos;
    document.getElementById('diet-modal-count').textContent = dados.contagem;

    // Limpa e renderiza os ingredientes reais
    const targetContainer = document.getElementById('ingredients-target-container');
    targetContainer.innerHTML = "";

    dados.itens.forEach(item => {
        const itemHTML = `
            <div class="premium-ingredient-row">
                <div class="ing-name-details">
                    <h5>${item.nome}</h5>
                    <p>${item.desc}</p>
                </div>
                <span class="ing-portion">${item.qtd}</span>
            </div>
        `;
        targetContainer.innerHTML += itemHTML;
    });

    // Mostra o pop-in subindo suavemente
    modalElement.classList.remove('hidden');
}

function hideMealDiet() {
    modalElement.classList.add('hidden');
}
