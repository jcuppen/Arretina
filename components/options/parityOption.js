"use strict";

class ParityOption extends HTMLElement {
  constructor() {
    super();

    const parity = this.dataset.parity;

    const f = (parity, element, value) => {
      const pred = (parity == 'even') ? v => v % 2 === 0 : v => v % 2 !== 0;
      const form = document.getElementById(parity).shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      if (checkbox.checked && pred(value)) {
        const colorPicker = form.querySelector(`input[type=color]`);
        element.style.background = colorPicker.value;
      }
    };

    if (['even', 'odd'].includes(parity)) {
      styles.push(f.bind(this, parity));
    } else {
      console.error('unexpected type received!');
      return;
    }

    this.setAttribute('id', parity);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `${parity}-toggle`);

    const label = document.createElement('label');
    label.setAttribute('for', `${parity}-toggle`);
    label.innerHTML = `All ${parity} numbers will be colored:`;

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', this.dataset.defaultcolor);

    const container = document.createElement('div');
    container.setAttribute('id', parity);
    container.innerHTML = `
      ${checkbox.outerHTML}
      ${label.outerHTML}
      ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-parity-option`, ParityOption);
