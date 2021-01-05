"use strict";

const styles = [];

function getFragment(type, orientation = '') {
  const suffix = (orientation !== '') ? `${type}-${orientation}` : type;
  const customElement = document.getElementById(`sac-${suffix}`);
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

function l(input) {
  defaultStyles = input['defaults'];
  options = input['options'];

}

function loadSettings(inputElement) {
  if(inputElement.files[0] ?? false) {
    let reader = new FileReader();
    reader.onload = e => {
      let settings = JSON.parse(e.target.result);
      // TODO: implement delete functionality;
      // settings.baseStyles.forEach(addBaseStyle);
      // settings.options.forEach(addOption);
    };
    reader.readAsText(inputElement.files[0]);
  }
}

function exportSettings() {
  let exportObject = {
    baseStyles: baseStyles,
    options: options,
  };

  let encodedObject = encodeURIComponent(JSON.stringify(exportObject));
  let dataString = `data:text/json;charset=utf-8,${encodedObject}`;
  var exportAnchor = document.getElementById('export-anchor');
  exportAnchor.href = dataString;
  exportAnchor.download = 'visualizations.json';
  exportAnchor.click();
}
