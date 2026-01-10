// Define progresso da página 4 (~90%)
function definirProgresso(porcentagem) {
  const barra = document.getElementById("barraProgresso");
  if (barra) barra.style.width = porcentagem + "%";
}

// Inicia progresso
definirProgresso(88);

// Simula carregamento de 10s
setTimeout(() => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("resumo").classList.remove("hidden");
  carregarResumo();
}, 10000);

// Dados simulados (depois conecta no localStorage)
document.addEventListener("DOMContentLoaded", () => {

  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};
  const objetivoUsuario = localStorage.getItem("objetivoSelecionado") || "";
  const dietaSelecionada = JSON.parse(localStorage.getItem("dietaSelecionada")) || {};

  // ===== NOME =====
  const nomeSpan = document.getElementById("nomeUsuario");
  if (nomeSpan && dadosUsuario.nome) {
    nomeSpan.innerText = dadosUsuario.nome;
  }

  // ===== DADOS =====
  const dadosDiv = document.getElementById("dadosResumo");
  if (dadosDiv) {
    dadosDiv.innerHTML = `
      <p><strong>Idade:</strong> ${dadosUsuario.idade} anos</p>
      <p><strong>Peso:</strong> ${dadosUsuario.peso} kg</p>
      <p><strong>Altura:</strong> ${dadosUsuario.altura} cm</p>
    `;
  }

  // === OBJETIVO ===
  const objetivoEl = document.getElementById("objetivoUsuario");
  if (objetivoEl) {
    objetivoEl.textContent = objetivo;
  }

    // ===== ALIMENTOS =====
  const alimentosDiv = document.getElementById("alimentosResumo");
  if (alimentosDiv) {
    let html = "";

    Object.keys(dietaSelecionada).forEach(refeicao => {
      if (dietaSelecionada[refeicao].length > 0) {
        html += `<p><strong>${refeicao}:</strong></p><ul>`;
        dietaSelecionada[refeicao].forEach(item => {
          html += `<li>${item}</li>`; // item É STRING
        });
        html += `</ul>`;
      }
    });

    alimentosDiv.innerHTML = html || "<p>Nenhum alimento selecionado.</p>";
  }

});
// Redireciona para planos
function irParaPlanos() {
  window.location.href = "planos.html";
}
