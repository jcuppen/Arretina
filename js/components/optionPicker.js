"use strict";

class OptionPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const optionTypes = Object.values(OPTION_TYPES);

    this.id = this.dataset.id;

    const optionTypeSelect = generateSelect(optionTypes, optionTypes[0]);
    const addButton = document.createElement('button');
    addButton.id = 'add-button';
    addButton.innerHTML = `add`;

    const container = document.createElement('div');
    container.innerHTML = `
      ${optionTypeSelect.outerHTML}
      ${addButton.outerHTML}
    `;
    // generate the shadown DOM and add the container element
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);

    // add event listeners
    shadow.getElementById('add-button').onclick = fue => {
      let selectedOption = shadow.querySelector('select').value;
      // TODO: perhaps only pass optiontype?
      let newOption = {type: selectedOption};
      addOption(newOption);
    };
  }
}

customElements.define(`sac-option-picker`, OptionPicker);
