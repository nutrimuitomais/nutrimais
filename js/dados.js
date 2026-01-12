document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     SUBSTITUI TEXTO DO BOTÃO
     =============================== */

  document.querySelectorAll(".opcao").forEach(opcao => {
    const botao = opcao.querySelector(".opcao-toggle");
    const select = opcao.querySelector("select");
    const extra = opcao.querySelector("input");

    // Quando escolher uma opção
    select.addEventListener("change", () => {
      const valor = select.value;

      // Troca o texto do botão
      botao.textContent = valor;

      // Alergia / Histórico → mostra campo extra só se for "Sim"
      if (extra) {
        if (valor.toLowerCase().includes("sim")) {
          extra.style.display = "block";
        } else {
          extra.style.display = "none";
          extra.value = "";
        }
      }

      validarCampos();
    });
  });

  /* ===============================
     VALIDAÇÃO SEM INTERFERIR VISUAL
     =============================== */

  const btn = document.getElementById("btnContinuar");

  function validarCampos() {
    const campos = document.querySelectorAll(
      'input:not([style*="display: none"]), select'
    );

    const ok = [...campos].every(c => c.value && c.value.trim() !== "");
    btn.disabled = !ok;
  }

  document.addEventListener("input", validarCampos);
  document.addEventListener("change", validarCampos);

  validarCampos();

});
