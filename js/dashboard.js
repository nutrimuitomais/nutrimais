
// js/dashboard.js

// Funções para abrir e fechar o Modal de Receitas
function openRecipe() {
    const modal = document.getElementById('recipeModal');
    modal.classList.remove('hidden');
    // Trava a rolagem da página de fundo quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
}

function closeRecipe() {
    const modal = document.getElementById('recipeModal');
    modal.classList.add('hidden');
    // Libera a rolagem da página de fundo
    document.body.style.overflow = 'auto';
}

// Fechar o modal ao clicar fora da área branca (no fundo escuro)
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('recipeModal');
    
    modalOverlay.addEventListener('click', function(event) {
        // Se o clique foi exatamente no fundo escuro, fecha o modal
        if (event.target === this) {
            closeRecipe();
        }
    });

    // Interatividade para o Menu Inferior (Bottom Nav)
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            navItems.forEach(nav => nav.classList.remove('active'));
            // Adiciona a classe 'active' no botão clicado
            item.classList.add('active');
        });
    });
});
