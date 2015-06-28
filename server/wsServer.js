var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:8080})
  wordCount = require('testMapper/wordCounter');



wss.on('connection', function connection(ws) {
  ws.on('open',function incoming(message) {
    console.log('received: %s', message);
    ws.send(reverse(message));
  });
  ws.send("Hello WebSocket!");
});
