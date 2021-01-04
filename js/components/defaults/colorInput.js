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
      const selectedProperty = form.querySelector('select').value;
      const colorPicker = form.querySelector(`input[type=color]`);
      element.style[selectedProperty] = colorPicker.value;
    };

    styles.push(f);

    this.id = this.dataset.id;

    const propSelect = generateSelect(properties, this.dataset.prop);
    const colorPicker = generateColorPicker(this.dataset.value);

    const container = document.createElement('div');
    container.innerHTML = `Set ${propSelect.outerHTML} to ${colorPicker.outerHTML}`;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-color-input`, ColorInput);
