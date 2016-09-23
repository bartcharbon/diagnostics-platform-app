import React, { PropTypes } from 'react'
import classes from './Gavin.scss'
import PhenotypeSelectionContainer from '../containers/PhenotypeSelectionContainer'
import VariantTableContainer from '../containers/VariantTableContainer'

const propTypes = {
  loggedIn   : PropTypes.bool,
  entityName : PropTypes.string
}

export const Gavin = ({ loggedIn, entityName }) => (
  <div className={classes['Gavin']}>
    <h4>Gavin {entityName}</h4>
    {loggedIn && <div>
      <PhenotypeSelectionContainer />
      <VariantTableContainer />
    </div>}
  </div>
)

Gavin.propTypes = propTypes

export default Gavin
