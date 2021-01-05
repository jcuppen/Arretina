"use strict";

class OptionPicker extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const optionTypes = Object.values(OPTION_TYPES);

    const optionTypeSelect = generateSelect(optionTypes, optionTypes[0]);
    const addButton = document.createElement('button');
    addButton.id = 'add-button';
    addButton.innerHTML = `add`;

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

    // add event listeners
    shadow.getElementById('add-button').onclick = _ => {
      addOption({type: shadow.querySelector('select').value, checked: true});
    };
  }
}

customElements.define(`sac-option-picker`, OptionPicker);
