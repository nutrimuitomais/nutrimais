function selectOption(plano) {
    const nome = document.getElementById("nome").value;

    if (!nome.trim()) {
        alert("Por favor, digite seu nome.");
        return;
    }

    const numero = "5527992987642";
    const mensagem = `Olá, meu nome é ${nome} e tenho interesse no plano: ${plano}.`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}
