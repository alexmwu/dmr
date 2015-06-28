window.onload = function() {
  var mapper;

  // Get references to elements on the page.
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // Create a new WebSocket.
  var socket = new WebSocket('ws://localhost:3000');

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
    var obj = JSON.parse(message);
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' + obj['data'] + '</li>';

    // Send message
    if('function' in obj) {
      console.log('hioshadfoisahd');
      mapper = new Function('return ' + obj['function'])();
    }
    var out = mapper(obj['data']);
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
