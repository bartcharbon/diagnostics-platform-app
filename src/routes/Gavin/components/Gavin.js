import React, { PropTypes } from 'react'
import classes from './Gavin.scss'
import PhenotypeSelectionContainer from '../containers/PhenotypeSelectionContainer'
import VariantTableContainer from '../containers/VariantTableContainer'

const propTypes = {
  loggedIn : PropTypes.bool
}

export const Gavin = ({ loggedIn }) => (
  <div className={classes['Gavin']}>
    <h4>Gavin</h4>
    {loggedIn && <div>
      <PhenotypeSelectionContainer />
      <VariantTableContainer />
    </div>}
  </div>
)

Gavin.propTypes = propTypes

export default Gavin
