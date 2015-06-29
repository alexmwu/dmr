#!/usr/bin/env node
 
var stdin = process.openStdin();
var stdout = process.stdout;
var counter = {};
var input = '';
 
stdin.on('data', function(data) {
  if (data) {
    input += data;
    while (input.match(/\r?\n/)) {
      input = RegExp.rightContext;
      proc(RegExp.leftContext);
    }
  }
});
 
stdin.on('end', function() {
  if (input) proc(input);
  for (var k in counter) {
    stdout.write(k + ':' + counter[k] + '\n');
  }
});
 
function proc(line) {
  var words = line.split(',');
  var word = words[0];
  var count = parseInt(words[1]);
  if (!counter[word]) counter[word] = 1;
  else counter[word] += count;
}
