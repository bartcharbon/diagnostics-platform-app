import React from 'react'
import classes from './HomeView.scss'
import UploadForm from 'components/UploadForm'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <p>Upload your VCF file with gene annotations</p>
    <UploadForm
      width={6}
      showAction={false}
      validExtensions={['vcf', 'xlsx', 'xls', 'vcf.gz']}
      onSubmit={(x) => { console.log('onSubmit', x) }}
    />
  </div>
)

export default HomeView
