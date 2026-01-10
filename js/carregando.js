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

  // ===== ELEMENTOS =====
  const loading = document.getElementById("loading");
  const resumo = document.getElementById("resumo");

  const nomeSpan = document.getElementById("nomeUsuario");
  const dadosDiv = document.getElementById("dadosResumo");
  const alimentosDiv = document.getElementById("alimentosResumo");

  // ===== DADOS DO STORAGE =====
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const dietaSelecionada = JSON.parse(localStorage.getItem("dietaSelecionada"));

  console.log("dadosUsuario:", dadosUsuario);
  console.log("dietaSelecionada:", dietaSelecionada);

  // ===== SEGURANÇA =====
  if (!dadosUsuario || !dietaSelecionada) {
    console.error("Dados não encontrados no localStorage");
    return;
  }

  // ===== SIMULA LOADING =====
  setTimeout(() => {
    loading.style.display = "none";
    resumo.classList.remove("hidden");

    // ===== NOME =====
    if (nomeSpan) {
      nomeSpan.textContent = dadosUsuario.nome || "";
    }

    // ===== DADOS =====
    if (dadosDiv) {
      dadosDiv.innerHTML = `
        <p><strong>Idade:</strong> ${dadosUsuario.idade} anos</p>
        <p><strong>Peso:</strong> ${dadosUsuario.peso} kg</p>
        <p><strong>Altura:</strong> ${dadosUsuario.altura} cm</p>
      `;
    }

    // ===== ALIMENTOS =====
    if (alimentosDiv) {
      let html = "";

      Object.keys(dietaSelecionada).forEach(refeicao => {
        if (dietaSelecionada[refeicao].length > 0) {
          html += `<p><strong>${refeicao}:</strong></p><ul>`;
          dietaSelecionada[refeicao].forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += `</ul>`;
        }
      });

      alimentosDiv.innerHTML = html || "<p>Nenhum alimento selecionado.</p>";
    }

  }, 1800); // tempo do loading

});

});
// Redireciona para planos
function irParaPlanos() {
  window.location.href = "planos.html";
}
