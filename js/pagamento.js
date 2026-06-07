const plano =
JSON.parse(localStorage.getItem("planoEscolhido"));

if(!plano){
  alert("Nenhum plano encontrado.");
  window.location.href = "planos.html";
}

/* HERO */

const hero = document.querySelector(".hero-pagamento");

if(plano.estilo === "digital"){
  hero.style.background =
  "linear-gradient(120deg,#64756f,#7c8b86,#64756f)";
}

if(plano.estilo === "max"){
  hero.style.background =
  "linear-gradient(120deg,#4f6b56,#688f73,#4f6b56)";
}

if(plano.estilo === "super"){
  hero.style.background =
  "linear-gradient(120deg,#8b7750,#a58b5b,#8b7750)";
}

hero.style.backgroundSize = "200% 200%";

/* DADOS DO PLANO */

document.getElementById("nomePlano").innerText =
plano.nome;

const nomePlano = document.getElementById("nomePlano");

if(plano.nome.includes("Max")){
nomePlano.classList.add("prata");
}

if(plano.nome.includes("Super")){
nomePlano.classList.add("dourado");
}

document.getElementById("tipoPlano").innerText =
plano.tipo === "anual"
? "Assinatura anual"
: "Assinatura mensal";

document.getElementById("valorPlano").innerText =
plano.preco.toFixed(2);

/* TAG */

const tag = document.querySelector(".hero-tag");

if(plano.nome.includes("Digital")){
  tag.innerText = "Ideal para começar";
}

if(plano.nome.includes("Max")){
  tag.innerText = "Mais escolhido";
}

if(plano.nome.includes("Super")){
  tag.innerText = "Melhor custo-benefício";
}

/* ECONOMIA */

const economia =
document.getElementById("economia");

if(plano.tipo === "anual"){

  if(plano.nome.includes("Digital")){
    economia.innerText =
    "🎉 Economize 17% no plano anual";
  }

  else if(plano.nome.includes("Max")){
    economia.innerText =
    "🎁 Você ganha 1 mês grátis";
  }

  else{
    economia.innerText =
    "🎁 Você ganha 2 meses grátis";
  }

}else{
  economia.innerText =
  "Plano mensal selecionado";
}

/* MÉTODOS */

function trocarMetodo(tipo, el){

  document
  .querySelectorAll(".metodo")
  .forEach(btn =>
    btn.classList.remove("ativo")
  );

  el.classList.add("ativo");

  document
  .getElementById("pixArea")
  .classList.remove("ativo-area");

  document
  .getElementById("cartaoArea")
  .classList.remove("ativo-area");

  const nome =
  document.getElementById("nomeCompleto");

  if(tipo === "pix"){

    document
    .getElementById("pixArea")
    .classList.add("ativo-area");

  }else{

    document
    .getElementById("cartaoArea")
    .classList.add("ativo-area");

  }

  if(tipo === "debito"){
    nome.style.display = "none";
  }else{
    nome.style.display = "block";
  }
}

/* CUPONS */

const cupons = {
  NUTRI2:2,
  VINY3:3,
  NUTRI4:4,
  VINY5:5,
  MAX6:6,
  MAX7:7,
  MAX8:8,
  SUPER9:9,
  SUPER10:10
};

let valorAtual = plano.preco;

function aplicarCupom(){

  const codigo =
  document
  .getElementById("cupom")
  .value
  .trim()
  .toUpperCase();

  const desconto =
  cupons[codigo] || 0;

  const msg =
  document.getElementById("msgCupom");

  if(desconto){

    valorAtual =
    plano.preco - desconto;

    document
    .getElementById("valorPlano")
    .innerText =
    valorAtual.toFixed(2);

    msg.innerText =
    `Desconto aplicado: R$ ${desconto.toFixed(2)}`;

  }else{

    msg.innerText =
    "Cupom inválido";

  }
}

/* PAGAMENTO */

function confirmarPagamento(){

  localStorage.setItem(
    "pagamentoAprovado",
    "true"
  );

  window.location.href =
  "anamnese.html";
}

/* BANDEIRA */

const cartao =
document.getElementById("numeroCartao");

const bandeira =
document.getElementById("bandeiraCartao");

cartao.addEventListener("input", function(){

  let valor =
  this.value.replace(/\D/g,"");

  valor =
  valor.substring(0,16);

  this.value = valor;

  if(valor.startsWith("4")){
    bandeira.innerText = "Visa";
  }

  else if(
    valor.startsWith("51") ||
    valor.startsWith("52") ||
    valor.startsWith("53") ||
    valor.startsWith("54") ||
    valor.startsWith("55")
  ){
    bandeira.innerText = "Mastercard";
  }

  else if(
    valor.startsWith("34") ||
    valor.startsWith("37")
  ){
    bandeira.innerText = "American Express";
  }

  else{
    bandeira.innerText = "";
  }

});
