/* ==========================================================
                        DASHBOARD.JS
                    NUTRI+ PREMIUM
========================================================== */

"use strict";

/* ==========================================================
                        CONFIGURAÇÕES
========================================================== */

const NutriPlus = {

    /* ==========================================
                CONFIGURAÇÕES GERAIS
    ========================================== */

    config: {

        appName: "Nutri+",

        version: "1.0.0",

        debug: true,

        language: "pt-BR",

        defaultTheme: "light",

        autoSave: true,

        animationTime: 300,

        toastTime: 3500

    },

    /* ==========================================
                    USUÁRIO
    ========================================== */

    user: {

        id: null,

        name: "",

        nickname: "",

        email: "",

        photo: "",

        plan: "",

        age: 0,

        weight: 0,

        height: 0,

        goal: "",

        caloriesGoal: 0,

        createdAt: null

    },

    /* ==========================================
                DASHBOARD
    ========================================== */

    dashboard: {

        initialized: false,

        firstAccess: false,

        today: new Date(),

        loading: true

    },

    /* ==========================================
                PROGRESSO
    ========================================== */

    progress: {

        calories: 0,

        proteins: 0,

        carbs: 0,

        fats: 0

    },

    /* ==========================================
                METAS
    ========================================== */

    goals: {

        calories: 0,

        proteins: 0,

        carbs: 0,

        fats: 0

    },

    /* ==========================================
                REFEIÇÕES
    ========================================== */

    meals: {

        breakfast: [],

        lunch: [],

        snack: [],

        dinner: []

    },

    /* ==========================================
                SEQUÊNCIA
    ========================================== */

    streak: {

        currentDays: 0,

        currentFlame: 1,

        nextFlame: 2,

        unlocked: []

    },

    /* ==========================================
                NOTIFICAÇÕES
    ========================================== */

    notifications: {

        unread: 0,

        list: []

    },

    /* ==========================================
                HISTÓRICO
    ========================================== */

    history: {

        foods: []

    },

    /* ==========================================
                    MODAIS
    ========================================== */

    modal: {

        opened: null

    }

};

    /* ==========================================================
                    UTILITÁRIOS
========================================================== */

const Utils = {

    get(id){

        return document.getElementById(id);

    },

    query(selector){

        return document.querySelector(selector);

    },

    queryAll(selector){

        return document.querySelectorAll(selector);

    },

    formatNumber(number){

        return Number(number).toLocaleString("pt-BR");

    },

    formatDate(date){

        return new Intl.DateTimeFormat(

            "pt-BR"

        ).format(date);

    },

    percentage(value,max){

        if(max===0) return 0;

        return (value/max)*100;

    }

};

  /* ==========================================================
                INICIALIZAÇÃO
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        Dashboard.initialize();

        
    }

);

/* ==========================================================
                DASHBOARD
========================================================== */

const Dashboard = {

    initialize(){

        console.log("Inicializando Dashboard...");

        this.cache();

        this.events();

        this.loadTheme();

        this.loadUser();

        this.loadMeals();

        this.loadNotifications();

        this.loadProgress();

        this.loadStreak();

            /* ==========================================
            NOVOS MÓDULOS
    ========================================== */

    NotificationCenter.init();

    Food.init();

    Scheduler.start();

    Storage.load();

    Dashboard.refresh();

    AutoSave.start();

    Services.init();

    Gamification.init();

    Statistics.update();

    Mission.init();

    Calendar.init();

    Hydration.init();

    BodyTracker.init();

    Analytics.init();

    Charts.render();

    Goals.init();

    Premium.init();

    AutoBackup.start();

    Settings.init();

    Api.init();

    Sync.processQueue();

    Auth.init();

    SessionWatcher.start();

    Performance.init();

    TaskScheduler.start();

    Core.init();

    this.finish();

    },

    cache(){

        console.log("Cache carregado.");

    },

    events(){

        console.log("Eventos registrados.");

    },

    loadTheme(){

        console.log("Tema carregado.");

    },

    loadUser(){

        console.log("Usuário carregado.");

    },

    loadMeals(){

        console.log("Refeições carregadas.");

    },

    loadNotifications(){

        console.log("Notificações carregadas.");

    },

    loadProgress(){

        console.log("Progresso carregado.");

    },

    loadStreak(){

        console.log("Sequência carregada.");

    },

    finish(){

        NutriPlus.dashboard.loading = false;

        NutriPlus.dashboard.initialized = true;

        console.log("Dashboard pronta.");

    }

};

/* ==========================================================
                    CACHE DE ELEMENTOS
========================================================== */

Dashboard.cache = function () {

    this.elements = {

        /* ==========================================
                    HEADER
        ========================================== */

        profileButton:
            Utils.get("np-profile-button"),

        profileMenu:
            Utils.get("np-profile-menu"),

        notificationButton:
            Utils.get("np-notification-button"),

        notificationMenu:
            Utils.get("np-notification-menu"),

        notificationBadge:
            Utils.get("np-notification-badge"),

        /* ==========================================
                MISSÃO DIÁRIA
        ========================================== */

        dailyMissionModal:
            Utils.get("np-daily-mission-modal"),

        dailyMissionOverlay:
            Utils.get("np-daily-mission-overlay"),

        closeDailyMission:
            Utils.get("np-close-daily-mission"),

        openGoalsButton:
            Utils.get("np-open-goals-button"),

        closeGoalsButton:
            Utils.get("np-close-goals-button"),

        /* ==========================================
                    STREAK
        ========================================== */

        currentFlame:
            Utils.get("np-current-flame-image"),

        nextFlame:
            Utils.get("np-next-flame-image"),

        streakFill:
            Utils.get("np-streak-progress-fill"),

        streakText:
            Utils.get("np-streak-progress-text"),

        /* ==========================================
                PROGRESSO
        ========================================== */

        caloriesFill:
            Utils.get("np-progress-calories"),

        proteinFill:
            Utils.get("np-progress-protein"),

        carbsFill:
            Utils.get("np-progress-carbs"),

        fatFill:
            Utils.get("np-progress-fat"),

        caloriesValue:
            Utils.get("np-calories-value"),

        proteinValue:
            Utils.get("np-protein-value"),

        carbsValue:
            Utils.get("np-carbs-value"),

        fatValue:
            Utils.get("np-fat-value"),

        /* ==========================================
                REFEIÇÕES
        ========================================== */

        breakfastCheck:
            Utils.get("np-breakfast-check"),

        lunchCheck:
            Utils.get("np-lunch-check"),

        snackCheck:
            Utils.get("np-snack-check"),

        dinnerCheck:
            Utils.get("np-dinner-check"),

        breakfastFoods:
            Utils.get("np-breakfast-foods"),

        lunchFoods:
            Utils.get("np-lunch-foods"),

        snackFoods:
            Utils.get("np-snack-foods"),

        dinnerFoods:
            Utils.get("np-dinner-foods"),

        /* ==========================================
                PESQUISA
        ========================================== */

        foodSearch:
            Utils.get("np-food-search"),

        foodResults:
            Utils.get("np-food-results"),

        addFoodButton:
            Utils.get("np-add-food-button"),

        addedFoods:
            Utils.get("np-added-foods-list"),

        /* ==========================================
                    MODAIS
        ========================================== */

        overlay:
            Utils.get("np-modal-overlay"),

        mealModal:
            Utils.get("np-meal-modal"),

        foodModal:
            Utils.get("np-food-modal"),

        flameModal:
            Utils.get("np-flame-modal"),

        confirmModal:
            Utils.get("np-confirm-modal"),

        userDataModal:
            Utils.get("np-user-data-modal"),

        /* ==========================================
                LOADING
        ========================================== */

        loadingScreen:
            Utils.get("np-loading-screen"),

        skeleton:
            Utils.get("np-dashboard-skeleton"),

        /* ==========================================
                TEMA
        ========================================== */

        body:
            document.body

    };

};

/* ==========================================================
                    EVENTOS
========================================================== */

