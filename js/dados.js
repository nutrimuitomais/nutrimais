document.addEventListener("DOMContentLoaded", () => {

  // SEXO
  document.querySelectorAll(".sexo").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sexo").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      document.getElementById("sexo").value = btn.dataset.value;
      validarCampos();
    });
  });

  const btnContinuar = document.getElementById("btnContinuar");
  const alergia = document.getElementById("alergia");
  const alergiaDesc = document.getElementById("alergiaDescricao");
  const historico = document.getElementById("historico");
  const historicoDesc = document.getElementById("historicoDescricao");

  function validarCampos() {
    const camposPrincipais = document.querySelectorAll(
      ".campo input:not(.input-extra), .campo select"
    );

    const extrasAtivos = document.querySelectorAll(".input-extra.ativo");

    const todos = [...camposPrincipais, ...extrasAtivos];

    btnContinuar.disabled = !todos.every(
      campo => campo.value && campo.value.trim() !== ""
    );
  }

  alergia.addEventListener("change", e => {
    if (e.target.value === "sim") {
      alergiaDesc.classList.add("ativo");
    } else {
      alergiaDesc.classList.remove("ativo");
      alergiaDesc.value = "";
    }
    validarCampos();
  });

  historico.addEventListener("change", e => {
    if (e.target.value !== "nao") {
      historicoDesc.classList.add("ativo");
    } else {
      historicoDesc.classList.remove("ativo");
      historicoDesc.value = "";
    }
    validarCampos();
  });

  document.addEventListener("input", validarCampos);
  document.addEventListener("change", validarCampos);

  validarCampos();
});
