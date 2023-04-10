/* Инициализация пагинация */

pagination();

/* Open/close burger menu */

const burger = document.querySelector('.burger-menu');
const burger_lines = document.querySelectorAll('.burger-line');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

burger.addEventListener('click', toggleMenu);
function toggleMenu() {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    nav.classList.toggle('active');
    burger_lines.forEach(line => {
        line.classList.toggle('active')
    })
    body.classList.toggle('stop-scrolling');

}

/* Пагинация */

let page = 1;
let offset = 0;
const scrollOffset = 465;
let cardsOffset = 0;
let cardsPerPage = 0;
const slider = document.querySelector('.cards');

export default async function pagination() {
    const res = await fetch("pets.json");
    const pets = await res.json();

    //Инициализация верхушки контейнера
    const container = document.querySelector(".cards-list");
    setScrollOffset()
    container.style.top = "0px";

    function createCard(count) {
        let card = document.createElement("div");
        card.innerHTML = `
      <img class="card-img" src="${pets[count]["img"]}" alt="${pets[count]["name"]}"/>
      <h3 class="card-title">${pets[count]["name"]}</h3>
          <a class="link btn btn-ghost btn-card" href="#">Learn more</a>
    `;

        card.classList.add("card");
        card.dataset.pet = pets[count]["name"];
        container.prepend(card);

        card.addEventListener("click", (e) => {

            const selectedPet = e.target.closest('.card');
            const petName = selectedPet.dataset.pet;
            const petInfo = pets.find(pet => pet.name == petName);
            petModal.setContent(petInfo);
            petModal.open();
        });
    }

    for (let i = 0; i < 48; i++) {
        //mixCards();
        createCard(mixer());
    }

    slider.addEventListener('click', (e) => {
  //      const petCards = Array.from(document.querySelectorAll('.card'));
        const selectedPet = e.target.closest('.card');

        if (selectedPet) {
            const petName = selectedPet.dataset.pet;
            const petInfo = pets.find(pet => pet.name == petName);
            petModal.setContent(petInfo);
            petModal.open();
        }

    })

    const pageNum = document.querySelector(".btn-current");
    const sliderBtn = document.querySelector(".slider-controls");

    window.addEventListener("resize", setScrollOffset);
    window.addEventListener("load", setScrollOffset);

    sliderBtn.addEventListener("click", (el) => {
        if (document.querySelector(".btn-prev") === el.target) {
            if (!el.target.classList.contains("disabled")) {
                scroll("prev");
            }
        }
        if (document.querySelector(".btn-start") === el.target) {
            if (!el.target.classList.contains("disabled")) {
                scroll("setFirstPage");
            }
        }
        if (document.querySelector(".btn-next") === el.target) {
            if (!el.target.classList.contains("disabled")) {

                scroll("next");
            }
        }
        if (document.querySelector(".btn-finish") === el.target) {
            if (!el.target.classList.contains("disabled")) {
                scroll("setLastPage");
            }
        }
    });

    function setScrollOffset() {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth >= 1280) {
            cardsOffset = 2;
            cardsPerPage = 8;
        }
        if (1279 >= clientWidth && clientWidth >= 768) {
            cardsOffset = 3;
            cardsPerPage = 6;
        }
        if (767 >= clientWidth && clientWidth >= 320) {
            cardsOffset = 3;
            cardsPerPage = 3;
        }
    }

    function scroll(val) {
        if (val === "prev") {
            offset = offset + scrollOffset * cardsOffset;
            container.style.top = offset + "px";
            pageNum.innerHTML = (--page).toString();

            checkInActiveBtn();
        }
        if (val === "setFirstPage") {
            offset = 0;
            container.style.top = offset + "px";
            page = 1;
            pageNum.innerHTML = page;
            checkInActiveBtn();
        }
        if (val === "next") {

            offset = offset - scrollOffset * cardsOffset;
            container.style.top = offset + "px";
            pageNum.innerHTML = (++page).toString();
            checkInActiveBtn();
        }
        if (val === "setLastPage") {
            offset = -(document.querySelectorAll(".card").length / cardsPerPage - 1) * (scrollOffset * cardsOffset);
            container.style.top = offset + "px";
            page = document.querySelectorAll(".card").length / cardsPerPage;
            pageNum.innerHTML = page;
            checkInActiveBtn();
        }
    }

    window.addEventListener("resize", () => {
        offset = 0;
        container.style.top = offset + "px";
        page = 1;
        pageNum.innerHTML = page;
        checkInActiveBtn();
    });

    function checkInActiveBtn() {
        if (offset >= 0) {
            document.querySelector(".btn-start").classList.add("disabled");
            document.querySelector(".btn-prev").classList.add("disabled");
        } else {
            document.querySelector(".btn-start").classList.remove("disabled");
            document.querySelector(".btn-prev").classList.remove("disabled");
        }

        if (offset <= -(document.querySelectorAll(".card").length / cardsPerPage - 1) * (scrollOffset * cardsOffset)) {
            document.querySelector(".btn-next").classList.add("disabled");
            document.querySelector(".btn-finish").classList.add("disabled");
        } else {
            document.querySelector(".btn-next").classList.remove("disabled");
            document.querySelector(".btn-finish").classList.remove("disabled");
        }
    }

}

