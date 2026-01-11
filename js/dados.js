document.addEventListener("DOMContentLoaded", () => {

  // Abrir / fechar campos expansíveis
  document.querySelectorAll(".campo-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const bloco = trigger.parentElement;
      bloco.classList.toggle("ativo");
    });
  });

  // Alergia – mostrar input extra
  document.querySelectorAll(".select-alergia").forEach(select => {
    const input = select.parentElement.querySelector(".input-extra");

    select.addEventListener("change", () => {
      if (select.value === "sim") {
        input.classList.add("ativo");
      } else {
        input.classList.remove("ativo");
        input.value = "";
      }
    });
  });

  // Histórico – mostrar input extra
  document.querySelectorAll(".select-historico").forEach(select => {
    const input = select.parentElement.querySelector(".input-extra");

    select.addEventListener("change", () => {
      if (select.value === "sim") {
        input.classList.add("ativo");
      } else {
        input.classList.remove("ativo");
        input.value = "";
      }
    });
  });

});
