"use strict";

class DefaultsPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const inputTypes = Object.values(INPUT_TYPES);

    this.id = this.dataset.id;

    const inputTypeSelect = generateSelect(inputTypes, inputTypes[0]);
    const addButton = document.createElement('button');
    addButton.id = 'add-button';
    addButton.innerHTML = `add`;

    const container = document.createElement('div');
    container.innerHTML = `
      ${inputTypeSelect.outerHTML}
      ${addButton.outerHTML}
    `;
    // generate the shadown DOM and add the container element
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);

    // add event listeners
    shadow.getElementById('add-button').onclick = e => {
      addDefault({type: shadow.querySelector('select').value});
    };
  }
}

customElements.define(`sac-defaults-picker`, DefaultsPicker);
