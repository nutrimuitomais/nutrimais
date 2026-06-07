const usuario =
JSON.parse(
localStorage.getItem("nutri_usuario")
);

if(!usuario){
window.location.href = "login.html";
}

/* DADOS */

document.getElementById("nomeUsuario").innerText =
usuario.email || "Paciente";

/* MENU */

function toggleMenu(){
document
.getElementById("menuPerfil")
.classList.toggle("ativo");
}

/* PLANO */

const badge =
document.getElementById("badgePlano");

if(badge){

if(usuario.plano?.includes("SUPER")){
badge.innerText = "PLANO SUPER";
badge.className =
"badge-plano plano-super";
}
else if(usuario.plano?.includes("MAX")){
badge.innerText = "PLANO MAX";
badge.className =
"badge-plano plano-max";
}
else{
badge.innerText = "PLANO DIGITAL";
badge.className =
"badge-plano";
}

}

/* DIETA */

const refeicoes =
document.querySelectorAll(".refeicao p");

const dietaBase = [
"2 ovos + banana + café sem açúcar",
"Iogurte + castanhas",
"Arroz + frango + salada",
"Fruta + whey protein",
"Peixe + legumes"
];

refeicoes.forEach((item,index)=>{
item.innerText = dietaBase[index];
});

/* FUNÇÕES PREMIUM */

const treinoCard =
document.getElementById("treinoCard");

if(treinoCard){

if(
usuario.plano?.includes("MAX") ||
usuario.plano?.includes("SUPER")
){
treinoCard.style.display = "block";
}
else{
treinoCard.style.display = "none";
}

}

const superCard =
document.getElementById("superCard");

if(superCard){

if(
usuario.plano?.includes("SUPER")
){
superCard.style.display = "block";
}
else{
superCard.style.display = "none";
}

}
