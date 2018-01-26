/*
This command changes the focus to the window as denoted by the window handle
In this command the 'number' = 0 denotes the base window and a positive integer
value denotes the secondary or newer window.
The command customChangeWindow(x) can be used to change focus to the appropriate window.
*/

'use strict';

exports.command = function(number) {
  var browser = this;

  browser
    .windowHandles(function(result) {
      var temp = result.value[number];
      browser.switchWindow(temp);
    });

  return this;
};
