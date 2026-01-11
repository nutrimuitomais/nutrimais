document.addEventListener("DOMContentLoaded", () => {

  /* ===== EXPANSÃO DOS CAMPOS ===== */
  document.querySelectorAll(".campo-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const bloco = trigger.parentElement;
      bloco.classList.toggle("ativo");
    });
  });

  /* ===== LÓGICA ALERGIA ===== */
  const alergiaSelect = document.getElementById("alergia");
  const alergiaInput = document.getElementById("alergiaDescricao");

  alergiaSelect.addEventListener("change", () => {
    if (alergiaSelect.value === "sim") {
      alergiaInput.classList.add("ativo");
    } else {
      alergiaInput.classList.remove("ativo");
      alergiaInput.value = "";
    }
  });

  /* ===== LÓGICA HISTÓRICO ===== */
  const historicoSelect = document.getElementById("historico");
  const historicoInput = document.getElementById("historicoDescricao");

  historicoSelect.addEventListener("change", () => {
    if (historicoSelect.value !== "nao" && historicoSelect.value !== "") {
      historicoInput.classList.add("ativo");
    } else {
      historicoInput.classList.remove("ativo");
      historicoInput.value = "";
    }
  });

  /* ===== VALIDAÇÃO ===== */
  const camposObrigatorios = [
    "nome",
    "idade",
    "peso",
    "altura",
    "sexo",
    "objetivo"
  ];

  const btn = document.getElementById("btnContinuar");

  function validar() {
    const valido = camposObrigatorios.every(id => {
      const campo = document.getElementById(id);
      return campo && campo.value.trim() !== "";
    });

    btn.disabled = !valido;
  }

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", validar);
    el.addEventListener("change", validar);
  });

  /* ===== CONTINUAR ===== */
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    const dados = {
      nome: nome.value,
      idade: idade.value,
      peso: peso.value,
      altura: altura.value,
      sexo: sexo.value,
      objetivo: objetivo.value,
      calorias: calorias?.value || "",
      alergia: alergia.value,
      alergiaDescricao: alergiaDescricao.value,
      historico: historico.value,
      historicoDescricao: historicoDescricao.value
    };

    localStorage.setItem("dadosUsuario", JSON.stringify(dados));
    window.location.href = "alimentos.html";
  });

});
