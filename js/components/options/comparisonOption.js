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
      {name: "equal",         symbol: "=",    fun: (x, v) => v === x},
      {name: "not-equal",     symbol: "&ne;", fun: (x, v) => v !== x},
    ];

    const f = (functions, element, value) => {
      const form = document.getElementById(this.dataset.id).shadowRoot;
      if (form.querySelector('input[type=checkbox]').checked) {
        const selected = form.querySelector('select').value;
        const number = form.querySelector('input[type=number]').value;

        if(functions[selected].call(this, number, value)) {
          const color = form.querySelector('input[type=color]').value;
          element.style.backgroundColor = color;

          //TODO: color text based on background color.
          // double luma = ((0.299 * iColor.R) + (0.587 * iColor.G) + (0.114 * iColor.B)) / 255;

          element.style.backgroundColor = form.querySelector('input[type=color]').value;
        }
      }
    };

    const reducer = (acc, c) => {
      acc[c.name] = c.fun;
      return acc;
    };
    const functions = comparators.reduce( reducer, {});

    styles.push(f.bind(this, functions));

    this.setAttribute('id', this.dataset.id);

    const checkbox = generateCheckbox();

    const select = document.createElement('select');
    comparators.forEach( c => {
      const option = document.createElement('option');
      option.setAttribute('value', c.name);
      option.innerHTML = c.symbol;
      select.appendChild(option);
    });

    const numberInput = generateNumberInput(this.dataset.value ?? 0);
    const colorPicker = generateColorPicker(this.dataset.color);

    const container = document.createElement('div');
    container.setAttribute('id', this.dataset.id);
    container.innerHTML = `
      ${checkbox.outerHTML}
      All numbers
      ${select.outerHTML}
      than
      ${numberInput.outerHTML}
      will be colored:
      ${colorPicker.outerHTML}
    `;

    // generate the shadown DOM and add the container element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-comparison-option`, ComparisonOption);
