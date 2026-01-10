// ===== PROGRESSO =====
const barra = document.getElementById("barraProgresso");
if (barra) barra.style.width = "88%";

// ===== LOADING =====
setTimeout(() => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("resumo").classList.remove("hidden");
  preencherResumo();
}, 1800);

function preencherResumo() {
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const objetivo = localStorage.getItem("objetivoSelecionado");
  const dieta = JSON.parse(localStorage.getItem("dietaSelecionada"));

  if (!dadosUsuario || !objetivo || !dieta) return;

  // ===== NOME =====
  const nomeSpan = document.getElementById("nomeUsuario");
  if (nomeSpan) nomeSpan.textContent = dadosUsuario.nome || "";

  // ===== LINHA DADOS (1 linha) =====
  const linhaDados = document.getElementById("linhaDados");
  if (linhaDados) {
    linhaDados.textContent =
      `${dadosUsuario.idade} anos | ${dadosUsuario.peso}kg | ${dadosUsuario.altura}cm`;
  }

  // ===== OBJETIVO =====
  const objetivoEl = document.getElementById("objetivoUsuario");
  if (objetivoEl) objetivoEl.textContent = objetivo;

  // ===== ALIMENTOS (TODOS JUNTOS) =====
  const alimentosDiv = document.getElementById("alimentosResumo");
  if (!alimentosDiv) return;

  let todos = [];

  Object.values(dieta).forEach(lista => {
    if (Array.isArray(lista)) {
      lista.forEach(item => todos.push(item));
    }
  });

  alimentosDiv.innerHTML = todos.length
    ? `<ul>${todos.map(i => `<li>${i}</li>`).join("")}</ul>`
    : "<p>Nenhum alimento selecionado.</p>";
}

// ===== BOTÃO =====
function irParaPlanos() {
  window.location.href = "planos.html";
}
