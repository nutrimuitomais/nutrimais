const usuario =
JSON.parse(
localStorage.getItem("nutri_usuario")
);

if(!usuario){
window.location.href =
"login.html";
}

/* NOME */

document.getElementById(
"nomeUsuario"
).innerText =
usuario.email || "Paciente";

/* PLANO */

const badge =
document.getElementById(
"badgePlano"
);

const plano =
(usuario.plano || "Digital")
.toUpperCase();

if(plano.includes("SUPER")){

badge.innerText =
"Plano Super";

badge.classList.add(
"plano-super"
);

}
else if(plano.includes("MAX")){

badge.innerText =
"Plano Max";

badge.classList.add(
"plano-max"
);

}
else{

badge.innerText =
"Plano Digital";

badge.classList.add(
"plano-digital"
);

}

/* MENU PERFIL */

function toggleMenu(){

document
.getElementById(
"menuPerfil"
)
.classList.toggle("ativo");

}

/* CALORIAS */

const metaCalorias = 2200;
const caloriasConsumidas = 1760;

const percentual =
(caloriasConsumidas /
metaCalorias) * 100;

const barra =
document.getElementById(
"barraCalorias"
);

if(barra){
barra.style.width =
percentual + "%";
}

/* DIETA */

const refeicoes =
document.querySelectorAll(
".refeicao p"
);

if(refeicoes.length >= 5){

refeicoes[0].innerText =
"Ovos mexidos + banana + café";

refeicoes[1].innerText =
"Iogurte natural + castanhas";

refeicoes[2].innerText =
"Arroz, feijão, frango e salada";

refeicoes[3].innerText =
"Sanduíche integral + fruta";

refeicoes[4].innerText =
"Peixe grelhado + legumes";

}

/* BLOQUEIOS MAX */

document
.querySelectorAll(
".somente-max"
)
.forEach(item => {

if(!plano.includes("MAX")
&& !plano.includes("SUPER")){

item.style.opacity = ".5";

item.innerHTML +=
"<br><br>🔒 Disponível apenas no Plano MAX";

}

});

/* BLOQUEIOS SUPER */

document
.querySelectorAll(
".somente-super"
)
.forEach(item => {

if(!plano.includes("SUPER")){

item.style.opacity = ".5";

item.innerHTML +=
"<br><br>🔒 Disponível apenas no Plano SUPER";

}

});

/* SAIR */

function sair(){

localStorage.removeItem(
"nutri_usuario"
);

window.location.href =
"login.html";

}
