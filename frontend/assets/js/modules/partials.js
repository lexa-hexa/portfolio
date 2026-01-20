export function loadPartials(){
    fetch('./partials/header.html')
    .then(res => res.text())
    .then(html => {
        const header = document.getElementById('site-header');
        if(header) header.innerHTML = html;

        initHamburger();
    });
}

function initHamburger(){
    const headerContainer = document.querySelector(".site-header .container");
    const btn = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".main-navbar");

    // ✅ hepsi yoksa çık
    if (!headerContainer || !btn || !nav) return;

    btn.addEventListener("click", () => {
        const isOpen = headerContainer.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
        if (e.target.closest("a")) {
        headerContainer.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        }
    });
}