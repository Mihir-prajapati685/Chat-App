const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const leftsild = document.querySelector('.left-side-text');
var audio = new Audio('ting.mp3');

const append = (message,position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    const messageleftElement = document.createElement('div');
    messageleftElement.classList.add('leftmessage');
    messageleftElement.innerText = message;
    messageleftElement.classList.add(position);

    if (position === 'right') {
        messageContainer.append(messageElement);
    }
    else {
        messageContainer.append(messageleftElement);
        audio.play();
    }

   
}
const joined = (message) => {
    if (leftsild == '') {
        return;
    }
    else {
        const leftsidediv = document.createElement('div');
    leftsidediv.classList.add('leftsidetext');
    leftsidediv.innerText = message;
    // messageleftElement.classList.add(position);
        leftsild.append(leftsidediv);
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

 username = prompt('Enter your name to join');
 socket.emit('new-user-joined', username);


socket.on('user-joined', username => {
    joined(`${username} :`);
    
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})
socket.on('left', data => {
    append(`${data.name} :Left The Chat`,'left');
})

