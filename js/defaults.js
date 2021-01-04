"use strict";

function addDefaultStyle(defaultStyle) {
  const element = document.createElement(`sac-${defaultStyle.type}-input`);
  Object.keys(defaultStyle.data).forEach( k => {
    element.setAttribute(`data-${k}`, defaultStyle.data[k]);
  });
  const uuid = uniqueID();
  element.setAttribute('data-id', uuid);

  defaultsAnchor.parentNode.insertBefore(element, defaultsAnchor.nextSibling);

  importScript(`js/components/defaults/${kebabToCamelCase(defaultStyle.type)}Input.js`);
}

const defaultStyles = [
  {type: "length",  data: {prop: "margin",        unit: 'px', value: 2}},
  {type: "length",  data: {prop: "padding",       unit: 'px', value: 5}},
  {type: "length",  data: {prop: "border-radius", unit: 'px', value: 5}},
  {type: "color",   data: {prop: "color",      value: '#FFFFFF'}},
  {type: "color",   data: {prop: "background", value: '#808080'}},
];

const defaultsAnchor = document.getElementById('default-styles');

defaultStyles.forEach( ds => addDefaultStyle(ds));
