// BANCO DE DADOS LOCAL DE RECEITAS COM QUANTIDADES EXATAS PEDIDAS
const receitasData = {
    omelete: {
        title: "🍳 Omelete Premium Fit",
        kcal: "290 Kcal",
        protein: "26g",
        carbs: "12g",
        fats: "15g",
        ingredients: [
            "4 ovos inteiros",
            "50g de queijo minas frescal picado",
            "100g de tomate picadinho",
            "20g de cebola",
            "5ml de azeite de oliva extra virgem"
        ],
        prep: [
            "Bata os 4 ovos em um recipiente até homogeneizar.",
            "Adicione o queijo minas, o tomate e a cebola na mistura de ovos.",
            "Aqueça uma frigideira antiaderente com os 5ml de azeite.",
            "Despeje os ingredientes e cozinhe em fogo médio até dourar os dois lados.",
            "Sirva quente imediatamente."
        ]
    },
    frango: {
        title: "🍗 Almoço Fit Completo",
        kcal: "780 Kcal",
        protein: "68g",
        carbs: "42g",
        fats: "12g",
        ingredients: [
            "500g de peito de frango grelhado (peso cru)",
            "150g de arroz integral cozido",
            "200g de feijão carioca ou preto cozido",
            "100g de salada verde (alface, rúcula, pepino)",
            "10ml de azeite de oliva extra virgem para finalizar"
        ],
        prep: [
            "Grelhe os filetes de frango em uma chapa bem quente até ficarem suculentos.",
            "Monte o prato adicionando as 150g de arroz integral e 200g de feijão.",
            "Disponha as 100g de salada verde ao lado.",
            "Finalize despejando os 10ml de azeite sobre a salada e o arroz.",
            "Consuma conforme a orientação dos seus macros diários."
        ]
    }
};

// DADOS DOS SLIDES DO BANNER ROTATIVO
const slidesData = [
    {
        tag: "🔥 UPGRADE",
        title: "Mais de 100 receitas geradas para você",
        desc: "Assine o plano MAX e libere combinações focadas no ganho de massa magra.",
        btnText: "Assinar o MAX",
        bgClass: "salad-slide-bg"
    },
    {
        tag: "🏋️ TREINO MAX",
        title: "Monte treinos personalizados inteligentes",
        desc: "Sua rotina de musculação integrada diretamente com seus dados calóricos.",
        btnText: "Conhecer MAX",
        bgClass: "gym-slide-bg"
    },
    {
        tag: "🔮 INTELIGÊNCIA ARTIFICIAL",
        title: "Tenha uma IA ajustando sua dieta semanalmente",
        desc: "Exclusivo no plano SUPER. Análise inteligente com base na sua balança.",
        btnText: "Conhecer SUPER",
        bgClass: "ia-slide-bg"
    }
];

let currentSlideIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Dropdown do perfil topo
    const profileBtn = document.getElementById("profileDropdownBtn");
    const profileDropdown = document.getElementById("profileDropdown");
    const mobileProfileBtn = document.getElementById("mobileMenuProfileBtn");

    if(profileBtn && profileDropdown) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });
        
        // Mobile abre o dropdown como um menu completo
        mobileProfileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            profileDropdown.classList.remove("active");
        });
    }

    // Toggle de modo Escuro / Claro
    const darkModeToggle = document.getElementById("darkModeToggle");
    if(darkModeToggle) {
        darkModeToggle.addEventListener("change", (e) => {
            if(e.target.checked) {
                document.body.classList.remove("light-mode");
                document.body.classList.add("dark-mode");
            } else {
                document.body.classList.remove("dark-mode");
                document.body.classList.add("light-mode");
            }
        });
    }

    // Controle de cliques na navegação sidebar e mobile bar
    const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", function() {
            navItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
            const target = this.getAttribute("data-target");
            console.log(`Navegando para: ${target}`);
            // Aqui você pode ocultar/exibir seções se implementar Single Page Application futuramente
        });
    });

    // Inicializa o slider de notícias automático
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;
        renderSlide(currentSlideIndex);
    }, 5000);

    // Configura o plano inicial padrão do usuário como MAX
    setPlan('max');
    
    // Atualiza o círculo calórico inicial para os 25% da imagem (750 consumidas de 2200 totais)
    setProgress(34); // (750 / 2200) * 100 ~ 34%
});

// FUNÇÃO PARA MUDAR OS SLIDES
function changeSlide(index) {
    currentSlideIndex = index;
    renderSlide(index);
}

function renderSlide(index) {
    const slide = slidesData[index];
    const slideContainer = document.querySelector(".news-slider-wrapper");
    const dots = document.querySelectorAll(".slider-dots .dot");
    
    if(!slideContainer) return;

    slideContainer.innerHTML = `
        <div class="news-slide active">
            <div class="slide-content">
                <span class="news-tag">${slide.tag}</span>
                <h3>${slide.title}</h3>
                <p>${slide.desc}</p>
                <button class="btn-slider-action">${slide.btnText}</button>
            </div>
            <div class="slide-img ${slide.bgClass}"></div>
        </div>
    `;

    dots.forEach((dot, idx) => {
        if(idx === index) dot.classList.add("active");
        else dot.classList.remove("active");
    });
}

