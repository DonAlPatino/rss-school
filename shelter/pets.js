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
window.addEventListener('click', e => {
    const target = e.target;
    if (!target.closest('.nav') && !target.closest('.burger-menu')) {
        burger.classList.remove('active')
        nav.classList.remove('active')
        overlay.classList.remove('active')
        body.classList.remove('stop-scrolling')
    }
})