"use strict";

class HideValueOption extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const f = (element, value) => {
      const form = document.getElementById(this.dataset.id).shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      element.innerHTML = checkbox.checked ? '' : element.innerHTML;
    };

    styles.push(f);

    this.id = this.dataset.id;

    const checkbox = generateCheckbox();

    const container = document.createElement('div');
    container.innerHTML = `${checkbox.outerHTML} All values will be hidden`;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-hide-value-option`, HideValueOption);
