function fazerLogin() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  /* LOGIN DE TESTE */
 if (
  email === "viniciuscostacorreia2018@gmail.com" &&
  senha === "978612"
) {

  localStorage.setItem(
    "nutri_usuario",
    JSON.stringify({
      email: email,
      plano: "MAX Nutri",
      tipoPlano: "Anual",
      objetivo: "Emagrecimento"
    })
  );

  alert("Login realizado com sucesso!");

  window.location.href =
  "dashboard.html";

  return;
}

  /* LOGIN DOS USUÁRIOS CADASTRADOS */
  const usuario = JSON.parse(
    localStorage.getItem("nutri_usuario")
  );

  if (!usuario) {
    alert("Nenhuma conta encontrada.");
    return;
  }

  if (
    usuario.email === email &&
    usuario.senha === senha
  ) {
    window.location.href = "dashboard.html";
  } else {
    alert("E-mail ou senha incorretos.");
  }
}

function loginGoogle() {
  alert("Login Google será ativado quando integrarmos o Google OAuth.");
}
