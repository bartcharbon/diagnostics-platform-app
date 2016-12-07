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
    <span>This tool shows the variants from the uploaded dataset filtered by Gavin (<a href>publication</a>) and ordered by the Gene Network (<a href>publication</a>) scores for the combination of the gene and selected phentotypes.</span>

    {loggedIn && <div>
      <PhenotypeSelectionContainer />
      <div><b>Dataset:</b> {entityName}</div>
      <VariantTableContainer />
    </div>}
  </div>
)

Gavin.propTypes = propTypes

export default Gavin
