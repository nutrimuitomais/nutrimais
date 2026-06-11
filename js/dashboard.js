// js/dashboard.js

// 1. Definição da Meta Diária (Anamnese)
const GOALS = {
    calorias: 2800,
    proteina: 180,
    gordura: 70,
    carbo: 360
};

// 2. Variáveis de estado atual
let current = {
    calorias: 0,
    proteina: 0,
    gordura: 0,
    carbo: 0
};

// 3. Função principal para atualizar as barras e textos
function updateDashboard() {
    // Atualiza Textos
    document.getElementById('cal-value').innerText = current.calorias;
    document.getElementById('pro-value').innerText = current.proteina;
    document.getElementById('fat-value').innerText = current.gordura;
    document.getElementById('car-value').innerText = current.carbo;

    // Calcula Porcentagens (limitado a 100%)
    const pctCal = Math.min(Math.round((current.calorias / GOALS.calorias) * 100), 100);
    const pctPro = Math.min(Math.round((current.proteina / GOALS.proteina) * 100), 100);
    const pctFat = Math.min(Math.round((current.gordura / GOALS.gordura) * 100), 100);
    const pctCar = Math.min(Math.round((current.carbo / GOALS.carbo) * 100), 100);

    // Atualiza Textos de Porcentagem
    document.getElementById('cal-percent').innerText = `${pctCal}%`;
    document.getElementById('pro-percent').innerText = `${pctPro}%`;
    document.getElementById('fat-percent').innerText = `${pctFat}%`;
    document.getElementById('car-percent').innerText = `${pctCar}%`;

    // Atualiza Gráficos (Conic Gradients)
    document.getElementById('cal-chart').style.background = `conic-gradient(#f97316 ${pctCal}%, rgba(255,255,255,0.1) 0)`;
    document.getElementById('pro-circle').style.background = `conic-gradient(#3b82f6 ${pctPro}%, rgba(255,255,255,0.1) 0)`;
    document.getElementById('fat-circle').style.background = `conic-gradient(#f97316 ${pctFat}%, rgba(255,255,255,0.1) 0)`;
    document.getElementById('car-circle').style.background = `conic-gradient(#22c55e ${pctCar}%, rgba(255,255,255,0.1) 0)`;

    // Verifica se completou a meta do dia
    if (current.calorias >= GOALS.calorias && pctCal === 100) {
        // Pequeno delay para a animação do gráfico terminar antes do modal abrir
        setTimeout(() => {
            document.getElementById('congratsModal').classList.remove('hidden');
        }, 500);
    }
}

// 4. Lógica dos Checkboxes das Refeições
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.meal-check');

    checkboxes.forEach(box => {
        box.addEventListener('change', function() {
            // Pega os valores do HTML (data-attributes)
            const cal = parseInt(this.getAttribute('data-cal'));
            const pro = parseInt(this.getAttribute('data-pro'));
            const fat = parseInt(this.getAttribute('data-fat'));
            const car = parseInt(this.getAttribute('data-car'));

            // Estiliza a div pai caso esteja checada
            const parentItem = this.closest('.meal-list-item');

            if (this.checked) {
                current.calorias += cal;
                current.proteina += pro;
                current.gordura += fat;
                current.carbo += car;
                parentItem.classList.add('checked');
            } else {
                current.calorias -= cal;
                current.proteina -= pro;
                current.gordura -= fat;
                current.carbo -= car;
                parentItem.classList.remove('checked');
            }

            updateDashboard();
        });
    });

    // Fecha modais ao clicar no fundo
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Interatividade Menu
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// 5. Funções de Controle dos Modais
function openRecipe() {
    document.getElementById('recipeModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeRecipe() {
    document.getElementById('recipeModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function closeCongrats() {
    document.getElementById('congratsModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
