document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('p4Continuar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.location.href = 'pagamento.html';
  });
});
