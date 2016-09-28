import React, { PropTypes } from 'react'
import UploadFormContainer from 'containers/UploadFormContainer'
import { submitForm } from 'redux/modules/MolgenisApi'

const propTypes = {
  token : PropTypes.string
}

export const HomeView = (props) => {
  return <div>
    <h4>Welcome!</h4>
    <p>Upload your VCF file with gene annotations</p>
    <UploadFormContainer
      width={'12'}
      showAction={false}
      validExtensions={['vcf', 'xlsx', 'xls', 'vcf.gz']}
    />
  </div>
}

HomeView.propTypes = propTypes

export default HomeView
