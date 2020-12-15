"use strict";

const defaultStyles = [
  {type: "length",  data: {prop: "margin",  unit: 'px', value: 2}},
  {type: "length",  data: {prop: "padding", unit: 'px', value: 5}},
  {type: "length",  data: {prop: "border-radius", unit: 'px', value: 5}},
  {type: "color",   data: {prop: "color", value: '#FFFFFF'}},
  {type: "color",   data: {prop: "background", value: '#808080'}},
]

const anchor = document.getElementById('default-styles')

defaultStyles.forEach( ds => {
  const element = document.createElement(`sac-${ds.type}-input`);
  Object.keys(ds.data).forEach( k => {
    element.setAttribute(`data-${k}`, ds.data[k]);
  });
  const uuid = uniqueID();
  element.setAttribute('data-id', uuid);

  anchor.parentNode.insertBefore(element, anchor.nextSibling);
});

