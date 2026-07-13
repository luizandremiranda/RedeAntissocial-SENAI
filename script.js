/* ========================================
   REDE ANTISSOCIAL — JAVASCRIPT
   Funcionalidades completas
   ======================================== */

// ===== VARIÁVEIS GLOBAIS =====
const themeButton = document.getElementById('themeButton');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const chatTitle = document.getElementById('chatTitle');
const chatAvatar = document.getElementById('chatAvatar');
const storyModal = document.getElementById('storyModal');
const closeStory = document.getElementById('closeStory');
const publishBtn = document.getElementById('publishBtn');
const newPostText = document.getElementById('newPostText');
const notifBtn = document.getElementById('notifBtn');

// Estado
let currentChatUser = 'João Silva';
let currentChatAvatar = 'https://i.pravatar.cc/40?img=12';
let postCount = 6;
let likedPosts = new Set();

// ===== TEMA CLARO / ESCURO =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeButton.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
        themeButton.title = 'Modo claro';
    } else {
        icon.className = 'fa-solid fa-moon';
        themeButton.title = 'Modo escuro';
    }
}

themeButton.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

initTheme();

// ===== CURTIR POSTS =====
function toggleLike(btn) {
    const post = btn.closest('.post');
    const postId = post.id;
    const isLiked = likedPosts.has(postId);
    const countEl = post.querySelector('.reactions-count');
    const commentCountEl = post.querySelector('.comments-count');

    // Extrair número de curtidas
    const text = countEl.textContent;
    const match = text.match(/(\d+)/);
    if (!match) return;
    let count = parseInt(match[1]);

    if (isLiked) {
        likedPosts.delete(postId);
        btn.classList.remove('liked');
        count--;
    } else {
        likedPosts.add(postId);
        btn.classList.add('liked');
        count++;

        // Pequena vibração
        if (navigator.vibrate) navigator.vibrate(50);
    }

    countEl.innerHTML = `<i class="fa-solid fa-heart" style="color: #e53935;"></i> ${count} curtidas`;
}

// ===== COMENTÁRIOS =====
function toggleComments(postId) {
    const section = document.getElementById('comments-' + postId);
    const isActive = section.classList.contains('active');

    if (isActive) {
        section.classList.remove('active');
    } else {
        section.classList.add('active');
        // Focar no campo de input
        setTimeout(() => {
            section.querySelector('.comment-field').focus();
        }, 300);
    }
}

function addComment(btn) {
    const input = btn.previousElementSibling;
    const text = input.value.trim();
    if (!text) return;

    const commentList = btn.closest('.comments-section').querySelector('.comment-list');

    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <img src="https://i.pravatar.cc/40?img=15" alt="Você">
        <div class="comment-content">
            <div class="comment-bubble">
                <strong>Você</strong>
                <p>${escapeHtml(text)}</p>
            </div>
            <span class="comment-time">Agora</span>
        </div>
    `;

    commentList.appendChild(comment);
    input.value = '';

    // Atualizar contador de comentários
    const post = btn.closest('.post');
    const commentCountEl = post.querySelector('.comments-count');
    const comments = commentList.querySelectorAll('.comment');
    commentCountEl.textContent = comments.length + ' comentários';

    // Scroll para o novo comentário
    commentList.scrollTop = commentList.scrollHeight;
}

// Permitir Enter para comentar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('comment-field')) {
        const btn = e.target.nextElementSibling;
        if (btn) addComment(btn);
    }
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== CHAT =====
function openChat(name, avatar) {
    currentChatUser = name;
    currentChatAvatar = avatar;
    chatTitle.textContent = name;
    chatAvatar.src = avatar;
    chatBox.classList.add('active');

    // Limpar mensagens anteriores e adicionar saudação
    chatMessages.innerHTML = `
        <div class="message received">
            <div class="message-content">Oi! Tudo bem? 😊</div>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;

    chatInput.focus();
}

