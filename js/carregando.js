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
    let corClassificacao = "";

    if (imc < 18.5) {
      classificacao = "abaixo do peso";
      corClassificacao = "#2d8cff"; // azul
    } else if (imc < 25) {
      classificacao = "no peso ideal";
      corClassificacao = "#1e8f5a"; // verde
    } else {
      classificacao = "acima do peso";
      corClassificacao = "#e74c3c"; // vermelho
    }

    // ===== CALORIAS =====
    const caloriasBase = (10 * peso) + (6.25 * alturaCm) - (5 * idade) + 5;
    const caloriasIdeais = Math.round(caloriasBase);

    // ===== TEXTO PRINCIPAL (CORRETO) =====
    nomeSpan.innerHTML = `
      Olá, ${nome} 👋<br>
      <span class="texto-avaliacao" style="font-weight:400;">
        De acordo com suas informações de medidas que nos foram passadas,
        foi observado que você está
        <span style="color:${corClassificacao}; font-weight:600;">
          ${classificacao}
        </span>,
        estamos aqui para lhe auxiliar!
      </span>
    `;

    // ===== DADOS EM LINHA =====
    linhaDados.textContent = `${idade} Anos | ${peso} kg | ${alturaCm} cm`;

    // ===== OBJETIVO + CALORIAS (NO MESMO DESTAQUE) =====
    objetivoDiv.innerHTML = `
      <div class="objetivo-destaque">
        Objetivo: ${objetivoUsuario}<br>
        <span style="font-weight:500; font-size:14px;">
          Calorias ideais estimadas: ${caloriasIdeais} kcal/dia
        </span>
      </div>
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
});

// BOTÃO
function irParaPlanos() {
  window.location.href = "planos.html";
}
