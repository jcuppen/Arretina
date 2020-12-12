"use strict";

class ComparisonOption extends HTMLElement {
  constructor() {
    super();

    // const parity = this.dataset.parity;

    const comparators = [
      {name: "greater-equal", symbol: "&ge;", fun: (x, v) => v >= x},
      {name: "greater", symbol: ">", fun: (x, v) => v > x},
      {name: "lesser-equal", symbol: "&le;", fun: (x, v) => v <= x},
      {name: "lesser", symbol: "<", fun: (x, v) => v < x},
      {name: "equal", symbol: "=", fun: (x, v) => v === x},
      {name: "not-equal", symbol: "&ne;", fun: (x, v) => v !== x},
    ];

    // function gt = (x, v) => {v => v > x};
    // function ge = (x, v) => {v => v >= x};
    // function lt = (x, v) => {v => v < x};
    // function le = (x, v) => {v => v <= x};

    const f = (id, functions, element, value) => {
      // const functions = [
      //   {"greater-equal": (x, v) => {v => v > x}},
      //   {"greater": (x, v) => {v => v >= x}},
      //   {"lesser-equal": (x, v) => {v => v < x}},
      //   {"lesser": (x, v) => {v => v <= x}},
      // ];

      const form = document.getElementById(id).shadowRoot;
      const checkbox = form.querySelector(`input[type=checkbox]`);
      if (checkbox.checked) {
        const selected = form.querySelector(`select`).value;
        const f = functions[`${selected}`];

        const number = form.querySelector('input[type=number]').value;
        console.log(number);
        console.log(value);
        // console.log(f);
        console.log(f.call(this, number, value));
        if(f.call(this, number, value)) {
          const colorPicker = form.querySelector(`input[type=color]`);
          element.setAttribute('style', `background:${colorPicker.value}`);
        }
      }


      // const checkbox = form.querySelector(`input[type=checkbox]`);
      // if (checkbox.checked && pred(value)) {
      //   const colorPicker = form.querySelector(`input[type=color]`);
      //   element.setAttribute('style', `background:${colorPicker.value}`);
      // }
    };

    const reducer = (acc, c) => {
      acc[c.name] = c.fun;
      return acc;
    };
    const functions = comparators.reduce( reducer, {});

    styles.push(f.bind(this, this.dataset.id, functions));

    this.setAttribute('id', this.dataset.id);

    // let exp = `
    // <div>
    //   <input type="checkbox" id="comp1">
    //   All numbers
    //   <select id="c">
    //     <option value="greater">></option>
    //     <option value="greater-equal">&ge;</option>
    //     <option value="lesser"><</option>
    //     <option value="lesser-equal">&le;</option>
    //   </select>
    //   than
    //   <input type="number">
    //   will be colored:
    //   <input type="color">
    // </div>
    // `

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    // checkbox.setAttribute('id', `${id}-toggle`);

    const select = document.createElement('select');
    // select.setAttribute('id', `${id}-select`);
    comparators.forEach( c => {
      const option = document.createElement('option');
      option.setAttribute('value', c.name);
      option.innerHTML = c.symbol;
      select.appendChild(option);
    });

    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', 0);

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

    // generate the shadown DOM and add the template element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(container);
  }
}

customElements.define(`sac-comparison-option`, ComparisonOption);
