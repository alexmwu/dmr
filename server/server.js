var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:8080});

wss.on('connection', function connection(ws) {
  ws.on('message',function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send(reverse(message));
});

function reverse(s) {
  var out = '';
  for (var i = s.length -1; i>=0; i--)
    out += s[i];
  return out;
}
