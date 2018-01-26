/*This command traverses through the ShadowDOM using the keyWord and the propertyName associated with that
particular keyword and clicks that the particular keyWord is present inside the ShadowDOM*/

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
    return findShadowDomElement(keyWord, elements,propertyName).click();
  }, [keyWord,propertyName]);
}
