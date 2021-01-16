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
      const parity = this.shadowRoot.querySelector('select').value;
      const pred = (parity == 'even') ? v => v % 2 === 0 : v => v % 2 !== 0;
      const checkbox = this.shadowRoot.querySelector('input[type=checkbox]');
      if (checkbox.checked && pred(value)) {
        const color = this.shadowRoot.querySelector('input[type=color]').value;
        element.style.backgroundColor = color;
      }
    };

    styles.push(f);

    const deleteButton = document.createElement('delete-button');
    deleteButton.setAttribute('data-type', CONFIG_TYPES.option);
    deleteButton.setAttribute('data-parent-id', this.id);

    const paritySelect = generateSelect(parities, parity);
    const checkbox = generateCheckbox(this.dataset.checked);
    const colorPicker = generateColorPicker(this.dataset.value);

    const container = document.createElement('div');
    container.innerHTML = `
      ${deleteButton.outerHTML}
      ${checkbox.outerHTML}
      All ${paritySelect.outerHTML} numbers will be colored: ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-parity-option`, ParityOption);
