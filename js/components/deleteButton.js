"use strict";

class DeleteButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // create a span that will later contain the scalar value.
    const btn = document.createElement('button');
    btn.innerHTML = `🗑`;
    btn.onclick = e => {
      switch(this.dataset.type) {
        case CONFIG_TYPES.option:
          removeOption(e, this.dataset.parentId);
          break;
        case CONFIG_TYPES.baseStyle:
          removeBaseStyle(e, this.dataset.parentId);
          break;
        default:
          console.error(`Unexpected CONFIG_TYPE given: "${this.dataset.type}"`);
      }
    };

    // generate the shadown DOM and add the template element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(btn);
  }
}

customElements.define(`delete-button`, DeleteButton);
