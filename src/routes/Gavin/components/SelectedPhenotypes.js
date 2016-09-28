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
          {phenotypes.map((pheno, index) => <span key={index}><Checkbox inline checked={pheno.active}
            onChange={() => togglePhenotype(index)}>
            {pheno.value.name}
          </Checkbox>&nbsp;
            <small>
              <Glyphicon glyph='remove' onClick={() => removePhenotype(index)} />
            </small>&nbsp;&nbsp;&nbsp;
          </span>
          )}
        </FormGroup>
      </form>
    </div>
  }
}

SelectedPhenotypes.propTypes = propTypes
export default SelectedPhenotypes
