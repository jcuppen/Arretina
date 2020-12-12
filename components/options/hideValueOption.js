"use strict";

class HideValueOption extends HTMLElement {
  constructor() {
    super();

    // const parity = this.dataset.parity;

    const f = (element, value) => {
      // const pred = (parity == 'even') ? v => v % 2 === 0 : v => v % 2 !== 0;
      const form = document.getElementById('hide-value').shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      if (checkbox.checked) {
        // const colorPicker = form.querySelector(`input[type=color]`);
        // element.setAttribute('style', `background:${colorPicker.value}`);
        console.log(element);
        element.innerHTML = '';
        console.log(element);
      }
    };

    // if (['even', 'odd'].includes(parity)) {
      styles.push(f.bind(this));
    // } else {
    //   console.error('unexpected type received!');
    //   return;
    // }

    this.setAttribute('id', 'hide-value');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `hide-value-toggle`);

    const label = document.createElement('label');
    label.setAttribute('for', `hide-value-toggle`);
    label.innerHTML = `All values will be hidden`;

    // const colorPicker = document.createElement('input');
    // colorPicker.setAttribute('type', 'color');
    // colorPicker.setAttribute('value', `${this.dataset.defaultcolor}`);

    const container = document.createElement('div');
    container.setAttribute('id', 'hide-value');
    container.innerHTML = `
      ${checkbox.outerHTML}
      ${label.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-hide-value-option`, HideValueOption);
