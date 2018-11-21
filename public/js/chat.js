var socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/'
    } else {
      console.log('No Error');
    }
  });
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
  scrollToBottom();
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
