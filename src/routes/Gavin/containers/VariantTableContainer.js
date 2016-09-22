import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

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
        <BootstrapTable ref='table' data={this.props.variants}>
          <TableHeaderColumn dataField='identifier' hidden={true} isKey>identifier</TableHeaderColumn>
          <TableHeaderColumn dataField='#CHROM'>Chromosome</TableHeaderColumn>
          <TableHeaderColumn dataField='POS'>Position</TableHeaderColumn>
          <TableHeaderColumn dataField='REF'>Reference allele</TableHeaderColumn>
          <TableHeaderColumn dataField='ALT'>Alternative allele</TableHeaderColumn>
          <TableHeaderColumn dataField='Gene'>HGNC Gene</TableHeaderColumn>
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
  return { variants : state.gavin.entities.variants }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantTable)
