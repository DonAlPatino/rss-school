/* Open/close burger menu */

const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

burger.addEventListener('click', toggleMenu);

function toggleMenu() {
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    nav.classList.toggle('active');
}
window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav') && !target.closest('.burger-menu')) {
        burger.classList.remove('active')
        nav.classList.remove('active')
        overlay.classList.remove('active')
    }
})