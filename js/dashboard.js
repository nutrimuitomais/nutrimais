const db = {
    "cafe": { titulo: "Café Performance", kcal: 390, pro: 28, car: 35, fat: 12, foto: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400", itens: [{n: "Ovos", q: "3 un"}, {n: "Pão", q: "60g"}] },
    "almoco": { titulo: "Almoço Elite", kcal: 980, pro: 95, car: 78, fat: 18, foto: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400", itens: [{n: "Frango", q: "500g"}, {n: "Arroz", q: "200g"}] },
    "tarde": { titulo: "Lanche", kcal: 310, pro: 22, car: 30, fat: 6, foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", itens: [{n: "Whey", q: "200g"}] },
    "janta": { titulo: "Janta Anabólica", kcal: 520, pro: 42, car: 45, fat: 14, foto: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", itens: [{n: "Patinho", q: "200g"}, {n: "Mandioca", q: "150g"}] }
};

const meta = { kcal: 2200, pro: 160, car: 220, fat: 70 };
let currentSlide = 0;

// MOTOR DE ATUALIZAÇÃO COM FEEDBACK DE CALORIAS
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

    // Lógica da mensagem dinâmica
    const msgBox = document.getElementById('kcal-feedback');
    const faltam = meta.kcal - s.kcal;

    if (pKcal >= 100) {
        msgBox.innerHTML = "🏆 <span style='color:#129E47'>Parabéns, Vinicius! Você bateu 100% da sua meta de hoje!</span>";
    } else if (s.kcal > 0) {
        msgBox.innerHTML = `Faltam <strong>${faltam} kcal</strong> para completar os 100%.`;
    }

    updateRing('ring-pro', 'txt-pro', (s.pro / meta.pro) * 100);
    updateRing('ring-car', 'txt-car', (s.car / meta.car) * 100);
    updateRing('ring-fat', 'txt-fat', (s.fat / meta.fat) * 100);
}

function updateRing(id, txtId, val) {
    const p = Math.min(Math.round(val), 100);
    const el = document.getElementById(id);
    if(el) el.setAttribute("stroke-dasharray", `${p}, 100`);
    const txt = document.getElementById(txtId);
    if(txt) txt.textContent = p + "%";
}

// ROTAÇÃO AUTOMÁTICA DO CARROSSEL
function initSlider() {
    const wrapper = document.getElementById('main-slider');
    const dots = document.querySelectorAll('.s-dot');
    const totalSlides = 3;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }, 5000); // Muda a cada 5 segundos
}

// FUNÇÕES DE COMENTÁRIO E INTERFACE
function submitAppComment() {
    const textInput = document.getElementById('user-comment-input');
    const msgBox = document.getElementById('comment-feedback-msg');
    const commentText = textInput.value.trim();
    if (!commentText) return;

    const badKeywords = ["ruim", "pessimo", "lento", "bug"];
    let isNegative = badKeywords.some(word => commentText.toLowerCase().includes(word));

    if (isNegative) {
        msgBox.style.color = '#F59E0B';
        msgBox.textContent = "Obrigado! Seu comentário foi enviado para análise interna.";
    } else {
        msgBox.style.color = '#10B981';
        msgBox.textContent = "Comentário publicado com sucesso!";
    }
    textInput.value = "";
}

function openRecipe(id) {
    const modal = document.getElementById('recipe-modal');
    const data = db[id];
    document.getElementById('recipe-name').textContent = data.titulo;
    document.getElementById('recipe-plate').src = data.foto;
    document.getElementById('rec-kcal').textContent = data.kcal;
    document.getElementById('rec-pro').textContent = data.pro + "g";
    document.getElementById('rec-car').textContent = data.car + "g";
    const list = document.getElementById('ingredients-list');
    list.innerHTML = "";
    data.itens.forEach(item => {
        list.innerHTML += `<div class="ing-item"><h4>${item.n}</h4><span>${item.q}</span></div>`;
    });
    modal.classList.remove('hidden');
}

function closeRecipe() { document.getElementById('recipe-modal').classList.add('hidden'); }
function toggleNotifHub() { document.getElementById('notif-hub').classList.toggle('hidden'); }
function triggerPremium() { alert("Acesso exclusivo do plano ativo ou redirecionando para área premium..."); }
function triggerAvatarUpload() { document.getElementById('file-input').click(); }

document.getElementById('file-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) { document.getElementById('user-avatar').src = event.target.result; };
        reader.readAsDataURL(file);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    updateEngine();
    initSlider();
});
