window.onload = function() {

  // Get references to elements on the page.
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

  socket.onmessage = function(evt) {
    var message = evt.data;
    console.log(message);
 
    // Parse for function and data
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
    var obj = JSON.parse(message);

    // Send message
    var func = new Function(obj['function']);
    var out = func(obj['data']);
    socket.send(out);
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + out + '</li>';
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
