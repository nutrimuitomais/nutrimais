document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. CARROSSEL DE BANNERS ROTATIVOS (DIETA, TREINO E ANAMNESE)
    // ==========================================================================
    const slides = document.querySelectorAll(".banner-slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    const slideInterval = 6000; // Troca a cada 6 segundos de forma suave

    function changeSlide(nextIndex) {
        if (!slides.length || !dots.length) return;
        
        // Remove estado ativo do slide anterior
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        currentSlide = nextIndex;

        // Adiciona estado ativo no novo slide escolhido
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    function autoPlaySlides() {
        let next = (currentSlide + 1) % slides.length;
        changeSlide(next);
    }

    let bannerTimer = setInterval(autoPlaySlides, slideInterval);

    // Evento de clique direto nas bolinhas indicadoras
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            clearInterval(bannerTimer);
            changeSlide(index);
            bannerTimer = setInterval(autoPlaySlides, slideInterval);
        });
    });


    // ==========================================================================
    // 2. SISTEMA INTEGRADO DE CALORIAS E ANIMÇÃO DOS MACROS (SVG RINGS)
    // ==========================================================================
    const checkboxes = document.querySelectorAll(".meal-checkbox");
    const sumKcalEl = document.getElementById("sum-kcal");
    const barKcalEl = document.getElementById("bar-kcal");
    const kcalFeedbackEl = document.getElementById("kcal-feedback");
    
    // Elementos dos Anéis de Macronutrientes
    const ringProt = document.getElementById("ring-prot");
    const ringCarb = document.getElementById("ring-carb");
    const ringFat = document.getElementById("ring-fat");
    
    const percProt = document.getElementById("perc-prot");
    const percCarb = document.getElementById("perc-carb");
    const percFat = document.getElementById("perc-fat");

    const TOTAL_GOAL_KCAL = 2200;
    const MAX_CIRCUMFERENCE = 213.6; // Baseado no raio r="34" do SVG

    function updateNutritionDashboard() {
        let totalCheckedKcal = 0;

        // Calcula os valores com base nos cards de refeição ativos
        checkboxes.forEach(checkbox => {
            const card = checkbox.closest(".meal-card");
            const kcalValue = parseInt(card.getAttribute("data-kcal")) || 0;

            if (checkbox.checked) {
                totalCheckedKcal += kcalValue;
                card.classList.add("concluido");
            } else {
                card.classList.remove("concluido");
            }
        });

        // 1. Atualiza Contador e Barra Principal de Calorias
        if (sumKcalEl) sumKcalEl.textContent = totalCheckedKcal;
        
        const kcalPercentage = Math.min((totalCheckedKcal / TOTAL_GOAL_KCAL) * 100, 100);
        if (barKcalEl) barKcalEl.style.width = `${kcalPercentage}%`;

        // 2. Atualiza Mensagem Dinâmica de Feedback
        if (kcalFeedbackEl) {
            const remaining = TOTAL_GOAL_KCAL - totalCheckedKcal;
            if (remaining > 0) {
                kcalFeedbackEl.textContent = `Restam ${remaining} kcal para fechar o plano diário.`;
            } else {
                kcalFeedbackEl.textContent = "🔥 Meta batida! Plano diário concluído com sucesso.";
            }
        }

        // 3. Atualiza os Anéis de Macronutrientes (SVG Progress)
        // Para uma experiência premium, simulamos oscilações realistas entre os macros acumulados
        animateMacroRing(ringProt, percProt, kcalPercentage);
        animateMacroRing(ringCarb, percCarb, kcalPercentage);
        animateMacroRing(ringFat, percFat, kcalPercentage);
    }

    function animateMacroRing(ringElement, labelElement, percentage) {
        if (!ringElement || !labelElement) return;

        // Calcula o recuo físico da linha do círculo SVG
        const offset = MAX_CIRCUMFERENCE - (MAX_CIRCUMFERENCE * percentage) / 100;
        ringElement.style.strokeDashoffset = offset;
        
        // Atualiza a numeração textual interna do anel
        labelElement.textContent = `${Math.round(percentage)}%`;
    }

    // Ouvinte de mudança para cada refeição do cronograma
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateNutritionDashboard);
    });

    // Inicializa zerado ou recupera o estado no primeiro carregamento
    updateNutritionDashboard();


    // ==========================================================================
    // 3. PREVIEW E UPLOAD DINÂMICO DE AVATAR (DESKTOP E MOBILE)
    // ==========================================================================
    const fileUploadInput = document.getElementById("file-upload");
    const desktopAvatarTrigger = document.getElementById("user-avatar-trigger");
    const mobileAvatarTrigger = document.getElementById("mobile-avatar-trigger");
    
    const desktopImg = document.getElementById("user-avatar-desktop");
    const mobileImg = document.getElementById("user-avatar-mobile");

    function triggerFileSelection(e) {
        e.preventDefault();
        if (fileUploadInput) fileUploadInput.click();
    }

    if (desktopAvatarTrigger) desktopAvatarTrigger.addEventListener("click", triggerFileSelection);
    if (mobileAvatarTrigger) mobileAvatarTrigger.addEventListener("click", triggerFileSelection);

    if (fileUploadInput) {
        fileUploadInput.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Atualiza simultaneamente as duas imagens da interface
                    if (desktopImg) desktopImg.src = e.target.result;
                    if (mobileImg) mobileImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }


    // ==========================================================================
    // 4. SELEÇÃO DE ESTRELAS E COMPORTAMENTO DA COMUNIDADE
    // ==========================================================================
    const stars = document.querySelectorAll(".star-clickable");
    const submitCommentBtn = document.getElementById("submit-comment-btn");
    const commentTextArea = document.querySelector(".input-group textarea");
    let selectedRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            
            // Preenche as estrelas selecionadas e limpa as restantes
            stars.forEach((s, idx) => {
                if (idx < selectedRating) {
                    s.textContent = "★";
                    s.classList.add("selected");
                } else {
                    s.textContent = "☆";
                    s.classList.remove("selected");
                }
            });
        });
    });

    if (submitCommentBtn) {
        submitCommentBtn.addEventListener("click", () => {
            const commentText = commentTextArea ? commentTextArea.value.trim() : "";

            if (selectedRating === 0) {
                alert("Por favor, selecione uma nota dando estrelas antes de enviar!");
                return;
            }
            if (commentText === "") {
                alert("Por favor, escreva um breve comentário sobre sua experiência.");
                return;
            }

            // Simulação de envio para a API
            alert(`Obrigado pelo feedback Vinicius!\nAvaliação: ${selectedRating} estrelas.\nComentário enviado com sucesso.`);
            
            // Reseta os campos após o envio com sucesso
            if (commentTextArea) commentTextArea.value = "";
            selectedRating = 0;
            stars.forEach(s => {
                s.textContent = "☆";
                s.classList.remove("selected");
            });
        });
    }
});