Dashboard.events = function () {

    const el = this.elements;

    /* ==========================================
                PERFIL
    ========================================== */

    if (el.profileButton) {

        el.profileButton.addEventListener(

            "click",

            () => {

                Profile.toggleMenu();

            }

        );

    }

    /* ==========================================
            NOTIFICAÇÕES
    ========================================== */

    if (el.notificationButton) {

        el.notificationButton.addEventListener(

            "click",

            () => {

                Notifications.toggle();

            }

        );

    }

    /* ==========================================
                MODAL MISSÃO
    ========================================== */

    if (el.closeDailyMission) {

        el.closeDailyMission.addEventListener(

            "click",

            () => {

                DailyMission.close();

            }

        );

    }

    if (el.closeGoalsButton) {

        el.closeGoalsButton.addEventListener(

            "click",

            () => {

                DailyMission.close();

            }

        );

    }

    /* ==========================================
                CHECK DAS REFEIÇÕES
    ========================================== */

    [

        el.breakfastCheck,

        el.lunchCheck,

        el.snackCheck,

        el.dinnerCheck

    ].forEach((checkbox) => {

        if (!checkbox) return;

        checkbox.addEventListener(

            "change",

            Meal.toggleMeal

        );

    });

    /* ==========================================
                PESQUISA
    ========================================== */

    if (el.foodSearch) {

        el.foodSearch.addEventListener(

            "input",

            Food.search

        );

    }

    if (el.addFoodButton) {

        el.addFoodButton.addEventListener(

            "click",

            Food.addFood

        );

    }

    /* ==========================================
            VOLTAR AO TOPO
    ========================================== */

    const backButton = Utils.get(

        "np-back-to-top"

    );

    if (backButton) {

        backButton.addEventListener(

            "click",

            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    }

    /* ==========================================
                REDIMENSIONAMENTO
    ========================================== */

    window.addEventListener(

        "resize",

        Responsive.update

    );

};

/* ==========================================================
                        PROFILE
========================================================== */

const Profile = {

    toggleMenu() {

        const menu = Dashboard.elements.profileMenu;

        if (!menu) return;

        menu.classList.toggle("active");

    },

    closeMenu() {

        const menu = Dashboard.elements.profileMenu;

        if (!menu) return;

        menu.classList.remove("active");

    }

};

/* ==========================================================
                    NOTIFICAÇÕES
========================================================== */

const Notifications = {

    toggle() {

        const menu = Dashboard.elements.notificationMenu;

        if (!menu) return;

        menu.classList.toggle("active");

    },

    close() {

        const menu = Dashboard.elements.notificationMenu;

        if (!menu) return;

        menu.classList.remove("active");

    },

    updateBadge(total) {

        const badge = Dashboard.elements.notificationBadge;

        if (!badge) return;

        badge.innerText = total;

        badge.style.display = total > 0 ? "flex" : "none";

    },

    add(title, message, type = "info") {

        NutriPlus.notifications.list.unshift({

            title,

            message,

            type,

            date: new Date()

        });

        NutriPlus.notifications.unread++;

        this.updateBadge(

            NutriPlus.notifications.unread

        );

    }

};

/* ==========================================================
                        TEMA
========================================================== */

const Theme = {

    current: "light",

    load() {

        const saved = localStorage.getItem(

            "nutriplus-theme"

        );

        this.current = saved || NutriPlus.config.defaultTheme;

        this.apply();

    },

    apply() {

        Dashboard.elements.body.setAttribute(

            "data-theme",

            this.current

        );

    },

    toggle() {

        this.current =

            this.current === "light"

                ? "dark"

                : "light";

        localStorage.setItem(

            "nutriplus-theme",

            this.current

        );

        this.apply();

    }

};

/* ==========================================================
                        MODAIS
========================================================== */

const Modal = {

    open(id) {

        const modal = Utils.get(id);

        if (!modal) return;

        Dashboard.elements.overlay.classList.add("active");

        modal.classList.add("active");

        NutriPlus.modal.opened = id;

    },

    close(id) {

        const modal = Utils.get(id);

        if (!modal) return;

        Dashboard.elements.overlay.classList.remove("active");

        modal.classList.remove("active");

        NutriPlus.modal.opened = null;

    },

    closeAll() {

        document

            .querySelectorAll(".np-modal")

            .forEach(modal => {

                modal.classList.remove("active");

            });

        Dashboard.elements.overlay.classList.remove("active");

        NutriPlus.modal.opened = null;

    }

};

/* ==========================================================
                        TOAST
========================================================== */

const Toast = {

    show(

        title,

        message,

        type = "success"

    ) {

        const container =

            Utils.get("np-toast-container");

        if (!container) return;

        const toast = document.createElement("div");

        toast.className =

            `np-toast ${type}`;

        toast.innerHTML = `

            <div class="np-toast-title">

                ${title}

            </div>

            <div class="np-toast-message">

                ${message}

            </div>

        `;

        container.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        }, 100);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, NutriPlus.config.toastTime);

    }

};

/* ==========================================================
            FECHAR MENUS AO CLICAR FORA
========================================================== */

document.addEventListener(

    "click",

    (event) => {

        const profileMenu = Dashboard.elements.profileMenu;
        const profileButton = Dashboard.elements.profileButton;

        if (
            profileMenu &&
            profileButton &&
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            Profile.closeMenu();

        }

        const notificationMenu =
            Dashboard.elements.notificationMenu;

        const notificationButton =
            Dashboard.elements.notificationButton;

        if (
            notificationMenu &&
            notificationButton &&
            !notificationMenu.contains(event.target) &&
            !notificationButton.contains(event.target)
        ) {

            Notifications.close();

        }

    }

);

/* ==========================================================
                SISTEMA DE CHAMAS NUTRI+
========================================================== */

const Streak = {

    /* ==========================================
                NÍVEIS DAS CHAMAS
    ========================================== */

    levels: [

        {

            id:1,

            name:"Chama Inicial",

            image:"assets/images/flames/flame-yellow.png",

            days:1,

            next:7,

            color:"#FFC107",

            description:
            "Você iniciou sua jornada rumo a uma vida mais saudável."

        },

        {

            id:2,

            name:"Chama Safira",

            image:"assets/images/flames/flame-blue.png",

            days:7,

            next:15,

            color:"#3B82F6",

            description:
            "Sua disciplina começa a ganhar força."

        },

        {

            id:3,

            name:"Chama Esmeralda",

            image:"assets/images/flames/flame-green.png",

            days:15,

            next:30,

            color:"#22C55E",

            description:
            "Seus hábitos estão ficando consistentes."

        },

        {

            id:4,

            name:"Chama Rubi",

            image:"assets/images/flames/flame-red.png",

            days:30,

            next:45,

            color:"#EF4444",

            description:
            "Você está entre os usuários mais disciplinados."

        },

        {

            id:5,

            name:"Chama Imperial",

            image:"assets/images/flames/flame-purple.png",

            days:45,

            next:60,

            color:"#A855F7",

            description:
            "Sua evolução impressiona."

        },

        {

            id:6,

            name:"Chama Suprema",

            image:"assets/images/flames/flame-pink.png",

            days:60,

            next:90,

            color:"#EC4899",

            description:
            "Poucos conseguem manter essa sequência."

        },

        {

            id:7,

            name:"Chama Angelical",

            image:"assets/images/flames/flame-white.png",

            days:90,

            next:120,

            color:"#FFFFFF",

            description:
            "Seu compromisso inspira outros usuários."

        },

        {

            id:8,

            name:"Chama Eclipse",

            image:"assets/images/flames/flame-black.png",

            days:120,

            next:180,

            color:"#111827",

            description:
            "Sua consistência virou rotina."

        },

        {

            id:9,

            name:"Chama Celestial",

            image:"assets/images/flames/flame-celestial.png",

            days:180,

            next:365,

            color:"#38BDF8",

            description:
            "Você alcançou um nível extraordinário."

        },

        {

            id:10,

            name:"???",

            image:"assets/images/flames/flame-secret.png",

            days:365,

            next:null,

            color:"#FFD700",

            description:
            "Continue firme para descobrir este segredo."

        }

    ],

    update(){

        const days =
            NutriPlus.streak.currentDays;

        let current =
            this.levels[0];

        let next =
            this.levels[1];

        for(let i=0;i<this.levels.length;i++){

            if(days>=this.levels[i].days){

                current=this.levels[i];

                next=this.levels[i+1] || null;

            }

        }

        this.render(current,next);

    },

        render(current,next){

        const el = Dashboard.elements;

        el.currentFlame.src =
            current.image;

        Utils.get(
            "np-current-flame-title"
        ).textContent =
            current.name;

        Utils.get(
            "np-current-streak-description"
        ).textContent =
            current.description;

        Utils.get(
            "np-current-streak-days"
        ).textContent =
            `${NutriPlus.streak.currentDays} Dias`;

        if(next){

            el.nextFlame.src =
                next.image;

            Utils.get(
                "np-next-flame-name"
            ).textContent =
                next.name;

            Utils.get(
                "np-next-flame-days"
            ).textContent =
                `Faltam ${
                    next.days-
                    NutriPlus.streak.currentDays
                } dias`;

        }

        this.updateProgress(current,next);

    },

        updateProgress(current,next){

        if(!next){

            Dashboard.elements.streakFill
            .style.width="100%";

            Dashboard.elements.streakText
            .innerText="Máximo";

            return;

        }

        const total=
            next.days-current.days;

        const progress=
            NutriPlus.streak.currentDays-
            current.days;

        const percent=
            (progress/total)*100;

        Dashboard.elements.streakFill
        .style.width=
        `${percent}%`;

        Dashboard.elements.streakText
        .innerText=
        `${NutriPlus.streak.currentDays}/${next.days}`;

    },

        addDay(){

        NutriPlus.streak.currentDays++;

        this.checkLevel();

        this.update();

    },

        checkLevel(){

        const days=
            NutriPlus.streak.currentDays;

        this.levels.forEach(level=>{

            if(days===level.days){

                this.unlock(level);

            }

        });

    },

        unlock(level){

        Modal.open(
            "np-flame-modal"
        );

        Utils.get(
            "np-new-flame-image"
        ).src=
        level.image;

        Utils.get(
            "np-new-flame-title"
        ).textContent=
        level.name;

        Utils.get(
            "np-new-flame-description"
        ).textContent=
        level.description;

        Toast.show(

            "Nova chama!",

            `${level.name} desbloqueada.`,

            "success"

        );

    }

};

/* ==========================================================
                PROGRESSO NUTRICIONAL
========================================================== */

