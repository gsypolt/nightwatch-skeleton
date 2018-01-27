/*
Custom command: customScrollElementToView(selector, elementPosition)
This command scrolls the current page to move an element in the viewport.
The element is identified by the 'selector' parameter (any CSS selector). Additionaly
the optional parameter 'elementPosition' specifies the element location after page scroll.
Setting the value as 'true' (the default behavior) places the element to the
top of the page whereas 'false' does the opposite.
This function also supports callback function for asynchronus tasks.
*/

'use strict';

exports.command = function(selector, elementPosition, callback) {
  var self = this;

  if (typeof elementPosition === "function") {
    callback = elementPosition;
    elementPosition = true;
  }
  if (elementPosition === undefined) {
    elementPosition = true;
  }
  return this.execute(function(selector, elementPosition) {
    var targetElement = document.querySelector(selector);
    targetElement.scrollIntoView(elementPosition); // Scroll the page to display the desired element
    return targetElement;
  }, [selector, elementPosition], function(result) {
    this.assert.equal(result.status, 0); // Assert the desired element is displayed in the viewport
    if (typeof callback === "function") {
      callback.call(self, result);
    }
  })
};
