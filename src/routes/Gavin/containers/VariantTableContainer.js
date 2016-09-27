import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getVariantsSortedOnScore } from '../modules/Gavin'

// ------------------------------------
// Presentation components
// ------------------------------------
const propTypes = {
  variants : PropTypes.array
}

class VariantTable extends Component {
  render () {
    return (
      <div>
        <hr />
        <BootstrapTable ref='table' data={this.props.variants}>
          <TableHeaderColumn dataField='identifier' hidden isKey>identifier</TableHeaderColumn>
          <TableHeaderColumn dataField='#CHROM'>Chromosome</TableHeaderColumn>
          <TableHeaderColumn dataField='POS'>Position</TableHeaderColumn>
          <TableHeaderColumn dataField='REF'>Reference allele</TableHeaderColumn>
          <TableHeaderColumn dataField='ALT'>Alternative allele</TableHeaderColumn>
          <TableHeaderColumn dataField='Gene'>HGNC Gene</TableHeaderColumn>
          <TableHeaderColumn dataField='totalScore'>Score</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

VariantTable.propTypes = propTypes

// ------------------------------------
// Container / Presentation wrapping
// ------------------------------------
const mapStateToProps = (state) => {
  return { variants : getVariantsSortedOnScore(state.gavin) }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantTable)
