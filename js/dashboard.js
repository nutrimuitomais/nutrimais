document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. CONFIGURAÇÕES, METAS E BANNER ROTATIVO
    // ==========================================================================
    const META_CALORIAS = 2200;
    const CIRCUNFERENCIA_MAXIMA = 2 * Math.PI * 34; // aprox. 213.63

    // Dados dos 3 Banners Rotativos (Compactos)
    const bannersConteudo = [
        {
            tag: "UPGRADE RECOMENDADO",
            titulo: "Planilhas de Treino de Elite via IA",
            desc: "Ajuste sua hipertrofia na velocidade em que muda seus alimentos.",
            img: "vazio" // Pode ser substituído por caminhos de imagem se preferir
        },
        {
            tag: "NUTRI+ PREMIUM",
            titulo: "Análise Molecular de Anamnese",
            desc: "Descubra quais micronutrientes estão faltando no seu dia a dia.",
            img: "vazio"
        },
        {
            tag: "VIP ACCESS",
            titulo: "Consultas Diretas com Especialistas",
            desc: "Fale com nutricionistas e personals certificados quando quiser.",
            img: "vazio"
        }
    ];
    let bannerAtualIndex = 0;

    const distribuicaoMacros = [
        { prot: 20, carb: 15, fat: 25 },
        { prot: 45, carb: 45, fat: 40 },
        { prot: 15, carb: 15, fat: 10 },
        { prot: 20, carb: 25, fat: 25 }
    ];

    // ==========================================================================
    // 2. SISTEMA DE FOTO PERMANENTE (LOCALSTORAGE)
    // ==========================================================================
    const fileUpload = document.getElementById("file-upload");
    const triggerDesktop = document.getElementById("user-avatar-trigger");
    const triggerMobile = document.getElementById("mobile-avatar-trigger");
    
    const imgDesktop = document.getElementById("user-avatar-desktop");
    const imgMobile = document.getElementById("user-avatar-mobile");

    // Carrega a foto salva se ela existir no navegador do usuário
    const fotoSalva = localStorage.getItem("nutri_user_avatar");
    if (fotoSalva) {
        imgDesktop.src = fotoSalva;
        imgMobile.src = fotoSalva;
    }

    function abrirGaleria(e) {
        e.preventDefault();
        fileUpload.click();
    }

    triggerDesktop.addEventListener("click", abrirGaleria);
    triggerMobile.addEventListener("click", abrirGaleria);

    fileUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const fotoUrl = event.target.result;
                
                // Aplica na tela na hora
                imgDesktop.src = fotoUrl;
                imgMobile.src = fotoUrl;
                
                // Fixa permanentemente por usuário/sessão neste navegador
                localStorage.setItem("nutri_user_avatar", fotoUrl);
            }
            reader.readAsDataURL(file);
        }
    });

    // ==========================================================================
    // 3. LÓGICA DO BANNER ROTATIVO
    // ==========================================================================
    const bTag = document.getElementById("banner-dynamic-tag");
    const bTitulo = document.getElementById("banner-dynamic-title");
    const bDesc = document.getElementById("banner-dynamic-desc");

    function rotacionarBanner() {
        bannerAtualIndex = (bannerAtualIndex + 1) % bannersConteudo.length;
        const dados = bannersConteudo[bannerAtualIndex];
        
        // Efeito suave de transição mudando os textos
        const container = document.querySelector(".banner-text-side");
        container.style.opacity = 0;
        
        setTimeout(() => {
            bTag.textContent = dados.tag;
            bTitulo.textContent = dados.titulo;
            bDesc.textContent = dados.desc;
            container.style.opacity = 1;
        }, 300);
    }
    // Rotaciona automaticamente a cada 5 segundos
    setInterval(rotacionarBanner, 5000);

    // ==========================================================================
    // 4. METAS DO DIÁRIO e PROGRESSOS
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
            if (!card) return;

            const kcal = parseInt(card.getAttribute("data-kcal"), 10);

            if (chk.checked) {
                card.classList.add("concluido");
                kcalConsumidas += kcal;
                
                if(distribuicaoMacros[index]) {
                    pProt += distribuicaoMacros[index].prot;
                    pCarb += distribuicaoMacros[index].carb;
                    pFat += distribuicaoMacros[index].fat;
                }
            } else {
                card.classList.remove("concluido");
            }
        });

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

        atualizarAnel(ringProt, percProt, pProt);
        atualizarAnel(ringCarb, percCarb, pCarb);
        atualizarAnel(ringFat, percFat, pFat);
    }

    function atualizarAnel(anel, texto, valorPorcentagem) {
        const pct = Math.min(valorPorcentagem, 100);
        texto.textContent = `${pct}%`;
        const offset = CIRCUNFERENCIA_MAXIMA - (CIRCUNFERENCIA_MAXIMA * pct) / 100;
        anel.style.strokeDashoffset = offset;
    }

    checkboxes.forEach(chk => chk.addEventListener("change", atualizarDashboard));
    atualizarDashboard();
});
