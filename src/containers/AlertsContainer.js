import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Alert from '../components/Alert'
import { hideAlert } from '../redux/modules/Alerts'

const propTypes = {
  alerts    : PropTypes.array.isRequired,
  hideAlert : PropTypes.func
}

class Alerts extends Component {
  render () {
    const { alerts, hideAlert } = this.props
    return (
      <div>
        { alerts.map((alert, index) => <Alert key={index} {...alert} onDismiss={() => hideAlert(index)} />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { alerts : state.alerts }
}

Alerts.propTypes = propTypes
export default connect(
  mapStateToProps,
  { hideAlert }
)(Alerts)
