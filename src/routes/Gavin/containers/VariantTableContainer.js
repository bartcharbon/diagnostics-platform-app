import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

// ------------------------------------
// Presentation components
// ------------------------------------
const propTypes = {
  variants : PropTypes.array
}



const selectRowProp = {
  mode: "radio",
  clickToSelect: true,
  bgColor: "rgb(238, 193, 213)",
  onSelect: function (row, isSelected){
    console.log(row);
    console.log("selected: " + isSelected)
  }
};

class VariantTable extends Component {
  render () {
    return (
      <div>
        <hr></hr>
        <BootstrapTable ref='table' data={this.props.variants} search={true} selectRow={selectRowProp}>
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
