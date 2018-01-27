/*This command traverses through the ShadowDOM using the keyWord and the propertyName associated with that
particular keyword and assert that the particular keyWord is present inside the ShadowDOM. The result.value
used in the assertion returns a WebElement JSON object*/

'use strict';
exports.command = function(keyWord,propertyName) {
  this.execute(function(keyWord,propertyName){
    var elements = document.getElementsByTagName("*");
    function findShadowDomElement (keyWord, elements,propertyName) {
      for (var currentElement of elements) {
        if (currentElement[propertyName] === keyWord) {
          return currentElement;
        }
        else if (currentElement.shadowRoot !== null) {
          var shadowElements = currentElement.shadowRoot.querySelectorAll("*")
          var match = findShadowDomElement(keyWord, shadowElements,propertyName)
          if (match) {
            return match;
          }
        }
      }
    }
    return findShadowDomElement(keyWord, elements,propertyName);
  }, [keyWord,propertyName], function(result){
    this.assert.notEqual(result.value,null);
  });
}
