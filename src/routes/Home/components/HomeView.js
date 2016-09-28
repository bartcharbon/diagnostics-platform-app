import React from 'react'
import UploadForm from 'components/UploadForm'
// import { post } from 'redux/modules/MolgenisApi'
import fetch from 'isomorphic-fetch'



const validExtensions = ['vcf', 'xlsx', 'xls', 'vcf.gz']

function onSubmit (form) {
    var data = new FormData();
    data.append('file', form.file);
    data.append('entityName', form.fileName);
    data.append('action', form.action);
    data.append('notify', false);

    console.log('post with data: ', data)

    fetch('http://localhost:8080/plugin/importwizard/importFile', {
        mode: 'no-cors',
        method : 'post',
        body   : data
    })
}


export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <p>Upload your VCF file with gene annotations</p>
    <UploadForm
        width={'12'}
        showAction={false}
        onSubmit={onSubmit}
        validExtensions={validExtensions}
    />
  </div>
)

export default HomeView
