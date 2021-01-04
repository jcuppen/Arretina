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

var scriptAnchor = document.getElementById('script-anchor');
const importedScripts = [];

function importScript(path) {
  if(importedScripts.includes(path)) {
    // console.warn(`script @: '${path}' already imported!`);
    return;
  }

  const script = document.createElement('script');
  script.src = path;
  script.type = 'text/javascript';

  scriptAnchor.parentNode.insertBefore(script, scriptAnchor.nextSibling);
  importedScripts.push(path);
}

function generateColorPicker(defaultColor) {
    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', defaultColor);
    return colorPicker;
}

function generateCheckbox() {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  return checkbox;
}

function generateNumberInput(defaultValue) {
  const numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('value', defaultValue);
  return numberInput;
}

function generateSelect(options, selectedValue, id = null) {
  const select = document.createElement('select');
  if (id !== null) {
    select.setAttribute('id', id);
  }
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

const capitalize = str => str[1].toUpperCase();
const kebabToCamelCase = str => str.replace(/-./g, capitalize);
