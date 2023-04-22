document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');

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
            body: JSON.stringify({ text: messageText }),
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
});