document.addEventListener("DOMContentLoaded", () => {

  // ===== BARRA DE PROGRESSO =====
  const barra = document.getElementById("barraProgresso");
  if (barra) barra.style.width = "85%";

  // ===== ANIMAÇÃO DOS PONTOS =====
  const dots = document.getElementById("dots");
  let count = 0;
  setInterval(() => {
    count = (count + 1) % 4;
    dots.textContent = ".".repeat(count);
  }, 500);

  // ===== SIMULA CARREGAMENTO =====
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("resumo").classList.remove("hidden");
    carregarResumo();
  }, 10000);
});

function carregarResumo() {

  // ===== TENTA PEGAR DADOS (TODAS AS VARIAÇÕES) =====
  const dadosUsuario =
    JSON.parse(localStorage.getItem("dadosUsuario")) ||
    JSON.parse(localStorage.getItem("dadosFormulario")) ||
    {};

  const objetivoUsuario =
    localStorage.getItem("objetivoSelecionado") ||
    localStorage.getItem("objetivo") ||
    "";

  const dietaSelecionada =
    JSON.parse(localStorage.getItem("dietaSelecionada")) ||
    JSON.parse(localStorage.getItem("alimentosSelecionados")) ||
    {};

  // ===== DADOS =====
  const dadosTexto = `
    Peso: ${dadosUsuario.peso || "-"} |
    Altura: ${dadosUsuario.altura || "-"} |
    Idade: ${dadosUsuario.idade || "-"}
  `;

  document.getElementById("dadosUsuario").innerText = dadosTexto;

  // ===== OBJETIVO =====
  document.getElementById("objetivoUsuario").innerText =
    objetivoUsuario || "-";

  // ===== ALIMENTOS =====
  const lista = document.getElementById("listaAlimentos");
  lista.innerHTML = "";

  let temAlimentos = false;

  Object.values(dietaSelecionada).forEach(refeicao => {
    if (Array.isArray(refeicao)) {
      refeicao.forEach(item => {
        temAlimentos = true;
        const li = document.createElement("li");
        li.innerText = item.nome || item;
        lista.appendChild(li);
      });
    }
  });

  if (!temAlimentos) {
    const li = document.createElement("li");
    li.innerText = "Nenhum alimento selecionado.";
    lista.appendChild(li);
  }
}

function irParaPlanos() {
  window.location.href = "planos.html";
}
