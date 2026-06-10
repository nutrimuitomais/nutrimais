document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. CONFIGURAÇÕES E CÁLCULOS MATEMÁTICOS
    // ==========================================================================
    const META_CALORIAS = 2200;
    // O raio do SVG mudou para 34. A circunferência exata é 2 * PI * r
    const CIRCUNFERENCIA_MAXIMA = 2 * Math.PI * 34; // aprox. 213.63

    const distribuicaoMacros = [
        { prot: 20, carb: 15, fat: 25 },  // Refeição 1
        { prot: 45, carb: 45, fat: 40 },  // Refeição 2
        { prot: 15, carb: 15, fat: 10 },  // Refeição 3
        { prot: 20, carb: 25, fat: 25 }   // Refeição 4
    ];

    // ==========================================================================
    // 2. SISTEMA DE TROCA DE FOTO DE PERFIL (AVATAR)
    // ==========================================================================
    const fileUpload = document.getElementById("file-upload");
    const triggerDesktop = document.getElementById("user-avatar-trigger");
    const triggerMobile = document.getElementById("mobile-avatar-trigger");
    
    const imgDesktop = document.getElementById("user-avatar-desktop");
    const imgMobile = document.getElementById("user-avatar-mobile");

    // Aciona o input file oculto ao clicar no avatar (Desktop ou Mobile)
    function abrirGaleria(e) {
        e.preventDefault(); // Evita scroll caso clique no link do mobile
        fileUpload.click();
    }

    triggerDesktop.addEventListener("click", abrirGaleria);
    triggerMobile.addEventListener("click", abrirGaleria);

    // Quando o usuário escolhe a foto, lemos e atualizamos as imagens
    fileUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fotoUrl = event.target.result;
                imgDesktop.src = fotoUrl;
                imgMobile.src = fotoUrl;
            }
            reader.readAsDataURL(file);
        }
    });

    // ==========================================================================
    // 3. CONTROLE DE PROGRESSO (CALORIAS E MACROS)
    // ==========================================================================
    const checkboxes = document.querySelectorAll(".meal-checkbox");
    const mealCards = document.querySelectorAll(".meal-card");
    const displayKcal = document.getElementById("sum-kcal");
    const barKcal = document.getElementById("bar-kcal");
    const feedbackKcal = document.getElementById("kcal-feedback");

    const ringProt = document.getElementById("ring-prot");
    const ringCarb = document.getElementById("ring-carb");
    const ringFat = document.getElementById("ring-fat");

    const percProt = document.getElementById("perc-prot");
    const percCarb = document.getElementById("perc-carb");
    const percFat = document.getElementById("perc-fat");

    function atualizarDashboard() {
        let kcalConsumidas = 0;
        let pProt = 0, pCarb = 0, pFat = 0;

        checkboxes.forEach((chk, index) => {
            const card = mealCards[index];
            if (!card) return; // Proteção caso haja menos cards que checkboxes

            const kcal = parseInt(card.getAttribute("data-kcal"), 10);

            if (chk.checked) {
                card.classList.add("concluido");
                kcalConsumidas += kcal;
                
                // Pega os macros só se a refeição existir na matriz
                if(distribuicaoMacros[index]) {
                    pProt += distribuicaoMacros[index].prot;
                    pCarb += distribuicaoMacros[index].carb;
                    pFat += distribuicaoMacros[index].fat;
                }
            } else {
                card.classList.remove("concluido");
            }
        });

        // Atualiza Calorias
        displayKcal.textContent = kcalConsumidas;
        const porcentagemKcal = Math.min((kcalConsumidas / META_CALORIAS) * 100, 100);
        barKcal.style.width = `${porcentagemKcal}%`;

        if (kcalConsumidas >= META_CALORIAS) {
            feedbackKcal.textContent = "Meta atingida! 100% do plano concluído.";
            feedbackKcal.style.color = "var(--color-progress)";
        } else {
            feedbackKcal.textContent = `Faltam ${META_CALORIAS - kcalConsumidas} kcal para completar os 100%.`;
            feedbackKcal.style.color = "var(--text-muted)";
        }

        // Atualiza Anéis de Macros
        atualizarAnel(ringProt, percProt, pProt);
        atualizarAnel(ringCarb, percCarb, pCarb);
        atualizarAnel(ringFat, percFat, pFat);
    }

    function atualizarAnel(anel, texto, valorPorcentagem) {
        // Trava no máximo de 100% visualmente
        const pct = Math.min(valorPorcentagem, 100);
        texto.textContent = `${pct}%`;
        
        // Calcula o recuo (offset) com base na circunferência de 213.63
        const offset = CIRCUNFERENCIA_MAXIMA - (CIRCUNFERENCIA_MAXIMA * pct) / 100;
        anel.style.strokeDashoffset = offset;
    }

    checkboxes.forEach(chk => chk.addEventListener("change", atualizarDashboard));

    // ==========================================================================
    // 4. MUDANÇA DINÂMICA DE PLANO (MAX, SUPER, INTELIGENTE)
    // ==========================================================================
    const badgeTop = document.getElementById("plan-badge-top");
    const badgeFixed = document.getElementById("plan-badge-fixed");

    // Você pode chamar essa função no console ou amarrá-la a um botão de "Upgrade"
    window.alterarPlano = function(plano) {
        // Limpa as classes atuais
        badgeTop.classList.remove("badge-plata-fixed", "badge-ouro-fixed", "badge-verde-fixed");
        badgeFixed.style.backgroundImage = "none"; 
        badgeFixed.style.background = "none";
        badgeFixed.style.color = "#1A1A1A"; // Padrão
        
        if (plano === "MAX") {
            badgeTop.classList.add("badge-plata-fixed");
            badgeTop.textContent = "MAX NUTRI";
            
            badgeFixed.style.backgroundImage = "linear-gradient(135deg, var(--plan-prata-1), var(--plan-prata-2), var(--plan-prata-3))";
            badgeFixed.textContent = "MAX NUTRI";

        } else if (plano === "SUPER") {
            badgeTop.classList.add("badge-ouro-fixed");
            badgeTop.textContent = "SUPER NUTRI";
            
            badgeFixed.style.backgroundImage = "linear-gradient(135deg, var(--plan-ouro-1), var(--plan-ouro-2), var(--plan-ouro-3))";
            badgeFixed.textContent = "SUPER NUTRI";

        } else if (plano === "INTELIGENTE") {
            badgeTop.classList.add("badge-verde-fixed");
            badgeTop.textContent = "NUTRI INTELIGENTE";
            
            badgeFixed.style.background = "var(--plan-verde)";
            badgeFixed.style.color = "#FFF";
            badgeFixed.textContent = "NUTRI INTELIGENTE";
        }
    };

    // ==========================================================================
    // 5. INICIALIZAÇÃO
    // ==========================================================================
    // Configura os painéis logo que a página carrega
    atualizarDashboard();
});
