function fazerLogin(){

  const email =
  document.getElementById("email").value;

  const senha =
  document.getElementById("senha").value;

  const usuario =
  JSON.parse(
    localStorage.getItem("usuarioNutri")
  );

  if(!usuario){
    alert("Nenhuma conta encontrada.");
    return;
  }

  if(
    usuario.email === email &&
    usuario.senha === senha
  ){
    window.location.href =
    "anamnese.html";
  }
  else{
    alert("E-mail ou senha incorretos.");
  }

}

function fazerLogin() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const emailTeste = "viniciuscostacorreia2018";
  const senhaTeste = "978612";

  if (email === emailTeste && senha === senhaTeste) {
    window.location.href = "dashboard.html";
  } else {
    alert("E-mail ou senha inválidos.");
  }
}
