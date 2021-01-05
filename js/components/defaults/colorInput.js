"use strict";

class ColorInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const properties = [
      'background-color',
    ]

    const f = (element, value) => {
      const selectedProperty = this.shadowRoot.querySelector('select').value;
      const selectedColor = this.shadowRoot.querySelector(`input[type=color]`).value;
      if (selectedProperty == 'background-color') {
        element.style.color = determineForegroundColor(selectedColor);
      }
      element.style[selectedProperty] = selectedColor;
    };

    styles.push(f);

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