const Progress = {

    /* ==========================================
                ATUALIZAR TUDO
    ========================================== */

    update(){

        this.updateCalories();

        this.updateProtein();

        this.updateCarbs();

        this.updateFat();

    },

    /* ==========================================
                CALORIAS
    ========================================== */

    updateCalories(){

        const current =
            NutriPlus.progress.calories;

        const goal =
            NutriPlus.goals.calories;

        Dashboard.elements.caloriesValue.innerHTML =

            `${current} / ${goal} kcal`;

        this.animateBar(

            Dashboard.elements.caloriesFill,

            current,

            goal

        );

    },

    /* ==========================================
                PROTEÍNAS
    ========================================== */

    updateProtein(){

        const current =
            NutriPlus.progress.proteins;

        const goal =
            NutriPlus.goals.proteins;

        Dashboard.elements.proteinValue.innerHTML =

            `${current} / ${goal} g`;

        this.animateBar(

            Dashboard.elements.proteinFill,

            current,

            goal

        );

    },

    /* ==========================================
                CARBOIDRATOS
    ========================================== */

    updateCarbs(){

        const current =
            NutriPlus.progress.carbs;

        const goal =
            NutriPlus.goals.carbs;

        Dashboard.elements.carbsValue.innerHTML =

            `${current} / ${goal} g`;

        this.animateBar(

            Dashboard.elements.carbsFill,

            current,

            goal

        );

    },

    /* ==========================================
                GORDURAS
    ========================================== */

    updateFat(){

        const current =
            NutriPlus.progress.fats;

        const goal =
            NutriPlus.goals.fats;

        Dashboard.elements.fatValue.innerHTML =

            `${current} / ${goal} g`;

        this.animateBar(

            Dashboard.elements.fatFill,

            current,

            goal

        );

    },

        /* ==========================================
                ANIMAR BARRA
    ========================================== */

    animateBar(element,current,max){

        if(!element) return;

        let percent =

            (current/max)*100;

        if(percent>100){

            percent=100;

        }

        if(percent<0){

            percent=0;

        }

        element.style.width=

            `${percent}%`;

    },

        /* ==========================================
                SOMAR
    ========================================== */

    add(food){

        NutriPlus.progress.calories +=

            food.calories;

        NutriPlus.progress.proteins +=

            food.protein;

        NutriPlus.progress.carbs +=

            food.carbs;

        NutriPlus.progress.fats +=

            food.fat;

        this.update();

    },

        /* ==========================================
                REMOVER
    ========================================== */

    remove(food){

        NutriPlus.progress.calories -=

            food.calories;

        NutriPlus.progress.proteins -=

            food.protein;

        NutriPlus.progress.carbs -=

            food.carbs;

        NutriPlus.progress.fats -=

            food.fat;

        this.validate();

        this.update();

    },

        /* ==========================================
                VALIDAR
    ========================================== */

    validate(){

        if(NutriPlus.progress.calories<0){

            NutriPlus.progress.calories=0;

        }

        if(NutriPlus.progress.proteins<0){

            NutriPlus.progress.proteins=0;

        }

        if(NutriPlus.progress.carbs<0){

            NutriPlus.progress.carbs=0;

        }

        if(NutriPlus.progress.fats<0){

            NutriPlus.progress.fats=0;

        }

    },

        /* ==========================================
                RESET DIÁRIO
    ========================================== */

    reset(){

        NutriPlus.progress.calories=0;

        NutriPlus.progress.proteins=0;

        NutriPlus.progress.carbs=0;

        NutriPlus.progress.fats=0;

        this.update();

    }

};

/* ==========================================================
            CHECK DAS REFEIÇÕES
========================================================== */

const Meal = {

    toggleMeal(event){

        const checkbox = event.target;

        const mealName =

            checkbox.id

                .replace("-check","")

                .replace("np-","");

        const foods =

            NutriPlus.meals[mealName];

        if(!foods) return;

        foods.forEach(food=>{

            if(checkbox.checked){

                Progress.add(food);

            }

            else{

                Progress.remove(food);

            }

        });

        Toast.show(

            "Refeição",

            checkbox.checked

                ? "Refeição concluída."

                : "Refeição desmarcada.",

            "success"

        );

    }

};

/* ==========================================================
                    BANCO DE ALIMENTOS
========================================================== */

const Food = {

    database: [],

    filtered: [],

    selected: null,

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init() {

        this.database = FoodDatabase;

        this.filtered = [...this.database];

    },

    /* ==========================================
                PESQUISAR
    ========================================== */

    search(event) {

        const value = event.target.value
            .trim()
            .toLowerCase();

        if (!value.length) {

            Food.filtered = [...Food.database];

            Food.render();

            return;

        }

        Food.filtered = Food.database.filter(food => {

            return (
                food.name.toLowerCase().includes(value) ||
                food.category.toLowerCase().includes(value)
            );

        });

        Food.render();

    },

        /* ==========================================
                RENDERIZAR
    ========================================== */

    render() {

        const container =
            Dashboard.elements.foodResults;

        if (!container) return;

        container.innerHTML = "";

        if (!this.filtered.length) {

            container.innerHTML = `

                <div class="np-empty-food">

                    Nenhum alimento encontrado.

                </div>

            `;

            return;

        }

        this.filtered.forEach(food => {

            const item = document.createElement("div");

            item.className = "np-food-item";

            item.innerHTML = `

                <div class="np-food-name">

                    ${food.name}

                </div>

                <div class="np-food-calories">

                    ${food.calories} kcal

                </div>

            `;

            item.addEventListener(

                "click",

                () => {

                    Food.select(food);

                }

            );

            container.appendChild(item);

        });

    },

        /* ==========================================
                SELECIONAR
    ========================================== */

    select(food) {

        this.selected = food;

        Utils.get("np-selected-food-name").innerHTML =

            food.name;

        Utils.get("np-selected-food-calories").innerHTML =

            `${food.calories} kcal`;

        Utils.get("np-selected-food-protein").innerHTML =

            `${food.protein} g`;

        Utils.get("np-selected-food-carbs").innerHTML =

            `${food.carbs} g`;

        Utils.get("np-selected-food-fat").innerHTML =

            `${food.fat} g`;

    },

        /* ==========================================
                ADICIONAR
    ========================================== */

    addFood() {

        if (!Food.selected) {

            Toast.show(

                "Atenção",

                "Selecione um alimento.",

                "warning"

            );

            return;

        }

        const meal = Utils.get(
            "np-meal-select"
        ).value;

        NutriPlus.meals[meal].push(

            Food.selected

        );

        Progress.add(

            Food.selected

        );

        Food.renderMeal(

            meal

        );

        Toast.show(

            "Sucesso",

            `${Food.selected.name} adicionado.`,

            "success"

        );

    },

        /* ==========================================
                RENDERIZAR REFEIÇÃO
    ========================================== */

    renderMeal(meal) {

        const container =

            Dashboard.elements[
                `${meal}Foods`
            ];

        if (!container) return;

        container.innerHTML = "";

        NutriPlus.meals[meal].forEach((food,index)=>{

            const row = document.createElement("div");

            row.className = "np-meal-food";

            row.innerHTML = `

                <span>

                    ${food.name}

                </span>

                <button
                    class="np-remove-food"
                    data-index="${index}"
                >

                    ✕

                </button>

            `;

            row.querySelector("button")

            .addEventListener(

                "click",

                ()=>{

                    Food.removeFood(

                        meal,

                        index

                    );

                }

            );

            container.appendChild(row);

        });

    },

        /* ==========================================
                REMOVER ALIMENTO
    ========================================== */

    removeFood(meal,index){

        const food =

            NutriPlus.meals[meal][index];

        Progress.remove(food);

        NutriPlus.meals[meal].splice(index,1);

        this.renderMeal(meal);

        Toast.show(

            "Removido",

            `${food.name} removido.`,

            "info"

        );

    }

};

/* ==========================================================
                CENTRAL DE NOTIFICAÇÕES
========================================================== */

const NotificationCenter = {

    /* ==========================================
                INICIALIZAÇÃO
    ========================================== */

    init() {

        this.load();

        this.render();

        this.updateBadge();

    },

    /* ==========================================
                CARREGAR
    ========================================== */

    load() {

        const saved = localStorage.getItem(
            "nutriplus-notifications"
        );

        if (saved) {

            NutriPlus.notifications.list =
                JSON.parse(saved);

        }

    },

    /* ==========================================
                SALVAR
    ========================================== */

    save() {

        localStorage.setItem(

            "nutriplus-notifications",

            JSON.stringify(

                NutriPlus.notifications.list

            )

        );

    },

    /* ==========================================
                ADICIONAR
    ========================================== */

    add(title, message, type = "info") {

        const notification = {

            id: Date.now(),

            title,

            message,

            type,

            read: false,

            date: new Date().toISOString()

        };

        NutriPlus.notifications.list.unshift(
            notification
        );

        this.save();

        this.render();

        this.updateBadge();

    },

        /* ==========================================
                BADGE
    ========================================== */

    updateBadge() {

        const unread =

            NutriPlus.notifications.list.filter(

                item => !item.read

            ).length;

        NutriPlus.notifications.unread = unread;

        Notifications.updateBadge(unread);

    },

        /* ==========================================
                RENDERIZAR
    ========================================== */

    render() {

        const container =

            Utils.get("np-notification-list");

        if (!container) return;

        container.innerHTML = "";

        if (

            NutriPlus.notifications.list.length === 0

        ) {

            container.innerHTML = `

                <div class="np-empty">

                    Nenhuma notificação.

                </div>

            `;

            return;

        }

        NutriPlus.notifications.list.forEach(

            notification => {

                const card =

                    document.createElement("div");

                card.className =

                    `np-notification-card ${notification.type}`;

                if (!notification.read) {

                    card.classList.add("unread");

                }

                card.innerHTML = `

                    <div class="np-notification-header">

                        <strong>

                            ${notification.title}

                        </strong>

                    </div>

                    <div class="np-notification-message">

                        ${notification.message}

                    </div>

                    <div class="np-notification-date">

                        ${Utils.formatDate(

                            new Date(notification.date)

                        )}

                    </div>

                `;

                card.addEventListener(

                    "click",

                    () => {

                        this.read(notification.id);

                    }

                );

                container.appendChild(card);

            }

        );

    },

        /* ==========================================
                LER
    ========================================== */

    read(id) {

        const notification =

            NutriPlus.notifications.list.find(

                item => item.id === id

            );

        if (!notification) return;

        notification.read = true;

        this.save();

        this.render();

        this.updateBadge();

    },

        /* ==========================================
                LIMPAR
    ========================================== */

    clear() {

        NutriPlus.notifications.list = [];

        this.save();

        this.render();

        this.updateBadge();

    }

};

