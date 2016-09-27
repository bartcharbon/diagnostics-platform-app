import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const propTypes = {
  style     : PropTypes.string,
  title     : PropTypes.string,
  message   : PropTypes.string,
  onDismiss : PropTypes.func.isRequired
}

const AlertComponent = (props) => {
  const { style, title, message, onDismiss } = props
  return <Alert bsStyle={style} onDismiss={onDismiss}>
    <strong>{title}</strong> {message}
  </Alert>
}

AlertComponent.propTypes = propTypes
export default AlertComponent
