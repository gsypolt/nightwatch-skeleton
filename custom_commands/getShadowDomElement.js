/* This command validates and returns an element which is enclosed within a shadow DOM.
The command syntax is customGetShadowDomElement(ARRAY_OF_SHADOWHOST_ELEMENTS, userAction, callback_function).
The array consists of an ordered list of shadow host elements that leads to the desired element. 
Certain user actions are permitted on the element and this can be specified on the second parameter. 
This parameter is optional and default value is 'assert' (no user action).
Optionally a callback function can be added for synchronization purposes.

At the moment this function serves as an interim solution for accessing elements within shadow DOM.
*/
 
'use strict';

exports.command = function(selector, action, callback) {
  var self = this;

  if (typeof action === "function") {
    callback = action;
    action = 'assert';
  }
  if (action === undefined) {
    action = 'assert';
  }

  return this.execute(function(selectors, userAction) {
    if (!Array.isArray(selectors)) {
      selectors = [selectors];
    }

    function findElement(selectors) {
      var currentElement = document;
      for (var i = 0; i < selectors.length; i = i+1 ) {
        if (i > 0) {
          currentElement = currentElement.shadowRoot;
        }
        currentElement = currentElement.querySelector(selectors[i]);
        if (!currentElement) {
          break;
        }
      }
      return currentElement;
    }

    if (!(document.body.createShadowRoot || document.body.attachShadow)) {
      selectors = [selectors.join(' ')];
    }

    var targetElement = findElement(selectors);
    if (userAction === 'click') {
      targetElement.click();
    }
    return targetElement;
  }, [selector, action], function(result) {
    this.assert.notEqual(result.value, null);
    if (action === 'hover') {
      this.elementIdSize(result.value.ELEMENT, function(result2) { // Obtain the element size
        this.moveTo(result.value.ELEMENT, result2.value.width/2, result2.value.height/2) // Move mouse pointer to the middle of the video element
      })
    }
    if (typeof callback === "function") {
      callback.call(self, result);
    }
  })
};
