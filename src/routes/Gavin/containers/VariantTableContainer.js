import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getVariantsSortedOnScore } from '../modules/Gavin'
import { showAlert } from 'redux/modules/Alerts'

// ------------------------------------
// Presentation components
// ------------------------------------
const propTypes = {
  variants : PropTypes.array
}

class VariantTable extends Component {
  render () {
    return (
        <BootstrapTable ref='table' data={this.props.variants}>
          <TableHeaderColumn dataField='identifier' hidden isKey>identifier</TableHeaderColumn>
          <TableHeaderColumn dataField='#CHROM'>Chromosome</TableHeaderColumn>
          <TableHeaderColumn dataField='POS'>Position</TableHeaderColumn>
          <TableHeaderColumn dataField='REF'>Reference allele</TableHeaderColumn>
          <TableHeaderColumn dataField='ALT'>Alternative allele</TableHeaderColumn>
          <TableHeaderColumn dataField='Gene'>HGNC Gene</TableHeaderColumn>
          <TableHeaderColumn width='250' dataField='Gavin'>Gavin</TableHeaderColumn>
        </BootstrapTable>
    )
  }
}

VariantTable.propTypes = propTypes

// ------------------------------------
// Container / Presentation wrapping
// ------------------------------------
const mapStateToProps = (state) => {
  var variants = getVariantsSortedOnScore(state.gavin)
  return { variants : variants }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantTable)
