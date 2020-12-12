"use strict";

class DefaultColorPicker extends HTMLElement {
  constructor() {
    super();

    const f = (element, value) => {
      const form = document.getElementById('default-color').shadowRoot;
      const colorPicker = form.querySelector(`input[type=color]`);
      element.setAttribute('style', `background:${colorPicker.value}`);
    };

    styles.push(f.bind(this));

    this.setAttribute('id', 'default-color');

    const label = document.createElement('label');
    label.innerHTML = `Override default color with:`;

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', `${this.dataset.defaultcolor}`);

    const container = document.createElement('div');
    container.setAttribute('id', 'default-color');
    container.innerHTML = `
      ${label.outerHTML}
      ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-default-color-picker`, DefaultColorPicker);
