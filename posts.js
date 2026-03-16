async function createPost() {
    const text = document.getElementById('postText').value;
    const file = document.getElementById('postFile').files[0];
    const user = localStorage.getItem('currentUser');
    let imgBase64 = "";

    if (file) {
        imgBase64 = await toBase64(file); // Конвертируем фото в строку
    }

    if (!text && !imgBase64) return;

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.unshift({
        id: Date.now(),
        author: user,
        content: text,
        image: imgBase64,
        likes: [], // Тут храним имена тех, кто лайкнул (чтобы не накручивали)
        comments: []
    });

    localStorage.setItem('posts', JSON.stringify(posts));
    location.reload();
}

function toBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
    });
}

function renderFeed() {
    const feed = document.getElementById('feed');
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    const user = localStorage.getItem('currentUser');

    feed.innerHTML = posts.map((p, i) => `
        <div class="card">
            <strong>${p.author}</strong>
            <p>${p.content}</p>
            ${p.image ? `<img src="${p.image}" class="post-img">` : ''}
            <div class="actions">
                <button onclick="toggleLike(${i})" class="${p.likes.includes(user) ? 'liked' : ''}">
                    🧡 ${p.likes.length}
                </button>
            </div>
            <div id="comms-${i}">
                ${p.comments.map(c => `<div class="comment"><b>${c.user}:</b> ${c.text}</div>`).join('')}
            </div>
            <div style="display:flex; margin-top:10px;">
                <input type="text" id="in-${i}" placeholder="Коментар...">
                <button onclick="addComment(${i})">OK</button>
            </div>
        </div>
    `).join('');
}

function toggleLike(index) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    const user = localStorage.getItem('currentUser');
    const likeIdx = posts[index].likes.indexOf(user);

    if (likeIdx === -1) {
        posts[index].likes.push(user); // Ставим лайк
    } else {
        posts[index].likes.splice(likeIdx, 1); // Убираем лайк (защита от накрутки)
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    renderFeed();
}

function addComment(index) {
    const text = document.getElementById(`in-${index}`).value;
    if(!text) return;
    const posts = JSON.parse(localStorage.getItem('posts'));
    posts[index].comments.push({ user: localStorage.getItem('currentUser'), text: text });
    localStorage.setItem('posts', JSON.stringify(posts));
    renderFeed();
}

renderFeed();
