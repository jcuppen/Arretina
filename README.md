# Arretina

Visualization Tool for arrays from the SaC Programming Language.

## Conventions
All custom component have at least 2 files:
- **{ELEMENT_NAME}.js**: representing the structure of the component.
- **{ELEMENT_NAME}.css**: representing the style of the component.

Optionaly the following files may appear as well:
- **{ELEMENT_NAME}.hmtl**: these html files serve as an example of how the component will look it is never used or generated. It served its purpose as reference material and needs to be kept up to date manualy.

All files live in their respective subdirectory of the components directory.

For example, `components/scalar` will contain `scalar.js`, `scalar.css` and optionally `scalar.html`

Custom components will always be structured as follows:
```html
<sac-{ELEMENT_NAME} id="sac-{ELEMENT_NAME}">
  <template id="{ELEMENT_NAME}-template">
    <!-- content -->
  </template>
</sac-{ELEMENT_NAME}>
```
