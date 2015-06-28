var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:3000}),
  wordCount = require('./testMapper/wordCounter');
var mapper = 'hadoop/mapper/map.js';
var reducer = 'hadoop/reducer/reduce.js';

// this section is to test chunking and reducing with a file
var inFile = 'hadoop/tmp.txt';  // input file to hadoop streaming
var outFile = 'hadoop/reducerOutput'; // output directory for reducer
var path = require('path');
var chunkSize = 50;
var words = [];
var fs = require('fs');
var chunkIndex = 0;
fs.readFile(path.join(__dirname,'db/book-data/pg74.txt'),{encoding: 'utf-8'},function(err,data) {
  if(!err){
    // split by words but rejoin when sending in chunks
    words = data.split(" ");
  } else {
    console.error(err);
  }
});
var out = ""; // not scalable since stored in memory

// for executing command line code
var exec = require('child_process').exec;

wss.on('connection', function connection(ws) {
  // Callback function for on receive function
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    out += message;
    send = {};
    
    // if chunkindex exceeds words.length, close
    if(chunkIndex >= words.length) {
      wss.close();
      // reset chunkIndex
      chunkIndex = 0;

      // write mapper output to output file
      fs.writeFile(outFile, out);

      
    }
    send['data'] = concat();
    if(ws.readyState != ws.OPEN) {
      console.error('Client state is '+ ws.readyState);
    }
    else
    ws.send(JSON.stringify(send));
  });
  ws.on('close', function close(message) {
  });

  var send = {};
  send['data'] = concat(); 
  send['function'] = wordCount.wordCount.toString();
  ws.send(JSON.stringify(send));
  console.log(send);
});

function concat() {
  var chunk = "";
  for (var i = chunkIndex; i < chunkIndex + chunkSize; i++) {
    if(i >= words.length) {
      chunkIndex = i++;
      return chunk;
    }
    chunk += words[i] + " ";
  }
  chunkIndex += chunkSize;
  return chunk;
}

// run pass through mapper and reducer in hadoop streaming
function runReducer() {
  var cmd = 'hadoop -input ' + inFile + ' -output ' + outFile + ' -mapper ' + mapper +' -reducer ' + reducer;
  
}
