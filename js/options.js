"use strict";

const options = [];

const optionsAnchor = document.getElementById('visualization-options');

function addOption(option) {
  options.push(option);

  const element = document.createElement(`sac-${option.type}-option`);
  if (option.checked) {
  	element.setAttribute('data-checked', 'true');
  }
  if (option.data != undefined) {
    Object.keys(option.data).forEach( k => {
      element.setAttribute(`data-${k}`, option.data[k]);
    });
  }

  optionsAnchor.parentNode.insertBefore(element, optionsAnchor.nextSibling);

  importScript(`js/components/options/${kebabToCamelCase(option.type)}Option.js`);
}
