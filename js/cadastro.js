function criarConta() {

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if(!nome || !email || !senha || !confirmarSenha){
    alert("Preencha todos os campos.");
    return;
  }

  if(senha !== confirmarSenha){
    alert("As senhas não coincidem.");
    return;
  }

  alert("Conta criada com sucesso!");

  window.location.href = "login.html";

}
