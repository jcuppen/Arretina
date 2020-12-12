"use strict";
{
  const NAME = ELEMENT_TYPES.scalar;

  class Scalar extends HTMLElement {
    constructor() {
      super();

      // set id of 'root' to allow template to be found.
      this.setAttribute('id', `sac-${NAME}`);

      // create a span that will later contain the scalar value.
      const span = document.createElement('span');
      span.setAttribute('class', 'value');

      // create the template that will be used to populate
      // arrays and add the span.
      const template = document.createElement('template');
      template.setAttribute('id', ELEMENT_TYPES.scalar + '-template');
      template.innerHTML += [
        span.outerHTML,
      ].join('');

      // generate the shadown DOM and add the template element.
      const shadow = this.attachShadow({mode: 'open'});
      shadow.appendChild(template);
    }
  }

  customElements.define(`sac-${NAME}`, Scalar);
}
