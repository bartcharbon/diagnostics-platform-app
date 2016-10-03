import React, { Component, PropTypes } from 'react'
import { FormControl, Button, ProgressBar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { importFile } from 'redux/modules/ImportFile'

const propTypes = {
  width           : PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
  showAction      : PropTypes.bool,
  validExtensions : PropTypes.array
}

/**
 * First a dumb component to simply display the form
 */
class UploadForm extends Component {
  render () {
    const {
      gridWidth,
      setFile,
      warning,
      showNameField,
      entityName,
      setEntityName,
      showSubmit,
      disableSubmit,
      onSubmit
    } = this.props
    return (
      <form>
        <div className={gridWidth}>
          <div className='form-group' key='file'>
            <input type='file' onChange={setFile} />
            {warning && <span className='help-block'>{warning}</span>}
          </div>
          {showNameField &&
            <FormControl key='name' type='text' value={entityName}
              placeholder='Entity name' onChange={setEntityName} />}
          {showSubmit &&
            <div className='form-group' key='submit'>
              <Button bsStyle='default' onClick={(e) => { e.preventDefault(); onSubmit() }} disabled={disableSubmit}>
                Upload
              </Button>
            </div>}
        </div>
      </form>
    )
  }
}
UploadForm.propTypes = {
  gridWidth     : PropTypes.string,
  setFile       : PropTypes.func,
  warning       : PropTypes.string,
  showNameField : PropTypes.bool,
  entityName    : PropTypes.string,
  setEntityName : PropTypes.func,
  showSubmit    : PropTypes.bool,
  disableSubmit : PropTypes.bool,
  onSubmit      : PropTypes.func
}

/**
 * Then a smart container that keeps the selected file in local state because it is not serializable.
 */
class UploadFormContainer extends Component {

  constructor (props) {
    super(props)

    // Bind this to functions
    this.setFile = this.setFile.bind(this)
    this.setEntityName = this.setEntityName.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    // Initial state
    this.state = {
      file          : null,
      entityName    : '',
      showNameField : false,
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
      let entityName = null
      if (showNameField) {
        // Remove extension
        entityName = fileName.replace(/\.vcf|\.vcf\.gz/, '')
        // Maximum length is 30 chars, but we need to take into account that the samples are post fixed "_SAMPLES"
        entityName = entityName.substring(0, 21)
        // Remove illegal chars
        entityName = entityName.replace(/-|\.|\*|\$|&|%|\^|\(|\)|#|!|@|\?/g, '_')
        // Don't allow entity names starting with a number
        entityName = entityName.replace(/^[0-9]/g, '_')
      }
      this.setState({ file, showNameField, entityName, warning : undefined })
    }
  }

  setEntityName (entityName) {
    console.log('setEntityname', entityName)
    this.setState({ entityName : entityName.value })
  }

  onSubmit () {
    const data = new FormData()
    data.append('file', this.state.file)
    data.append('entityName', this.state.entityName)
    data.append('action', this.state.action)
    data.append('notify', false)
    this.props.importFile(data)
  }

  render () {
    const { width, job } = this.props
    if (job) {
      return <ProgressBar min={0} max={1} now={1}
        striped
        label={job.message || 'importing...'}
        active
        bsStyle='info' />
    } else {
      return <UploadForm gridWidth={width ? 'col-md-' + width : 'col-md-12'}
        setFile={this.setFile}
        setEntityName={this.setEntityName}
        showSubmit={this.state.file}
        disableSubmit={this.state.showNameField && !this.state.entityName}
        onSubmit={this.onSubmit}
        {...this.state}
      />
    }
  }
}
UploadFormContainer.propTypes = { ...propTypes, importFile : PropTypes.func }

/**
 * Then connect it to the dispatcher
 */
const mapStateToProps = (state, ownProps) => ({ ...ownProps, job : state.importFile.job })
const mapDispatchToProps = { importFile }
export default connect(mapStateToProps, mapDispatchToProps)(UploadFormContainer)
