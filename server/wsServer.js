var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:3000}),
  wordCount = require('./testMapper/wordCounter'),
  config = require('./config');
var hadoop = config.hadoop.binary;
var mapper = config.hadoop.mapper;
var reducer = config.hadoop.reducer;
var hadoopStreaming = config.hadoop.streaming_jar;

// this section is to test chunking and reducing with a file
var inFile = config.hadoop.streaming_infile;
var outFile = config.hadoop.streaming_outfile;
var chunkSize = config.chunk_size;

var words = [];
var chunkIndex = 0;
// manually reading file
var fs = require('fs');
var path = require('path');
// emulates hadoop's built-in chunking
fs.readFile(path.join(__dirname,'db/book-data/pg74.txt'),{encoding: 'utf-8'},function(err,data) {
  if(!err){
    // split by words but rejoin when sending in chunks
    data = data.replace(/(?:\r\n|\r|\n)/g, '\n');
    words = data.split(" ");
  } else {
    console.error(err);
  }
});
var out = ""; // not scalable since stored in memory

// for executing command line Hadoop code
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

      // write mapper output to hadoop streaming input file
      fs.writeFile(inFile, out);
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
  var cmd = hadoop + ' jar ' + hadoopStreaming + ' ' + ' -input ' + inFile + ' -output ' + outFile + ' -mapper ' + mapper +' -reducer ' + reducer;
  exec(cmd, function(err,stdout,stderr) {
    console.error(err);
    console.log("Stderr: " + stderr + "\nStdout: " + stdout + "\n");
  });  
}
