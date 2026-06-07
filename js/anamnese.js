const usuario = JSON.parse(
  localStorage.getItem("nutri_usuario")
);

if (!usuario) {
  alert("Faça login para continuar.");
  window.location.href = "login.html";
}
