#!/usr/bin/env node
var stdout = process.stdout;
var input = '';
 
function passThrough(data) {
  while(input.match(/\r?\n/)) {
    input = RegExp.rightContext;
    write(RegExp.leftContext);
  }
  write(input);
}