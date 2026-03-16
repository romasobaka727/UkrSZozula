// Функція збереження нового поста
function savePost() {
    const textInput = document.getElementById('postText');
    const text = textInput.value;

    if (!text.trim()) return;

    // Отримуємо ім'я та список постів
    const userName = localStorage.getItem('userName') || 'Анонімна Зозуля';
    const posts = JSON.parse(localStorage.getItem('ukrSZozula_posts') || '[]');

    // Створюємо новий пост
    const newPost = {
        author: userName,
        content: text,
        time: new Date().toLocaleString(),
        likes: 0
    };

    // Додаємо в початок масиву
    posts.unshift(newPost);

    // Зберігаємо в LocalStorage
    localStorage.setItem('ukrSZozula_posts', JSON.stringify(posts));

    // Очищуємо поле і оновлюємо стрічку
    textInput.value = '';
    displayPosts();
}

// Функція відображення постів
function displayPosts() {
    const feed = document.getElementById('feed');
    if (!feed) return; // Якщо ми не на сторінці зі стрічкою

    const posts = JSON.parse(localStorage.getItem('ukrSZozula_posts') || '[]');
    feed.innerHTML = '';

    if (posts.length === 0) {
        feed.innerHTML = '<p style="text-align:center; color:#888;">Поки що немає жодного поста. Будь першим!</p>';
        return;
    }

    posts.forEach((post, index) => {
        feed.innerHTML += `
            <div class="post">
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-date">${post.time}</span>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="actions">
                    <button onclick="likePost(${index})">🧡 Клас! (${post.likes})</button>
                    <button class="btn-del" onclick="deletePost(${index})">Видалити</button>
                </div>
            </div>
        `;
    });
}

// Лайки
function likePost(index) {
    const posts = JSON.parse(localStorage.getItem('ukrSZozula_posts'));
    posts[index].likes++;
    localStorage.setItem('ukrSZozula_posts', JSON.stringify(posts));
    displayPosts();
}

// Видалення поста
function deletePost(index) {
    if (confirm("Видалити цей пост?")) {
        const posts = JSON.parse(localStorage.getItem('ukrSZozula_posts'));
        posts.splice(index, 1);
        localStorage.setItem('ukrSZozula_posts', JSON.stringify(posts));
        displayPosts();
    }
}
