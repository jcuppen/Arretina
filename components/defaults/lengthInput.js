"use strict";

class LengthInput extends HTMLElement {
  constructor() {
    super();

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
      const form = document.getElementById(this.dataset.id).shadowRoot;
      const inputNumber = form.querySelector(`input[type=number]`).value;
      const selectedProperty = form.querySelector(`#prop-select`).value;
      const selectedUnit = form.querySelector(`#unit-select`).value;

      element.style[selectedProperty] = `${inputNumber}${selectedUnit}`;
    };

    styles.push(f.bind(this));

    this.setAttribute('id', this.dataset.id);

    const propSelect = generateSelect('prop-select', properties, this.dataset.prop);

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', this.dataset.value);

    const unitSelect = generateSelect('unit-select', units, this.dataset.unit);

    const container = document.createElement('div');
    // container.setAttribute('id', 'default-value');
    container.innerHTML = `
      Set ${propSelect.outerHTML} to ${numberInput.outerHTML}${unitSelect.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-length-input`, LengthInput);
