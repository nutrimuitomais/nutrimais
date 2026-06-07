// =========================
// NUTRI+ DASHBOARD
// =========================

const usuario = JSON.parse(
  localStorage.getItem("nutri_usuario")
) || {
  email: "paciente@nutri.com",
  plano: "Digital"
};

const plano = usuario.plano.toUpperCase();

// NOME
const nome = usuario.email.split("@")[0];

document.querySelectorAll(".nome-usuario").forEach(el=>{
  el.innerText = nome;
});

// BADGE PLANO
const badge = document.getElementById("badgePlano");

if(plano.includes("SUPER")){
  badge.innerHTML = "👑 SUPER";
  badge.className = "badge badge-super";
}
else if(plano.includes("MAX")){
  badge.innerHTML = "🥈 MAX";
  badge.className = "badge badge-max";
}
else{
  badge.innerHTML = "🌱 DIGITAL";
  badge.className = "badge badge-digital";
}

// =========================
// MENU PERFIL
// =========================

function toggleMenu(){
  document
  .getElementById("menuPerfil")
  .classList
  .toggle("ativo");
}

window.onclick = function(e){

  if(
    !e.target.closest(".perfil-area")
  ){
    const menu =
    document.getElementById(
      "menuPerfil"
    );

    if(menu){
      menu.classList.remove("ativo");
    }
  }

}

// =========================
// BLOQUEIOS PREMIUM
// =========================

document
.querySelectorAll(".max-only")
.forEach(card=>{

  if(
    !plano.includes("MAX") &&
    !plano.includes("SUPER")
  ){

    card.classList.add("bloqueado");

  }

});

document
.querySelectorAll(".super-only")
.forEach(card=>{

  if(
    !plano.includes("SUPER")
  ){

    card.classList.add("bloqueado");

  }

});

// =========================
// CALORIAS
// =========================

const metaCalorias = 2200;
const caloriasConsumidas = 1760;

const porcentagemCalorias =
(caloriasConsumidas/metaCalorias)*100;

const circulo =
document.getElementById(
"circuloCalorias"
);

if(circulo){

  circulo.style.background =
  `conic-gradient(
    #00f7ff ${porcentagemCalorias}%,
    rgba(255,255,255,.08)
    ${porcentagemCalorias}%
  )`;

}

const txtCalorias =
document.getElementById(
"txtCalorias"
);

if(txtCalorias){

txtCalorias.innerHTML =
`${caloriasConsumidas}
<span>de ${metaCalorias}</span>`;

}

// =========================
// MACROS
// =========================

function atualizarMacro(
barra,
texto,
atual,
meta
){

const porcentagem =
(atual/meta)*100;

document
.getElementById(barra)
.style.width =
porcentagem+"%";

document
.getElementById(texto)
.innerText =
`${atual}g / ${meta}g`;

}

atualizarMacro(
"barraProteina",
"txtProteina",
120,
150
);

atualizarMacro(
"barraCarbo",
"txtCarbo",
180,
220
);

atualizarMacro(
"barraGordura",
"txtGordura",
45,
60
);

// =========================
// PROGRESSO PESO
// =========================

const pesoInicial = 92;
const pesoAtual = 88;
const pesoMeta = 84;

const total =
pesoInicial-pesoMeta;

const perdido =
pesoInicial-pesoAtual;

const progresso =
Math.round(
(perdido/total)*100
);

const barraPeso =
document.getElementById(
"barraPeso"
);

if(barraPeso){

barraPeso.style.width =
progresso+"%";

}

const txtPeso =
document.getElementById(
"txtProgressoPeso"
);

if(txtPeso){

txtPeso.innerText =
`${progresso}%`;

}

// =========================
// RECEITA
// =========================

function abrirReceita(){

const texto = `
OMELETE FIT

✓ 3 ovos

✓ 50g queijo minas

✓ 30g aveia

✓ 1 banana

Macronutrientes:

290 kcal

26g proteína

12g carboidrato

15g gordura
`;

alert(texto);

}

// =========================
// CONSULTA
// =========================

function agendarConsulta(){

alert(
"Redirecionando para agendamento da consulta nutricional."
);

}

// =========================
// PERSONAL
// =========================

function agendarPersonal(){

if(
!plano.includes("MAX") &&
!plano.includes("SUPER")
){

alert(
"Função disponível apenas para assinantes MAX ou SUPER."
);

return;

}

alert(
"Redirecionando para Personal Trainer."
);

}

// =========================
// CHAT SUPORTE
// =========================

function abrirSuporte(){

if(plano.includes("SUPER")){

alert(
"Tempo médio de resposta: 2 minutos."
);

}
else if(plano.includes("MAX")){

alert(
"Tempo médio de resposta: 5 minutos."
);

}
else{

alert(
"Tempo médio de resposta: 20 minutos."
);

}

}

// =========================
// SAIR
// =========================

function sair(){

localStorage.removeItem(
"nutri_usuario"
);

window.location.href =
"login.html";

}
