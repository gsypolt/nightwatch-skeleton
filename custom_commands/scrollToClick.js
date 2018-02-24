/*
This command moves to a specific element denoted by 'selector' before clicking it.
The command moved the pointer to the central point of the rectangle that encloses the element.
In this process elements that are out of the viewport are scrolled into view. 
Also a part of the element always displays after scrolling irrespective of the direction.
This ensures a valid click on the element.
*/

'use strict';

exports.command = function(selector) {
  var browser = this;

  browser
    .getElementSize(selector, function(result) {
      browser.assert.equal(result.status, 0);
      browser.moveToElement(selector, Math.round(result.value.width/2), Math.round(result.value.height/2));
      browser.click(selector);
    });

  return this;
};
