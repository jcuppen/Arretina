"use strict";

const baseStyles = [];

const baseStylesAnchor = document.getElementById('base-styles');

function addBaseStyle(baseStyle) {
  baseStyles.push(baseStyle);

  const element = document.createElement(`sac-${baseStyle.type}-input`);
  element.id = baseStyle.id;
  if (baseStyle.data != undefined) {
    Object.keys(baseStyle.data).forEach( k => {
      element.setAttribute(`data-${k}`, baseStyle.data[k]);
    });
  }

  baseStylesAnchor.parentNode.insertBefore(element, baseStylesAnchor.nextSibling);

  importScript(`js/components/defaults/${kebabToCamelCase(baseStyle.type)}Input.js`);
}

function removeBaseStyle(e, id) {
  const i = baseStyles.findIndex(bs => bs.id === id);
  baseStyles.splice(i, 1);
  document.getElementById(id).remove();
}
