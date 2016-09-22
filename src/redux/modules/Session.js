// This is a duck, it contains actions and reducers for the session part of the state tree
import MolgenisApi from './MolgenisApi'

// Constants
export const VERSION_RETRIEVED = 'VERSION_RETRIEVED'
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export const constants = { VERSION_RETRIEVED, LOGGED_IN, LOGGED_OUT }

export function versionRetrieved (version) {
  return { type : VERSION_RETRIEVED, payload : version }
}

// Action Creators
export function login (server, username, password) {
  // this action is a thunk, it resolves a promise and then dispatches a new action
  // it accepts the dispatch method as a parameter
  return function (dispatch) {
    return MolgenisApi.login(server, username, password).then(
      loginResponse => {
        if (!loginResponse.token) {
          dispatch(loginFailed(loginResponse.errors[0].message))
        } else {
          dispatch(getVersion(server))
          dispatch(loggedIn({ server : server, ...loginResponse }))
        }
      }
    )
  }
}

export function loggedIn (session) {
  return { type : LOGGED_IN, payload : session }
}

export function loginFailed (error) {
  return { type : LOGGED_IN, error : error }
}

export function loggedOut () {
  return { type : LOGGED_OUT }
}

export function getVersion (server) {
  return function (dispatch) {
    return MolgenisApi.get(server, 'v2/version')
      .then(version => dispatch(versionRetrieved(version)))
  }
}

export const actions = { login, loggedIn, loginFailed, loggedOut, getVersion, versionRetrieved }

// Reducer
export const defaultState = {
  server   : { apiUrl : undefined, version : undefined },
  username : undefined,
  password : undefined,
  token    : undefined
}

export function reducer (state = defaultState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return action.error ? state : { ...state, ...action.payload }
    case LOGGED_OUT:
      return { ...state, token : undefined }
    case VERSION_RETRIEVED:
      return { ...state, server : { ...state.server, version : action.payload } }
    default:
      return state
  }
}

export default reducer
