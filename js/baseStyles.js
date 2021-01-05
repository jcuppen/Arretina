"use strict";

const defaultBaseStyles = [
  {type: INPUT_TYPES.length,  data: {prop: "margin",        unit: 'px', value: 2}},
  {type: INPUT_TYPES.length,  data: {prop: "padding",       unit: 'px', value: 5}},
  {type: INPUT_TYPES.length,  data: {prop: "border-radius", unit: 'px', value: 5}},
  {type: INPUT_TYPES.color,   data: {prop: "background", value: '#808080'}},
];

const baseStyles = [];

const baseStylesAnchor = document.getElementById('base-styles');

function addBaseStyle(baseStyle) {
  baseStyles.push(baseStyle);

  const element = document.createElement(`sac-${baseStyle.type}-input`);
  if (baseStyle.data != undefined) {
    Object.keys(baseStyle.data).forEach( k => {
      element.setAttribute(`data-${k}`, baseStyle.data[k]);
    });
  }

  baseStylesAnchor.parentNode.insertBefore(element, baseStylesAnchor.nextSibling);

  importScript(`js/components/defaults/${kebabToCamelCase(baseStyle.type)}Input.js`);
}

defaultBaseStyles.forEach(addBaseStyle);
