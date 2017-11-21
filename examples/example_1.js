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
  type: PropTypes.oneOf(['default', 'primary']),

  /**
   * Callback when the button is clicked.
   */
  onClick: PropTypes.func.isRequired(),

  /**
   * Should the button be visible.
   */
  visible: PropTypes.bool,

  /**
   * The label of the button
   */
  label: PropTypes.string
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

/**
 * Regular popover component without any annotation.
 */
export class Popover extends React.Component {
  render() {
    return <div />
  }
}

Popover.defaultProps = {
  content: 'Im a popover'
}

Popover.propTypes = {
  content: PropTypes.string
}
