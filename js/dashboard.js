/* ==========================================================================
   NUTRI+ SYSTEM - JAVASCRIPT CORE (PARTE 1 DE 3)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Nutri+ System Iniciado.");
    initModals();
    initMobileNav();
});

/**
 * 1. GERENCIAMENTO DE MODAIS
 * Lida com a abertura e fechamento de receitas e configurações.
 */
function initModals() {
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const closeBtns = document.querySelectorAll('.modal-close');

    // Função para abrir modal por ID
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Impede scroll do fundo
        }
    };

    // Função para fechar modal
    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Fechar ao clicar no botão X
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar ao clicar fora do card (no overlay)
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

/**
 * 2. NAVEGAÇÃO MOBILE
 * Alterna o estado ativo dos itens no rodapé mobile.
 */
function initMobileNav() {
    const navItems = document.querySelectorAll('.mobile-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/* ==========================================================================
   NUTRI+ SYSTEM - JAVASCRIPT CORE (PARTE 2 DE 3)
   ========================================================================== */

/**
 * 3. LOGICA DO CRONOGRAMA ALIMENTAR
 * Alterna a classe 'concluido' nos cards de refeição quando o checkbox é marcado.
 */
function initMealCheckboxes() {
    const checkboxes = document.querySelectorAll('.check-container input');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const mealCard = this.closest('.meal-card');
            if (this.checked) {
                mealCard.classList.add('concluido');
            } else {
                mealCard.classList.remove('concluido');
            }
        });
    });
}

/**
 * 4. CARROSSEL DE RECOMENDAÇÕES (UPSALE SLIDER)
 * Gerencia a transição automática e a navegação por dots.
 */
function initSlider() {
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('.s-dot');
    let currentIndex = 0;

    function updateSlider(index) {
        if (wrapper) {
            wrapper.style.transform = `translateX(-${index * 100}%)`;
            
            // Atualiza os dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    // Navegação automática a cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    }, 5000);

    // Permitir clique nos dots para trocar slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });
}

// Inicializa estas funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initMealCheckboxes();
    initSlider();
});

/* ==========================================================================
   NUTRI+ SYSTEM - JAVASCRIPT CORE (PARTE 3 DE 3)
   ========================================================================== */

/**
 * 5. SISTEMA DE AVALIAÇÃO (COMUNIDADE)
 * Permite que o usuário selecione estrelas e envie um feedback.
 */
function initCommunityStars() {
    const stars = document.querySelectorAll('.star-clickable');
    let currentRating = 0;

    stars.forEach((star, index) => {
        // Efeito de hover (visual)
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => {
                s.style.color = (i <= index) ? '#F5A623' : '#DDD';
            });
        });

        // Clique para selecionar
        star.addEventListener('click', () => {
            currentRating = index + 1;
            stars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index);
                s.style.color = (i <= index) ? '#F5A623' : '#DDD';
            });
        });
    });

    // Reset ao sair da área (se não houver seleção fixa)
    document.querySelector('.stars-selector').addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
            s.style.color = (i < currentRating) ? '#F5A623' : '#DDD';
        });
    });
}

/**
 * 6. SUBMISSÃO DE FEEDBACK
 */
function initFeedbackSubmit() {
    const btn = document.getElementById('submit-comment-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const textarea = document.querySelector('.comment-box-container textarea');
            if (textarea.value.trim() !== "") {
                alert("Obrigado pelo seu feedback, Nutri+!");
                textarea.value = ""; // Limpa o campo
            } else {
                alert("Por favor, escreva algo antes de enviar.");
            }
        });
    }
}

/**
 * EXECUÇÃO FINAL
 * Garantimos que tudo seja carregado após o DOM estar pronto.
 */
document.addEventListener('DOMContentLoaded', () => {
    initCommunityStars();
    initFeedbackSubmit();
});
