// PROGRESSO
document.getElementById("barraProgresso").style.width = "90%";

document.addEventListener("DOMContentLoaded", () => {

  const loading = document.getElementById("loading");
  const resumo = document.getElementById("resumo");

  const nomeSpan = document.getElementById("nomeUsuario");
  const linhaDados = document.getElementById("linhaDados");
  const objetivoDiv = document.getElementById("objetivoResumo");
  const alimentosDiv = document.getElementById("alimentosResumo");

  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario")) || {};
  const dietaSelecionada = JSON.parse(localStorage.getItem("dietaSelecionada")) || {};
  const objetivoUsuario = localStorage.getItem("objetivoSelecionado") || "";

  // SIMULA LOADING
  setTimeout(() => {
    loading.style.display = "none";
    resumo.classList.remove("hidden");

    // NOME
    nomeSpan.textContent = dadosUsuario.nome || "Usuário";

    // DADOS EM LINHA
    linhaDados.textContent = `${dadosUsuario.idade} Anos | ${dadosUsuario.peso} kg | ${dadosUsuario.altura} cm`;

    // OBJETIVO EM DESTAQUE
    objetivoDiv.textContent = `Objetivo: ${objetivoUsuario}`;

    // ALIMENTOS (TODOS JUNTOS, SEM CAFÉ / ALMOÇO ETC)
    let alimentos = [];

    Object.values(dietaSelecionada).forEach(lista => {
      lista.forEach(item => alimentos.push(item));
    });

    alimentosDiv.innerHTML = alimentos.length
      ? `<p>${alimentos.join(" • ")}</p>`
      : "<p>Nenhum alimento selecionado.</p>";

  }, 1500);
});

// BOTÃO
function irParaPlanos() {
  window.location.href = "planos.html";
}
