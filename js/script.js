document.addEventListener('DOMContentLoaded', () => {

  const campos = document.querySelectorAll('input, select');
  const botao = document.getElementById('btnContinuar');

  function validarCampos() {
    let valido = true;

    campos.forEach(campo => {
      if (campo.value.trim() === '') {
        valido = false;
      }
    });

    if (valido) {
      botao.disabled = false;
      botao.classList.add('ativo');
    } else {
      botao.disabled = true;
      botao.classList.remove('ativo');
    }
  }

  campos.forEach(campo => {
    campo.addEventListener('input', validarCampos);
  });

 botao.addEventListener('click', () => {
  if (!botao.disabled) {
    window.location.href = 'alimentos.html';
  }
});

});
