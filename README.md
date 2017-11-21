wilster-doc
=========

Are you also troubled with generating documentation? Wilster-doc is a tiny library that reads your ReactJS annotations using `react-docgen` and `react-docgen-markdown-renderer` and generates a simple documentation in markdown. It's not a 100 % solution for documentation, but it does remove the need to read the code.

All you need to do, is provide a **(1) path to a folder** and **(2) documentation output path**.

## Installation

`npm install -g wilster-doc`

## Usage

`wilster-doc run -f PATH_TO_FOLDER_WITH_COMPONENTS -o OUTPUT_FILE`

### CLI params

***-f&nbsp;&nbsp;&nbsp;(--folder)***
Path to component folder

***-o&nbsp;&nbsp;&nbsp;(--output)***
Path for the output file (the documentation)

***-t&nbsp;&nbsp;&nbsp;(--template)***
In you want to use a custom template file.

## Examples
See examples folder [documentation.md](https://github.com/LaustAxelsen/wilster-doc/blob/master/examples/documentation.md)

## Output

Annotation | Description
---- | --------
**@componentName** | Used to label the component. Documentation is sorted by this name. If none is provided, the component's own name is used.
**@description** | The description of the component.
**@yourVariable** | You can use your own variables; but does require a custom template.


**NOTE:** If you want to extract custom annotations e.g. `@tag`, `@category`, `@version` they are already accessable. Simply use a custom template in the command `-t MY_TEMPLATE` and access them in the template using `description.tag`  `description.category`,   `description.version`.

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
  type: PropTypes.oneOf(['default', 'primary']).isRequired()
}
```

### Result
See examples folder [documentation.md](https://github.com/LaustAxelsen/wilster-doc/blob/master/examples/documentation.md)

### Create a custom template
You can overwrite the default template by providing a template file `-t PATH_TO_TEMPLATE` to the command e.g. `wilster-doc run -f ./src -o ./documentation.md -t ./myTemplate.tmp`.

**Default template**
You can find the default template [here](https://github.com/LaustAxelsen/wilster-doc/blob/master/defaultTemplate.tpl)
