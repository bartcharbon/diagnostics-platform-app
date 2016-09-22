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
          <TableHeaderColumn dataField='chromosome' isKey>#CHROM</TableHeaderColumn>
          <TableHeaderColumn dataField='position'>POS</TableHeaderColumn>
          <TableHeaderColumn dataField='ref'>REF</TableHeaderColumn>
          <TableHeaderColumn dataField='alt'>ALT</TableHeaderColumn>
          <TableHeaderColumn dataField='gene'>GENE</TableHeaderColumn>
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
