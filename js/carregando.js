document.addEventListener('DOMContentLoaded', function () {

  const btnContinuar = document.getElementById('p4Continuar');
  if (!btnContinuar) return;

  // começa bloqueado
  btnContinuar.disabled = true;

  // libera após 7 segundos
  setTimeout(() => {
    btnContinuar.disabled = false;
  }, 7000);

  // redireciona para pagamento
  btnContinuar.addEventListener('click', function () {
    if (btnContinuar.disabled) return;
    window.location.href = 'pagamento.html';
  });

});
