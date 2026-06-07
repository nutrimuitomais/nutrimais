// ================================
// NUTRI+ DASHBOARD JS
// ================================

// MENU PERFIL
function toggleMenu() {
    const menu = document.getElementById("menuPerfil");
    if (menu) {
        menu.classList.toggle("ativo");
    }
}

document.addEventListener("click", function (e) {
    const menu = document.getElementById("menuPerfil");
    const avatar = document.querySelector(".avatar");

    if (
        menu &&
        avatar &&
        !menu.contains(e.target) &&
        !avatar.contains(e.target)
    ) {
        menu.classList.remove("ativo");
    }
});

// MODAL RECEITA
function abrirReceita() {
    const modal = document.getElementById("modalReceita");
    if (modal) {
        modal.style.display = "flex";
    }
}

function fecharReceita() {
    const modal = document.getElementById("modalReceita");
    if (modal) {
        modal.style.display = "none";
    }
}

// FECHAR MODAL CLICANDO FORA
window.addEventListener("click", function (e) {
    const modal = document.getElementById("modalReceita");

    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// CONSULTA
function agendarConsulta() {
    alert("Redirecionando para o agendamento da consulta.");
}

// TREINO
function gerarTreino() {
    alert("Gerando treino personalizado...");
}

// SUPORTE
function abrirSuporte() {
    alert("Abrindo chat de suporte.");
}

// BOTÕES
document.addEventListener("DOMContentLoaded", () => {

    const btnConsulta =
        document.getElementById("btnConsulta");

    if (btnConsulta) {
        btnConsulta.addEventListener(
            "click",
            agendarConsulta
        );
    }

    const btnTreino =
        document.getElementById("btnTreino");

    if (btnTreino) {
        btnTreino.addEventListener(
            "click",
            gerarTreino
        );
    }

});

// IA NUTRI COACH
const mensagensIA = [
    "Analisando dieta...",
    "Calculando calorias...",
    "Comparando evolução...",
    "Ajustando macros...",
    "Gerando recomendações..."
];

let indiceIA = 0;

setInterval(() => {

    const texto =
        document.getElementById("textoIA");

    if (!texto) return;

    indiceIA++;

    if (indiceIA >= mensagensIA.length) {
        indiceIA = 0;
    }

    texto.innerText =
        mensagensIA[indiceIA];

}, 2500);

// TEMA CLARO / ESCURO
const btnTema =
    document.getElementById("btnTema");

if (btnTema) {

    btnTema.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            document.body.classList.toggle(
                "light"
            );

            if (
                document.body.classList.contains(
                    "light"
                )
            ) {
                localStorage.setItem(
                    "tema",
                    "light"
                );
            } else {
                localStorage.setItem(
                    "tema",
                    "dark"
                );
            }
        }
    );
}

// CARREGAR TEMA
window.addEventListener("load", () => {

    const tema =
        localStorage.getItem("tema");

    if (tema === "light") {
        document.body.classList.add(
            "light"
        );
    }

});
