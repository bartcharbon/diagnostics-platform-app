import React, { Component, PropTypes } from 'react'
import { ListItem } from 'react-bootstrap'

const propTypes = {
  phenotype : PropTypes.object
}

class Phenotype extends Component {
  render () {
    const { phenotype: { name, synonyms, primaryID } } = this.props
    console.log(this.props)
    return (
      <ListItem>
        <h4>{name} ({primaryID})</h4>
        <p>{synonyms
          .filter(synonym => synonym !== name)
          .join(', ')}</p>
      </ListItem>
    )
  }
}

Phenotype.propTypes = propTypes
export default Phenotype
