let page = 1;
let offset = 0;
const scrollOffset = 465;
let cardsOffset = 0;
let cardsPerPage = 0;

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
        container.prepend(card);

        //future popup
        //      card.addEventListener("click", () => popup(count));
    }

    for (let i = 0; i < 48; i++) {
        //mixCards();
        createCard(mixer());
    }

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