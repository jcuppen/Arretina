"use strict";

const scriptAnchor = document.getElementById('script-anchor');
const importedScripts = [];

const capitalize = str => str[1].toUpperCase();
const kebabToCamelCase = str => str.replace(/-./g, capitalize);

const uniqueID = (function() {
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

function importScript(path) {
  if(importedScripts.includes(path)) {
    // console.warn(`script @: '${path}' already imported!`);
    return;
  }

  const script = document.createElement('script');
  script.src = path;

  scriptAnchor.parentNode.insertBefore(script, scriptAnchor.nextSibling);
  importedScripts.push(path);
}

// Inspired by: https://codepen.io/WebSeed/pen/pvgqEq
function determineForegroundColor(backgroundColor) {
  let r = parseInt(backgroundColor.slice(1,3), 16);
  let g = parseInt(backgroundColor.slice(3,5), 16);
  let b = parseInt(backgroundColor.slice(5,7), 16);
  var perceptiveLuminance = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return (perceptiveLuminance < 0.5) ? '#000000' : '#FFFFFF';
}

function generateColorPicker(defaultColor) {
    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', defaultColor);
    return colorPicker;
}

function generateCheckbox(isChecked = false) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  if (isChecked) {
    checkbox.setAttribute('checked', '');
  }
  return checkbox;
}

function generateNumberInput(defaultValue = 0) {
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

