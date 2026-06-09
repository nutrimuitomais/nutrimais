/* ==========================
NOVO
========================== */
function fecharNews(){

    document
    .getElementById("newsPopup")
    .style.display = "none";

}

function abrirReceita(){

    document.querySelector(
        ".meal-plan-section"
    ).style.display = "none";

    document.querySelector(
        ".recipe-details"
    ).style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

function voltarReceita(){

    document.querySelector(
        ".recipe-details"
    ).style.display = "none";

    document.querySelector(
        ".meal-plan-section"
    ).style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

/* ==========================
FOTO PERFIL
========================== */

const avatarUser =
document.getElementById(
    "avatarUser"
);

const uploadFoto =
document.getElementById(
    "uploadFoto"
);

avatarUser.addEventListener(
    "click",
    () => {
        uploadFoto.click();
    }
);

uploadFoto.addEventListener(
    "change",
    (e) => {

        const file =
        e.target.files[0];

        if(!file) return;

        const reader =
        new FileReader();

        reader.onload =
        function(event){

            avatarUser.src =
            event.target.result;

            avatarUser.classList.add(
                "avatar-uploaded"
            );

        };

        reader.readAsDataURL(
            file
        );

    }
);

/* ==========================
GRAFICO DE PESO
========================== */

const ctx =
document.getElementById(
    "graficoPeso"
);

new Chart(
    ctx,
    {
        type:"line",
        data:{
            labels:[
                "01/06",
                "02/06",
                "03/06",
                "04/06",
                "05/06",
                "06/06",
                "07/06"
            ],
            datasets:[
                {
                    label:"Peso",
                    data:[
                        92,
                        91.6,
                        91.1,
                        90.8,
                        90.2,
                        89.7,
                        89.1
                    ],
                    borderColor:"#22c55e",
                    backgroundColor:
                    "rgba(34,197,94,.15)",
                    fill:true,
                    tension:.4,
                    borderWidth:4,
                    pointRadius:6,
                    pointBackgroundColor:
                    "#22c55e"
                }
            ]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{
                    display:false
                }
            }
        }
    }
);
