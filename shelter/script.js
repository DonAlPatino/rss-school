/* Open/close burger menu */

const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');


burger.addEventListener('click', toggleMenu);

function toggleMenu() {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('stop-scrolling');
}

window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav') && !target.closest('.burger-menu')) {
        burger.classList.remove('active')
        nav.classList.remove('active')
        overlay.classList.remove('active')
        body.classList.remove('stop-scrolling')
    }
})

/* SLIDER */

let pets = [];
let index = 0;
let cardsPerPage = 1;
const petsSlide = document.querySelector('.slider-items');
const slider = document.querySelector('.cards');

fetch('pets.json')
    .then(res => res.json())
    .then(list => {
        pets = list;

        for (let i = pets.length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const randomElement = pets.splice(randomIndex, 1)[0];
            pets.push(randomElement);
        }

        checkCardsPerPage();
        displayPets(pets);

        const cards = Array.from(document.querySelectorAll('.card')).slice(index, index + cardsPerPage);
        showActiveCards(cards);
    })

function checkCardsPerPage() {
    const width = document.querySelector('body').offsetWidth;

    if (width >= 1280) {
        cardsPerPage = 3;
    } else if (width < 1280 && width >= 768) {
        cardsPerPage = 2;
    } else if (width < 768) {
        cardsPerPage = 1;
    }

    return cardsPerPage;
}

function displayPets(petsList) {
    petsSlide.innerHTML = petsList.map(createPetCard).join('');
}

function createPetCard(pet) {
    return `
        <div class="card" data-pet="${pet.name}">
            <img src="${pet.img}" alt="${pet.name}">
            <h3 class="card-title">${pet.name}</h3>
            <a class="link btn btn-ghost btn-card">Learn more</a>
        </div>
    `;
}

function showActiveCards(activeCards) {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
    activeCards.forEach(card => card.classList.add('active'));
}

slider.addEventListener('click', (e) => {

    const petCards = Array.from(document.querySelectorAll('.card'));
    const prevButton = e.target.closest('.btn-prev');
    const nextButton = e.target.closest('.btn-next');
    const prevArrow = e.target.closest('.arrow-prev');
    const nextArrow = e.target.closest('.arrow-next');
    const len = petCards.length;

    if (e.target == nextButton || e.target == nextArrow) {
        checkCardsPerPage();
        if (index >= len - cardsPerPage) {
            index = 0;
        } else {
            index = index + cardsPerPage;
        }
        //грязный хак
        const activeCards = petCards.slice(index, index + cardsPerPage);
        let t = 0;
        while (activeCards.length < cardsPerPage) {
            activeCards.push(petCards[t++])
        }
        petsSlide.classList.add("transition-right");
        showActiveCards(activeCards);

    }

    if (e.target == prevButton || e.target == prevArrow) {
        checkCardsPerPage();

        if (index < cardsPerPage) {
            index = index - cardsPerPage + len;
        } else {
            index = index - cardsPerPage;
        }

        const activeCards = petCards.slice(index, index + cardsPerPage);
        let t = 0;
        while (activeCards.length < cardsPerPage) {
            activeCards.push(petCards[t++])
        }
        showActiveCards(activeCards);
        petsSlide.classList.add("transition-left");
    }
})

petsSlide.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
        petsSlide.classList.remove("transition-left");
    } else {
        petsSlide.classList.remove("transition-right");
    }
});

window.addEventListener('resize', () => {
    checkCardsPerPage();
    const petCards = Array.from(document.querySelectorAll('.card'));
    const displayedCard = document.querySelector('.card.active').dataset.pet;
    const index = pets.findIndex(card => card.name == displayedCard);
    const activeCards = petCards.slice(index, index + cardsPerPage);
    showActiveCards(activeCards);
})