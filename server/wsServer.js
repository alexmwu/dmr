var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:3000}),
  wordCount = require('./testMapper/wordCounter');
var hadoop = '/home/ubuntu/hadoop-2.6.0/bin/hadoop';
var mapper = 'hadoop/mapper/map.py';  // mapper function
var reducer = 'hadoop/reducer/reduce.py'; // reducer function
var hadoopStreaming = '/home/ubuntu/hadoop-2.6.0/hadoop-streaming-2.6.0';  // location of hadoop streaming jar 

// send https requests (for venmo api)
var https = require('https');
// payment per mapper done
var payment = 0.001;
var oauth = require('./oauth_key.js');

// this section is to test chunking and reducing with a file
var inFile = 'hadoop/tmp.txt';  // input file to hadoop streaming
var outFile = 'hadoop/reducerOutput/'; // output directory for reducer
var path = require('path');
var chunkSize = 50;
var words = [];
var fs = require('fs');
var chunkIndex = 0;
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

      // write mapper output to hadoop streaming input file
      fs.writeFile(inFile, out);
      var amount = payment*Math.floor(words.length/chunkSize).toString();
      var options = {
        host: 'sandbox-api.venmo.com',
        path: '/v1/payments',
        port: '443',
        method: 'POST',
        headers: {
          'access_token': oauth.venmo,
          'user_id': '145434160922624933',
          'note': 'For Mapper Jobs',
          'amount': amount
        }
      };
      
      var req = https.request(options,function(response) {
        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
        });
      
        response.on('end', function () {
          console.log(str);
        });
      });
      req.end(); 
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
