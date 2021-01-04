"use strict";
{
  const NAME = ELEMENT_TYPES.array;

  class Array extends HTMLElement {
    constructor() {
      super();

      const orientation = this.dataset.orientation;
      if (!['row', 'col'].includes(orientation)) {
        console.error(`Unexpected orientation given: "${orientation}"`);
        return;
      }

      // set id of 'root' to allow template to be found.
      this.setAttribute('id', `sac-${NAME}-${orientation}`);

      const span = document.createElement('span');
      span.classList.add(`array-anchor`);

      const div = document.createElement('div');
      div.classList.add(`array`);
      div.classList.add(`array-${orientation}`);
      div.appendChild(span);

      // create the template that will be used to populate arrays and add the span.
      const template = document.createElement('template');
      template.setAttribute('id', `${NAME}-${orientation}-template`);
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
