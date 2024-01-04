$(document).ready(function () {
    var socket = io();
    socket.on('connect', () => {
        console.log('Connected to sever !')
    })
    let guest = $('#username_top_right').text();
    let you = $('#user-name-real').text();
    let room = $('#room-number').val();
    $('#chat-with-you').click(function () {
        if (guest !== you) {
            socket.emit('join', room);
        }
    });
    if (guest === you) {
        socket.emit('join', room);
    }
    $('#send-message-button').click(function () {
        let content = $('#content-message').val();
        socket.emit('Send message', {
            from: guest,
            message: content
        });
        $('#content-message').val('');
    });
    socket.on('receive-message', function (data) {
        const messageElement = $('<p>').text(data.message);
        messageElement.innerText = data.message;
            const divElement = $('<div>').addClass('message');
        if (data.from===guest) {
            const showMessage=$('<div>').addClass('message-right').addClass('clear');
            showMessage.append(divElement);
            divElement.append(messageElement);
            $('#scrollbar').append(showMessage);
        } else {
            const showMessage=$('<div>').addClass('message-left').addClass('clear');
            showMessage.append(divElement);
            divElement.append(messageElement);
            $('#scrollbar').append(showMessage);
        }

    })
})

