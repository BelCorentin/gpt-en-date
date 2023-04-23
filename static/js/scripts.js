document.addEventListener('DOMContentLoaded', () => {
    const difficultyForm = document.getElementById('difficulty-form');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const header = document.getElementById('chat-header');
    const difficulty = document.getElementById('difficulty');

    difficultyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
        window.location.href = `/chat?difficulty=${selectedDifficulty}`;
    });
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Append user's message
        appendMessage(messageText, 'user');

        // Clear the input
        messageInput.value = '';

        // Query GPT-3.5 and append the response
        // Replace with your actual Flask API endpoint
        const response = await fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: messageText, difficulty: diff }),
        });

        const data = await response.json();
        console.log(data)
        const gptResponse = data.response;
        console.log(gptResponse)
        appendMessage(gptResponse, 'gpt');
    });

    function appendMessage(text, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}`;
        messageEl.textContent = text;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // function appendMessage(text, sender) {
    //     const messageEl = document.createElement('div');
    //     messageEl.className = `message ${sender}`;

    //     const imgEl = document.createElement('img');
    //     imgEl.src = sender === 'user' ? 'static/images/user.png' : 'static/images/bot.png';
    //     imgEl.alt = sender === 'user' ? 'User' : 'Bot';
    //     messageEl.appendChild(imgEl);

    //     const textEl = document.createElement('div');
    //     textEl.className = 'text';
    //     textEl.textContent = text;
    //     messageEl.appendChild(textEl);

    //     chatMessages.appendChild(messageEl);
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    // }

    function winAnimation() {
        document.querySelector('.chat-container').classList.add('win-animation');
        setTimeout(() => {
            document.querySelector('.chat-container').classList.remove('win-animation');
        }, 2000);  // Animation duration
    }

    function loseAnimation() {
        document.querySelector('.chat-container').classList.add('lose-animation');
        setTimeout(() => {
            document.querySelector('.chat-container').classList.remove('lose-animation');
        }, 2000);
    }

    function addDifficulty(difficulty) {
        const difficulty_ = document.createElement('span');
        difficulty_.className = 'difficulty-set';
        difficulty_.textContent = difficulty;
        header.appendChild(difficulty_);
    }

    addDifficulty(difficulty.textContent);
});

