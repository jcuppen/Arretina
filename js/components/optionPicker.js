"use strict";

class OptionPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const optionTypes = Object.values(OPTION_TYPES);

    this.id = uniqueID();

    const optionTypeSelect = generateSelect(optionTypes, optionTypes[0]);
    const addButton = document.createElement('add-button');
    addButton.setAttribute('data-parent-id', this.id);
    addButton.setAttribute('data-type', CONFIG_TYPES.option);

    const style = document.createElement('style');
    style.innerHTML = '@import "css/picker.css";'

    const container = document.createElement('div');
    container.innerHTML = `
      ${style.outerHTML}
      ${optionTypeSelect.outerHTML}
      ${addButton.outerHTML}
    `;

    // generate the shadown DOM and add the container element
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-option-picker`, OptionPicker);
