import React from 'react'
import PropTypes from 'prop-types'

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

/**
 * @componentName MyLib.Header
 * @description A really nice header.
 */
export class FancyHeader extends React.Component {
  render() {
    return <div />
  }
}

FancyHeader.defaultProps = {
  title: 'Foo'
}

FancyHeader.propTypes = {
  /**
 * One of basic types of buttons you can display.
 */
  title: PropTypes.string
}
