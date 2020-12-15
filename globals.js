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

function generateSelect(id, options, selectedValue) {
  const select = document.createElement('select');
  select.setAttribute('id', id);
  options.forEach( o => {
    const option = document.createElement('option');
    option.setAttribute('value', o);
    if (selectedValue == o) {
      option.setAttribute('selected', true);
    }
    option.innerHTML = o;
    select.appendChild(option);
  });
  return select;
}
