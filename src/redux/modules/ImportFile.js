import { submitForm, get } from 'redux/modules/MolgenisApi'
import { showAlert } from './Alerts'
// Constants
const START_IMPORT = 'START_IMPORT'
const UPDATE_JOB = 'UPDATE_JOB'

export const constants = { START_IMPORT, UPDATE_JOB }

// Action Creators
export function importFile (file, server, token) {
  return (dispatch, getState) => {
    submitForm('http://localhost:8080/plugin/importwizard/importFile', 'post', file, token).then((response) => {
      response.json().then(jobHref => {
        dispatch(startImport(jobHref))
        get(getState().session.server, 'http://localhost:8080' + jobHref, token).then(
          (response) => response.json().then(
            (json) => console.log('Job status: ', json)
          )
        )
      })
    }, (error) => dispatch(showAlert('danger', 'Failed to import file', error.message)))
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