// CONTROLE DO GRÁFICO CIRCULAR DE CALORIAS
function setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    if(!circle) return;
    
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// CONTROLADOR DINÂMICO DE REGRAS DE PLANOS (Digital, MAX e SUPER)
function setPlan(planName) {
    const body = document.body;
    const label = document.getElementById("currentPlanLabel");
    const slaBadge = document.getElementById("currentSlaBadge");
    
    // Remover classes antigas
    body.classList.remove("user-plan-digital", "user-plan-max", "user-plan-super");
    
    // Elementos com travas
    const cardIaCoach = document.getElementById("cardIaCoach");
    const cardReceitas = document.getElementById("cardReceitas");
    const cardPersonal = document.getElementById("cardPersonal");
    const btnPersonalAction = document.getElementById("btnPersonalAction");

    if(planName === 'digital') {
        body.classList.add("user-plan-digital");
        label.textContent = "Plano Digital";
        label.className = "plan-badge digital-tag";
        slaBadge.innerHTML = "Tempo médio estimado para você: <strong>20 minutos</strong> (Digital)";
        
        // Aplica os overlays de bloqueio visual
        if(cardIaCoach) cardIaCoach.classList.add("locked");
        if(cardReceitas) cardReceitas.classList.add("locked");
        if(cardPersonal) cardPersonal.classList.add("locked");
        if(btnPersonalAction) btnPersonalAction.disabled = true;

    } else if(planName === 'max') {
        body.classList.add("user-plan-max");
        label.textContent = "Plano MAX";
        label.className = "plan-badge max-tag";
        slaBadge.innerHTML = "Tempo médio estimado para você: <strong>5 minutos</strong> (MAX)";
        
        // Libera receitas e personal, mantém IA bloqueada
        if(cardIaCoach) cardIaCoach.classList.add("locked");
        if(cardReceitas) cardReceitas.classList.remove("locked");
        if(cardPersonal) cardPersonal.classList.remove("locked");
        if(btnPersonalAction) btnPersonalAction.disabled = false;

    } else if(planName === 'super') {
        body.classList.add("user-plan-super");
        label.textContent = "Plano SUPER";
        label.className = "plan-badge super-tag";
        slaBadge.innerHTML = "Tempo médio estimado para você: <strong>2 minutos</strong> (SUPER 🔥)";
        
        // Libera TUDO
        if(cardIaCoach) cardIaCoach.classList.remove("locked");
        if(cardReceitas) cardReceitas.classList.remove("locked");
        if(cardPersonal) cardPersonal.classList.remove("locked");
        if(btnPersonalAction) btnPersonalAction.disabled = false;
    }
}

// LOGICA DO MODAL DE RECEITAS (Quantidades detalhadas ao clicar)
function openRecipe(key) {
    // Só permite abrir se o plano não estiver bloqueado para receitas (MAX ou SUPER)
    if(document.body.classList.contains("user-plan-digital")) {
        alert("🔒 Esta receita detalhada é exclusiva para membros MAX e SUPER. Faça seu upgrade!");
        return;
    }

    const recipe = receitasData[key];
    const modal = document.getElementById("recipeModal");
    const content = document.getElementById("recipeModalContent");

    if(!recipe || !modal || !content) return;

    let ingredientsHtml = "";
    recipe.ingredients.forEach(ing => {
        ingredientsHtml += `<li>⚖️ ${ing}</li>`;
    });

    let prepHtml = "";
    recipe.prep.forEach((step, index) => {
        prepHtml += `<li><strong>${index + 1}.</strong> ${step}</li>`;
    });

    content.innerHTML = `
        <div class="recipe-modal-header">
            <h2>${recipe.title}</h2>
            <div class="modal-macro-strip">
                <span class="macro-badge-modal kcal">🔥 ${recipe.kcal}</span>
                <span class="macro-badge-modal prot">🥩 ${recipe.protein} Prot</span>
                <span class="macro-badge-modal carb">🍞 ${recipe.carbs} Carbo</span>
                <span class="macro-badge-modal fat">🥑 ${recipe.fats} Gord</span>
            </div>
        </div>
        <div class="recipe-modal-body">
            <h3>Quantidades Exatas para Comer/Adicionar:</h3>
            <ul class="modal-ingredients-list">
                ${ingredientsHtml}
            </ul>
            <hr class="modal-divider">
            <h3>Modo de Preparo Passo a Passo:</h3>
            <ol class="modal-prep-list">
                ${prepHtml}
            </ol>
        </div>
    `;

    modal.classList.add("active");
}

function closeRecipeModal() {
    const modal = document.getElementById("recipeModal");
    if(modal) modal.classList.remove("active");
}
