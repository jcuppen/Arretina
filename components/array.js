"use strict";
{
  const NAME = ELEMENT_TYPES.array;

  class Array extends HTMLElement {
    constructor() {
      super();

      const orientation = this.dataset.orientation;

      // set id of 'root' to allow template to be found.
      this.setAttribute('id', `sac-${NAME}-${orientation}`);

      const div = document.createElement('div');
      if (['row', 'col'].includes(orientation)) {
        div.classList.add(`array`);
        div.classList.add(`array-${orientation}`);
      } else {
        console.error(`Unexpected orientation given: "${orientation}"`);
        return;
      }

      div.innerHTML = `<span class=array-anchor></span>`;

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
