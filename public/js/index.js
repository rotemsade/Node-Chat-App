var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  console.log(`Message from ${message.from} sent at ${message.createdAt}: ${message.text}`);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});