//mixer pets

let mixpets = [];
let mixpets8 = [];
let mixpets6 = [];
let mixpets3 = [];

function mixer() {

    let count = randomize(0, 7);
    mixpets.push(count);

    if (mixpets8.length >= 8) mixpets8 = [];
    if (mixpets6.length >= 6) mixpets6 = [];
    if (mixpets3.length >= 3) mixpets3 = [];

    while (mixpets8.includes(count) || mixpets6.includes(count) || mixpets3.includes(count)) {
        count = randomize(0, 7);
    }
    mixpets8.push(count);
    mixpets6.push(count);
    mixpets3.push(count);
    return count;
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Popup modal windows
const modalWindow = {};
let isModalOpen = false;

modalWindow.init = function() {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    document.body.prepend(modalElement);

    const modal = {
        open() {
            modalElement.classList.add('active');
            overlay.classList.add('active');
            isModalOpen = true;
        },
        close() {
            modalElement.classList.remove('active');
            overlay.classList.remove('active');
            isModalOpen = false;
        }
    };

    modalElement.addEventListener('click', e => {
        if (e.target.classList.contains('close-btn')) {
            modal.close();
        }
    });

    return Object.assign(modal, {
        setContent(content) {
            modalElement.innerHTML = `
            <button class="close-btn">&times;</button>
            <div class="modal-image-block">
                <img src="${content.img}" alt="${content.name}">
            </div>
            <div class="modal-text-block">
                <div class="modal-title">
                    <h3 class="header-3">${content.name}</h3>
                    <h4 class="header-4">${content.type} - ${content.breed}</h4>
                </div>
                <h5 class="header-5">${content.description}</h5>
                <ul class="modal-list">
                    <li class="header-5"><b>Age:</b> ${content.age}</li>
                    <li class="header-5"><b>Inoculations:</b> ${content.inoculations}</li>
                    <li class="header-5"><b>Diseases:</b> ${content.diseases}</li>
                    <li class="header-5"><b>Parasites:</b> ${content.parasites}</li>
                </ul>
            </div>
        `;
        }
    });
}

const petModal = modalWindow.init();

//General

overlay.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav') && !target.closest('.burger-menu')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('stop-scrolling');
        if (isModalOpen) {
            petModal.close();
        }
    }
})

/*window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav') && !target.closest('.burger-menu')) {
        burger.classList.remove('active')
        nav.classList.remove('active')
        overlay.classList.remove('active')
        body.classList.remove('stop-scrolling')
    }
})*/