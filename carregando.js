document.addEventListener("DOMContentLoaded", () => {

  // ===== BARRA DE PROGRESSO (VISUAL NÃO ALTERADO) =====
  const barra = document.getElementById("barraProgresso");
  if (barra) barra.style.width = "85%";

  // ===== ANIMAÇÃO DOS PONTOS =====
  const dots = document.getElementById("dots");
  let count = 0;
  setInterval(() => {
    count = (count + 1) % 4;
    if (dots) dots.textContent = ".".repeat(count);
  }, 500);

  // ===== SIMULA CARREGAMENTO =====
  setTimeout(() => {
    const loading = document.getElementById("loading");
    const resumo = document.getElementById("resumo");

    if (loading) loading.style.display = "none";
    if (resumo) resumo.classList.remove("hidden");

    carregarResumo();
  }, 1000); // pode manter 10s se quiser
});

function carregarResumo() {

  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};
  const objetivoUsuario = localStorage.getItem("objetivoSelecionado") || "";
  const dietaSelecionada = JSON.parse(localStorage.getItem("dietaSelecionada")) || {};

  // ===== DADOS (NOME ACIMA DO PESO) =====
  const dadosEl = document.getElementById("dadosResumo");
  if (dadosEl) {
    dadosEl.innerHTML = `
      ${dadosUsuario.nome ? `<strong>${dadosUsuario.nome}</strong><br>` : ""}
      Peso: ${dadosUsuario.peso || "-"} |
      Altura: ${dadosUsuario.altura || "-"} |
      Idade: ${dadosUsuario.idade || "-"}
    `;
  }

  // ===== OBJETIVO =====
  const objetivoEl = document.getElementById("objetivoTexto");
  if (objetivoEl) {
    objetivoEl.innerText = objetivoUsuario || "-";
  }

  // ===== ALIMENTOS =====
  const lista = document.getElementById("alimentosResumo");
  if (!lista) return;

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
