"use strict";

function addDefault(defaultStyle) {
  const element = document.createElement(`sac-${defaultStyle.type}-input`);
  if (defaultStyle.data != undefined) {
    Object.keys(defaultStyle.data).forEach( k => {
      element.setAttribute(`data-${k}`, defaultStyle.data[k]);
    });
  }

  const uuid = uniqueID();
  element.setAttribute('data-id', uuid);

  defaultsAnchor.parentNode.insertBefore(element, defaultsAnchor.nextSibling);

  importScript(`js/components/defaults/${kebabToCamelCase(defaultStyle.type)}Input.js`);
}

const defaultStyles = [
  {type: INPUT_TYPES.length,  data: {prop: "margin",        unit: 'px', value: 2}},
  {type: INPUT_TYPES.length,  data: {prop: "padding",       unit: 'px', value: 5}},
  {type: INPUT_TYPES.length,  data: {prop: "border-radius", unit: 'px', value: 5}},
  // {type: INPUT_TYPES.color,   data: {prop: "color",      value: '#FFFFFF'}},
  {type: INPUT_TYPES.color,   data: {prop: "background", value: '#808080'}},
];

const defaultsAnchor = document.getElementById('default-styles');

defaultStyles.forEach( ds => addDefault(ds));
