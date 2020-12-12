"use strict";

class DefaultMarginInput extends HTMLElement {
  constructor() {
    super();

    const f = (element, value) => {
      const form = document.getElementById('default-margin').shadowRoot;
      const inputNumber = form.querySelector(`input[type=number]`);
      const oldStyle = element.getAttribute('style');
      element.setAttribute('style', `${oldStyle};margin:${inputNumber.value}px`);
    };

    styles.push(f.bind(this));

    this.setAttribute('id', 'default-margin');

    const label = document.createElement('label');
    label.innerHTML = `Override default margins with:`;

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', `${this.dataset.defaultmargin}`);

    const container = document.createElement('div');
    container.setAttribute('id', 'default-margin');
    container.innerHTML = `
      ${label.outerHTML}
      ${numberInput.outerHTML} px
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-default-margin-input`, DefaultMarginInput);
