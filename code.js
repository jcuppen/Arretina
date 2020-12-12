"use strict";

const styles = [
  // (e, v) => {
  //   const form = document.getElementById('odd').shadowRoot;
  //   const checkbox = form.querySelector(`input[type=checkbox]`);
  //   if (checkbox.checked && v % 2 !== 0) {
  //     const colorPicker = form.querySelector(`input[type=color]`);
  //     e.setAttribute('style', `background:${colorPicker.value}`)
  //   }
  // },
  // (e, v) => {
  //   const form = document.getElementById('even');
  //   const checkbox = form.querySelector(`input[type=checkbox]`);
  //   if (checkbox.checked && v % 2 === 0) {
  //     const colorPicker = form.querySelector(`input[type=color]`);
  //     e.setAttribute('style', `background:${colorPicker.value}`)
  //   }
  // },
];

function getFragment(type) {
  const customElement = document.getElementById('sac-' + type);
  return customElement.shadowRoot.getElementById(type + '-template');
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

function loadArray(fragment, hookId, arrayContents) {
  const uuid = uniqueID();
  const instance = document.importNode(fragment.content, true);

  instance.lastElementChild.querySelector('.array-anchor').setAttribute('id', uuid);

  document.getElementById(hookId).appendChild(instance);

  arrayContents.forEach(v => {
    load(v, uuid, document.getElementById(uuid));
  });
}

function load(input, hookId, before = null, isFirst = false) {
  if (Array.isArray(input.value)) {
    loadArray(getFragment(ELEMENT_TYPES.array), hookId, input.value);
  } else if (Number.isFinite(input)) {
    loadScalar(getFragment(ELEMENT_TYPES.scalar), hookId, input, before);
  } else {
    loadScalar(getFragment(ELEMENT_TYPES.scalar), hookId, input.value, before);
  }
}

function applyOdd(inputElement) {

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
