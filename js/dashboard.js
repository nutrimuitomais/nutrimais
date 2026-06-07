// 1. VERIFICAÇÃO DE SESSÃO DO USUÁRIO
const usuario = JSON.parse(localStorage.getItem("nutri_usuario")) || {
    email: "Paciente Teste",
    plano: "Digital"
};

// Se não quiser usar o fallback de teste acima e preferir forçar redirecionamento do login antigo:
// if(!usuario) { window.location.href = "login.html"; }

// Aplicando nome do usuário
document.getElementById("nomeUsuario").innerText = usuario.email.split('@')[0] || "Paciente";

// 2. CONFIGURAÇÃO E TRAVA DE PLANOS (MANTENDO SUA LÓGICA ORIGINAL ATUALIZADA)
const badgePlano = document.getElementById("badgePlano");
const plano = (usuario.plano || "Digital").toUpperCase();

if (plano.includes("SUPER")) {
    badgePlano.innerText = "Plano Super";
    badgePlano.className = "badge plano-super";
} else if (plano.includes("MAX")) {
    badgePlano.innerText = "Plano Max";
    badgePlano.className = "badge plano-max";
} else {
    badgePlano.innerText = "Plano Digital";
    badgePlano.className = "badge plano-digital";
}

// Bloqueios Visuais de Recursos com base no plano contratado
document.querySelectorAll(".somente-max").forEach(item => {
    if (!plano.includes("MAX") && !plano.includes("SUPER")) {
        item.style.opacity = ".4";
        item.style.pointerEvents = "none";
        item.innerHTML += "<p class='lock-message'>🔒 Disponível apenas no Plano MAX</p>";
    }
});

document.querySelectorAll(".somente-super").forEach(item => {
    if (!plano.includes("SUPER")) {
        item.style.opacity = ".4";
        item.style.pointerEvents = "none";
        item.innerHTML += "<p class='lock-message'>🔒 Disponível apenas no Plano SUPER</p>";
    }
});

// 3. EVOLUÇÃO DE PESO CONSTANTES
const pesoInicial = 92;
const pesoAtual = 88;
const pesoMeta = 84;

const totalPerder = pesoInicial - pesoMeta;
const perdido = pesoInicial - pesoAtual;
const progressoPeso = (perdido / totalPerder) * 100;

document.getElementById("percentualPeso").innerText = Math.round(progressoPeso) + "% concluído";
document.getElementById("vPesoInicial").innerText = pesoInicial + "kg";
document.getElementById("vPesoAtual").innerText = pesoAtual + "kg";
document.getElementById("vPesoMeta").innerText = pesoMeta + "kg";


// 4. ESTRUTURA DE CONTAGEM DINÂMICA (METAS DE MACROS)
const metas Dieta = {
    calorias: 2200,
    carbo: 220,
    proteina: 150,
    gordura: 60
};

// Base de dados das refeições do dia
const refeicoesDados = [
    { id: 0, nome: "Café da Manhã", desc: "Ovos mexidos + banana + café", kcal: 340, carbo: 30, prot: 25, gord: 12, concluida: true },
    { id: 1, nome: "Lanche da Manhã", desc: "Iogurte natural + castanhas", kcal: 210, carbo: 15, prot: 10, gord: 11, concluida: true },
    { id: 2, nome: "Almoço", desc: "Arroz, feijão, frango e salada", kcal: 650, carbo: 75, prot: 50, gord: 14, concluida: true },
    { id: 3, nome: "Lanche da Tarde", desc: "Sanduíche integral + fruta", kcal: 260, carbo: 35, prot: 15, gord: 5, concluida: false },
    { id: 4, nome: "Jantar", desc: "Peixe grelhado + legumes", kcal: 300, carbo: 25, prot: 35, gord: 3, concluida: false }
];

// 5. FUNÇÃO PROCESSADORA DOS ENGAJAMENTOS DE CHECK-IN
function calcularEAtualizarDashboard() {
    let acumulado = { kcal: 0, carbo: 0, prot: 0, gord: 0 };

    // Soma apenas o que o paciente marcou o check-in no dia
    refeicoesDados.forEach(ref => {
        if (ref.concluida) {
            acumulado.kcal += ref.kcal;
            acumulado.carbo += ref.carbo;
            acumulado.prot += ref.prot;
            acumulado.gord += ref.gord;
        }
    });

    // Atualiza os textos numéricos na tela
    document.getElementById("txtCaloriasConsumidas").innerText = acumulado.kcal;
    document.getElementById("txtMetaCalorias").innerText = `de ${metasDieta.calorias} kcal`;
    
    document.getElementById("txtCarbo").innerText = `${acumulado.carbo}g / ${metasDieta.carbo}g`;
    document.getElementById("txtProteina").innerText = `${acumulado.prot}g / ${metasDieta.proteina}g`;
    document.getElementById("txtGordura").innerText = `${acumulado.gord}g / ${metasDieta.gordura}g`;

    // Atualiza o tamanho físico das barras de progresso (porcentagem)
    document.getElementById("barraCarbo").style.width = Math.min((acumulado.carbo / metasDieta.carbo) * 100, 100) + "%";
    document.getElementById("barraProteina").style.width = Math.min((acumulado.prot / metasDieta.proteina) * 100, 100) + "%";
    document.getElementById("barraGordura").style.width = Math.min((acumulado.gord / metasDieta.gordura) * 100, 100) + "%";

    // Atualiza a borda cônica do círculo calórico principal
    const pctCalorias = Math.min((acumulado.kcal / metasDieta.calorias) * 100, 100);
    document.getElementById("circuloCalorico").style.background = `conic-gradient(#10b981 ${pctCalorias}%, #f1f5f9 ${pctCalorias}% 100%)`;
}

// Alternar estado de conclusão da refeição (Check-in interativo)
function alternarRefeicao(id) {
    refeicoesDados[id].concluida = !refeicoesDados[id].concluida;
    renderizarListaRefeicoes();
    calcularEAtualizarDashboard();
}

// Renderiza o HTML das refeições injetando os eventos de clique
function renderizarListaRefeicoes() {
    const container = document.getElementById("listaRefeicoes");
    container.innerHTML = "";

    refeicoesDados.forEach(ref => {
        const item = document.createElement("div");
        item.className = `refeicao-item ${ref.concluida ? 'concluida' : ''}`;
        item.innerHTML = `
            <div class="ref-left">
                <div class="btn-check" onclick="alternarRefeicao(${ref.id})">
                    ${ref.concluida ? '<i class="fa-solid fa-check" style="font-size:0.7rem;"></i>' : ''}
                </div>
                <div class="ref-details">
                    <h4>${ref.nome}</h4>
                    <p>${ref.desc}</p>
                </div>
            </div>
            <div class="ref-right">
                <span class="ref-kcal">${ref.kcal} Kcal</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// 6. INICIALIZADOR DO GRÁFICO (CHART.JS - DESIGN ESTILO CURVA NEON DA FOTO 1)
const ctx = document.getElementById('activityChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        datasets: [{
            data: [420, 510, 490, 625, 560, 410, 480],
            borderColor: '#a3e9df', 
            borderWidth: 3,
            tension: 0.4, 
            pointRadius: 4,
            pointBackgroundColor: '#192024',
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 10 } } },
            y: { display: false }
        }
    }
});

// Ação de Logout
function sair() {
    localStorage.removeItem("nutri_usuario");
    window.location.href = "login.html";
}

// Execução inicial ao abrir a página
renderizarListaRefeicoes();
calcularEAtualizarDashboard();
