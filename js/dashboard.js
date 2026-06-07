// dashboard.js

/* ==========================
MENU PERFIL
========================== */

function toggleMenu(){

    const menu =
    document.getElementById("menuPerfil");

    if(
        menu.style.display === "block"
    ){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }

}

document.addEventListener(
"click",
function(e){

    const menu =
    document.getElementById("menuPerfil");

    const avatar =
    document.querySelector(".avatar");

    if(
        menu &&
        avatar &&
        !menu.contains(e.target) &&
        !avatar.contains(e.target)
    ){
        menu.style.display = "none";
    }

});

/* ==========================
MODO ESCURO / CLARO
========================== */

const btnTema =
document.getElementById("btnTema");

if(btnTema){

    btnTema.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        document.body.classList.toggle(
            "light"
        );

        localStorage.setItem(
            "nutriTema",
            document.body.classList.contains(
                "light"
            )
        );

    });

}

if(
    localStorage.getItem("nutriTema")
    === "true"
){
    document.body.classList.add("light");
}

/* ==========================
MODAL RECEITA
========================== */

function abrirReceita(){

    document.getElementById(
        "modalReceita"
    ).style.display = "flex";

}

function fecharReceita(){

    document.getElementById(
        "modalReceita"
    ).style.display = "none";

}

/* ==========================
CHAT SUPORTE
========================== */

function abrirSuporte(){

    alert(
        "Chat Nutri+ aberto."
    );

}

/* ==========================
CONSULTA
========================== */

const btnConsulta =
document.getElementById(
"btnConsulta"
);

if(btnConsulta){

    btnConsulta.addEventListener(
    "click",
    function(){

        alert(
        "Redirecionando para agendamento."
        );

    });

}

/* ==========================
TREINO MAX
========================== */

const btnTreino =
document.getElementById(
"btnTreino"
);

if(btnTreino){

    btnTreino.addEventListener(
    "click",
    function(){

        alert(
        "Treino personalizado gerado."
        );

    });

}

/* ==========================
IA NUTRI+ ANIMADA
========================== */

const mensagensIA = [

    "Analisando sua dieta...",
    "Calculando macros...",
    "Verificando evolução...",
    "Atualizando metas...",
    "Analisando consumo de proteínas...",
    "Calculando déficit calórico...",
    "Gerando recomendações..."

];

let indiceIA = 0;

setInterval(() => {

    const textoIA =
    document.getElementById("textoIA");

    if(textoIA){

        textoIA.innerText =
        mensagensIA[indiceIA];

        indiceIA++;

        if(indiceIA >= mensagensIA.length){

            indiceIA = 0;

        }

    }

},3000);

/* ==========================
NOTÍCIAS PREMIUM ROTATIVAS
========================== */

const noticias = [

    {
        titulo:
        "🔥 Mais de 100 receitas geradas para você",
        texto:
        "Assine MAX e desbloqueie receitas exclusivas."
    },

    {
        titulo:
        "🏋️ Treinos personalizados",
        texto:
        "Receba treinos criados para seu objetivo."
    },

    {
        titulo:
        "🤖 IA Nutri Coach",
        texto:
        "Disponível apenas para SUPER."
    }

];

let noticiaAtual = 0;

setInterval(() => {

    const titulo =
    document.getElementById("tituloNoticia");

    const texto =
    document.getElementById("textoNoticia");

    if(titulo && texto){

        titulo.innerText =
        noticias[noticiaAtual].titulo;

        texto.innerText =
        noticias[noticiaAtual].texto;

        noticiaAtual++;

        if(
            noticiaAtual >= noticias.length
        ){
            noticiaAtual = 0;
        }

    }

},5000);

/* ==========================
PLANO DO USUÁRIO
========================== */

/*
DIGITAL
MAX
SUPER
*/

const planoUsuario = "DIGITAL";

/* ==========================
LIBERAR TREINO MAX
========================== */

const treinoMax =
document.querySelector(
".somente-max"
);

if(
    treinoMax &&
    planoUsuario === "DIGITAL"
){

    treinoMax.innerHTML = `

        <div class="max-badge">
            MAX
        </div>

        <h3>
        🔒 Treino Personalizado
        </h3>

        <p>
        Disponível apenas para
        usuários MAX e SUPER.
        </p>

        <button class="btn-premium">
        CONHECER MAX
        </button>

    `;

}

/* ==========================
LIBERAR IA SUPER
========================== */

const iaSuper =
document.querySelector(
".somente-super"
);

if(
    iaSuper &&
    planoUsuario !== "SUPER"
){

    iaSuper.innerHTML = `

        <div class="super-badge">
            SUPER
        </div>

        <h3>
        🤖 IA Nutri Coach
        </h3>

        <p>
        Disponível apenas
        para usuários SUPER.
        </p>

        <button class="btn-premium">
        CONHECER SUPER
        </button>

    `;

}

/* ==========================
CONSULTA PERSONAL
========================== */

const btnPersonal =
document.getElementById(
"btnPersonal"
);

if(btnPersonal){

    btnPersonal.addEventListener(
    "click",
    function(){

        if(
            planoUsuario === "DIGITAL"
        ){

            alert(
            "Disponível apenas para MAX e SUPER."
            );

            return;

        }

        alert(
        "Agendamento de personal iniciado."
        );

    });

}

/* ==========================
BARRA DE EVOLUÇÃO
========================== */

const pesoInicial = 92;
const pesoAtual = 88;
const pesoMeta = 84;

const progressoPeso =

(
    (pesoInicial - pesoAtual)
    /
    (pesoInicial - pesoMeta)
)

* 100;

const barraPeso =
document.getElementById(
"barraPeso"
);

if(barraPeso){

    barraPeso.style.width =
    progressoPeso + "%";

}

/* ==========================
ANO AUTOMÁTICO
========================== */

const ano =
document.getElementById(
"anoAtual"
);

if(ano){

    ano.innerText =
    new Date().getFullYear();

}
