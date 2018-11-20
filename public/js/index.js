var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('H:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('H:mm');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });

  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.text('Send Location').removeAttr('disabled');
    console.log(position);
  }, function () {
    locationButton.text('Send Location').removeAttr('disabled');
    alert('Unable to fetch location.');
  });
});
