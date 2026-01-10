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

  const nome = dadosUsuario.nome || "Usuário";
  const idade = Number(dadosUsuario.idade);
  const peso = Number(dadosUsuario.peso);
  const alturaCm = Number(dadosUsuario.altura);
  const alturaM = alturaCm / 100;

  // ===== IMC =====
  const imc = peso / (alturaM * alturaM);

  let classificacao = "";
  if (imc < 18.5) classificacao = "abaixo do peso";
  else if (imc < 25) classificacao = "no peso ideal";
  else classificacao = "acima do peso";

  // ===== CALORIAS (fórmula Mifflin-St Jeor simplificada) =====
  const caloriasBase = (10 * peso) + (6.25 * alturaCm) - (5 * idade) + 5;
  const caloriasIdeais = Math.round(caloriasBase);

  // ===== TEXTO DINÂMICO =====
  nomeSpan.innerHTML = `
    Olá, <strong>${nome}</strong> 👋<br>
    <span class="texto-avaliacao">
      De acordo com suas informações de medidas que nos foram passadas,
      foi observado que você está <strong>${classificacao}</strong>.
      Estamos aqui para lhe auxiliar!
    </span>
  `;

  // ===== DADOS EM LINHA =====
  linhaDados.textContent = `${idade} Anos | ${peso} kg | ${alturaCm} cm`;

  // ===== OBJETIVO EM DESTAQUE =====
  objetivoDiv.innerHTML = `
    <strong>Objetivo:</strong> ${objetivoUsuario}<br>
    <small>Calorias ideais estimadas: ${caloriasIdeais} kcal/dia</small>
  `;

  // ===== ALIMENTOS (SEM SUBDIVISÕES) =====
  let alimentos = [];

  Object.values(dietaSelecionada).forEach(lista => {
    lista.forEach(item => alimentos.push(item));
  });

  alimentosDiv.innerHTML = alimentos.length
    ? `<p>${alimentos.join(" • ")}</p>`
    : "<p>Nenhum alimento selecionado.</p>";

}, 1500);
// BOTÃO
function irParaPlanos() {
  window.location.href = "planos.html";
}
