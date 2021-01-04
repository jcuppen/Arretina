"use strict";
{
  const NAME = ELEMENT_TYPES.array;

  class Array extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!['row', 'col'].includes(this.dataset.orientation)) {
        console.error(`Unexpected orientation given: "${this.dataset.orientation}"`);
        return;
      }

      // set id of 'root' to allow template to be found.
      this.id = `sac-${NAME}-${this.dataset.orientation}`;

      const span = document.createElement('span');
      span.classList.add(`${NAME}-anchor`);

      const div = document.createElement('div');
      div.classList.add(`${NAME}`);
      div.classList.add(`${NAME}-${this.dataset.orientation}`);
      div.appendChild(span);

      // create the template that will be used to populate arrays and add the span.
      const template = document.createElement('template');
      template.id = `${NAME}-${this.dataset.orientation}-template`;
      template.innerHTML = `
        ${div.outerHTML}
      `;

      // generate the shadown DOM and add the template element.
      const shadow = this.attachShadow({mode: 'open'});
      shadow.appendChild(template);
    }
  }

  customElements.define(`sac-${NAME}`, Array);
}
