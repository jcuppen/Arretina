"use strict";

class ComparisonOption extends HTMLElement {
  constructor() {
    super();

    const comparators = [
      {name: "greater-equal", symbol: "&ge;", fun: (x, v) => v >= x},
      {name: "greater", symbol: ">", fun: (x, v) => v > x},
      {name: "lesser-equal", symbol: "&le;", fun: (x, v) => v <= x},
      {name: "lesser", symbol: "<", fun: (x, v) => v < x},
      {name: "equal", symbol: "=", fun: (x, v) => v === x},
      {name: "not-equal", symbol: "&ne;", fun: (x, v) => v !== x},
    ];

    const f = (id, functions, element, value) => {
      const form = document.getElementById(id).shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      if (checkbox.checked) {
        const selected = form.querySelector(`select`).value;
        const f = functions[`${selected}`];

        const number = form.querySelector('input[type=number]').value;

        console.log(f.call(this, number, value));
        if(f.call(this, number, value)) {
          const colorPicker = form.querySelector(`input[type=color]`);
          element.setAttribute('style', `background:${colorPicker.value}`);
        }
      }
    };

    const reducer = (acc, c) => {
      acc[c.name] = c.fun;
      return acc;
    };
    const functions = comparators.reduce( reducer, {});

    styles.push(f.bind(this, this.dataset.id, functions));

    this.setAttribute('id', this.dataset.id);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    const select = document.createElement('select');
    comparators.forEach( c => {
      const option = document.createElement('option');
      option.setAttribute('value', c.name);
      option.innerHTML = c.symbol;
      select.appendChild(option);
    });

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', `${this.dataset.defaultvalue}`);

    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type', 'color');
    colorPicker.setAttribute('value', `${this.dataset.defaultcolor}`);

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
