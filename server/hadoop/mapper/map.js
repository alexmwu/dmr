#!/usr/bin/env node
var stdin = process.openStdin();
var stdout = process.stdout;
var input = '';
 
stdin.on('data',function (data) {
  while(input.match(/\r?\n/)) {
    input = RegExp.rightContext;
    write(RegExp.leftContext);
  }
  write(input);
});

function write(line) {
  stdout.write(line + '\n');
}
