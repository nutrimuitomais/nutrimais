document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. CONFIGURAÇÕES E MAPEAMENTO DE MACRONUTRIENTES POR REFEIÇÃO
    // ==========================================================================
    const META_CALORIAS = 2200;
    const CIRCUNFERENCIA_MAXIMA = 188.5; // Calculado de 2 * Math.PI * r (onde r = 30)

    // Valores fictícios proporcionais de macros para cada refeição (somando 100% no total)
    const distribuicaoMacros = [
        { prot: 20, carb: 15, fat: 25 },  // Café da Manhã
        { prot: 45, carb: 45, fat: 40 },  // Almoço Funcional
        { prot: 15, carb: 15, fat: 10 },  // Lanche da Tarde
        { prot: 20, carb: 25, fat: 25 }   // Janta Anabólica
    ];

    // Elementos do DOM - Metas e Progresso
    const checkboxes = document.querySelectorAll(".meal-checkbox");
    const mealCards = document.querySelectorAll(".meal-card");
    const kcalDisplay = document.getElementById("kcal-display");
    const progressBar = document.getElementById("progress-bar");
    const statusMsg = document.getElementById("status-msg");

    // Elementos do DOM - Anéis de Macros
    const ringProt = document.getElementById("ring-prot");
    const ringCarb = document.getElementById("ring-carb");
    const ringFat = document.getElementById("ring-fat");

    const percProt = document.getElementById("perc-prot");
    const percCarb = document.getElementById("perc-carb");
    const percFat = document.getElementById("perc-fat");

    // ==========================================================================
    // 2. FUNÇÃO CORE DE ATUALIZAÇÃO DO DASHBOARD
    // ==========================================================================
    function atualizarDashboard() {
        let caloriasConsumidas = 0;
        let pProt = 0;
        let pCarb = 0;
        let pFat = 0;

        // Percorre todas as refeições para verificar o estado dos checks
        checkboxes.forEach((checkbox, index) => {
            const card = mealCards[index];
            const kcalRefeicao = parseInt(card.getAttribute("data-kcal"), 10);

            if (checkbox.checked) {
                // Adiciona estilo de sucesso visual ao card
                card.classList.add("concluido");
                
                // Soma calorias e as frações de macros da refeição ativa
                caloriasConsumidas += kcalRefeicao;
                pProt += distribuicaoMacros[index].prot;
                pCarb += distribuicaoMacros[index].carb;
                pFat += distribuicaoMacros[index].fat;
            } else {
                card.classList.remove("concluido");
            }
        });

        // 2.1 Atualização de Calorias e Barra de Progresso Principal
        kcalDisplay.textContent = `${caloriasConsumidas} / ${META_CALORIAS} kcal`;
        
        const porcentagemGeral = (caloriasConsumidas / META_CALORIAS) * 100;
        progressBar.style.width = `${Math.min(porcentagemGeral, 100)}%`;

        // Altera dinamicamente a mensagem de feedback inferior
        if (caloriasConsumidas >= META_CALORIAS) {
            statusMsg.textContent = "Parabéns! Você bateu 100% da sua meta calórica diária!";
            statusMsg.style.color = "#3CA36A";
        } else {
            const faltam = META_CALORIAS - caloriasConsumidas;
            statusMsg.textContent = `Faltam ${faltam} kcal para fechar o plano diário.`;
            statusMsg.style.color = "#666666";
        }

        // 2.2 Atualização dos Gráficos Circulares Dinâmicos (Anéis SVG)
        atualizarAnelMacro(ringProt, percProt, pProt);
        atualizarAnelMacro(ringCarb, percCarb, pCarb);
        atualizarAnelMacro(ringFat, percFat, pFat);
    }

    // Auxiliar para computar o stroke-dashoffset dos círculos inline
    function atualizarAnelMacro(elementoRing, elementoTexto, porcentagem) {
        elementoTexto.textContent = `${porcentagem}%`;
        
        // Calcula o recuo da borda do SVG com base na porcentagem conquistada
        const offset = CIRCUNFERENCIA_MAXIMA - (CIRCUNFERENCIA_MAXIMA * porcentagem) / 100;
        elementoRing.style.strokeDashoffset = offset;
    }

    // Ouvinte de eventos em tempo real para cada caixinha de check
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", atualizarDashboard);
    });

    // ==========================================================================
    // 3. INTERATIVIDADE DO SELETOR DE ESTRELAS (COMUNIDADE)
    // ==========================================================================
    const estrelas = document.querySelectorAll(".star-clickable");
    let notaSelecionada = 0;

    estrelas.forEach((estrela, index) => {
        // Efeito Visual de Hover
        estrela.addEventListener("mouseover", () => {
            destacarEstrelas(index);
        });

        // Remove o destaque temporário caso saia sem clicar
        estrela.addEventListener("mouseleave", () => {
            destacarEstrelas(notaSelecionada - 1);
        });

        // Fixa a nota escolhida ao clicar
        estrela.addEventListener("click", () => {
            notaSelecionada = index + 1;
            destacarEstrelas(index);
        });
    });

    function destacarEstrelas(indiceMaximo) {
        estrelas.forEach((estrela, idx) => {
            if (idx <= indiceMaximo) {
                estrela.textContent = "★";
                estrela.classList.add("selected");
            } else {
                estrela.textContent = "☆";
                estrela.classList.remove("selected");
            }
        });
    }

    // Envio simulado de comentários
    const btnEnviar = document.getElementById("submit-comment-btn");
    const txtArea = document.querySelector(".comment-box-container textarea");

    btnEnviar.addEventListener("click", () => {
        const texto = txtArea.value.trim();
        if (texto === "" || notaSelecionada === 0) {
            alert("Por favor, selecione uma nota em estrelas e digite sua experiência antes de enviar!");
            return;
        }

        alert("Obrigado pelo seu feedback! Ele foi enviado para validação da equipe Nutri+.");
        txtArea.value = "";
        notaSelecionada = 0;
        destacarEstrelas(-1);
    });

    // ==========================================================================
    // 4. INICIALIZAÇÃO AUTOMÁTICA
    // ==========================================================================
    atualizarDashboard();
});
