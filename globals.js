"use strict";

var uniqueID = (function() {
  /*
    This is the private persistent value
    The outer function returns a nested
    function that has access to the persistent value.
    It is this nested function we're storing
    in the variable uniqueID above.
  */
  var id = 0;
  return function() { return id++; };  // Return and increment
})();
