wilster-doc
=========

A tiny library that reads your ReactJS annotations using `react-docgen` and `react-docgen-markdown-renderer`, and generates a simple documentation. All you need to do, is provide a (1) path to a folder and (2) output path.

## Installation

  `npm install -g wilster-doc`

## Usage

  `wilster-doc run -f PATH_TO_FOLDER_WITH_COMPONENTS -o OUTPUT_FILE`

## Examples
See examples folder [documentation.md](https://github.com/LaustAxelsen/wilster-doc/blob/master/examples/documentation.md)

## Output

Annotation | Description
---- | --------
**@componentName** | Used to label the component. Documentation is sorted by this name. If none is provided, the component's own name is used.
**@description** | The description of the component.

**NOTE:** If you want to extract custom annotations e.g. `@tag`, `@category`, `@version` they are already accessable. Simply use a custom template in the command `-t MY_TEMPLATE` and access them in the template using `description.tag` `description.category`, `description.version`.

```javascript
/**
 * @componentName MyLib.Button
 * @description This is a button. Super nice component.
 */
export class FancyButton extends React.Component {
  render() {
    return <div />
  }
}

FancyButton.defaultProps = {
  type: 'default'
}

FancyButton.propTypes = {
  /**
   * One of basic types of buttons you can display.
   */
  type: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger'])
}
```

### Result
##### MyLib.Button
This is a button. Super nice component.

Prop | Type | Default | Req | Description
---- | --------------------- | ---- | ------- | --------
**type** | `Enum('default','primary','success','warning','danger')` | `'default'` | - | One of basic types of buttons you can display.

## Template
You can overwrite the default template by providing a template file `-t PATH_TO_TEMPLATE` to the command e.g. `wilster-doc run -f ./src -o ./documentation.md -t ./myTemplate.tmp`.

### Default template 

```
## {{#if description.componentName}}{{{description.componentName}}}{{else}}{{componentName}}{{/if}}

{{#if description.description}}{{{description.description}}}{{else}}{{description}}{{/if}}

Prop | Type | Default | Req | Description
---- | --------------------- | ---- | ------- | --------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}Yes{{else}}-{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{#if isMissingComposes}}
*Some or all of the composed components are missing from the list below because a documentation couldn't be generated for them.
See the source code of the component for more information.*
{{/if}}

{{#if composes.length}}
{{componentName}} gets more \`propTypes\` from these composed components
{{/if}}

{{#each composes}}
#### {{this.componentName}}

prop | type | default | required | description
---- | ---- | ------- | -------- | ---------------------
{{#each this.props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{/each}}
```