document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnContinuar");

  // Abrir / fechar campos
  document.querySelectorAll(".campo-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const bloco = trigger.closest(".campo-expansivel");
      bloco.classList.toggle("ativo");
    });
  });

  // Lógica de substituição e campos extras
  document.querySelectorAll(".campo-expansivel").forEach(bloco => {
    const trigger = bloco.querySelector(".campo-trigger");
    const select = bloco.querySelector("select");
    const extra = bloco.querySelector(".input-extra");
    const textoPadrao = trigger.dataset.default;

    select.addEventListener("change", () => {
      const option = select.options[select.selectedIndex];
      const valor = select.value;

      if (valor) {
        trigger.textContent = option.text;
        bloco.classList.remove("ativo");
      } else {
        trigger.textContent = textoPadrao;
      }

      if (extra) {
        if (valor === "sim" || valor === "pessoal" || valor === "familiar") {
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
    const camposBase = document.querySelectorAll(
      '.campo-whatsapp input, .campo-whatsapp select'
    );

    const selects = document.querySelectorAll(
      '.campo-expansivel select'
    );

    const extrasAtivos = document.querySelectorAll(".input-extra.ativo");

    const todos = [...camposBase, ...selects, ...extrasAtivos];

    const ok = todos.every(c => c.value && c.value.trim() !== "");
    btn.disabled = !ok;
  }

  document.addEventListener("input", validarCampos);
  document.addEventListener("change", validarCampos);

  validarCampos();
});
