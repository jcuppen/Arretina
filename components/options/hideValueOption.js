"use strict";

class HideValueOption extends HTMLElement {
  constructor() {
    super();

    const f = (element, value) => {
      const form = document.getElementById('hide-value').shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      if (checkbox.checked) {
        element.innerHTML = '';
      }
    };

    styles.push(f.bind(this));

    this.setAttribute('id', 'hide-value');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `hide-value-toggle`);

    const label = document.createElement('label');
    label.setAttribute('for', `hide-value-toggle`);
    label.innerHTML = `All values will be hidden`;

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
