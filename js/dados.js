document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btnContinuar");

  // Abrir / fechar campos expansíveis
  document.querySelectorAll(".campo-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const bloco = trigger.closest(".campo-expansivel");
      bloco.classList.toggle("ativo");
    });
  });

  // Substituir texto do botão e controlar campos extras
  document.querySelectorAll(".campo-expansivel").forEach(bloco => {
    const trigger = bloco.querySelector(".campo-trigger");
    const select = bloco.querySelector("select");
    const extra = bloco.querySelector(".input-extra");
    const textoPadrao = trigger.dataset.default;

    select.addEventListener("change", () => {
      const valor = select.value;

      if (valor) {
        trigger.textContent = select.options[select.selectedIndex].text;
      } else {
        trigger.textContent = textoPadrao;
      }

      if (extra) {
        if (valor.includes("sim")) {
          extra.classList.add("ativo");
        } else {
          extra.classList.remove("ativo");
          extra.value = "";
        }
      }

      validarCampos();
    });
  });

  function validarCampos() {
    const camposVisiveis = document.querySelectorAll(
      'input:not(.input-extra), select'
    );

    const extrasAtivos = document.querySelectorAll(".input-extra.ativo");

    const todos = [...camposVisiveis, ...extrasAtivos];

    const ok = todos.every(c => c.value && c.value.trim() !== "");
    btn.disabled = !ok;
  }

  document.addEventListener("input", validarCampos);
  document.addEventListener("change", validarCampos);

  validarCampos();
});
