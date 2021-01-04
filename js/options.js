"use strict";

function addOption(option) {
  const element = document.createElement(`sac-${option.type}-option`);
  if (option.data != undefined) {
    Object.keys(option.data).forEach( k => {
      element.setAttribute(`data-${k}`, option.data[k]);
    });
  }

  const uuid = uniqueID();
  element.setAttribute('data-id', uuid);

  optionsAnchor.parentNode.insertBefore(element, optionsAnchor.nextSibling);

  importScript(`js/components/options/${kebabToCamelCase(option.type)}Option.js`);
}

const options = [
  {type: OPTION_TYPES.parity,     data: {parity: 'odd', value: '#000000'}},
  {type: OPTION_TYPES.parity,     data: {parity: 'even', value: '#FF0000'}},
  {type: OPTION_TYPES.comparison, data: {value: 0, color: '#00FF00'}},
  {type: OPTION_TYPES.hideValue,  data: {}},
];

const optionsAnchor = document.getElementById('visualization-options');

options.forEach( o => addOption(o));