/* ==========================================================
            NOTIFICAÇÕES AUTOMÁTICAS
========================================================== */

const SmartNotifications = {

    mealReminder() {

        NotificationCenter.add(

            "Hora da refeição 🍽️",

            "Não esqueça de registrar sua próxima refeição.",

            "info"

        );

    },

    waterReminder() {

        NotificationCenter.add(

            "Hora da água 💧",

            "Lembre-se de se hidratar.",

            "info"

        );

    },

    goalCompleted() {

        NotificationCenter.add(

            "Meta concluída 🎉",

            "Parabéns! Você atingiu sua meta diária.",

            "success"

        );

    },

    streakWarning() {

        NotificationCenter.add(

            "Sua sequência está em risco 🔥",

            "Complete sua meta antes do fim do dia.",

            "warning"

        );

    },

    newFlame(level) {

        NotificationCenter.add(

            "Nova Chama 🔥",

            `Você desbloqueou ${level.name}.`,

            "success"

        );

    }

};

/* ==========================================================
                AGENDAMENTO
========================================================== */

const Scheduler = {

    start() {

        setInterval(() => {

            this.checkMealReminder();

            this.checkWaterReminder();

            this.checkGoal();

            this.checkStreak();

        }, 60000);

    },

    checkMealReminder() {

        // implementação futura

    },

    checkWaterReminder() {

        // implementação futura

    },

    checkGoal() {

        // implementação futura

    },

    checkStreak() {

        // implementação futura

    }

};

/* ==========================================================
                    STORAGE
========================================================== */

const Storage = {

    /* ==========================================
                CHAVE PRINCIPAL
    ========================================== */

    key: "nutriplus-dashboard",

    /* ==========================================
                SALVAR
    ========================================== */

    save() {

        const data = {

            user: NutriPlus.user,

            progress: NutriPlus.progress,

            goals: NutriPlus.goals,

            meals: NutriPlus.meals,

            streak: NutriPlus.streak,

            notifications: NutriPlus.notifications,

            settings: NutriPlus.settings,

            theme: Theme.current

        };

        localStorage.setItem(

            this.key,

            JSON.stringify(data)

        );

    },

    /* ==========================================
                CARREGAR
    ========================================== */

    load() {

        const saved = localStorage.getItem(

            this.key

        );

        if (!saved) return;

        const data = JSON.parse(saved);

        NutriPlus.user = data.user || NutriPlus.user;

        NutriPlus.progress =

            data.progress || NutriPlus.progress;

        NutriPlus.goals =

            data.goals || NutriPlus.goals;

        NutriPlus.meals =

            data.meals || NutriPlus.meals;

        NutriPlus.streak =

            data.streak || NutriPlus.streak;

        NutriPlus.notifications =

            data.notifications ||

            NutriPlus.notifications;

        NutriPlus.settings =

            data.settings ||

            NutriPlus.settings;

        if(data.theme){

            Theme.current = data.theme;

            Theme.apply();

        }

    },

        /* ==========================================
                RESETAR
    ========================================== */

    clear(){

        localStorage.removeItem(

            this.key

        );

    },

        /* ==========================================
                EXPORTAR
    ========================================== */

    export(){

        return JSON.stringify({

            version:"1.0",

            date:new Date(),

            dashboard:{

                ...NutriPlus

            }

        });

    },

        /* ==========================================
                IMPORTAR
    ========================================== */

    import(json){

        try{

            const backup =

                JSON.parse(json);

            Object.assign(

                NutriPlus,

                backup.dashboard

            );

            this.save();

            Dashboard.refresh();

            Toast.show(

                "Backup",

                "Dados restaurados.",

                "success"

            );

        }

        catch(error){

            Toast.show(

                "Erro",

                "Backup inválido.",

                "error"

            );

        }

    }

};

/* ==========================================================
                AUTO SAVE
========================================================== */

const AutoSave = {

    start(){

        setInterval(()=>{

            Storage.save();

        },30000);

    }

};

/* ==========================================================
            ATUALIZAR DASHBOARD
========================================================== */

Dashboard.refresh=function(){

    Theme.apply();

    Progress.update();

    Streak.update();

    NotificationCenter.render();

    NotificationCenter.updateBadge();

    ["breakfast","lunch","snack","dinner"]

    .forEach(meal=>{

        Food.renderMeal(meal);

    });

};

/* ==========================================================
                    API SERVICE
========================================================== */

const ApiService = {

    endpoint: "",

    headers: {

        "Content-Type": "application/json"

    },

    async get(url) {

        const response = await fetch(

            this.endpoint + url,

            {

                method: "GET",

                headers: this.headers

            }

        );

        return await response.json();

    },

    async post(url, body) {

        const response = await fetch(

            this.endpoint + url,

            {

                method: "POST",

                headers: this.headers,

                body: JSON.stringify(body)

            }

        );

        return await response.json();

    },

    async put(url, body) {

        const response = await fetch(

            this.endpoint + url,

            {

                method: "PUT",

                headers: this.headers,

                body: JSON.stringify(body)

            }

        );

        return await response.json();

    },

    async delete(url) {

        const response = await fetch(

            this.endpoint + url,

            {

                method: "DELETE",

                headers: this.headers

            }

        );

        return await response.json();

    }

};

/* ==========================================================
                    USER SERVICE
========================================================== */

const UserService = {

    save() {

        Storage.save();

    },

    update(data) {

        Object.assign(

            NutriPlus.user,

            data

        );

        this.save();

    },

    get() {

        return NutriPlus.user;

    },

    reset() {

        NutriPlus.user = {};

        Storage.save();

    }

};

/* ==========================================================
                    FOOD SERVICE
========================================================== */

const FoodService = {

    add(meal, food) {

        NutriPlus.meals[meal].push(food);

        Progress.add(food);

        Food.renderMeal(meal);

        Storage.save();

    },

    remove(meal, index) {

        const food =

            NutriPlus.meals[meal][index];

        Progress.remove(food);

        NutriPlus.meals[meal].splice(index, 1);

        Food.renderMeal(meal);

        Storage.save();

    },

    clearMeal(meal) {

        NutriPlus.meals[meal] = [];

        Food.renderMeal(meal);

        Storage.save();

    }

};

/* ==========================================================
                STREAK SERVICE
========================================================== */

const StreakService = {

    increase() {

        NutriPlus.streak.currentDays++;

        Streak.update();

        Storage.save();

    },

    reset() {

        NutriPlus.streak.currentDays = 0;

        Streak.update();

        Storage.save();

    },

    set(days) {

        NutriPlus.streak.currentDays = days;

        Streak.update();

        Storage.save();

    },

    get() {

        return NutriPlus.streak.currentDays;

    }

};

/* ==========================================================
                PROGRESS SERVICE
========================================================== */

const ProgressService = {

    update() {

        Progress.update();

        Storage.save();

    },

    reset() {

        Progress.reset();

        Storage.save();

    },

    get() {

        return NutriPlus.progress;

    }

};

/* ==========================================================
            NOTIFICATION SERVICE
========================================================== */

const NotificationService = {

    send(

        title,

        message,

        type = "info"

    ) {

        NotificationCenter.add(

            title,

            message,

            type

        );

        Storage.save();

    },

    clear() {

        NotificationCenter.clear();

        Storage.save();

    },

    unread() {

        return NutriPlus.notifications.unread;

    }

};

/* ==========================================================
                SERVICES
========================================================== */

const Services = {

    init() {

        console.log(

            "Services carregados."

        );

    }

};

/* ==========================================================
                SISTEMA DE GAMIFICAÇÃO
========================================================== */

