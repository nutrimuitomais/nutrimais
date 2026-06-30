document.addEventListener('DOMContentLoaded', () => {
    
    // Simulação: Animação suave das barras de progresso ao carregar a página
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });

    // Funcionalidade futura: Adicionar copo de água
    const addWaterBtn = document.querySelector('.add-water');
    if(addWaterBtn) {
        addWaterBtn.addEventListener('click', () => {
            console.log('Adicionar 200ml de água - Integração futura com backend');
            // Lógica para preencher a gota de água vazia
            const emptyDrop = document.querySelector('.water-drops .text-gray');
            if(emptyDrop) {
                emptyDrop.classList.remove('text-gray');
                emptyDrop.classList.add('active');
                emptyDrop.style.color = '#3b82f6';
            }
        });
    }

    // Funcionalidade futura: Interação com as refeições
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach(card => {
        card.addEventListener('click', () => {
            // Apenas um console.log preparatório para quando formos ajustar as funções
            const mealName = card.querySelector('.meal-info h4').innerText;
            console.log(`Abrir detalhes da refeição: ${mealName}`);
        });
    });

});
