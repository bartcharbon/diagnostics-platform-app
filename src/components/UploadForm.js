import React, { Component, PropTypes } from 'react'
import { Button, FormControl } from 'react-bootstrap'

const propTypes = {
  width           : PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
  showAction      : PropTypes.bool,
  onSubmit        : PropTypes.func.isRequired,
  validExtensions : PropTypes.array
}

class UploadForm extends Component {
  constructor (props) {
    super(props)

    // Bind this to functions
    this.setFile = this.setFile.bind(this)
    this.setFileName = this.setFileName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    // Initial state
    this.state = {
      file          : null,
      showNameField : false,
      fileName      : null,
      action        : 'ADD'
    }
  }

  setFile (event) {
    const file = event.target.files[0]
    var fileName = file.name.toLowerCase()
    var showNameField = fileName.endsWith('.vcf') || fileName.endsWith('.vcf.gz')
    if (this.props.validExtensions && !this.props.validExtensions.find((extension) => fileName.endsWith(extension))) {
      this.setState({ warning : 'Invalid file name, extension must be ' + this.props.validExtensions })
    } else {
      if (showNameField) {
        // Remove extension
        fileName = fileName.replace(/\.vcf|\.vcf\.gz/, '')
        // Maximum length is 30 chars, but we need to take into account that the samples are post fixed "_SAMPLES"
        fileName = fileName.substring(0, 21)
        // Remove illegal chars
        fileName = fileName.replace(/-|\.|\*|\$|&|%|\^|\(|\)|#|!|@|\?/g, '_')
        // Don't allow entity names starting with a number
        fileName = fileName.replace(/^[0-9]/g, '_')
        this.setState({ fileName })
      }
      this.setState({ file, showNameField, warning : undefined })
    }
  }

  setFileName (fileName) {
    this.setState({ fileName : fileName.value })
  }

  onSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    var gridWidth = this.props.width ? 'col-md-' + this.props.width : 'col-md-12'
    return (<form>
      <div className={gridWidth}>
        <div className='form-group'>
          <input type='file' onChange={this.setFile} />
          {this.state.warning && <span id='helpBlock' className='help-block'>{this.state.warning}</span>}
        </div>

        {this.state.showNameField &&
        <FormControl
          type='text'
          value={this.state.fileName}
          placeholder='Entity name'
          onChange={this.setFileName}
        />}

        {this.state.file && <div className='form-group'>
          <Button bsStyle='default' onClick={this.onSubmit} disabled={this.state.showNameField && !this.state.fileName}>Upload</Button>
        </div>}
      </div>
    </form>)
  }
}

UploadForm.propTypes = propTypes
export default UploadForm
