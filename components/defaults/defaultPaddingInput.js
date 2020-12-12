"use strict";

class DefaultPaddingInput extends HTMLElement {
  constructor() {
    super();

    const f = (element, value) => {
      const form = document.getElementById('default-padding').shadowRoot;
      const inputNumber = form.querySelector(`input[type=number]`);
      const oldStyle = element.getAttribute('style');
      element.setAttribute('style', `${oldStyle};padding:${inputNumber.value}px`);
    };

    styles.push(f.bind(this));

    this.setAttribute('id', 'default-padding');

    const label = document.createElement('label');
    label.innerHTML = `Override default paddings with:`;

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', `${this.dataset.defaultpadding}`);

    const container = document.createElement('div');
    container.setAttribute('id', 'default-padding');
    container.innerHTML = `
      ${label.outerHTML}
      ${numberInput.outerHTML} px
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-default-padding-input`, DefaultPaddingInput);
