window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // Create a new WebSocket.
  var socket = new WebSocket('ws://localhost:8080');

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(evt) {
    socketStatus.innerHTML = 'Connected to: ' + evt.currentTarget.URL;
    socketStatus.className = 'open';
  };

  socket.onerror = function(err) {
    console.log('WebSocket Error: ' + err);
  };

  // Send message when the form is submitted
  form.onsubmit = function(e) {
    e.preventDefault();

    // Retrieve the message from the textarea.
    var message = messageField.value;

    // Send the message through the WebSocket.
    socket.send(message);

    // Add message to messages list.
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';

    // Clear out the message field.
    messageField.value = '';

    return false;
  };

  socket.onmessage = function(evt) {
    var message = evt.data;
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
  };

  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(evt) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };

  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // Close the WebSocket.
    socket.close();
    return false;
  };
}
