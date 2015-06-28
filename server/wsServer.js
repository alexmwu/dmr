var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:8080})
  wordCount = require('./testMapper/wordCounter');

wss.on('connection', function connection(ws) {
  ws.on('open',function incoming(message) {
    // Send first code and data
    var send = {};
    send['data'] = wordCount.text;
    send['function'] = wordCount.wordCount.toString();
    ws.send(JSON.stringify(send));
  });
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    var send = {};
    send['data'] = wordCount.text;
    send['function'] = wordCount.wordCount.toString();
    ws.send(JSON.stringify(send));
  });
  ws.on('close', function close(message) {
  });
  ws.send("Hello dmr!");
});
