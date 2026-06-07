function criarConta() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nome || !email || !senha || !confirmarSenha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const usuario = {
    nome,
    email,
    senha
  };

  localStorage.setItem("nutri_usuario", JSON.stringify(usuario));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}