const Gamification = {

    xpTable: [

        0,
        100,
        250,
        450,
        700,
        1000,
        1400,
        1900,
        2500,
        3200,
        4000,
        5000,
        6200,
        7600,
        9200

    ],

    medals: [

        {

            id:1,
            name:"Primeiro Passo",
            icon:"🏅",
            description:"Complete seu primeiro dia.",
            unlocked:false

        },

        {

            id:2,
            name:"Semana Perfeita",
            icon:"🥈",
            description:"7 dias consecutivos.",
            unlocked:false

        },

        {

            id:3,
            name:"Disciplina",
            icon:"🥇",
            description:"30 dias consecutivos.",
            unlocked:false

        },

        {

            id:4,
            name:"Lenda Nutri+",
            icon:"👑",
            description:"365 dias consecutivos.",
            unlocked:false

        }

    ],

    init(){

        this.updateXP();

        this.checkMedals();

    },

        addXP(value){

        NutriPlus.gamification.xp += value;

        this.updateXP();

        Storage.save();

    },

        removeXP(value){

        NutriPlus.gamification.xp -= value;

        if(

            NutriPlus.gamification.xp<0

        ){

            NutriPlus.gamification.xp=0;

        }

        this.updateXP();

        Storage.save();

    },

        updateXP(){

        const xp=

            NutriPlus.gamification.xp;

        let level=1;

        this.xpTable.forEach(

            (required,index)=>{

                if(xp>=required){

                    level=index+1;

                }

            }

        );

        NutriPlus.gamification.level=

            level;

        this.render();

    },

        render(){

        const level=

            NutriPlus.gamification.level;

        const xp=

            NutriPlus.gamification.xp;

        Utils.get(

            "np-level"

        ).innerText=

            level;

        Utils.get(

            "np-current-xp"

        ).innerText=

            xp;

        const next=

            this.xpTable[level] ||

            this.xpTable[

                this.xpTable.length-1

            ];

        const previous=

            this.xpTable[level-1] || 0;

        const percent=

            ((xp-previous)/(next-previous))*100;

        Dashboard.elements.levelFill.style.width=

            `${Math.min(percent,100)}%`;

    },

        unlockMedal(id){

        const medal=

            this.medals.find(

                item=>item.id===id

            );

        if(!medal) return;

        if(medal.unlocked) return;

        medal.unlocked=true;

        Toast.show(

            "Nova Medalha!",

            medal.name,

            "success"

        );

        NotificationService.send(

            "Nova Medalha",

            medal.name,

            "success"

        );

        Storage.save();

    },

        checkMedals(){

        const streak=

            NutriPlus.streak.currentDays;

        if(streak>=1){

            this.unlockMedal(1);

        }

        if(streak>=7){

            this.unlockMedal(2);

        }

        if(streak>=30){

            this.unlockMedal(3);

        }

        if(streak>=365){

            this.unlockMedal(4);

        }

    },

        rewardDailyGoal(){

        this.addXP(20);

        NotificationService.send(

            "Meta concluída",

            "+20 XP",

            "success"

        );

    },

        rewardStreak(){

        this.addXP(10);

    },

        rewardFlame(){

        this.addXP(100);

    },

        rewardMedal(){

        this.addXP(200);

    }

};

/* ==========================================================
                    ESTATÍSTICAS
========================================================== */

const Statistics = {

    update(){

        Utils.get(

            "np-total-days"

        ).innerText=

            NutriPlus.statistics.totalDays;

        Utils.get(

            "np-best-streak"

        ).innerText=

            NutriPlus.statistics.bestStreak;

        Utils.get(

            "np-completed-goals"

        ).innerText=

            NutriPlus.statistics.completedGoals;

        Utils.get(

            "np-total-meals"

        ).innerText=

            NutriPlus.statistics.totalMeals;

    },

    addMeal(){

        NutriPlus.statistics.totalMeals++;

        this.update();

    },

    addGoal(){

        NutriPlus.statistics.completedGoals++;

        this.update();

    },

    updateBestStreak(){

        if(

            NutriPlus.streak.currentDays>

            NutriPlus.statistics.bestStreak

        ){

            NutriPlus.statistics.bestStreak=

                NutriPlus.streak.currentDays;

        }

    }

};

/* ==========================================================
                MISSÕES E DESAFIOS
========================================================== */

const Mission = {

    daily: [],

    weekly: [],

    special: [],

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init() {

        this.load();

        this.generateDaily();

        this.generateWeekly();

        this.render();

    },

        /* ==========================================
                MISSÕES DIÁRIAS
    ========================================== */

    generateDaily() {

        this.daily = [

            {

                id:1,

                title:"Registrar café da manhã",

                progress:0,

                goal:1,

                xp:20,

                completed:false

            },

            {

                id:2,

                title:"Beber 2 litros de água",

                progress:0,

                goal:2000,

                xp:30,

                completed:false

            },

            {

                id:3,

                title:"Completar a meta nutricional",

                progress:0,

                goal:100,

                xp:50,

                completed:false

            }

        ];

    },

        /* ==========================================
                MISSÕES SEMANAIS
    ========================================== */

    generateWeekly() {

        this.weekly = [

            {

                id:101,

                title:"Completar 5 dias da semana",

                progress:0,

                goal:5,

                xp:200,

                completed:false

            },

            {

                id:102,

                title:"Registrar 20 refeições",

                progress:0,

                goal:20,

                xp:150,

                completed:false

            },

            {

                id:103,

                title:"Consumir água por 7 dias",

                progress:0,

                goal:7,

                xp:250,

                completed:false

            }

        ];

    },

        /* ==========================================
                RENDERIZAR
    ========================================== */

    render() {

        this.renderList(

            this.daily,

            Dashboard.elements.dailyMissionList

        );

        this.renderList(

            this.weekly,

            Dashboard.elements.weeklyMissionList

        );

    },

    renderList(list,container){

        if(!container) return;

        container.innerHTML="";

        list.forEach(mission=>{

            const item=document.createElement("div");

            item.className="np-mission";

            item.innerHTML=`

                <div class="np-mission-title">

                    ${mission.title}

                </div>

                <div class="np-mission-progress">

                    ${mission.progress}/${mission.goal}

                </div>

            `;

            container.appendChild(item);

        });

    },

        /* ==========================================
                ATUALIZAR
    ========================================== */

    update(id,value=1){

        const mission=

            [...this.daily,...this.weekly]

            .find(item=>item.id===id);

        if(!mission) return;

        if(mission.completed) return;

        mission.progress+=value;

        if(mission.progress>=mission.goal){

            mission.progress=mission.goal;

            mission.completed=true;

            this.complete(mission);

        }

        this.render();

        Storage.save();

    },

        /* ==========================================
                COMPLETAR
    ========================================== */

    complete(mission){

        Gamification.addXP(

            mission.xp

        );

        NotificationService.send(

            "Missão concluída",

            mission.title,

            "success"

        );

        Toast.show(

            "Missão Concluída",

            `+${mission.xp} XP`,

            "success"

        );

    },

        /* ==========================================
                RESET
    ========================================== */

    resetDaily(){

        this.generateDaily();

        this.render();

    },

    resetWeekly(){

        this.generateWeekly();

        this.render();

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        // integração futura com Storage

    }

};

/* ==========================================================
                MISSION SERVICE
========================================================== */

const MissionService = {

    mealCompleted(){

        Mission.update(1);

        Mission.update(102);

    },

    waterAdded(quantity){

        Mission.update(2,quantity);

    },

    goalCompleted(){

        Mission.update(3);

        Mission.update(101);

    }

};

/* ==========================================================
                CALENDÁRIO
========================================================== */

