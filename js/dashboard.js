const usuario =
JSON.parse(
localStorage.getItem("nutri_usuario")
);

if(!usuario){
  window.location.href =
  "login.html";
}

/* DADOS */

document.getElementById(
"nomeUsuario"
).innerText =
usuario.email || "Paciente";

document.getElementById(
"planoAtual"
).innerText =
usuario.plano || "Plano não encontrado";

document.getElementById(
"objetivoAtual"
).innerText =
usuario.objetivo || "Não definido";

/* MENU PERFIL */

function toggleMenu(){

  document
  .getElementById("menuPerfil")
  .classList
  .toggle("ativo");

}

/* FECHAR MENU AO CLICAR FORA */

document.addEventListener(
"click",
function(e){

const menu =
document.getElementById(
"menuPerfil"
);

const avatar =
document.querySelector(
".avatar"
);

if(
!menu.contains(e.target)
&&
e.target !== avatar
){
menu.classList.remove(
"ativo"
);
}

}
);

/* SAIR */

const links =
document.querySelectorAll(
".menu-perfil a"
);

links.forEach(link=>{

if(
link.innerText.trim() === "Sair"
){

link.addEventListener(
"click",
function(){

localStorage.removeItem(
"acessoLiberado"
);

}

);

}

});
