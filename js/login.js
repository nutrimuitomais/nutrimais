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
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (
    email === "viniciuscostacorreia2018@gmail.com" &&
    senha === "978612"
  ) {
    alert("Login realizado com sucesso!");
    window.location.href = "dashboard.html";
  } else {
    alert("E-mail ou senha inválidos.");
  }
}

function loginGoogle() {
  alert("Login Google será ativado quando integrarmos o Google OAuth.");
}
