"use strict";

const styles = [];

function getFragment(type, orientation = '') {
  const suffix = (orientation !== '') ? `${type}-${orientation}` : type;
  const customElement = document.getElementById(`sac-${suffix}`);
  console.log(customElement);
  const prefix = (orientation !== '') ? `${type}-${orientation}` : type;
  return customElement.shadowRoot.getElementById(`${prefix}-template`);
}

function loadScalar(fragment, id, value, before = null) {
  const instance = document.importNode(fragment.content, true);
  const valueContainer = instance.querySelector('.value');

  valueContainer.innerHTML = value;
  styles.forEach( f => {
    f(valueContainer, value);
  })

  const scalarContainer = document.getElementById(id);

  if (before == null) {
    scalarContainer.appendChild(instance);
  } else {
    scalarContainer.parentElement.insertBefore(instance, before);
  }
}

function loadArray(fragment, hookId, arrayContents, orientation='row') {
// console.log(fragment);
// console.log(hookId);
// console.log(arrayContents);
// console.log(instance.lastElementChild);

  const uuid = uniqueID();
  const instance = document.importNode(fragment.content, true);

  instance.lastElementChild.querySelector('.array-anchor').setAttribute('id', uuid);

  document.getElementById(hookId).appendChild(instance);

  arrayContents.forEach(v => {
    const nextOrientation = (orientation === 'row') ? 'col' : 'row';
    load(v, uuid, nextOrientation, document.getElementById(uuid), );
  });
}

function load(input, hookId, orientation = 'col', before = null) {
  if (Array.isArray(input)) {
    loadArray(getFragment(ELEMENT_TYPES.array, orientation), hookId, input, orientation);
  } else if (Array.isArray(input.value)) {
    loadArray(getFragment(ELEMENT_TYPES.array, orientation), hookId, input.value, orientation);
  } else if (Number.isFinite(input)) {
    loadScalar(getFragment(ELEMENT_TYPES.scalar), hookId, input, before);
  } else {
    loadScalar(getFragment(ELEMENT_TYPES.scalar), hookId, input.value, before);
  }
}

function readFile(inputElement) {
  if(inputElement.files[0] ?? false) {
    let reader = new FileReader();
    reader.onload = e => {
      load(JSON.parse(e.target.result), 'array-root');
    };
    reader.readAsText(inputElement.files[0]);
  }
}
