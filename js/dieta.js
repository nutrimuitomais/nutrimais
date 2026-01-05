const dieta = {
  cafeManha: [],
  almoco: [],
  cafeTarde: [],
  janta: [],
  doce: []
};

function selecionarAlimento(refeicao, alimento, elemento) {
  if (!dieta[refeicao].includes(alimento)) {
    dieta[refeicao].push(alimento);
    elemento.classList.add('ativo');
  } else {
    dieta[refeicao] = dieta[refeicao].filter(a => a !== alimento);
    elemento.classList.remove('ativo');
  }
}

function finalizarDieta() {
  localStorage.setItem('dietaEscolhida', JSON.stringify(dieta));
  alert('🎉 Meus parabéns, sua dieta está quase pronta!');
  window.location.href = 'planos.html';
}

function dietaValida() {
  return (
    dieta.cafeManha.length > 0 &&
    dieta.almoco.length > 0 &&
    dieta.cafeTarde.length > 0 &&
    dieta.janta.length > 0
  );
}

function finalizarDieta() {
  if (!dietaValida()) {
    alert('Por favor, selecione pelo menos um alimento em cada refeição.');
    return;
  }

  localStorage.setItem('dietaUsuario', JSON.stringify(dieta));
  window.location.href = 'portal.html';
}
function atualizarBotao() {
  document.getElementById('btnSeguinte').disabled = !dietaValida();
}
function selecionarCard(elemento, refeicao, alimento) {
  elemento.classList.toggle('ativo');
  selecionarAlimento(refeicao, alimento);
}
const dieta = {
  cafeManha: [],
  almoco: [],
  cafeTarde: [],
  janta: [],
  doce: []
};
