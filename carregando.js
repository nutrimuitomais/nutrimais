document.addEventListener("DOMContentLoaded", () => {

  // BARRA DE PROGRESSO (~85%)
  const barra = document.getElementById("barraProgresso");
  barra.style.width = "85%";

  // ANIMAÇÃO DOS PONTOS
  const dots = document.getElementById("dots");
  let count = 0;

  setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 500);

  // SIMULA CARREGAMENTO (10s)
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("resumo").classList.remove("hidden");

    carregarResumo();

  }, 10000);
});

// RESUMO (mock)
function carregarResumo() {
  document.getElementById("dadosUsuario").innerText =
    "Peso: 80kg | Altura: 1,75m | Idade: 25";

  document.getElementById("objetivoUsuario").innerText =
    "Emagrecimento";

  const alimentos = ["Arroz", "Frango", "Ovos", "Banana"];
  const lista = document.getElementById("listaAlimentos");
  lista.innerHTML = "";

  alimentos.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    lista.appendChild(li);
  });
}

function irParaPlanos() {
  window.location.href = "planos.html";
}
