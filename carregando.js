document.addEventListener("DOMContentLoaded", () => {

  // ===== BARRA DE PROGRESSO (NÃO ALTERADA) =====
  const barra = document.getElementById("barraProgresso");
  if (barra) barra.style.width = "85%";

  // ===== ANIMAÇÃO DOS PONTOS (NÃO ALTERADA) =====
  const dots = document.getElementById("dots");
  let count = 0;
  setInterval(() => {
    count = (count + 1) % 4;
    if (dots) dots.textContent = ".".repeat(count);
  }, 500);

  // ===== SIMULA CARREGAMENTO (NÃO ALTERADO) =====
  setTimeout(() => {
    const loading = document.getElementById("loading");
    const resumo = document.getElementById("resumo");

    if (loading) loading.style.display = "none";
    if (resumo) resumo.classList.remove("hidden");

    preencherResumo(); // ✅ nome correto
  }, 1000);
});

function preencherResumo() {
  const dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));
  const objetivo = localStorage.getItem("objetivoSelecionado");
  const dieta = JSON.parse(localStorage.getItem("dietaSelecionada"));

  if (!dadosUsuario || !objetivo || !dieta) {
    console.error("Dados ausentes no localStorage");
    return;
  }

  // ===== DADOS =====
  const dadosEl = document.getElementById("dadosUsuario");
  if (dadosEl) {
    dadosEl.innerHTML = `
      ${dadosUsuario.nome ? `<strong>${dadosUsuario.nome}</strong><br>` : ""}
      Peso: ${dadosUsuario.peso} |
      Altura: ${dadosUsuario.altura} |
      Idade: ${dadosUsuario.idade}
    `;
  }

  // ===== OBJETIVO =====
  const objetivoEl = document.getElementById("objetivoUsuario");
  if (objetivoEl) {
    objetivoEl.textContent = objetivo;
  }

  // ===== ALIMENTOS =====
  const lista = document.getElementById("listaAlimentos");
  if (!lista) return;

  lista.innerHTML = "";
  let temAlimentos = false;

  Object.values(dieta).forEach(refeicao => {
    if (Array.isArray(refeicao)) {
      refeicao.forEach(item => {
        temAlimentos = true;
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
      });
    }
  });

  if (!temAlimentos) {
    const li = document.createElement("li");
    li.textContent = "Nenhum alimento selecionado.";
    lista.appendChild(li);
  }
}

function irParaPlanos() {
  window.location.href = "planos.html";
}
const titulo = document.querySelector(".card-resumo h2");
if (titulo) {
  titulo.innerText = "Tudo pronto, confirme e gere a dieta!";
}
if (dadosUsuario && dadosUsuario.peso && dadosUsuario.altura) {
  const peso = Number(dadosUsuario.peso);
  const alturaM = Number(dadosUsuario.altura) / 100;

  const imc = peso / (alturaM * alturaM);
  let status = "";

  if (imc < 18.5) status = "abaixo do peso ideal";
  else if (imc < 25) status = "no peso ideal";
  else status = "acima do peso ideal";

  const info = document.createElement("p");
  info.style.marginTop = "6px";
  info.style.fontSize = "14px";
  info.style.color = "#555";
  info.innerText = `Temos suas medidas e você está ${status}. Vamos à sua dieta completa abaixo.`;

  const dadosEl = document.getElementById("dadosUsuario");
  if (dadosEl) dadosEl.after(info);
}
