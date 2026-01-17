export function loadPartials(){
    fetch('./partials/header.html')
    .then(res => res.text())
    .then(html => {
        const header = document.getElementById('site-header');
        if(header) header.innerHTML = html;
    });
}