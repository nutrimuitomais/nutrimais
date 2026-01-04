let sexoSelecionado = null;

document.querySelectorAll('.sexo-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.sexo-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    sexoSelecionado = btn.dataset.sexo;
  };
});

function calcularCalorias(peso, altura, idade, sexo, objetivo) {
  let basal;

  if (sexo === 'Masculino') {
    basal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
  } else {
    basal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
  }

  if (objetivo === 'Emagrecimento') return Math.round(basal * 0.8);
  if (objetivo === 'Hipertrofia') return Math.round(basal * 1.2);
  return Math.round(basal);
}

document.getElementById('formDados').onsubmit = function (e) {
  e.preventDefault();

  const peso = +document.getElementById('peso').value;
  const altura = +document.getElementById('altura').value;
  const idade = +document.getElementById('idade').value;
  const objetivo = document.getElementById('objetivo').value;

  const calorias = calcularCalorias(peso, altura, idade, sexoSelecionado, objetivo);

  localStorage.setItem('dadosUsuario', JSON.stringify({
    peso,
    altura,
    idade,
    sexo: sexoSelecionado,
    objetivo,
    calorias
  }));

  window.location.href = 'dieta.html';
};
