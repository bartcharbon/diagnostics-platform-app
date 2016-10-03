import { submitForm, get } from 'redux/modules/MolgenisApi'
import { showAlert } from './Alerts'
// Constants
const START_IMPORT = 'START_IMPORT'
const UPDATE_JOB = 'UPDATE_JOB'

export const constants = { START_IMPORT, UPDATE_JOB }

// Action Creators
export function importFile (file) {
  return (dispatch, getState) => {
    dispatch(updateJob(null))
    const token = getState().session.token
    submitForm('http://localhost:8080/plugin/importwizard/importFile', 'post', file, token).then((response) => {
      response.json().then(jobHref => {
        dispatch(startImport(jobHref))
        dispatch(fetchJob(jobHref))
      })
    }, (error) => dispatch(showAlert('danger', 'Failed to import file', error.message)))
  }
}

export function fetchJob (jobHref) {
  return (dispatch, getState) => {
    const interval = setInterval(() => {
      console.log('fetching job state...')
      const { server, token } = getState().session
      get(server, '..' + jobHref, token)
        .then((job) => {
          if (job.status === 'FINISHED') {
            clearInterval(interval)
            dispatch(showAlert('info', 'Import succeeded', job.importedEntities))
            dispatch(updateJob(null))
            // TODO: go to screen 2, but for which of them?
          } else if (job.status === 'FAILED') {
            clearInterval(interval)
            dispatch(showAlert('warning', 'Import failed.', job.message))
            dispatch(updateJob(null))
          } else {
            dispatch(updateJob(job))
          }
        })
    }, 1000)
  }
}

export function updateJob (job) {
  return {
    type    : UPDATE_JOB,
    payload : job
  }
}

export function startImport (jobHref) {
  return {
    type    : START_IMPORT,
    payload : jobHref
  }
}

export const actions = { importFile }

// Reducer
export const defaultState = {
  jobHref : undefined,
  job     : undefined
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case START_IMPORT:
      return { ...state, jobHref : action.payload }
    case UPDATE_JOB:
      return { ...state, job : action.payload }
    default:
      return state
  }
}
