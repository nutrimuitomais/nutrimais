const inputs = document.querySelectorAll("input, select");
const btn = document.getElementById("btnContinuar");

function validarCampos() {
  const tudoPreenchido = [...inputs].every(i => i.value.trim() !== "");
  btn.disabled = !tudoPreenchido;
}

// escuta mudanças
inputs.forEach(i => {
  i.addEventListener("input", validarCampos);
  i.addEventListener("change", validarCampos);
});

// valida ao carregar
document.addEventListener("DOMContentLoaded", validarCampos);

// clique do botão
btn.addEventListener("click", () => {
  if (btn.disabled) return;

  const dadosUsuario = {
    nome: document.querySelector('input[placeholder="Digite seu nome"]').value,
    idade: document.querySelector('input[placeholder="Ex: 25"]').value,
    peso: document.querySelector('input[placeholder="Ex: 70"]').value,
    altura: document.querySelector('input[placeholder="Ex: 175"]').value,
    sexo: document.querySelectorAll("select")[0].value
  };

  const objetivoSelecionado = document.querySelectorAll("select")[1].value;

  localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));
  localStorage.setItem("objetivoSelecionado", objetivoSelecionado);

  window.location.href = "alimentos.html";
});
