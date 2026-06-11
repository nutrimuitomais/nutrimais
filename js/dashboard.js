// Seletores
const sidebar = document.getElementById('sidebar-menu');
const openMenu = document.getElementById('open-mobile-menu');
const closeMenu = document.getElementById('close-menu');
const darkModeToggle = document.getElementById('toggle-dark-mode');

// Lógica Abrir/Fechar
openMenu.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// Lógica Modo Escuro (Simples)
darkModeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
});
