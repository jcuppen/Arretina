"use strict";
{
  const NAME = ELEMENT_TYPES.array;

  class Array extends HTMLElement {
    constructor() {
      super();

      // set id of 'root' to allow template to be found.
      this.setAttribute('id', `sac-${NAME}`);

      // create the template that will be used to populate arrays and add the span.
      const template = document.createElement('template');
      template.setAttribute('id', `${NAME}-template`);
      template.innerHTML = `
        <div class=array-row>
          <span class=array-anchor></span>
        </div>
      `;

      // generate the shadown DOM and add the template element.
      const shadow = this.attachShadow({mode: 'open'});
      shadow.appendChild(template);
    }
  }

  customElements.define(`sac-${NAME}`, Array);
}
