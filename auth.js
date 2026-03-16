function register() {
    const l = document.getElementById('regLogin').value;
    const p = document.getElementById('regPass').value;
    if(!l || !p) return alert("Заповни поля!");

    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[l]) return alert("Такий юзер вже є!");

    users[l] = { pass: p };
    localStorage.setItem('users', JSON.stringify(users));
    alert("Реєстрація успішна! Тепер тисни Увійти.");
}

function login() {
    const l = document.getElementById('regLogin').value;
    const p = document.getElementById('regPass').value;
    let users = JSON.parse(localStorage.getItem('users') || '{}');

    if(users[l] && users[l].pass === p) {
        localStorage.setItem('currentUser', l);
        window.location.href = 'feed.html';
    } else {
        alert("Помилка входу!");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Проверка авторизации на страницах
if(window.location.pathname.includes('feed.html')) {
    const user = localStorage.getItem('currentUser');
    if(!user) window.location.href = 'index.html';
    else document.getElementById('curUser').innerText = user;
}
