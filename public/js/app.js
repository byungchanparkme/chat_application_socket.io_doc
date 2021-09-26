var socket = io.connect('http://localhost:3000');
/*
 socket.IO서버로 연결
*/

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', msg => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    console.log(item);
    window.scrollTo(0, document.body.scrollHeight);
})