closeChat.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const message = document.createElement('div');
    message.className = 'message sent';
    message.innerHTML = `
        <div class="message-content">${escapeHtml(text)}</div>
        <span class="message-time">${getCurrentTime()}</span>
    `;

    chatMessages.appendChild(message);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simular resposta após 1.5s
    setTimeout(() => {
        simulateReply();
    }, 1500);
}

function simulateReply() {
    const replies = [
        'Que legal! 😄',
        'Concordo totalmente!',
        'Haha, boa! 😂',
        'Vamos marcar de nos encontrar!',
        'Que massa! Me conta mais.',
        'Sério? Que incrível!',
        'Ah, entendi! E aí?',
        'Boa ideia! Vamos fazer isso!',
        'Kkkkk, com certeza! 😁',
        'Vou ver isso depois, vlw!',
        'Top demais! 🔥',
        'Que show! Me avisa quando for.',
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const message = document.createElement('div');
    message.className = 'message received';
    message.innerHTML = `
        <div class="message-content">${randomReply}</div>
        <span class="message-time">${getCurrentTime()}</span>
    `;

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessageBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' +
           now.getMinutes().toString().padStart(2, '0');
}

// ===== STORIES =====
function openStory(name) {
    const avatars = {
        'Maria': { img: 'https://picsum.photos/400/700?random=10', avatar: 'https://i.pravatar.cc/100?img=18' },
        'Pedro': { img: 'https://picsum.photos/400/700?random=11', avatar: 'https://i.pravatar.cc/100?img=21' },
        'Ana': { img: 'https://picsum.photos/400/700?random=12', avatar: 'https://i.pravatar.cc/100?img=24' },
        'Lucas': { img: 'https://picsum.photos/400/700?random=13', avatar: 'https://i.pravatar.cc/100?img=32' },
        'Fernanda': { img: 'https://picsum.photos/400/700?random=14', avatar: 'https://i.pravatar.cc/100?img=41' },
        'Carlos': { img: 'https://picsum.photos/400/700?random=15', avatar: 'https://i.pravatar.cc/100?img=25' },
    };

    const story = avatars[name];
    if (!story) return;

    document.getElementById('storyImage').src = story.img;
    document.getElementById('storyUserAvatar').src = story.avatar;
    document.getElementById('storyUserName').textContent = name;
    storyModal.classList.add('active');

    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (storyModal.classList.contains('active')) {
            storyModal.classList.remove('active');
        }
    }, 5000);
}

closeStory.addEventListener('click', () => {
    storyModal.classList.remove('active');
});

storyModal.addEventListener('click', (e) => {
    if (e.target === storyModal) {
        storyModal.classList.remove('active');
    }
});

