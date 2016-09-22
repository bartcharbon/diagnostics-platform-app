import React, { Component, PropTypes } from 'react'
import { FormGroup, Checkbox, Glyphicon } from 'react-bootstrap'

const propTypes = {
  phenotypes      : PropTypes.array,
  togglePhenotype : PropTypes.func,
  removePhenotype : PropTypes.func
}

class SelectedPhenotypes extends Component {
  render () {
    const { phenotypes, togglePhenotype, removePhenotype } = this.props
    return <div>
      Selected phenotypes:
      <form>
        <FormGroup>
          {phenotypes.map((pheno, index) => <Checkbox key={index} inline checked={pheno.active}
            onChange={() => togglePhenotype(index)}>
            {pheno.value.name}
            <Glyphicon glyph='remove' onClick={() => removePhenotype(index)} />
          </Checkbox>)}
        </FormGroup>
      </form>
    </div>
  }
}

SelectedPhenotypes.propTypes = propTypes
export default SelectedPhenotypes
