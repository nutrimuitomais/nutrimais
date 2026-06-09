// CONTROLAR POP-IN PROMOCIONAL (Imagem 2)
function closePromo() {
    const promo = document.getElementById('promotional-popin');
    promo.classList.add('hidden');
}

// Abre o anúncio/pop-in de forma inteligente 1.5 segundos após carregar o app
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const promo = document.getElementById('promotional-popin');
        promo.classList.remove('hidden');
    }, 1500);
});

// CONTROLAR POP-IN DETALHADO DA RECEITA (Imagem 3)
const dietModal = document.getElementById('diet-modal');
const modalMealName = document.getElementById('modal-meal-name');
const modalKcal = document.getElementById('modal-kcal');
const modalPro = document.getElementById('modal-pro');
const modalCarb = document.getElementById('modal-carb');

function openDietModal(nomeRefeicao, kcal, proteinas, carboidratos) {
    // Altera os textos do modal dinamicamente de acordo com o botão clicado
    modalMealName.textContent = nomeRefeicao;
    modalKcal.textContent = kcal;
    modalPro.textContent = proteinas + "g";
    modalCarb.textContent = carboidratos + "g";

    // Exibe o modal na tela
    dietModal.classList.remove('hidden');
}

function closeDietModal() {
    // Esconde o modal com animação suave
    dietModal.classList.add('hidden');
}
