export function loadPartials(){
    const basePath = window.location.pathname.includes('/pages/')
    ? '../'
    : './';

    fetch(`${basePath}partials/header.html`)
    .then(res => res.text())
    .then(html => {
        const header = document.getElementById('site-header');
        if(!header)return; 
        
        html = html.replaceAll('__BASE__', basePath);

        header.innerHTML = html;
        setActiveNav();
        initHamburger();
    })
    .catch(err => console.error('Header load error:', err));
}

function initHamburger(){
    const headerContainer = document.querySelector(".site-header .container");
    const btn = document.querySelector(".hamburger-btn");
    const nav = document.querySelector(".main-navbar");

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

function setActiveNav(){
    const links = document.querySelectorAll('.main-navbar a');
    if(!links.length) return;

    //Bulunan sayfanın adı
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    let matched = false;

    links.forEach(link => {
        const href = link.getAttribute('href');

        if(!href) return;

        if(href.endsWith(currentPage)){
            link.classList.add('active');
            matched = true;
        }else{
            link.classList.remove('active');
        }
    });
    
    if(!matched) {
        links.forEach(link => {
            if(link.getAttribute('href').includes('index.html')){
                link.classList.add('active');
            }
        });
    }
}