// ===== PUBLICAR POST =====
publishBtn.addEventListener('click', () => {
    const text = newPostText.value.trim();
    if (!text) {
        newPostText.focus();
        newPostText.style.boxShadow = '0 0 0 2px #e53935';
        setTimeout(() => {
            newPostText.style.boxShadow = '';
        }, 2000);
        return;
    }

    const feed = document.querySelector('.feed');
    const newPostElement = document.createElement('article');
    newPostElement.className = 'post';
    newPostElement.id = `post-${++postCount}`;

    const randomImages = [
        'https://picsum.photos/800/500?random=' + (postCount + 100),
        'https://picsum.photos/800/500?random=' + (postCount + 200),
        'https://picsum.photos/800/500?random=' + (postCount + 300),
    ];
    const randomImg = randomImages[Math.floor(Math.random() * randomImages.length)];

    newPostElement.innerHTML = `
        <div class="post-header">
            <div class="user">
                <img src="https://i.pravatar.cc/50?img=15" alt="Luiz André">
                <div>
                    <h3>Luiz André</h3>
                    <span class="post-time"><i class="fa-solid fa-clock"></i> Agora · <i class="fa-solid fa-earth-americas"></i></span>
                </div>
            </div>
            <div class="post-menu">
                <button class="post-options-btn"><i class="fa-solid fa-ellipsis"></i></button>
                <div class="post-dropdown">
                    <a href="#" class="dropdown-save"><i class="fa-solid fa-bookmark"></i> Salvar</a>
                    <a href="#" class="dropdown-delete" onclick="deletePost(this)"><i class="fa-solid fa-trash"></i> Excluir</a>
                </div>
            </div>
        </div>
        <p class="post-text">${escapeHtml(text)}</p>
        <div class="post-image-container">
            <img class="post-image" src="${randomImg}" alt="Post">
        </div>
        <div class="post-reactions">
            <span class="reactions-count"><i class="fa-solid fa-heart" style="color: #e53935;"></i> 0 curtidas</span>
            <span class="comments-count">0 comentários</span>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn" onclick="toggleLike(this)">
                <i class="fa-solid fa-heart"></i> <span>Curtir</span>
            </button>
            <button class="action-btn comment-btn" onclick="toggleComments('post-${postCount}')">
                <i class="fa-solid fa-comment"></i> <span>Comentar</span>
            </button>
            <button class="action-btn share-btn">
                <i class="fa-solid fa-share"></i> <span>Compartilhar</span>
            </button>
        </div>
        <div class="comments-section" id="comments-post-${postCount}">
            <div class="comment-list"></div>
            <div class="comment-input">
                <img src="https://i.pravatar.cc/35?img=15" alt="Você">
                <input type="text" placeholder="Escreva um comentário..." class="comment-field">
                <button class="send-comment-btn" onclick="addComment(this)"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;

    // Inserir após a caixa de nova postagem
    const newPostBox = document.querySelector('.new-post');
    newPostBox.insertAdjacentElement('afterend', newPostElement);

    // Limpar textarea
    newPostText.value = '';
    newPostText.style.height = 'auto';

    // Scroll para o novo post
    newPostElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Toast de sucesso
    showToast('Post publicado com sucesso! 🎉');
});

// ===== EXCLUIR POST =====
function deletePost(link) {
    const post = link.closest('.post');
    if (confirm('Tem certeza que deseja excluir este post?')) {
        post.style.transition = 'all 0.3s ease';
        post.style.opacity = '0';
        post.style.transform = 'translateY(-20px)';
        post.style.maxHeight = '0';
        post.style.overflow = 'hidden';
        setTimeout(() => {
            post.remove();
        }, 300);
    }
}

// ===== NOTIFICAÇÕES =====
notifBtn.addEventListener('click', () => {
    const badge = notifBtn.querySelector('.badge');
    if (badge) {
        badge.remove();
        showToast('Notificações visualizadas!');
    }
});

// ===== TOAST =====
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: var(--gradient-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 20px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 3000;
        box-shadow: 0 8px 30px rgba(123, 26, 46, 0.4);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ===== AUTO-RESIZE TEXTAREA =====
newPostText.addEventListener('input', () => {
    newPostText.style.height = 'auto';
    newPostText.style.height = newPostText.scrollHeight + 'px';
});

// ===== SEGUIMENTOS =====
document.querySelectorAll('.follow-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('followed')) {
            this.classList.remove('followed');
            this.innerHTML = '<i class="fa-solid fa-user-plus"></i>';
            this.style.background = '';
            showToast('Deixou de seguir!');
        } else {
            this.classList.add('followed');
            this.innerHTML = '<i class="fa-solid fa-check"></i>';
            this.style.background = 'var(--online)';
            showToast('Seguindo! 🎉');
        }
    });
});

// ===== MENU LATERAL =====
document.querySelectorAll('.menu-card li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-card li').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== TECLA ESC =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        storyModal.classList.remove('active');
        chatBox.classList.remove('active');
    }
});

// ===== CHAT HEADER CLICK =====
document.querySelector('.chat-header').addEventListener('click', (e) => {
    if (!e.target.closest('.chat-action-btn')) {
        chatBox.classList.toggle('active');
    }
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Scroll do chat para o final
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
