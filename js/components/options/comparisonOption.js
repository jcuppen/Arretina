"use strict";

class ComparisonOption extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const comparators = [
      {name: "greater-equal", symbol: "&ge;", fun: (x, v) => v >= x},
      {name: "greater",       symbol: ">",    fun: (x, v) => v > x},
      {name: "lesser-equal",  symbol: "&le;", fun: (x, v) => v <= x},
      {name: "lesser",        symbol: "<",    fun: (x, v) => v < x},
      {name: "equal",         symbol: "=",    fun: (x, v) => v == x},
      {name: "not-equal",     symbol: "&ne;", fun: (x, v) => v != x},
    ];

    const f = (functions, element, value) => {
      if (this.shadowRoot.querySelector('input[type=checkbox]').checked) {
        const selected = this.shadowRoot.querySelector('select').value;
        const number = this.shadowRoot.querySelector('input[type=number]').value;

        if(functions[selected].call(this, number, value)) {
          const backgroundColor = this.shadowRoot.querySelector('input[type=color]').value;

          element.style.backgroundColor = backgroundColor;
          element.style.color = determineForegroundColor(backgroundColor);
        }
      }
    };

    const reducer = (acc, c) => {
      acc[c.name] = c.fun;
      return acc;
    };
    const functions = comparators.reduce( reducer, {});

    styles.push(f.bind(this, functions));

    const deleteButton = document.createElement('delete-button');
    deleteButton.setAttribute('data-type', CONFIG_TYPES.option);
    deleteButton.setAttribute('data-parent-id', this.id);

    const checkbox = generateCheckbox(this.dataset.checked);

    const select = document.createElement('select');
    comparators.forEach( c => {
      const option = document.createElement('option');
      option.setAttribute('value', c.name);
      option.innerHTML = c.symbol;
      select.appendChild(option);
    });

    const numberInput = generateNumberInput(this.dataset.value);
    const colorPicker = generateColorPicker(this.dataset.color);

    const container = document.createElement('div');
    // container.setAttribute('id', this.dataset.id);
    container.innerHTML = `
      ${deleteButton.outerHTML}
      ${checkbox.outerHTML}
      All numbers ${select.outerHTML} than ${numberInput.outerHTML} will be colored: ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-comparison-option`, ComparisonOption);
