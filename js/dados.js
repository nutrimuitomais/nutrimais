document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnContinuar");
  const campos = document.querySelectorAll("input, select");

  // Ativa/desativa botão
  function validar() {
    const ok = [...campos].every(c => c.value.trim() !== "" || c.style.display === "none");
    btn.disabled = !ok;
  }

  campos.forEach(c => {
    c.addEventListener("input", validar);
    c.addEventListener("change", validar);
  });

  // Opções expansíveis inteligentes
  document.querySelectorAll(".opcao").forEach(opcao => {
    const toggle = opcao.querySelector(".opcao-toggle");
    const body = opcao.querySelector(".opcao-body");
    const select = opcao.querySelector(".opcao-select");
    const extra = opcao.querySelector(".opcao-extra");

    toggle.addEventListener("click", () => {
      opcao.classList.toggle("active");
    });

    select.addEventListener("change", () => {
      toggle.textContent = select.value;
      opcao.classList.remove("active");

      if (extra) {
        if (select.value.includes("Sim")) {
          extra.style.display = "block";
        } else {
          extra.style.display = "none";
          extra.value = "";
        }
      }

      validar();
    });
  });

  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    window.location.href = "alimentos.html";
  });
});
