var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:3000})
  wordCount = require('./testMapper/wordCounter');

wss.on('connection', function connection(ws) {
  // Callback function for on receive function
  ws.on('message', function incoming(message) {
/*    console.log('received: %s', message);
    send = {};
    send['data'] = wordCount.text;
    ws.send(JSON.stringify(send));
    console.log(send);*/ws.close();
  });
  ws.on('close', function close(message) {
  });

  var send = {};
  send['data'] = wordCount.text;
  send['function'] = wordCount.wordCount.toString();
  ws.send(JSON.stringify(send));
  console.log(send);
});
