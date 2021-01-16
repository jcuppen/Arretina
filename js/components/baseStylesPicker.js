"use strict";

class BaseStylesPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const inputTypes = Object.values(INPUT_TYPES);

    this.id = uniqueID();

    const inputTypeSelect = generateSelect(inputTypes, inputTypes[0]);
    const addButton = document.createElement('add-button');
    addButton.setAttribute('data-parent-id', this.id);
    addButton.setAttribute('data-type', CONFIG_TYPES.baseStyle);

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
  }
}

customElements.define(`sac-base-styles-picker`, BaseStylesPicker);
