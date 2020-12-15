"use strict";

class ColorInput extends HTMLElement {
  constructor() {
    super();

    const properties = [
      'background-color',
      'color',
    ]

    const f = (element, value) => {
      const form = document.getElementById(this.dataset.id).shadowRoot;
      const colorPicker = form.querySelector(`input[type=color]`);
      const selectedProperty = form.querySelector(`#prop-select`).value;
      element.style[selectedProperty] = colorPicker.value;
    };

    styles.push(f.bind(this));

    this.setAttribute('id', this.dataset.id);

    const propSelect = generateSelect('prop-select', properties, this.dataset.prop);

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', this.dataset.value);

    const container = document.createElement('div');
    // container.setAttribute('id', 'default-color');
    container.innerHTML = `
      Set ${propSelect.outerHTML} to ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-color-input`, ColorInput);
