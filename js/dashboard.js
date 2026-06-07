// ============================
// MENU PERFIL
// ============================
function toggleMenu() {
    document.getElementById("menuPerfil").classList.toggle("ativo");
}

document.addEventListener("click", function(e){
    const menu = document.getElementById("menuPerfil");
    const avatar = document.querySelector(".avatar");

    if(menu && avatar){
        if(!menu.contains(e.target) && !avatar.contains(e.target)){
            menu.classList.remove("ativo");
        }
    }
});

// ============================
// RECEITA
// ============================
function abrirReceita() {
    document.getElementById("modalReceita").style.display = "flex";
}

function fecharReceita() {
    document.getElementById("modalReceita").style.display = "none";
}

// ============================
// CONSULTA NUTRICIONAL
// ============================
function agendarConsulta() {
    alert("Redirecionando para agendamento da consulta nutricional.");
}

// ============================
// PERSONAL MAX
// ============================
function gerarTreino() {

    const plano = localStorage.getItem("plano") || "DIGITAL";

    if (
        plano !== "MAX" &&
        plano !== "SUPER"
    ) {
        alert("Função disponível apenas para assinantes MAX ou SUPER.");
        return;
    }

    alert("Treino personalizado gerado com sucesso!");
}

// ============================
// CHAT SUPORTE
// ============================
function abrirSuporte() {

    const plano = localStorage.getItem("plano") || "DIGITAL";

    if(plano === "SUPER"){
        alert("Tempo médio de atendimento: 2 minutos.");
    }
    else if(plano === "MAX"){
        alert("Tempo médio de atendimento: 5 minutos.");
    }
    else{
        alert("Tempo médio de atendimento: 20 minutos.");
    }
}

// ============================
// MODO ESCURO / CLARO
// ============================
function alternarTema(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        localStorage.setItem("tema","light");
    }else{
        localStorage.setItem("tema","dark");
    }
}

window.addEventListener("load", ()=>{

    const tema = localStorage.getItem("tema");

    if(tema === "light"){
        document.body.classList.add("light");
    }

});

// ============================
// ANIMAÇÃO IA
// ============================
const textosIA = [
    "Analisando dieta...",
    "Calculando calorias...",
    "Comparando evolução...",
    "Ajustando macros...",
    "Gerando recomendações..."
];

let indiceIA = 0;

setInterval(()=>{

    const elemento = document.getElementById("textoIA");

    if(elemento){

        indiceIA++;

        if(indiceIA >= textosIA.length){
            indiceIA = 0;
        }

        elemento.innerText = textosIA[indiceIA];
    }

},2500);

// ============================
// BOTÕES PREMIUM
// ============================
document.addEventListener("DOMContentLoaded", ()=>{

    const consultaBtn =
        document.getElementById("btnConsulta");

    if(consultaBtn){
        consultaBtn.addEventListener(
            "click",
            agendarConsulta
        );
    }

    const treinoBtn =
        document.getElementById("btnTreino");

    if(treinoBtn){
        treinoBtn.addEventListener(
            "click",
            gerarTreino
        );
    }

});

// ============================
// FECHAR MODAL AO CLICAR FORA
// ============================
window.onclick = function(event){

    const modal =
        document.getElementById("modalReceita");

    if(event.target === modal){
        modal.style.display = "none";
    }

};
