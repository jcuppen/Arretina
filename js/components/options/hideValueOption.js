"use strict";

class HideValueOption extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const f = (element, value) => {
      const checkbox = this.shadowRoot.querySelector(`input[type=checkbox]`);
      element.innerHTML = checkbox.checked ? '' : element.innerHTML;
    };

    styles.push(f);

    const checkbox = generateCheckbox(this.dataset.checked);

    const container = document.createElement('div');
    container.innerHTML = `${checkbox.outerHTML} All values will be hidden`;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-hide-value-option`, HideValueOption);
