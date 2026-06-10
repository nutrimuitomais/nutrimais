const db = {
    "cafe": {
        titulo: "Café da Manhã Performance", kcal: 390, pro: 28, car: 35, fat: 12,
        foto: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop",
        itens: [{n: "Ovos Mexidos", q: "3 un"}, {n: "Pão Integral", q: "60g"}, {n: "Mamão Formosa", q: "150g"}]
    },
    "almoco": {
        titulo: "Almoço Funcional Elite", kcal: 980, pro: 95, car: 78, fat: 18,
        foto: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop",
        itens: [{n: "Frango Grelhado", q: "500g"}, {n: "Arroz Integral", q: "200g"}, {n: "Mix de Folhas", q: "À vontade"}]
    },
    "tarde": {
        titulo: "Lanche Sacietógeno", kcal: 310, pro: 22, car: 30, fat: 6,
        foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop",
        itens: [{n: "Iogurte Whey", q: "200g"}, {n: "Aveia em Flocos", q: "30g"}, {n: "Morangos", q: "100g"}]
    },
    "janta": {
        titulo: "Janta Anabólica", kcal: 520, pro: 42, car: 45, fat: 14,
        foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
        itens: [{n: "Patinho Moído", q: "200g"}, {n: "Mandioca Cozida", q: "150g"}, {n: "Brócolis", q: "80g"}]
    }
};

const meta = { kcal: 2200, pro: 160, car: 220, fat: 70 };

let selectedRating = 0;

// GERENCIADOR DE ESTRELAS INTERATIVO
document.querySelectorAll('.star-select').forEach(star => {
    star.addEventListener('click', (e) => {
        selectedRating = parseInt(e.target.getAttribute('data-value'));
        document.querySelectorAll('.star-select').forEach((s, idx) => {
            if (idx < selectedRating) {
                s.textContent = '★';
                s.classList.add('selected');
            } else {
                s.textContent = '☆';
                s.classList.remove('selected');
            }
        });
    });
});

// SUBMISSÃO DE COMENTÁRIOS COM TRIAGEM DE RESPOSTAS (SÓ CRÍTICA BOA VAI PRO AR)
function submitAppComment() {
    const textInput = document.getElementById('user-comment-input');
    const msgBox = document.getElementById('comment-feedback-msg');
    const commentText = textInput.value.trim();

    if (!commentText || selectedRating === 0) {
        msgBox.style.color = '#EF4444';
        msgBox.textContent = "Por favor, selecione as estrelas e digite um comentário.";
        return;
    }

    // Filtro simplificado de análise de sentimentos (palavras ruins barram a postagem)
    const badKeywords = ["ruim", "pessimo", "horrivel", "odiei", "lento", "trava", "bug", "bosta", "lixo"];
    let isNegative = badKeywords.some(word => commentText.toLowerCase().includes(word)) || selectedRating < 4;

    if (isNegative) {
        // Se for ruim, finge que enviou para análise interna e não renderiza na tela
        msgBox.style.color = '#F59E0B';
        msgBox.textContent = "Obrigado! Seu comentário foi enviado para a nossa equipe de auditoria interna.";
    } else {
        // Se for bom, divulga dinamicamente no topo do feed da comunidade
        const container = document.querySelector('.feedbacks-container');
        const newCard = document.createElement('div');
        newCard.className = 'feedback-card';
        
        let starsStr = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);

        newCard.innerHTML = `
            <div class="feedback-user">
                <div class="user-dummy">👤</div>
                <div>
                    <h4>Você</h4>
                    <div class="stars" style="color: #F59E0B;">${starsStr}</div>
                </div>
            </div>
            <p class="feedback-text">"${commentText}"</p>
        `;
        container.insertBefore(newCard, container.firstChild);
        
        msgBox.style.color = '#10B981';
        msgBox.textContent = "Comentário publicado com sucesso na comunidade!";
    }

    // Limpa campos
    textInput.value = "";
    selectedRating = 0;
    document.querySelectorAll('.star-select').forEach(s => { s.textContent = '☆'; s.classList.remove('selected'); });
}

function updateEngine() {
    let s = { kcal: 0, pro: 0, car: 0, fat: 0 };
    const ids = ["cafe", "almoco", "tarde", "janta"];

    ids.forEach(id => {
        const chk = document.getElementById(`chk-${id}`);
        const card = document.getElementById(`meal-${id}`);
        if(chk && chk.checked) {
            s.kcal += db[id].kcal;
            s.pro += db[id].pro;
            s.car += db[id].car;
            s.fat += db[id].fat;
            card.classList.add('concluido');
        } else {
            card.classList.remove('concluido');
        }
    });

    const pKcal = Math.min((s.kcal / meta.kcal) * 100, 100);
    document.getElementById('bar-kcal').style.width = pKcal + "%";
    document.getElementById('sum-kcal').textContent = s.kcal;

    updateRing('ring-pro', 'txt-pro', (s.pro / meta.pro) * 100);
    updateRing('ring-car', 'txt-car', (s.car / meta.car) * 100);
    updateRing('ring-fat', 'txt-fat', (s.fat / meta.fat) * 100);
}

function updateRing(id, txtId, val) {
    const p = Math.min(Math.round(val), 100);
    document.getElementById(id).setAttribute("stroke-dasharray", `${p}, 100`);
    document.getElementById(txtId).textContent = p + "%";
}

function openRecipe(id) {
    const modal = document.getElementById('recipe-modal');
    const data = db[id];
    
    document.getElementById('recipe-name').textContent = data.titulo;
    document.getElementById('recipe-plate').src = data.foto;
    document.getElementById('rec-kcal').textContent = data.kcal;
    document.getElementById('rec-pro').textContent = data.pro + "g";
    document.getElementById('rec-car').textContent = data.car + "g";
    document.getElementById('rec-count').textContent = `${data.itens.length} itens saudáveis`;

    const list = document.getElementById('ingredients-list');
    list.innerHTML = "";
    data.itens.forEach(item => {
        list.innerHTML += `
            <div class="ing-item">
                <h4>${item.n}</h4>
                <span>${item.q}</span>
            </div>
        `;
    });

    modal.classList.remove('hidden');
}

function closeRecipe() {
    document.getElementById('recipe-modal').classList.add('hidden');
}

function toggleNotifHub() {
    document.getElementById('notif-hub').classList.toggle('hidden');
}

function triggerPremium() {
    alert("Acesso exclusivo do plano ativo ou redirecionando para área premium...");
}

function triggerAvatarUpload() {
    document.getElementById('file-input').click();
}

document.getElementById('file-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('user-avatar').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

window.addEventListener('DOMContentLoaded', updateEngine);
