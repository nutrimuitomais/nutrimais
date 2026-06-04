document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('p4Continuar');
  if (!btn) return;

  // inicia desativado
  btn.disabled = true;

  // libera após 7 segundos
  setTimeout(() => {
    btn.disabled = false;
  }, 7000);

  // redireciona para pagamento
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    window.location.assign('planos.html');
  });

});
