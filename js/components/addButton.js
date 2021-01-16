"use strict";

class AddButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // create a span that will later contain the scalar value.
    const btn = document.createElement('button');
    btn.innerHTML = `add`;

    const parentShadow = document.getElementById(this.dataset.parentId).shadowRoot;

    btn.onclick = _ => {
      const configType = parentShadow.querySelector('select').value;
      switch(this.dataset.type) {
        case CONFIG_TYPES.option:
          addOption(
            {
              id: uniqueID(),
              type: configType,
              checked: true
            }
          );
          break;
        case CONFIG_TYPES.baseStyle:
          addBaseStyle(
            {
              id: uniqueID(),
              type: configType
            }
          );
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

customElements.define(`add-button`, AddButton);
