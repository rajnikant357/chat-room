const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const userToggle = document.getElementById('userToggle');
const currentUserSpan = document.getElementById('currentUser');

let currentUser = 'User 1';

// Load messages from local storage
let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Function to render messages
function renderMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', msg.user === 'User 1' ? 'user1' : 'user2');
        messageElement.textContent = `${msg.user}: ${msg.text}`;
        chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to add a new message
function addMessage(text) {
    const newMessage = { user: currentUser, text: text };
    messages.push(newMessage);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    renderMessages();
}

// Event listener for send button
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage(messageText);
        messageInput.value = '';
    }
});

// Event listener for Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Event listener for user toggle
userToggle.addEventListener('change', () => {
    currentUser = userToggle.checked ? 'User 2' : 'User 1';
    currentUserSpan.textContent = currentUser;
});

// Initial render
renderMessages();

