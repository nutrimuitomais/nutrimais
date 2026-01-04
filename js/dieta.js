let dieta = {
  cafeManha: [],
  almoco: [],
  cafeTarde: [],
  janta: [],
  doce: []
};

function selecionarAlimento(refeicao, alimento) {
  if (!dieta[refeicao].includes(alimento)) {
    dieta[refeicao].push(alimento);
  }
}
function finalizarDieta() {
  localStorage.setItem('dietaUsuario', JSON.stringify(dieta));
  window.location.href = 'portal.html';
}
