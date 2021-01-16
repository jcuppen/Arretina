"use strict";

class BaseStylesPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const inputTypes = Object.values(INPUT_TYPES);

    const inputTypeSelect = generateSelect(inputTypes, inputTypes[0]);
    const addButton = document.createElement('button');
    addButton.id = 'add-button';
    addButton.innerHTML = `add`;

    const style = document.createElement('style');
    style.innerHTML = '@import "css/picker.css";'

    const container = document.createElement('div');
    container.innerHTML = `
      ${style.outerHTML}
      ${inputTypeSelect.outerHTML}
      ${addButton.outerHTML}
    `;
    // generate the shadown DOM and add the container element
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);

    // add event listeners
    shadow.getElementById('add-button').onclick = _ => {
      addBaseStyle(
        {
          id: uniqueID(),
          type: shadow.querySelector('select').value
        }
      );
    };
  }
}

customElements.define(`sac-base-styles-picker`, BaseStylesPicker);