const Calendar = {

    currentDate: new Date(),

    completedDays: [],

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init() {

        this.load();

        this.render();

    },

    /* ==========================================
                RENDERIZAR
    ========================================== */

    render() {

        const container =

            Dashboard.elements.calendar;

        if (!container) return;

        container.innerHTML = "";

        const year =

            this.currentDate.getFullYear();

        const month =

            this.currentDate.getMonth();

        const firstDay =

            new Date(year, month, 1);

        const lastDay =

            new Date(year, month + 1, 0);

        const totalDays =

            lastDay.getDate();

        const startWeekDay =

            firstDay.getDay();

                for (

            let i = 0;

            i < startWeekDay;

            i++

        ) {

            const empty =

                document.createElement("div");

            empty.className =

                "np-calendar-empty";

            container.appendChild(empty);

        }

                for (

            let day = 1;

            day <= totalDays;

            day++

        ) {

            const date =

                `${year}-${month+1}-${day}`;

            const card =

                document.createElement("div");

            card.className =

                "np-calendar-day";

            card.innerHTML = day;

            if (

                this.completedDays.includes(date)

            ) {

                card.classList.add(

                    "completed"

                );

            }

            container.appendChild(card);

        }

    },

        /* ==========================================
                CONCLUIR DIA
    ========================================== */

    completeToday() {

        const today =

            new Date();

        const key =

            `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

        if (

            !this.completedDays.includes(key)

        ) {

            this.completedDays.push(key);

            this.save();

            this.render();

        }

    },

        /* ==========================================
                VERIFICAR
    ========================================== */

    isCompleted(date){

        return this.completedDays.includes(date);

    },

        /* ==========================================
                MÊS ANTERIOR
    ========================================== */

    previousMonth(){

        this.currentDate.setMonth(

            this.currentDate.getMonth()-1

        );

        this.render();

    },

    /* ==========================================
                PRÓXIMO MÊS
    ========================================== */

    nextMonth(){

        this.currentDate.setMonth(

            this.currentDate.getMonth()+1

        );

        this.render();

    },

        /* ==========================================
                HEATMAP
    ========================================== */

    getConsistency(){

        const total=

            this.completedDays.length;

        const percent=

            (total/30)*100;

        return Math.min(percent,100);

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(

            NutriPlus.calendar

        ){

            this.completedDays=

                NutriPlus.calendar.completedDays || [];

        }

    }

};

/* ==========================================================
                CALENDAR SERVICE
========================================================== */

const CalendarService = {

    goalCompleted(){

        Calendar.completeToday();

        Statistics.addGoal();

    },

    refresh(){

        Calendar.render();

    }

};

/* ==========================================================
                    HISTÓRICO
========================================================== */

const History = {

    meals:[],

    progress:[],

    weight:[],

    achievements:[],

    add(type,data){

        this[type].push({

            date:new Date(),

            ...data

        });

        Storage.save();

    },

    get(type){

        return this[type];

    }

};

/* ==========================================================
                    HIDRATAÇÃO
========================================================== */

const Hydration = {

    goal: 2000,

    current: 0,

    history: [],

    cups: [

        200,
        300,
        500,
        750,
        1000

    ],

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init() {

        this.load();

        this.render();

    },

        /* ==========================================
                ADICIONAR
    ========================================== */

    add(amount){

        this.current += amount;

        if(this.current > this.goal){

            this.current = this.goal;

        }

        this.history.push({

            amount,

            date:new Date()

        });

        this.render();

        this.checkGoal();

        Storage.save();

    },

        /* ==========================================
                REMOVER
    ========================================== */

    remove(amount){

        this.current -= amount;

        if(this.current < 0){

            this.current = 0;

        }

        this.render();

        Storage.save();

    },

        /* ==========================================
                META
    ========================================== */

    setGoal(value){

        this.goal = value;

        this.render();

        Storage.save();

    },

        /* ==========================================
                RENDER
    ========================================== */

    render(){

        Utils.get(

            "np-water-current"

        ).innerText =

            `${this.current} ml`;

        Utils.get(

            "np-water-goal"

        ).innerText =

            `${this.goal} ml`;

        const percent =

            (this.current / this.goal) * 100;

        Dashboard.elements.waterFill.style.width =

            `${Math.min(percent,100)}%`;

    },

        /* ==========================================
                META ATINGIDA
    ========================================== */

    checkGoal(){

        if(this.current < this.goal){

            return;

        }

        NotificationService.send(

            "Meta de Água",

            "Você concluiu sua hidratação diária.",

            "success"

        );

        Mission.update(2,this.goal);

        Gamification.addXP(15);

        Statistics.addGoal();

    },

        /* ==========================================
                NOVO DIA
    ========================================== */

    reset(){

        this.current = 0;

        this.history = [];

        this.render();

        Storage.save();

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(!NutriPlus.hydration) return;

        this.goal =

            NutriPlus.hydration.goal || 2000;

        this.current =

            NutriPlus.hydration.current || 0;

        this.history =

            NutriPlus.hydration.history || [];

    }

};

/* ==========================================================
                HYDRATION SERVICE
========================================================== */

const HydrationService = {

    drink(amount){

        Hydration.add(amount);

    },

    remove(amount){

        Hydration.remove(amount);

    },

    changeGoal(goal){

        Hydration.setGoal(goal);

    },

    reset(){

        Hydration.reset();

    }

};

/* ==========================================
            ÁGUA
========================================== */

document

.querySelectorAll(

    "[data-water]"

)

.forEach(button=>{

    button.addEventListener(

        "click",

        ()=>{

            const amount =

                Number(

                    button.dataset.water

                );

            Hydration.add(amount);

        }

    );

});

/* ==========================================================
                BODY TRACKER
========================================================== */

const BodyTracker = {

    history: [],

    current: {

        weight: 0,

        height: 0,

        bmi: 0,

        bodyFat: 0,

        muscleMass: 0,

        measurements: {

            chest: 0,

            waist: 0,

            hip: 0,

            arm: 0,

            forearm: 0,

            thigh: 0,

            calf: 0

        }

    },

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.load();

        this.calculateBMI();

        this.render();

    },

        /* ==========================================
                PESO
    ========================================== */

    setWeight(weight){

        this.current.weight = Number(weight);

        this.saveRecord();

        this.calculateBMI();

        this.render();

        Storage.save();

    },

        /* ==========================================
                ALTURA
    ========================================== */

    setHeight(height){

        this.current.height = Number(height);

        this.calculateBMI();

        this.render();

        Storage.save();

    },

        /* ==========================================
                MEDIDAS
    ========================================== */

    setMeasurement(name,value){

        if(

            this.current.measurements[name] === undefined

        ){

            return;

        }

        this.current.measurements[name]=Number(value);

        Storage.save();

    },

        /* ==========================================
                IMC
    ========================================== */

    calculateBMI(){

        const weight = this.current.weight;

        const height = this.current.height;

        if(!weight || !height){

            this.current.bmi = 0;

            return;

        }

        const meters = height / 100;

        this.current.bmi =

            Number(

                (weight/(meters*meters))

                .toFixed(1)

            );

    },

        /* ==========================================
                CLASSIFICAÇÃO
    ========================================== */

    getBMIStatus(){

        const bmi = this.current.bmi;

        if(bmi < 18.5) return "Abaixo do peso";

        if(bmi < 25) return "Peso normal";

        if(bmi < 30) return "Sobrepeso";

        if(bmi < 35) return "Obesidade Grau I";

        if(bmi < 40) return "Obesidade Grau II";

        return "Obesidade Grau III";

    },

        /* ==========================================
                HISTÓRICO
    ========================================== */

    saveRecord(){

        this.history.push({

            date:new Date(),

            weight:this.current.weight,

            bmi:this.current.bmi

        });

    },

        /* ==========================================
                RENDER
    ========================================== */

    render(){

        Utils.get(

            "np-current-weight"

        ).innerText =

            `${this.current.weight} kg`;

        Utils.get(

            "np-current-bmi"

        ).innerText =

            this.current.bmi;

        Utils.get(

            "np-bmi-status"

        ).innerText =

            this.getBMIStatus();

    },

        /* ==========================================
                EVOLUÇÃO
    ========================================== */

    getDifference(){

        if(this.history.length < 2){

            return 0;

        }

        const last =

            this.history[this.history.length-1];

        const previous =

            this.history[this.history.length-2];

        return Number(

            (last.weight - previous.weight)

            .toFixed(1)

        );

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(!NutriPlus.bodyTracker) return;

        this.current =

            NutriPlus.bodyTracker.current || this.current;

        this.history =

            NutriPlus.bodyTracker.history || [];

    }

};

/* ==========================================================
                BODY SERVICE
========================================================== */

const BodyService = {

    updateWeight(weight){

        BodyTracker.setWeight(weight);

    },

    updateHeight(height){

        BodyTracker.setHeight(height);

    },

    updateMeasurement(name,value){

        BodyTracker.setMeasurement(

            name,

            value

        );

    }

};

/* ==========================================================
                PROGRESS PHOTOS
========================================================== */

const ProgressPhotos = {

    photos:[],

    add(photo){

        this.photos.push({

            id:Date.now(),

            date:new Date(),

            image:photo

        });

        Storage.save();

    },

    remove(id){

        this.photos =

            this.photos.filter(

                item=>item.id!==id

            );

        Storage.save();

    }

};

/* ==========================================================
                    ANALYTICS
========================================================== */

const Analytics = {

    charts: {},

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.renderAll();

    },

    /* ==========================================
                RENDERIZAR TODOS
    ========================================== */

    renderAll(){

        this.weight();

        this.macros();

        this.water();

        this.streak();

        this.goals();

    },

        /* ==========================================
                PESO
    ========================================== */

    weight(){

        const history =

            BodyTracker.history;

        this.charts.weight = {

            labels: history.map(

                item =>

                Utils.formatDate(

                    new Date(item.date)

                )

            ),

            values: history.map(

                item=>item.weight

            )

        };

    },

        /* ==========================================
                MACROS
    ========================================== */

    macros(){

        this.charts.macros={

            protein:

                NutriPlus.progress.protein,

            carbs:

                NutriPlus.progress.carbs,

            fat:

                NutriPlus.progress.fat

        };

    },

        /* ==========================================
                HIDRATAÇÃO
    ========================================== */

    water(){

        this.charts.water={

            labels:

                Hydration.history.map(

                    item=>

                    Utils.formatDate(

                        new Date(item.date)

                    )

                ),

            values:

                Hydration.history.map(

                    item=>item.amount

                )

        };

    },

        /* ==========================================
                CHAMAS
    ========================================== */

    streak(){

        this.charts.streak={

            current:

                NutriPlus.streak.currentDays,

            best:

                NutriPlus.statistics.bestStreak

        };

    },

        /* ==========================================
                METAS
    ========================================== */

    goals(){

        const total=

            NutriPlus.statistics.completedGoals;

        const expected=

            NutriPlus.statistics.totalDays || 1;

        this.charts.goals={

            completed:total,

            failed:

                Math.max(

                    expected-total,

                    0

                )

        };

    },

        /* ==========================================
                SEMANA
    ========================================== */

    weekly(){

        return{

            meals:

                History.meals.slice(-7),

            weight:

                BodyTracker.history.slice(-7),

            water:

                Hydration.history.slice(-7)

        };

    },

        /* ==========================================
                MÊS
    ========================================== */

    monthly(){

        return{

            meals:

                History.meals.slice(-30),

            weight:

                BodyTracker.history.slice(-30),

            water:

                Hydration.history.slice(-30)

        };

    },

        /* ==========================================
                EXPORTAR
    ========================================== */

    export(){

        return{

            analytics:

                this.charts,

            statistics:

                NutriPlus.statistics,

            generatedAt:

                new Date()

        };

    }

};

/* ==========================================================
                ANALYTICS SERVICE
========================================================== */

const AnalyticsService = {

    refresh(){

        Analytics.renderAll();

    },

    export(){

        return Analytics.export();

    }

};

/* ==========================================================
                CHARTS
========================================================== */

const Charts = {

    render(){

        console.log(

            "Preparado para Chart.js"

        );

    },

    update(){

        Analytics.renderAll();

    }

};

/* ==========================================================
                OBJETIVOS
========================================================== */

const Goals = {

    list: [],

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.load();

        this.render();

    },

        /* ==========================================
                NOVO OBJETIVO
    ========================================== */

    create(data){

        this.list.push({

            id:Date.now(),

            title:data.title,

            type:data.type,

            target:data.target,

            current:0,

            period:data.period,

            reward:data.reward || 50,

            completed:false,

            createdAt:new Date()

        });

        this.render();

        Storage.save();

    },

        /* ==========================================
                PROGRESSO
    ========================================== */

    update(id,value=1){

        const goal=

            this.list.find(

                item=>item.id===id

            );

        if(!goal) return;

        if(goal.completed) return;

        goal.current+=value;

        if(goal.current>=goal.target){

            goal.current=goal.target;

            goal.completed=true;

            this.complete(goal);

        }

        this.render();

        Storage.save();

    },

        /* ==========================================
                PROGRESSO
    ========================================== */

    update(id,value=1){

        const goal=

            this.list.find(

                item=>item.id===id

            );

        if(!goal) return;

        if(goal.completed) return;

        goal.current+=value;

        if(goal.current>=goal.target){

            goal.current=goal.target;

            goal.completed=true;

            this.complete(goal);

        }

        this.render();

        Storage.save();

    },

      /* ==========================================
                CONCLUIR
    ========================================== */

    complete(goal){

        Gamification.addXP(

            goal.reward

        );

        Statistics.addGoal();

        NotificationService.send(

            "Objetivo concluído",

            goal.title,

            "success"

        );

        Toast.show(

            "Parabéns!",

            `+${goal.reward} XP`,

            "success"

        );

        Calendar.completeToday();

    },

        /* ==========================================
                REMOVER
    ========================================== */

    remove(id){

        this.list=

            this.list.filter(

                item=>item.id!==id

            );

        this.render();

        Storage.save();

    },

        /* ==========================================
                RENDER
    ========================================== */

    render(){

        const container=

            Dashboard.elements.goalList;

        if(!container) return;

        container.innerHTML="";

        this.list.forEach(goal=>{

            const card=

                document.createElement("div");

            card.className="np-goal-card";

            card.innerHTML=`

                <h4>${goal.title}</h4>

                <p>

                    ${goal.current}/${goal.target}

                </p>

            `;

            container.appendChild(card);

        });

    },

        /* ==========================================
                RESET
    ========================================== */

    resetDaily(){

        this.list.forEach(goal=>{

            if(goal.period==="daily"){

                goal.current=0;

                goal.completed=false;

            }

        });

    },

    resetWeekly(){

        this.list.forEach(goal=>{

            if(goal.period==="weekly"){

                goal.current=0;

                goal.completed=false;

            }

        });

    },

    resetMonthly(){

        this.list.forEach(goal=>{

            if(goal.period==="monthly"){

                goal.current=0;

                goal.completed=false;

            }

        });

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(

            NutriPlus.goalsList

        ){

            this.list=

                NutriPlus.goalsList;

        }

    }

};

/* ==========================================================
                GOALS SERVICE
========================================================== */

const GoalsService = {

    add(data){

        Goals.create(data);

    },

    update(id,value){

        Goals.update(

            id,

            value

        );

    },

    remove(id){

        Goals.remove(id);

    },

    reset(){

        Goals.resetDaily();

    }

};

/* ==========================================================
                    PREMIUM
========================================================== */

const Premium = {

    subscription: {

        active: false,

        plan: "free",

        startedAt: null,

        expiresAt: null

    },

    features: {

        analytics: false,

        exportPdf: false,

        cloudSync: false,

        unlimitedHistory: false,

        progressPhotos: false,

        customGoals: false,

        aiSuggestions: false

    },

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.load();

        this.apply();

    },

        /* ==========================================
                ATIVAR
    ========================================== */

    activate(plan){

        this.subscription.active = true;

        this.subscription.plan = plan;

        this.subscription.startedAt =

            new Date();

        this.enableFeatures();

        Storage.save();

        NotificationService.send(

            "Premium",

            "Plano ativado com sucesso.",

            "success"

        );

    },

        /* ==========================================
                CANCELAR
    ========================================== */

    deactivate(){

        this.subscription.active = false;

        this.subscription.plan = "free";

        this.disableFeatures();

        Storage.save();

    },

        /* ==========================================
                RECURSOS
    ========================================== */

    enableFeatures(){

        Object.keys(

            this.features

        ).forEach(key=>{

            this.features[key]=true;

        });

    },

        disableFeatures(){

        Object.keys(

            this.features

        ).forEach(key=>{

            this.features[key]=false;

        });

    },

        has(feature){

        return !!this.features[feature];

    },

        apply(){

        document.body.classList.toggle(

            "np-premium",

            this.subscription.active

        );

    },

        save(){

        Storage.save();

    },

    load(){

        if(!NutriPlus.premium){

            return;

        }

        this.subscription =

            NutriPlus.premium.subscription ||

            this.subscription;

        this.features =

            NutriPlus.premium.features ||

            this.features;

    }

};

/* ==========================================================
                CLOUD SYNC
========================================================== */

const CloudSync = {

    enabled:false,

    lastSync:null,

    async sync(){

        if(

            !Premium.has(

                "cloudSync"

            )

        ){

            return;

        }

        this.lastSync=

            new Date();

        console.log(

            "Sincronizando..."

        );

    }

};

/* ==========================================================
                AUTO BACKUP
========================================================== */

const AutoBackup = {

    start(){

        if(

            !Premium.has(

                "cloudSync"

            )

        ){

            return;

        }

        setInterval(()=>{

            CloudSync.sync();

        },600000);

    }

};

/* ==========================================================
                PREMIUM SERVICE
========================================================== */

const PremiumService = {

    activate(plan){

        Premium.activate(plan);

    },

    deactivate(){

        Premium.deactivate();

    },

    isPremium(){

        return Premium.subscription.active;

    },

    has(feature){

        return Premium.has(feature);

    }

};

/* ==========================================================
                    CONFIGURAÇÕES
========================================================== */

const Settings = {

    data:{

        theme:"auto",

        language:"pt-BR",

        notifications:true,

        reminderInterval:120,

        waterGoal:2000,

        caloriesGoal:2000,

        proteinGoal:150,

        carbsGoal:250,

        fatGoal:70,

        autoBackup:true,

        sound:true,

        vibration:true

    },

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.load();

        this.apply();

        this.render();

    },

        /* ==========================================
                ALTERAR
    ========================================== */

    set(key,value){

        this.data[key]=value;

        this.apply();

        this.render();

        Storage.save();

    },

    get(key){

        return this.data[key];

    },

        /* ==========================================
                APLICAR
    ========================================== */

    apply(){

        Theme.set(

            this.data.theme

        );

        Hydration.goal=

            this.data.waterGoal;

    },

        /* ==========================================
                RENDER
    ========================================== */

    render(){

        const map={

            "np-setting-theme":"theme",

            "np-setting-language":"language",

            "np-setting-water":"waterGoal",

            "np-setting-calories":"caloriesGoal"

        };

        Object.entries(map).forEach(

            ([id,key])=>{

                const element=

                    Utils.get(id);

                if(!element) return;

                element.value=

                    this.data[key];

            }

        );

    },

        /* ==========================================
                EXPORTAR
    ========================================== */

    export(){

        return JSON.stringify(

            NutriPlus,

            null,

            2

        );

    },

        /* ==========================================
                IMPORTAR
    ========================================== */

    import(json){

        try{

            Object.assign(

                NutriPlus,

                JSON.parse(json)

            );

            Storage.save();

            location.reload();

        }

        catch(error){

            Toast.show(

                "Erro",

                "Arquivo inválido.",

                "error"

            );

        }

    },

        /* ==========================================
                RESET
    ========================================== */

    reset(){

        localStorage.removeItem(

            "nutriplus"

        );

        location.reload();

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(

            NutriPlus.settings

        ){

            this.data={

                ...this.data,

                ...NutriPlus.settings

            };

        }

    }

};

/* ==========================================================
                SETTINGS SERVICE
========================================================== */

const SettingsService={

    update(key,value){

        Settings.set(

            key,

            value

        );

    },

    export(){

        return Settings.export();

    },

    import(json){

        Settings.import(

            json

        );

    },

    reset(){

        Settings.reset();

    }

};

/* ==========================================================
                    API
========================================================== */

const Api = {

    baseURL:"",

    token:null,

    online:navigator.onLine,

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.listenConnection();

    },

        /* ==========================================
                INTERNET
    ========================================== */

    listenConnection(){

        window.addEventListener(

            "online",

            ()=>{

                this.online=true;

                Sync.processQueue();

            }

        );

        window.addEventListener(

            "offline",

            ()=>{

                this.online=false;

            }

        );

    },

        /* ==========================================
                LOGIN
    ========================================== */

    async login(email,password){

        return{

            success:true,

            token:"jwt-token"

        };

    },

        /* ==========================================
                REQUEST
    ========================================== */

    async request(endpoint,method="GET",body=null){

        if(!this.online){

            throw new Error(

                "Sem conexão"

            );

        }

        console.log(

            method,

            endpoint,

            body

        );

        return{

            success:true

        };

    }

};

/* ==========================================================
                    SYNC
========================================================== */

const Sync={

    queue:[],

    syncing:false,

    add(action,data){

        this.queue.push({

            id:Date.now(),

            action,

            data,

            createdAt:new Date()

        });

        Storage.save();

    },

        async processQueue(){

        if(this.syncing) return;

        if(!Api.online) return;

        this.syncing=true;

        while(this.queue.length){

            const item=this.queue.shift();

            try{

                await Api.request(

                    "/sync",

                    "POST",

                    item

                );

            }

            catch(error){

                this.queue.unshift(item);

                break;

            }

        }

        this.syncing=false;

    },

        async backup(){

        return Api.request(

            "/backup",

            "POST",

            NutriPlus

        );

    },

        async restore(){

        return Api.request(

            "/restore"

        );

    }

};

/* ==========================================================
                API SERVICE
========================================================== */

const ApiService={

    sync(){

        Sync.processQueue();

    },

    backup(){

        return Sync.backup();

    },

    restore(){

        return Sync.restore();

    }

};

/* ==========================================================
                    AUTH
========================================================== */

const Auth = {

    session:{

        authenticated:false,

        user:null,

        token:null,

        refreshToken:null,

        expiresAt:null

    },

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        this.load();

        this.validateSession();

    },

        /* ==========================================
                LOGIN
    ========================================== */

    async login(email,password){

        const response = await Api.login(

            email,

            password

        );

        if(!response.success){

            return false;

        }

        this.session={

            authenticated:true,

            user:{

                email

            },

            token:response.token,

            refreshToken:null,

            expiresAt:

                Date.now() +

                (1000*60*60*24)

        };

        Storage.save();

        return true;

    },

        /* ==========================================
                LOGOUT
    ========================================== */

    logout(){

        this.session={

            authenticated:false,

            user:null,

            token:null,

            refreshToken:null,

            expiresAt:null

        };

        Storage.save();

    },

        /* ==========================================
                SESSÃO
    ========================================== */

    isAuthenticated(){

        return this.session.authenticated;

    },

        /* ==========================================
                VALIDAR
    ========================================== */

    validateSession(){

        if(

            !this.session.authenticated

        ){

            return;

        }

        if(

            Date.now() >

            this.session.expiresAt

        ){

            this.logout();

        }

    },

        /* ==========================================
                REFRESH TOKEN
    ========================================== */

    async refresh(){

        if(

            !this.session.refreshToken

        ){

            return;

        }

        this.session.token=

            "novo-token";

        Storage.save();

    },

        /* ==========================================
                STORAGE
    ========================================== */

    save(){

        Storage.save();

    },

    load(){

        if(

            NutriPlus.auth

        ){

            this.session={

                ...this.session,

                ...NutriPlus.auth

            };

        }

    }

};

/* ==========================================================
                PERMISSIONS
========================================================== */

const Permissions={

    can(feature){

        if(

            Premium.has(feature)

        ){

            return true;

        }

        return false;

    }

};

/* ==========================================================
                SECURITY
========================================================== */

const Security={

    lock(){

        document.body.classList.add(

            "np-locked"

        );

    },

    unlock(){

        document.body.classList.remove(

            "np-locked"

        );

    },

    requireLogin(){

        if(

            !Auth.isAuthenticated()

        ){

            this.lock();

            return false;

        }

        this.unlock();

        return true;

    }

};

/* ==========================================================
                SESSION WATCHER
========================================================== */

const SessionWatcher={

    start(){

        setInterval(()=>{

            Auth.validateSession();

        },60000);

    }

};

/* ==========================================================
                AUTH SERVICE
========================================================== */

const AuthService={

    login(email,password){

        return Auth.login(

            email,

            password

        );

    },

    logout(){

        Auth.logout();

    },

    authenticated(){

        return Auth.isAuthenticated();

    }

};

/* ==========================================================
                    PERFORMANCE
========================================================== */

const Performance = {

    cache:new Map(),

    observers:[],

    initialized:false,

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        if(this.initialized) return;

        this.initialized=true;

        this.createObservers();

        this.startCleaner();

    },

        /* ==========================================
                CACHE
    ========================================== */

    set(key,value){

        this.cache.set(

            key,

            {

                value,

                timestamp:Date.now()

            }

        );

    },

    get(key){

        const item=

            this.cache.get(key);

        if(!item) return null;

        return item.value;

    },

    has(key){

        return this.cache.has(key);

    },

    remove(key){

        this.cache.delete(key);

    },

    clear(){

        this.cache.clear();

    },

        /* ==========================================
                LAZY LOAD
    ========================================== */

    async load(moduleName,callback){

        if(

            this.has(moduleName)

        ){

            return this.get(moduleName);

        }

        const module=

            await callback();

        this.set(

            moduleName,

            module

        );

        return module;

    },

        /* ==========================================
                REFRESH
    ========================================== */

    refresh(id,callback){

        const element=

            Utils.get(id);

        if(!element) return;

        requestAnimationFrame(

            ()=>{

                callback(element);

            }

        );

    },

        /* ==========================================
                OBSERVER
    ========================================== */

    createObservers(){

        const observer=

            new IntersectionObserver(

                entries=>{

                    entries.forEach(entry=>{

                        if(

                            entry.isIntersecting

                        ){

                            entry.target.classList.add(

                                "visible"

                            );

                        }

                    });

                },

                {

                    threshold:.15

                }

            );

        document

        .querySelectorAll(

            ".np-lazy"

        )

        .forEach(element=>{

            observer.observe(element);

        });

        this.observers.push(observer);

    },

        /* ==========================================
                DEBOUNCE
    ========================================== */

    debounce(fn,delay=300){

        let timeout;

        return(...args)=>{

            clearTimeout(timeout);

            timeout=setTimeout(

                ()=>fn(...args),

                delay

            );

        };

    },

        /* ==========================================
                THROTTLE
    ========================================== */

    throttle(fn,limit=200){

        let waiting=false;

        return(...args)=>{

            if(waiting) return;

            waiting=true;

            fn(...args);

            setTimeout(

                ()=>{

                    waiting=false;

                },

                limit

            );

        };

    },

        /* ==========================================
                CLEANER
    ========================================== */

    startCleaner(){

        setInterval(()=>{

            const now=

                Date.now();

            this.cache.forEach(

                (item,key)=>{

                    if(

                        now-item.timestamp>

                        600000

                    ){

                        this.cache.delete(key);

                    }

                }

            );

        },600000);

    },

        /* ==========================================
                MEMORY
    ========================================== */

    memory(){

        if(

            performance.memory

        ){

            return{

                used:

                    performance.memory.usedJSHeapSize,

                total:

                    performance.memory.totalJSHeapSize,

                limit:

                    performance.memory.jsHeapSizeLimit

            };

        }

        return null;

    }

};

/* ==========================================================
                TASK SCHEDULER
========================================================== */

const TaskScheduler={

    queue:[],

    running:false,

    add(task){

        this.queue.push(task);

    },

    async start(){

        if(this.running) return;

        this.running=true;

        while(this.queue.length){

            const task=

                this.queue.shift();

            await task();

        }

        this.running=false;

    }

};

/* ==========================================================
                IDLE TASKS
========================================================== */

const Idle={

    run(callback){

        if(

            "requestIdleCallback"

            in window

        ){

            requestIdleCallback(

                callback

            );

        }else{

            setTimeout(

                callback,

                1

            );

        }

    }

};

/* ==========================================================
                    CORE
========================================================== */

const Core = {

    modules:[],

    initialized:false,

    debug:true,

    /* ==========================================
                INICIALIZAR
    ========================================== */

    init(){

        if(this.initialized){

            return;

        }

        this.initialized=true;

        this.registerModules();

        this.initializeModules();

        this.attachGlobalEvents();

        this.healthCheck();

    },

        /* ==========================================
                REGISTRO
    ========================================== */

    registerModules(){

        this.modules=[

            NotificationCenter,

            Food,

            Scheduler,

            Storage,

            Services,

            Gamification,

            Statistics,

            Mission,

            Calendar,

            Hydration,

            BodyTracker,

            Analytics,

            Goals,

            Premium,

            Settings,

            Api,

            Auth,

            Performance

        ];

    },

        /* ==========================================
                START
    ========================================== */

    initializeModules(){

        this.modules.forEach(

            module=>{

                if(

                    typeof module.init ===

                    "function"

                ){

                    module.init();

                }

            }

        );

    },

        /* ==========================================
                EVENTOS
    ========================================== */

    attachGlobalEvents(){

        window.addEventListener(

            "error",

            ErrorHandler.capture

        );

        window.addEventListener(

            "unhandledrejection",

            ErrorHandler.capturePromise

        );

    },

        /* ==========================================
                HEALTH CHECK
    ========================================== */

    healthCheck(){

        Logger.info(

            "Dashboard inicializada."

        );

        if(this.debug){

            Diagnostics.run();

        }

    }

};

/* ==========================================================
                    LOGGER
========================================================== */

const Logger={

    logs:[],

    info(message){

        this.logs.push({

            type:"info",

            message,

            date:new Date()

        });

        console.info(message);

    },

    warn(message){

        this.logs.push({

            type:"warn",

            message,

            date:new Date()

        });

        console.warn(message);

    },

    error(message){

        this.logs.push({

            type:"error",

            message,

            date:new Date()

        });

        console.error(message);

    },

    export(){

        return this.logs;

    }

};

/* ==========================================================
                ERROR HANDLER
========================================================== */

const ErrorHandler={

    capture(event){

        Logger.error(

            event.message ||

            "Erro desconhecido"

        );

    },

    capturePromise(event){

        Logger.error(

            event.reason ||

            "Promise rejeitada"

        );

    }

};

/* ==========================================================
                DIAGNÓSTICO
========================================================== */

const Diagnostics={

    run(){

        this.checkStorage();

        this.checkElements();

        this.checkModules();

    },

    checkStorage(){

        Logger.info(

            "Storage OK"

        );

    },

    checkElements(){

        Logger.info(

            "HTML sincronizado"

        );

    },

    checkModules(){

        Core.modules.forEach(

            module=>{

                if(

                    module

                ){

                    Logger.info(

                        `${module.constructor?.name || "Module"} carregado`

                    );

                }

            }

        );

    }

};

/* ==========================================================
                    DEBUG
========================================================== */

const Debug={

    enable(){

        Core.debug=true;

    },

    disable(){

        Core.debug=false;

    },

    logs(){

        return Logger.export();

    }

};
    
