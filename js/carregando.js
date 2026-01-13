document.addEventListener('DOMContentLoaded', function () {

  const btnContinuar = document.getElementById('p4Continuar');

  if (!btnContinuar) return;

  btnContinuar.addEventListener('click', function () {

    // evita clique duplo
    btnContinuar.disabled = true;
    btnContinuar.classList.add('desativado');

    // redireciona para pagamento
    window.location.href = 'pagamento.html';

  });

});
