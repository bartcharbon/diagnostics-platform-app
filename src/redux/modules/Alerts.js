// Constants
export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

export const constants = { SHOW_ALERT, HIDE_ALERT }

// Action Creators
export const showAlert = (style, title, message) => ({
  type    : SHOW_ALERT,
  payload : { style, title, message }
})

export const hideAlert = (index) => ({
  type    : HIDE_ALERT,
  payload : index
})

export const actions = { showAlert, hideAlert }

// Reducer
export const defaultState = []

export default function (state = defaultState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload]
    case HIDE_ALERT:
      const index = action.payload
      return [...state.slice(0, index), ...state.slice(index + 1)]
    default:
      return state
  }
}
