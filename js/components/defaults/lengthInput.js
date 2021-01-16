"use strict";

class LengthInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const properties = [
      'border-radius',
      'border-width',
      'font-size',
      'height',
      'line-height',
      'margin',
      'margin-bottom',
      'margin-left',
      'margin-right',
      'margin-top',
      'padding',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'padding-top',
      'text-indent',
      'text-shadow',
      'width',
      'word-spacing',
    ];

    const units = [
      'px',
      'ex',
      'rem',
      'vh',
      'vw',
      'ch',
      'cm',
      'mm',
      'in',
      'pc',
      'pt'
    ];

    const f = (element, value) => {
      const inputNumber = this.shadowRoot.querySelector(`input[type=number]`).value;
      const selectedProperty = this.shadowRoot.querySelector(`#prop-select`).value;
      const selectedUnit = this.shadowRoot.querySelector(`#unit-select`).value;

      element.style[selectedProperty] = `${inputNumber}${selectedUnit}`;
    };

    styles.push(f);

    const deleteButton = document.createElement('delete-button');
    deleteButton.setAttribute('data-type', CONFIG_TYPES.baseStyle);
    deleteButton.setAttribute('data-parent-id', this.id);

    const propSelect = generateSelect(properties, this.dataset.prop, 'prop-select');
    const numberInput = generateNumberInput(this.dataset.value);
    const unitSelect = generateSelect(units, this.dataset.unit, 'unit-select');

    const container = document.createElement('div');
    container.innerHTML = `
      ${deleteButton.outerHTML}
      Set ${propSelect.outerHTML} to ${numberInput.outerHTML}${unitSelect.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-length-input`, LengthInput);
