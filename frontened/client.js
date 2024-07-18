const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message,position) => {
    const messageElement = document.createElement('div');
    const messageleftElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);


    messageleftElement.classList.add('leftmessage');
    messageleftElement.innerText = message;
    messageleftElement.classList.add(position);

    if (position === 'right') {
        messageContainer.append(messageElement);
    }
    else {
        messageContainer.append(messageleftElement);
    }
   
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message === '') {
        return;
    }
    append(`You:${message}`, "right");
    socket.emit('send', message);
    messageInput.value = '';
})
const username= prompt('Enter your name to join');
socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`,'right');
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})
socket.on('left', data => {
    append(`${data.name} :Left The Chat`,'left');
})

