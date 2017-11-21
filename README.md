wilster-doc
=========

A tiny library that reads your ReactJS annotations using `react-docgen` and `react-docgen-markdown-renderer`, and generates a simple documentation.

## Installation

  `npm install ...`


## Examples
See examples folder [documentation.md](https://github.com/LaustAxelsen/wilster-doc/blob/master/examples/documentation.md)

## Usage
`wilster-doc run -f PATH_TO_COMPONENTS -o OUTPUT_FILE`

Annotation | Description
---- | --------
**@componentName** | Used to label the component. Documentation is sorted by this name. If none is provided, the component's own name is used.
**@description** | The description of the component.



```
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

### Output
##### MyLib.Button
This is a button. Super nice component.

Prop | Type | Default | Req | Description
---- | --------------------- | ---- | ------- | --------
**type** | `Enum('default','primary','success','warning','danger')` | `'default'` | - | One of basic types of buttons you can display.

