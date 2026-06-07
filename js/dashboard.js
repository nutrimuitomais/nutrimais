const usuario = JSON.parse(
  localStorage.getItem("nutri_usuario")
);

if(usuario){
  document.getElementById("boasVindas")
  .innerText = `Bem-vindo, ${usuario.nome}!`;
}

function entrarAnamnese(){
  window.location.href = "anamnese.html";
}

function sair(){
  window.location.href = "login.html";
}
