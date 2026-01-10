// ===== PROGRESSO =====
const barra = document.getElementById("barraProgresso");
if (barra) barra.style.width = "88%";

// ===== ELEMENTOS =====
const loading = document.getElementById("loading");
const resumo = document.getElementById("resumo");

const nomeSpan = document.getElementById("nomeUsuario");
const dadosDiv = document.getElementById("dadosResumo");
const alimentosDiv = document.getElementById("alimentosResumo");
const objetivoDiv = document.getElementById("objetivoResumo");

// ===== DADOS =====
const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
const dietaSelecionada = JSON.parse(localStorage.getItem("dietaSelecionada"));
const objetivoSelecionado = localStorage.getItem("objetivoSelecionado");

// ===== SEGURANÇA =====
if (!dadosUsuario || !dietaSelecionada) {
  console.error("Dados ausentes no localStorage");
}

// ===== LOADING =====
setTimeout(() => {
  loading.style.display = "none";
  resumo.classList.remove("hidden");

  // ===== NOME =====
  if (nomeSpan) {
    nomeSpan.textContent = dadosUsuario.nome || "";
  }

  // ===== DADOS EM LINHA =====
  if (dadosDiv) {
    dadosDiv.innerHTML = `
      ${dadosUsuario.idade} anos | 
      ${dadosUsuario.peso}kg | 
      ${dadosUsuario.altura}cm
    `;
  }

  // ===== OBJETIVO =====
  if (objetivoDiv && objetivoSelecionado) {
    objetivoDiv.textContent = objetivoSelecionado;
  }

  // ===== ALIMENTOS (TUDO JUNTO) =====
  let alimentos = [];

  Object.values(dietaSelecionada).forEach(lista => {
    if (Array.isArray(lista)) {
      lista.forEach(item => alimentos.push(item));
    }
  });

  alimentosDiv.innerHTML = alimentos.length
    ? `<ul>${alimentos.map(a => `<li>${a}</li>`).join("")}</ul>`
    : "<p>Nenhum alimento selecionado.</p>";

}, 1800);

// ===== BOTÃO =====
function irParaPlanos() {
  window.location.href = "planos.html";
}
