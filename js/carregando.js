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
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const objetivo = localStorage.getItem("objetivoSelecionado");
  const dieta = JSON.parse(localStorage.getItem("dietaSelecionada"));

  // Segurança básica
  if (!dadosUsuario || !objetivo || !dieta) {
    console.error("Dados incompletos no localStorage");
    return;
  }

  // === DADOS DO USUÁRIO ===
  const dadosEl = document.getElementById("dadosUsuario");
  if (dadosEl) {
    dadosEl.innerHTML = `
      Peso: ${dadosUsuario.peso}kg | 
      Altura: ${dadosUsuario.altura}m | 
      Idade: ${dadosUsuario.idade}
    `;
  }

  // === OBJETIVO ===
  const objetivoEl = document.getElementById("objetivoUsuario");
  if (objetivoEl) {
    objetivoEl.textContent = objetivo;
  }

  // === LISTA DE ALIMENTOS ===
  const listaEl = document.getElementById("listaAlimentos");
  if (listaEl) {
    listaEl.innerHTML = "";

    Object.values(dieta).forEach(refeicao => {
      refeicao.forEach(alimento => {
        const li = document.createElement("li");
        li.textContent = alimento;
        listaEl.appendChild(li);
      });
    });
  }
});

// Redireciona para planos
function irParaPlanos() {
  window.location.href = "planos.html";
}
