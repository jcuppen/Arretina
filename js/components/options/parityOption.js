"use strict";

class ParityOption extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const parities = ['even', 'odd'];

    const parity = this.dataset.parity ?? 'odd';
    if (!parities.includes(parity)) {
      console.error(`unexpected parity received!: ${parity}`);
      return;
    }

    const f = (element, value) => {
      const form = document.getElementById(this.dataset.id).shadowRoot;
      const parity = form.querySelector('select').value;
      const pred = (parity == 'even') ? v => v % 2 === 0 : v => v % 2 !== 0;
      const checkbox = form.querySelector('input[type=checkbox]');
      if (checkbox.checked && pred(value)) {
        const color = form.querySelector('input[type=color]').value;
        element.style.backgroundColor = color;
      }
    };

    styles.push(f);

    this.id = this.dataset.id;

    const paritySelect = generateSelect(parities, parity);
    const checkbox = generateCheckbox();
    const colorPicker = generateColorPicker(this.dataset.value ?? '#000000');

    const container = document.createElement('div');
    container.innerHTML = `
      ${checkbox.outerHTML}
      All ${paritySelect.outerHTML} numbers will be colored:
      ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-parity-option`, ParityOption);
